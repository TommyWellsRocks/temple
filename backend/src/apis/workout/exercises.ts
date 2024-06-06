import express, { Application } from "express";

const PORT = parseInt(process.argv[2]);
console.log(PORT);

const app: Application = express();

// Middleware
app.use(express.json());

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));

app.get("/exercises", (req, res) => {
	res.status(200).send([
		{
			title: "Bench Press",
			instructions: "Just don't.",
		},
		{
			title: "Push Ups",
			instructions: "Down, then back up.",
		},
	]);
});

app.post("/post-exercise/:id", (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	if (!name) {
		res.status(418).send({ message: "We need a name!" });
	}

	res.send({
		status: "Added",
		message: `Exercise: ${name} was added with an id of ${id}`,
	});
});
