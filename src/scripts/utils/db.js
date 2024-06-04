import pg from "pg";
const { Client } = pg;
import "dotenv/config";
import { writeFileSync } from "fs";
import { toTitleCase } from "./titlecase.js";

async function createClient() {
	const client = new Client({
		host: "db",
		port: process.env.PG_PORT,
		database: process.env.PG_DBNAME,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
	});
	await client.connect();
	return client;
}

/**
 * MUST BE AWAITED
 * @param {string} tableName table name
 * @returns {string[]} list of column names
 */
async function getColumnNames(tableName) {
	const client = await createClient();
	const columns = [];
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
 * @param {String} tableName table name
 * @returns {Number} number of rows in table
 */
async function getRowCount(tableName) {
	const client = await createClient();
	const res = await client.query(`Select count(*) from ${tableName};`);
	client.end();
	return res.rows[0].count;
}

/**
 * MUST BE AWAITED
 * @param {string} tableName table name
 * @param {string[]} columns column names
 * @param {string[]} values row values, corresponding to columns
 * @returns {null}
 */
async function insertRows(tableName, columns, values) {
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
 * @param {string} tableName table name
 * @param {string} conditions WHERE ____ ie: title = $1
 * @param {string[]} values $# values ie: ["Bench Press"]
 * @param {number} returnRowCount row count to return
 * @returns {object[] | object}
 */
async function getRows(tableName, conditions, values, returnRowCount = null) {
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
 * @param {string} tableName table name
 * @param {string} condition WHERE _____
 * @returns {null}
 */
async function deleteRows(tableName, condition) {
	const client = await createClient();
	await client.query(`DELETE FROM ${tableName} WHERE ${condition};`);
	client.end();
}

function generateWorkoutId() {

}


// * DEV HELPER FUNCTION 
async function prettyOutputDBJSON() {
	const client = await createClient();
	let result = await client.query("SELECT * FROM exercises;")
	result = JSON.stringify(result.rows)
	writeFileSync("exercises.json", result);
	client.end();
}