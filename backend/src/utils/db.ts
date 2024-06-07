import pg from "pg";
const { Client } = pg;
import "dotenv/config";
import { writeFileSync } from "fs";
import { configDotenv } from "dotenv";
configDotenv({ path: "../../../.env" });

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

// * DB STRUCTURAL
/**
 *
 * @param columnNamesTypesOptions ie: user_id INT PRIMARY KEY, username varchar, email varchar
 * QUERY: CREATE TABLE users (user_id INT PRIMARY KEY, username varchar, email varchar);
 */
async function createTable(newTableName: string, columnNamesTypesOptions: string) {
	const client = await createClient();
	await client.query(`CREATE TABLE ${newTableName} (${columnNamesTypesOptions});`);
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
	const columns: string[] = [];
	const res = await client.query(
		"SELECT column_name FROM information_schema.columns WHERE table_name = $1;",
		[tableName]
	);

	res.rows.forEach((row) => {
		columns.push(row.column_name);
	});

	client.end();
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
 * @param columns column names
 * @param values row values, corresponding to columns
 */
async function insertRows(tableName: string, columns: string[], values: string[]): Promise<void> {
	const client = await createClient();
	const flattenedValues = values.map((val) =>
		Array.isArray(val) ? `ARRAY[${val.map((v) => `'${v}'`).join(", ")}]` : `'${val}'`
	);

	await client.query(
		`INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${flattenedValues.join(", ")});`
	);

	client.end();
}

/**
 * @param conditions WHERE ____ ie: title = $1
 * @param values $# values ie: ["Bench Press"]
 * @param returnRowCount row count to return. Returns all default.
 */
async function selectRows(
	tableName: string,
	conditions: string,
	values: string[],
	returnRowCount: number | null = null
): Promise<object[] | object> {
	const client = await createClient();
	const res = await client.query(`SELECT * FROM ${tableName} WHERE ${conditions};`, values);
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
 * @param condition WHERE _____
 */
async function deleteRows(tableName: string, condition: string): Promise<void> {
	const client = await createClient();
	await client.query(`DELETE FROM ${tableName} WHERE ${condition};`);
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

getAllTableNames().then(res => console.log(res))