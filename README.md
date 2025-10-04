
# 📚 MERN Stack Book Review Platform

A **full-stack application** built using the **MERN** (MongoDB, Express, React, Node.js) stack, demonstrating secure user authentication, comprehensive **CRUD** (Create, Read, Update, Delete) operations, and professional data presentation.

The platform features:

  * **Secure Authentication:** **JWT** integration with **bcrypt** protection for all user sessions.
  * **Book Management:** Full CRUD capabilities with **creator-only access** for editing and deletion.
  * **Review System:** Users can add, edit, and delete reviews, with dynamic calculation of the **Average Rating**.
  * **Optimized Display:** Implementation of **Pagination** (5 books per page) and a modern, styled interface using **Tailwind CSS**.

-----

## 🚀 Final Launch Steps

These are the two steps required to run your complete application locally for verification:

### 1\. Launch Backend (API)

Open one terminal and run:

```bash
cd backend
npm run server
```

*Verification: The API starts on `http://localhost:5000` and displays the "MongoDB Connected" message.*

### 2\. Launch Frontend (UI)

Open a second terminal and run:

```bash
cd frontend
npm run dev
```

*Verification: The UI opens in your browser on `http://localhost:5173` (or similar port) and displays the styled application.*
