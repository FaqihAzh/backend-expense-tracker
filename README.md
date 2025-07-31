# 💳 Expense Tracker Backend API

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

A robust and scalable REST API for expense tracking applications built with Express.js, Prisma ORM, and PostgreSQL. Features clean architecture, comprehensive validation, rate limiting, and standardized API responses.

## 🚀 Features

- ✅ **Clean Architecture** - Layered architecture with separation of concerns
- ✅ **Prisma ORM** - Type-safe database operations with auto-generated client
- ✅ **Standardized API Responses** - Consistent response format across all endpoints
- ✅ **Input Validation** - Comprehensive validation using express-validator
- ✅ **Rate Limiting** - Redis-based rate limiting with Upstash
- ✅ **Error Handling** - Centralized error handling with proper HTTP status codes
- ✅ **Logging System** - Structured logging for better debugging
- ✅ **CORS Support** - Cross-origin resource sharing enabled
- ✅ **Environment Configuration** - Flexible configuration management

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **PostgreSQL** >= 13.0
- **Redis** (via Upstash)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/FaqihAzh/backend-expense-tracker.git
   cd backend-expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The server will be running at `http://localhost:5001`

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/db_name"

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://your-redis-endpoint.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token-here"

# Server
PORT=5001
NODE_ENV=development
```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ | - |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL | ✅ | - |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token | ✅ | - |
| `PORT` | Server port | ❌ | 5001 |
| `NODE_ENV` | Environment mode | ❌ | development |

## 🗄️ Database Setup

### Schema

The application uses PostgreSQL with Prisma ORM. The main entity is:

```prisma
model Transaction {
  id        Int      @id @default(autoincrement())
  userId    String   @map("user_id") @db.VarChar(255)
  title     String   @db.VarChar(255)
  amount    Decimal  @db.Decimal(10, 2)
  category  String   @db.VarChar(255)
  createdAt DateTime @default(now()) @map("created_at") @db.Date

  @@map("transactions")
}
```

### Migration Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create and apply migration
npx prisma migrate dev --name init

# Open Prisma Studio
npx prisma studio
```

## 📚 API Documentation

### Base URL
```
http://localhost:5001/api/v1
```

### Response Format

All API responses follow this standardized format:

```json
{
  "meta": {
    "message": "Request successful",
    "code": 200,
    "status": "success"
  },
  "data": {
    // Response data here
  }
}
```

### Endpoints

#### 🔍 Get All Transactions
```http
GET /api/v1/transactions
```

