import pg from "pg";
const { Client } = pg;
import "dotenv/config";
import { writeFileSync } from "fs";

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
 * MUST BE AWAITED
 * @param tableName table name
 * @returns list of column names
 */
async function getColumnNames(tableName: string): Promise<string[]> {
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
 * MUST BE AWAITED
 * @param tableName table name
 * @returns number of rows in table
 */
async function getRowCount(tableName: string): Promise<Number> {
	const client = await createClient();
	const res = await client.query(`Select count(*) from ${tableName};`);
	client.end();
	return res.rows[0].count;
}

/**
 * MUST BE AWAITED
 * @param tableName table name
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
 * MUST BE AWAITED
 * @param tableName table name
 * @param conditions WHERE ____ ie: title = $1
 * @param values $# values ie: ["Bench Press"]
 * @param returnRowCount row count to return. Returns all default.
 */
export async function getRows(
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
 * MUST BE AWAITED
 * @param tableName table name
 * @param condition WHERE _____
 */
async function deleteRows(tableName: string, condition: string): Promise<void> {
	const client = await createClient();
	await client.query(`DELETE FROM ${tableName} WHERE ${condition};`);
	client.end();
}

function generateWorkoutId() {}

// * DEV HELPER FUNCTION
async function prettyOutputDBJSON(): Promise<void> {
	const client = await createClient();
	const result = await client.query("SELECT * FROM exercises;");
	const stringResult = JSON.stringify(result.rows);
	writeFileSync("exercises.json", stringResult);
	client.end();
}

getRowCount("exercises").then(res => {console.log(res)});
