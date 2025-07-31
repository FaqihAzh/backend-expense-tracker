import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "Expense Tracker API",
    "description": "A robust and scalable REST API for expense tracking applications built with Express.js, Prisma ORM, and PostgreSQL. Features clean architecture, comprehensive validation, rate limiting, and standardized API responses.",
    "version": "1.2.0"
  },
  "servers": [
    {
      "url": "https://be-expense-tracker-ten.vercel.app/api/v1",
      "description": "Development server"
    }
  ],
  "paths": {
    "/transactions": {
      "get": {
        "tags": ["Transactions"],
        "summary": "Get all transactions with optional filters",
        "description": "Retrieve a list of all transactions in the system with optional filters.",
        "operationId": "getAllTransactions",
        "parameters": [
          {
            "name": "category",
            "in": "query",
            "required": false,
            "description": "Filter by category (case-insensitive partial match)",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "minAmount",
            "in": "query",
            "required": false,
            "description": "Minimum amount filter",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "maxAmount",
            "in": "query",
            "required": false,
            "description": "Maximum amount filter",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "type",
            "in": "query",
            "required": false,
            "description": "Filter by transaction type (income or expense)",
            "schema": {
              "type": "string",
              "enum": ["income", "expense"]
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "required": false,
            "description": "Start date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "required": false,
            "description": "End date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "description": "Limit the number of results",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "description": "Page number for pagination",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved transactions",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionListResponse"
                }
              }
            }
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      },
      "post": {
        "tags": ["Transactions"],
        "summary": "Create a new transaction",
        "description": "Create a new transaction for a user.",
        "operationId": "createTransaction",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateTransactionRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Transaction created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/user/{userId}": {
      "get": {
        "tags": ["Transactions"],
        "summary": "Get transactions by user ID with optional filters",
        "description": "Retrieve all transactions for a specific user with optional filters.",
        "operationId": "getTransactionsByUserId",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "category",
            "in": "query",
            "required": false,
            "description": "Filter by category (case-insensitive partial match)",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "minAmount",
            "in": "query",
            "required": false,
            "description": "Minimum amount filter",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "maxAmount",
            "in": "query",
            "required": false,
            "description": "Maximum amount filter",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "type",
            "in": "query",
            "required": false,
            "description": "Filter by transaction type (income or expense)",
            "schema": {
              "type": "string",
              "enum": ["income", "expense"]
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "required": false,
            "description": "Start date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "required": false,
            "description": "End date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved user transactions",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionListResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/user/{userId}/category/{category}": {
      "get": {
        "tags": ["Transactions"],
        "summary": "Get transactions by category for a user",
        "description": "Retrieve transactions for a specific user filtered by category.",
        "operationId": "getTransactionsByCategory",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "category",
            "in": "path",
            "required": true,
            "description": "Transaction category",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved transactions by category",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionListResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/user/{userId}/date-range": {
      "get": {
        "tags": ["Transactions"],
        "summary": "Get transactions by date range for a user",
        "description": "Retrieve transactions for a specific user within a date range.",
        "operationId": "getTransactionsByDateRange",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "required": true,
            "description": "Start date (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "required": true,
            "description": "End date (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved transactions by date range",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionListResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/user/{userId}/month/{year}/{month}": {
      "get": {
        "tags": ["Transactions"],
        "summary": "Get transactions by month for a user",
        "description": "Retrieve transactions for a specific user in a given month and year.",
        "operationId": "getTransactionsByMonth",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "year",
            "in": "path",
            "required": true,
            "description": "Year",
            "schema": {
              "type": "integer",
              "minimum": 2000,
              "maximum": 2100
            }
          },
          {
            "name": "month",
            "in": "path",
            "required": true,
            "description": "Month (1-12)",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 12
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved transactions by month",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionListResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/summary/{userId}": {
      "get": {
        "tags": ["Analytics"],
        "summary": "Get transaction summary for user",
        "description": "Get financial summary (balance, income, expense, total transactions) for a specific user.",
        "operationId": "getTransactionSummary",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "category",
            "in": "query",
            "required": false,
            "description": "Filter by category",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "required": false,
            "description": "Start date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "required": false,
            "description": "End date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved transaction summary",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SummaryResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/category-summary/{userId}": {
      "get": {
        "tags": ["Analytics"],
        "summary": "Get category summary for user",
        "description": "Get summary of transactions grouped by category for a specific user.",
        "operationId": "getCategorySummary",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "category",
            "in": "query",
            "required": false,
            "description": "Filter by category",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "required": false,
            "description": "Start date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "required": false,
            "description": "End date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved category summary",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CategorySummaryResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/monthly-report/{userId}/{year}": {
      "get": {
        "tags": ["Analytics"],
        "summary": "Get monthly report for user",
        "description": "Get a detailed monthly breakdown report of transactions for a specific user in a given year.",
        "operationId": "getMonthlyReport",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "year",
            "in": "path",
            "required": true,
            "description": "Year for the report",
            "schema": {
              "type": "integer",
              "minimum": 2000,
              "maximum": 2100
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved monthly report",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MonthlyReportResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/top-categories/{userId}": {
      "get": {
        "tags": ["Analytics"],
        "summary": "Get top categories for user",
        "description": "Retrieve the top categories by transaction count for a specific user.",
        "operationId": "getTopCategories",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "description": "Number of top categories to return (default: 5)",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 5
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved top categories",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TopCategoriesResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/recent/{userId}": {
      "get": {
        "tags": ["Analytics"],
        "summary": "Get recent transactions for user",
        "description": "Retrieve the most recent transactions for a specific user.",
        "operationId": "getRecentTransactions",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "description": "Number of recent transactions to return (default: 10)",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 100,
              "default": 10
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved recent transactions",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionListResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/analytics/{userId}": {
      "get": {
        "tags": ["Analytics"],
        "summary": "Get advanced analytics for user",
        "description": "Retrieve comprehensive analytics including summary, category breakdown, top categories, recent transactions, and insights for a specific user.",
        "operationId": "getAdvancedAnalytics",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "period",
            "in": "query",
            "required": false,
            "description": "Period for analytics (week, month, quarter, year)",
            "schema": {
              "type": "string",
              "enum": ["week", "month", "quarter", "year"]
            }
          },
          {
            "name": "category",
            "in": "query",
            "required": false,
            "description": "Filter by category",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "startDate",
            "in": "query",
            "required": false,
            "description": "Start date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "required": false,
            "description": "End date filter (ISO 8601 format)",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved advanced analytics",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AdvancedAnalyticsResponse"
                }
              }
            }
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    },
    "/transactions/{id}": {
      "get": {
        "tags": ["Transactions"],
        "summary": "Get single transaction by ID",
        "description": "Retrieve a specific transaction by its ID.",
        "operationId": "getTransactionById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "Transaction ID",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully retrieved transaction",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionResponse"
                }
              }
            }
          },
          "404": {
            "$ref": "#/components/responses/NotFoundError"
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      },
      "put": {
        "tags": ["Transactions"],
        "summary": "Update transaction",
        "description": "Update a specific transaction by ID.",
        "operationId": "updateTransaction",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "Transaction ID",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTransactionRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Transaction updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TransactionResponse"
                }
              }
            }
          },
          "404": {
            "$ref": "#/components/responses/NotFoundError"
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      },
      "delete": {
        "tags": ["Transactions"],
        "summary": "Delete transaction",
        "description": "Delete a specific transaction by ID.",
        "operationId": "deleteTransaction",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "Transaction ID",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Transaction deleted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DeleteResponse"
                }
              }
            }
          },
          "404": {
            "$ref": "#/components/responses/NotFoundError"
          },
          "422": {
            "$ref": "#/components/responses/ValidationError"
          },
          "429": {
            "$ref": "#/components/responses/RateLimitError"
          },
          "500": {
            "$ref": "#/components/responses/InternalServerError"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Transaction": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "Unique transaction identifier",
            "example": 1
          },
          "userId": {
            "type": "string",
            "description": "User identifier",
            "maxLength": 255,
            "example": "user123"
          },
          "title": {
            "type": "string",
            "description": "Transaction title/description",
            "maxLength": 255,
            "example": "Coffee Purchase"
          },
          "amount": {
            "type": "string",
            "description": "Transaction amount (negative for expenses, positive for income)",
            "pattern": "^-?\\d+(\\.\\d{1,2})?$",
            "example": "-5.50"
          },
          "category": {
            "type": "string",
            "description": "Transaction category",
            "maxLength": 255,
            "example": "Food"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Transaction creation timestamp",
            "example": "2024-01-15T00:00:00.000Z"
          }
        },
        "required": ["id", "userId", "title", "amount", "category", "createdAt"]
      },
      "CreateTransactionRequest": {
        "type": "object",
        "properties": {
          "user_id": {
            "type": "string",
            "description": "User identifier",
            "minLength": 1,
            "maxLength": 255,
            "example": "user123"
          },
          "title": {
            "type": "string",
            "description": "Transaction title/description",
            "minLength": 1,
            "maxLength": 255,
            "example": "Coffee Purchase"
          },
          "amount": {
            "type": "number",
            "description": "Transaction amount (negative for expenses, positive for income)",
            "example": -5.50
          },
          "category": {
            "type": "string",
            "description": "Transaction category",
            "minLength": 1,
            "maxLength": 255,
            "example": "Food"
          }
        },
        "required": ["user_id", "title", "amount", "category"]
      },
      "UpdateTransactionRequest": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Transaction title/description",
            "minLength": 1,
            "maxLength": 255,
            "example": "Updated Coffee Purchase"
          },
          "amount": {
            "type": "number",
            "description": "Transaction amount (negative for expenses, positive for income)",
            "example": -6.00
          },
          "category": {
            "type": "string",
            "description": "Transaction category",
            "minLength": 1,
            "maxLength": 255,
            "example": "Beverages"
          }
        }
      },
      "TransactionSummary": {
        "type": "object",
        "properties": {
          "balance": {
            "type": "number",
            "description": "Total balance (income - expenses)",
            "example": 1250.00
          },
          "income": {
            "type": "number",
            "description": "Total income",
            "example": 2000.00
          },
          "expense": {
            "type": "number",
            "description": "Total expenses",
            "example": -750.00
          },
          "totalTransactions": {
            "type": "integer",
            "description": "Total number of transactions",
            "example": 25
          }
        },
        "required": ["balance", "income", "expense", "totalTransactions"]
      },
      "CategorySummary": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string",
            "description": "Transaction category",
            "example": "Food"
          },
          "totalAmount": {
            "type": "number",
            "description": "Total amount for this category",
            "example": -150.00
          },
          "transactionCount": {
            "type": "integer",
            "description": "Number of transactions in this category",
            "example": 8
          }
        },
        "required": ["category", "totalAmount", "transactionCount"]
      },
      "MonthlyReportItem": {
        "type": "object",
        "properties": {
          "month": {
            "type": "integer",
            "description": "Month number (1-12)",
            "example": 3
          },
          "income": {
            "type": "number",
            "description": "Total income for the month",
            "example": 3000.00
          },
          "expense": {
            "type": "number",
            "description": "Total expenses for the month",
            "example": -1200.00
          },
          "balance": {
            "type": "number",
            "description": "Net balance for the month",
            "example": 1800.00
          },
          "count": {
            "type": "integer",
            "description": "Number of transactions in the month",
            "example": 15
          }
        },
        "required": ["month", "income", "expense", "balance", "count"]
      },
      "Insight": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["positive", "warning", "info"],
            "description": "Type of insight",
            "example": "positive"
          },
          "message": {
            "type": "string",
            "description": "Insight message",
            "example": "You have a positive balance of 1250"
          }
        },
        "required": ["type", "message"]
      },
      "AdvancedAnalytics": {
        "type": "object",
        "properties": {
          "summary": {
            "$ref": "#/components/schemas/TransactionSummary"
          },
          "categoryBreakdown": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/CategorySummary"
            }
          },
          "recentTransactions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Transaction"
            }
          },
          "insights": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Insight"
            }
          }
        },
        "required": ["summary", "categoryBreakdown", "topCategories", "recentTransactions", "insights"]
      },
      "ApiMeta": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string",
            "description": "Response message",
            "example": "Request successful"
          },
          "code": {
            "type": "integer",
            "description": "HTTP status code",
            "example": 200
          },
          "status": {
            "type": "string",
            "enum": ["success", "error", "fail"],
            "description": "Response status",
            "example": "success"
          }
        },
        "required": ["message", "code", "status"]
      },
      "ValidationError": {
        "type": "object",
        "properties": {
          "field": {
            "type": "string",
            "description": "Field that failed validation",
            "example": "user_id"
          },
          "message": {
            "type": "string",
            "description": "Validation error message",
            "example": "User ID is required"
          },
          "value": {
            "description": "Invalid value that was provided",
            "example": ""
          }
        },
        "required": ["field", "message"]
      },
      "TransactionResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          },
          "data": {
            "$ref": "#/components/schemas/Transaction"
          }
        },
        "required": ["meta", "data"]
      },
      "TransactionListResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Transaction"
            }
          }
        },
        "required": ["meta", "data"]
      },
      "SummaryResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          },
          "data": {
            "$ref": "#/components/schemas/TransactionSummary"
          }
        },
        "required": ["meta", "data"]
      },
      "CategorySummaryResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/CategorySummary"
            }
          }
        },
        "required": ["meta", "data"]
      },
      "TopCategoriesResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          }
        },
        "required": ["meta", "data"]
      },
      "MonthlyReportResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          },
          "data": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/MonthlyReportItem"
            }
          }
        },
        "required": ["meta", "data"]
      },
      "AdvancedAnalyticsResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          },
          "data": {
            "$ref": "#/components/schemas/AdvancedAnalytics"
          }
        },
        "required": ["meta", "data"]
      },
      "DeleteResponse": {
        "type": "object",
        "properties": {
          "meta": {
            "$ref": "#/components/schemas/ApiMeta"
          },
          "data": {
            "type": "null",
            "description": "No data returned for delete operations"
          }
        },
        "required": ["meta", "data"]
      }
    },
    "responses": {
      "ValidationError": {
        "description": "Validation failed",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "meta": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Validation failed"
                    },
                    "code": {
                      "type": "integer",
                      "example": 422
                    },
                    "status": {
                      "type": "string",
                      "example": "fail"
                    }
                  }
                },
                "data": {
                  "type": "null"
                },
                "errors": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ValidationError"
                  }
                }
              }
            },
            "example": {
              "meta": {
                "message": "Validation failed",
                "code": 422,
                "status": "fail"
              },
              "data": null,
              "errors": [
                {
                  "field": "user_id",
                  "message": "User ID is required",
                  "value": ""
                }
              ]
            }
          }
        }
      },
      "NotFoundError": {
        "description": "Resource not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "meta": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Resource not found"
                    },
                    "code": {
                      "type": "integer",
                      "example": 404
                    },
                    "status": {
                      "type": "string",
                      "example": "fail"
                    }
                  }
                },
                "data": {
                  "type": "null"
                }
              }
            }
          }
        }
      },
      "RateLimitError": {
        "description": "Rate limit exceeded",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "meta": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Too many requests, please try again later"
                    },
                    "code": {
                      "type": "integer",
                      "example": 429
                    },
                    "status": {
                      "type": "string",
                      "example": "error"
                    }
                  }
                },
                "data": {
                  "type": "null"
                }
              }
            }
          }
        }
      },
      "InternalServerError": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "meta": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Internal server error"
                    },
                    "code": {
                      "type": "integer",
                      "example": 500
                    },
                    "status": {
                      "type": "string",
                      "example": "error"
                    }
                  }
                },
                "data": {
                  "type": "null"
                }
              }
            }
          }
        }
      }
    }
  },
  "tags": [
    {
      "name": "Transactions",
      "description": "Transaction management operations including CRUD operations and filtering"
    },
    {
      "name": "Analytics",
      "description": "Analytics and reporting operations for financial insights"
    }
  ]
}

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showRequestDuration: true,
    tryItOutEnabled: true,
  },
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 20px 0 }
    .swagger-ui .scheme-container { background: #fafafa; padding: 15px; margin: 20px 0 }
  `,
  customSiteTitle: 'Mobile Wallet API Documentation',
};

export { swaggerDocument, swaggerOptions, swaggerUi };