# ApnaBazaar Backend API Documentation

This directory contains the backend for ApnaBazaar, built with Node.js, Express, and Prisma (SQLite).

## Base URL

`http://localhost:5001` (Default)
All API endpoints are prefixed with `/api`.

## Endpoints

### 1. Health & Info

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| GET    | `/`           | Root message.                 |
| GET    | `/api/health` | Backend status and timestamp. |

### 2. Products API

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/products`     | Fetch all products.             |
| GET    | `/api/products/:id` | Fetch a specific product by ID. |
| POST   | `/api/products`     | Create a new product.           |
| PUT    | `/api/products/:id` | Update an existing product.     |
| DELETE | `/api/products/:id` | Delete a product.               |

---

## Detailed Endpoint Documentation

### Fetch All Products

- **URL:** `/api/products`
- **Method:** `GET`
- **Success Response:** `200 OK`
- **Body:** Array of product objects.

### Create Product

- **URL:** `/api/products`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100.0,
    "image": "image_url",
    "category": "Category"
  }
  ```
- **Success Response:** `201 Created`

### Update Product

- **URL:** `/api/products/:id`
- **Method:** `PUT`
- **Body:** Same as POST (all fields optional).
- **Success Response:** `200 OK`

### Delete Product

- **URL:** `/api/products/:id`
- **Method:** `DELETE`
- **Success Response:** `204 No Content`

---

## Database Schema (Prisma)

The database uses **SQLite**. The main model is `Product`:

- `id`: Int (Primary Key)
- `name`: String
- `description`: String
- `price`: Float
- `image`: String
- `category`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

## How to Run

1. `cd server`
2. `npm install`
3. `npx prisma migrate dev` (to setup the database)
4. `npm run dev`
