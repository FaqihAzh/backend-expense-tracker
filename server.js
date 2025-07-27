import express from "express";
import dotenv from "dotenv";
import {sql} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      CREATED_AT DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log("Database initialized");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.get("/api/v1/transactions", async (req, res) => {
  try {
    const transactions = await sql`SELECT * FROM transactions`;
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transaction = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/transactions", async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;

    if (!user_id || !title || !amount || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;

    console.log("Transaction created:", transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/v1/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if(isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (transaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    console.log("Transaction deleted:", transaction);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/transactions/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM transactions
      WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS income
      FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `;

    const expenseResult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS expense
      FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `;

    const balance = balanceResult[0].balance;
    const income = incomeResult[0].income;
    const expense = expenseResult[0].expense;

    res.status(200).json({ balance, income, expense });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});