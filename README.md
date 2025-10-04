
# 📚 MERN Stack Book Review Platform

A **full-stack application** built using the **MERN** (MongoDB, Express, React, Node.js) stack, demonstrating secure user authentication, comprehensive **CRUD** operations, and professional data presentation.

## ✅ Key Project Features

| Feature | Status | Details |
| :--- | :--- | :--- |
| **Authentication** | Complete | **JWT** sessions, **bcrypt** hashing, and protected routes. |
| **Book CRUD** | Complete | Full creation, update, and deletion logic. **Creator-only** permissions enforced. |
| **Review System** | Complete | **Average Rating** calculation and owner-specific review management. |
| **Pagination** | Complete | Optimized display (5 books per page) with functional controls. |
| **UI/UX** | Complete | Styled with **Tailwind CSS**, featuring a clean, responsive interface. |

---

## 🚀 Setup & Launch Instructions

### Prerequisites

* Node.js (v18+)
* MongoDB Atlas Account

### I. Backend Setup (API)

1.  **Install:** `cd backend && npm install`
2.  **Configure:** Create a **`.env`** file with your `MONGO_URI` and `JWT_SECRET`.
3.  **Launch:** `npm run server` (Runs on `http://localhost:5000`)

### II. Frontend Setup (UI)

1.  **Install:** `cd frontend && npm install`
2.  **Launch:** `npm run dev` (Runs on `http://localhost:5173`)

---

## 🌐 API Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/users/login` | Authenticates user and returns **JWT token**. | Public |
| **GET** | `/api/books?pageNumber=X` | Retrieves paginated list of books (5 per page). | Public |
| **POST** | `/api/books` | Creates a new book record. | **Private (JWT Required)** |
| **POST** | `/api/reviews/:bookId` | Adds a review to a specified book. | **Private (JWT Required)** |

***
