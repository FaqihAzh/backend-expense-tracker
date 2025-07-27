import express from "express";
import {sql} from "../config/db.js";
import {
  createTransaction,
  deleteTransactionById,
  getAllTransactions,
  getTransactionsByUserId, getTransactionSummaryByUserId
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransactionById);
router.get("/summary/:userId", getTransactionSummaryByUserId);

export default router;