import pg from "pg";
const { Client } = pg;
import { writeFileSync } from "fs";
import { env } from "./env";
env();

async function createClient() {
	const client = new Client({
		host: process.env.CONTAINER_DB_HOST,
		port: Number(process.env.PG_PORT),
		database: process.env.PG_DBNAME,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
	});
	await client.connect();
	return client;
}

/**
 * Must "values as any[]"
 * @param conditionsObject
 * Format: {column: value, column: {"operator": value}}
 *
 * ie: { name: 'John', age: { '>': 30, '<': 50 }, city: { 'LIKE': "%York%" }, isActive: true }
 *
 * @returns
 * Format: [conditions: string, values: any[]]
 *
 * ie: ['name = $1 AND age > $2 AND age < $3 AND city LIKE $4 AND isActive = $5', ['John', 30, 50, '%York%', true]]
 */
function objectToSQLString(
	conditionsObject: object,
	separator: ", " | " AND " = " AND ",
	placeHolderIndexStart: number = 1
) {
	const conditions = [];
	const values = [];
	let index = placeHolderIndexStart !== 1 ? placeHolderIndexStart : 1;

	for (let columnName in conditionsObject) {
		if (conditionsObject.hasOwnProperty(columnName)) {
			let value = (conditionsObject as { [key: string]: any })[columnName];

			// If Object as value
			if (typeof value === "object" && value !== null) {
				let operators = Object.keys(value);
				operators.forEach((operator) => {
					conditions.push(`${columnName} ${operator} $${index}`);
					values.push(value[operator]);
					index++;
				});

				// If direct value
			} else {
				conditions.push(`${columnName} = $${index}`);
				values.push(value);
				index++;
			}
		}
	}
	return [conditions.join(separator), values];
}

// * DB STRUCTURAL
/**
 * @param columnAttributeObject
 * Format: {columnName: attribute, columnName: ["ATTRIBUTE", "ATTRIBUTE2"]}
 *
 * ie: {favorite_color: 'VARCHAR', username: ['VARCHAR', 'PRIMARY KEY']}
 */
async function createTable(newTableName: string, columnAttributeObject: object) {
	const columnAttributes = Object.entries(columnAttributeObject)
		.map(([key, attributes]) => {
			const attrStr = Array.isArray(attributes) ? attributes.join(" ") : attributes;
			return `${key} ${attrStr}`;
		})
		.join(", ");

	const client = await createClient();
	await client.query(`CREATE TABLE ${newTableName} (${columnAttributes});`);
	client.end();
}

async function deleteTable(tableName: string) {
	const client = await createClient();
	await client.query(`DROP TABLE ${tableName}`);
	client.end();
}

async function getAllTableNames() {
	const client = await createClient();
	const res = await client.query(
		"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
	);
	client.end();
	const tables: string[] = res.rows.map((table) => table.table_name);
	return tables;
}

// * TABLE INSIGHTS
/**
 * @returns list of column names
 */
async function getColumnNames(tableName: string) {
	const client = await createClient();
	const res = await client.query(
		"SELECT column_name FROM information_schema.columns WHERE table_name = $1;",
		[tableName]
	);
	client.end();
	const columns = res.rows.map((row) => {
		return row.column_name;
	});
	return columns;
}

/**
 * @returns number of rows in table
 */
async function getRowCount(tableName: string): Promise<Number> {
	const client = await createClient();
	const res = await client.query(`Select count(*) from ${tableName};`);
	client.end();
	return res.rows[0].count;
}

// * TABLE ACTIONS
/**
 * @param columnValueObject
 * Format: { columnName: value }
 *
 * ie: { email: "test@test.com", password: "PASSWORD123" }
 */
export async function insertRows(tableName: string, columnValueObject: object): Promise<void> {
	const columns = Object.keys(columnValueObject).join(", ");
	const values = Object.values(columnValueObject);
	const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

	const client = await createClient();
	await client.query(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders});`, values);
	client.end();
}

/**
 * @param conditionsObject
 * Format: { column: value, column: {"operator": value} }
 *
 * ie: { name: 'John', age: { '>': 30, '<': 50 }, city: { 'LIKE': "%York%" }, isActive: true }
 *
 * @param returnRowCount row count to return. Returns all by default.
 */
export async function selectRows(
	tableName: string,
	conditionsObject: object,
	returnRowCount: number | null = null
): Promise<unknown[] | unknown> {
	const [conditions, values] = objectToSQLString(conditionsObject);

	const client = await createClient();
	const res = await client.query(
		`SELECT * FROM ${tableName} WHERE ${conditions};`,
		values as any[]
	);
	client.end();

	switch (returnRowCount) {
		case null:
			return res.rows;
		case 1:
			return res.rows[0];
		default:
			return res.rows.slice(0, returnRowCount + 1);
	}
}

/**
 * @param conditionsObject
 * Format: { column: value, column: {"operator": value} }
 *
 * ie: { name: 'John', age: { '>': 30, '<': 50 }, city: { 'LIKE': "%York%" }, isActive: true }
 */
export async function deleteRows(tableName: string, conditionsObject: object): Promise<void> {
	const [conditions, values] = objectToSQLString(conditionsObject);

	const client = await createClient();
	await client.query(`DELETE FROM ${tableName} WHERE ${conditions};`, values as any[]);
	client.end();
}

/**
 * @param columnValuesObject
 * Format: { columnName: value }
 *
 * ie: { email: "test@test.com", password: "PASSWORD123" }
 *
 * @param conditionsObject
 * Format: { column: value, column: {"operator": value} }
 *
 * ie: { name: 'John', age: { '>': 30, '<': 50 }, city: { 'LIKE': "%York%" }, isActive: true }
 */
export async function updateRows(
	tableName: string,
	columnValuesObject: object,
	conditionsObject?: object
) {
	const [columnUpdates, updateValues] = objectToSQLString(columnValuesObject, ", ");

	const client = await createClient();
	if (conditionsObject) {
		const [conditions, conditionValues] = objectToSQLString(
			conditionsObject,
			" AND ",
			updateValues.length + 1
		);
		const values = [...(updateValues as any[]), ...(conditionValues as any[])];
		await client.query(`UPDATE ${tableName} SET ${columnUpdates} WHERE ${conditions};`, values);
	} else {
		const values = [...(updateValues as any[])];
		await client.query(`UPDATE ${tableName} SET ${columnUpdates};`, values);
	}

	client.end();
}

// * DEV HELPER FUNCTION
async function prettyOutputDBJSON(): Promise<void> {
	const client = await createClient();
	const result = await client.query("SELECT * FROM exercises;");
	client.end();

	const stringResult = JSON.stringify(result.rows);
	writeFileSync("exercises.json", stringResult);
}

async function freeQuery(query: string) {
	const client = await createClient();
	const res = await client.query(query);
	client.end();

	return res;
}

async function goFetch(
	url: string,
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
	bodyMessage: object
) {
	const response = await fetch(url, {
		method,
		headers: { "Content-type": "application/json; charset=UTF-8" },
		body: JSON.stringify(bodyMessage),
	});
	return response.json();
}

// console.log( await
// 	goFetch("http://localhost:8001/signup", "POST", {
// 		email: "test@gmail.com",
// 		password: "PASSWORD12",
// 	})
// );)
