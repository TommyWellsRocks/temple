import postgres from "postgres";
import "dotenv/config";

const sql = postgres({
	host: "db",
	port: process.env.PG_PORT,
	database: process.env.PG_DBNAME,
	username: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
});

// ! Put everything.json into sql

// /**
//  * @param {string} table table name
//  * @param {Array.<string>} columns column names
//  * @param {Array.<string>} values row values, corresponding to columns
//  * @returns {null}
//  */
// export async function pgInsert(table, columns, values) {
// 	await sql`INSERT INTO ${sql(table)} (${columns.map((col) => sql(col))}) VALUES ${values.map(
// 		(val) => sql(val)
// 	)}`;
// 	console.log("Query Committed Successfully!");
// }

// pgInsert("exercises", ["name"], ["test_name"]);

async function make() {
	const res = await sql`
		select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE';
	`;
	await sql.end();
	console.log(res);
}

make();