**Response:**
```json
{
  "meta": {
    "message": "Request successful",
    "code": 200,
    "status": "success"
  },
  "data": [
    {
      "id": 1,
      "userId": "user123",
      "title": "Coffee Purchase",
      "amount": "-5.50",
      "category": "Food",
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### 🔍 Get Transactions by User ID
```http
GET /api/v1/transactions/:userId
```

**Parameters:**
- `userId` (string, required) - User identifier

#### ➕ Create Transaction
```http
POST /api/v1/transactions
```

**Request Body:**
```json
{
  "user_id": "user123",
  "title": "Coffee Purchase",
  "amount": -5.50,
  "category": "Food"
}
```

**Validation Rules:**
- `user_id`: Required, string, 1-255 characters
- `title`: Required, string, 1-255 characters
- `amount`: Required, numeric
- `category`: Required, string, 1-255 characters

#### ❌ Delete Transaction
```http
DELETE /api/v1/transactions/:id
```

**Parameters:**
- `id` (integer, required) - Transaction ID

#### 📊 Get Transaction Summary
```http
GET /api/v1/transactions/summary/:userId
```

**Parameters:**
- `userId` (string, required) - User identifier

**Response:**
```json
{
  "meta": {
    "message": "Request successful",
    "code": 200,
    "status": "success"
  },
  "data": {
    "balance": "1250.00",
    "income": "2000.00",
    "expense": "-750.00"
  }
}
```

### Error Responses

#### Validation Error (422)
```json
{
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
```

#### Not Found (404)
```json
{
  "meta": {
    "message": "Resource not found",
    "code": 404,
    "status": "fail"
  },
  "data": null
}
```

#### Rate Limit (429)
```json
{
  "meta": {
    "message": "Too many requests, please try again later",
    "code": 429,
    "status": "error"
  },
  "data": null
}
```

## 📁 Project Structure

```
project-root/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── config/
│   │   ├── database.js        # Prisma client configuration
│   │   ├── upstash.js         # Redis configuration
│   │   └── env.js             # Environment variables
│   ├── controllers/
│   │   └── transactionController.js  # HTTP request handlers
│   ├── services/
│   │   └── transactionService.js     # Business logic
│   ├── repositories/
│   │   └── transactionRepository.js  # Data access layer
│   ├── middleware/
│   │   ├── rateLimiter.js     # Rate limiting middleware
│   │   ├── errorHandler.js    # Error handling middleware
│   │   └── validation.js      # Validation middleware
│   ├── routes/
│   │   ├── index.js           # Route aggregator
│   │   └── transactionRoutes.js      # Transaction routes
│   ├── utils/
│   │   ├── apiResponse.js     # API response helper
│   │   ├── constants.js       # Application constants
│   │   └── logger.js          # Logging utility
│   ├── validators/
│   │   └── transactionValidator.js   # Input validation rules
│   └── app.js                 # Express app configuration
├── index.js                  # Server entry point
├── package.json
├── .env.example
└── README.md
```

### Architecture Layers

1. **Controller Layer** - Handles HTTP requests and responses
2. **Service Layer** - Contains business logic and orchestration
3. **Repository Layer** - Manages data access and database operations
4. **Middleware Layer** - Cross-cutting concerns (validation, rate limiting, error handling)

## 🎯 Usage Examples

### Using cURL

```bash
# Get all transactions
curl -X GET http://localhost:5001/api/v1/transactions

# Create a new transaction
curl -X POST http://localhost:5001/api/v1/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "title": "Grocery Shopping",
    "amount": -45.60,
    "category": "Food"
  }'

# Get user transactions
curl -X GET http://localhost:5001/api/v1/transactions/user123

# Get user summary
curl -X GET http://localhost:5001/api/v1/transactions/summary/user123

# Delete transaction
curl -X DELETE http://localhost:5001/api/v1/transactions/1
```

### Using JavaScript/Fetch

```javascript
// Create transaction
const createTransaction = async () => {
  const response = await fetch('http://localhost:5001/api/v1/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: 'user123',
      title: 'Coffee Purchase',
      amount: -5.50,
      category: 'Food'
    }),
  });
  
  const result = await response.json();
  console.log(result);
};

// Get user transactions
const getUserTransactions = async (userId) => {
  const response = await fetch(`http://localhost:5001/api/v1/transactions/${userId}`);
  const result = await response.json();
  console.log(result.data);
};
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create and apply migration
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

### Code Style

The project follows these conventions:
- **ES6 Modules** - Using import/export syntax
- **Clean Architecture** - Separation of concerns across layers
- **Async/Await** - For handling asynchronous operations
- **Error First** - Consistent error handling patterns
- **Descriptive Naming** - Clear and meaningful variable/function names

## 🚀 Deployment

### Environment Setup

1. **Production Environment Variables**
   ```env
   NODE_ENV=production
   DATABASE_URL="postgresql://prod_user:password@prod_host:5432/mobile_wallet"
   UPSTASH_REDIS_REST_URL="https://prod-redis.upstash.io"
   UPSTASH_REDIS_REST_TOKEN="prod-token"
   PORT=5001
   ```

2. **Database Migration**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```
## 👥 Authors

- **Your Name** - *Initial work* - [Faqih Azhar](https://github.com/FaqihAzh)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js
- [Upstash](https://upstash.com/) - Serverless Redis solution
- [PostgreSQL](https://www.postgresql.org/) - Advanced open source database

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Faqih Azhar](https://github.com/FaqihAzh)

</div>