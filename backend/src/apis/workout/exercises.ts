import express, { Application, Response, Request, NextFunction } from "express";
import { deleteRows, insertRows, selectRows, updateRows } from "../../utils/db";

const PORT = parseInt(process.argv[2]);
console.log(PORT);

const app: Application = express();

// Middleware
app.use(express.json());

app.listen(PORT, () => console.log(`It's alive on http://localhost:${PORT}`));

// * Helper Functions
async function authenticateUser(req: Request, res: Response, next: NextFunction) {
	const { email, password } = req.body;
	const isUser = await selectRows("users", { email, password }, 1);

	if (isUser) {
		return next();
	} else {
		res.status(401).send({ message: "Unauthorized. Invalid email or password." });
	}
}

async function isRegisteredEmail(email: string) {
	return await selectRows("users", { email }, 1);
}

function validateEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.toLowerCase());
}

function validatePassword(password: string) {
	return 9 < password.length && password.length < 100;
}

// * USER APIS
// Create User
app.post("/signup", async (req, res) => {
	const { email, password } = req.body;
	const isUserEmail = await isRegisteredEmail(email);

	if (isUserEmail) {
		res.status(409).send({ message: "User already exists. Please login." });
	} else {
		const isValidEmail = validateEmail(email);
		const isValidPassword = validatePassword(password);

		if (isValidEmail && isValidPassword) {
			await insertRows("users", { email, password });
			res.status(201).send({ message: "User created successfully." });
		} else if (!isValidEmail) {
			res.status(400).send({ message: "Invalid email. Please try something different." });
		} else if (!isValidPassword) {
			res.status(400).send({
				message: "Invalid password length. Please try something different.",
			});
		}
	}
});

// Login User
app.post("/login", authenticateUser, (req, res) => {
	res.send({ isValid: true });
});

// Edit User
app.patch("/update-account", authenticateUser, async (req, res) => {
	const { email, password, newEmail, newPassword } = req.body;

	if (newEmail && newPassword) {
		res.status(400).send({ message: "Unauthorized. Too many account updates." });
	} else if (newEmail) {
		await updateRows("users", { email: newEmail }, { email, password });
		res.send({ message: "User email updated successfully." });
	} else if (newPassword) {
		await updateRows("users", { password: newPassword }, { email, password });
		res.send({ message: "User password updated successfully." });
	}
});

// Delete User
app.delete("/delete-account", authenticateUser, async (req, res) => {
	const { email, password } = req.body;
	await deleteRows("users", { email, password });
	res.send({ message: "User account deleted successfully." });
});

// Post/Edit Exercise
// Get Exercise
// Get workout session
// Post/Edit Workout Session

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
