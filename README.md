# 📦 SyncBoard — Collaborative Kanban Board Application

SyncBoard is a full-stack, production-ready task management platform designed for real-time workflow tracking. Built using a serverless architecture on Vercel with a cloud-hosted MongoDB cluster, this application focuses on fast data hydration, secure environments, and strict error handling.

🔗 **Live Production Link:** [https://sync-board-eight.vercel.app/](https://sync-board-eight.vercel.app/)

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React.js, Tailwind CSS (Responsive Layouts)
- **Backend:** Node.js, Express.js (RESTful API Architecture)
- **Database:** MongoDB Atlas, Mongoose ODM
- **Deployment:** Vercel (Serverless Functions)

---

## 🚀 Key Engineering & Production Optimizations

This project implements advanced serverless patterns to ensure high availability and structural reliability under load:

### 1. Serverless Connection Pooling & Caching
In a serverless environment (like Vercel), database connections can easily bottleneck due to frequent container lifecycle changes (cold starts). 
- **Solution:** Implemented global connection state caching inside Mongoose initialization to reuse active database sockets across independent API function executions, completely eliminating critical timeout errors (`500 Internal Server Error`).

### 2. Strict Object ID & Data Stream Hydration
Prevented common frontend-backend data mismatch by enforcing strict custom dynamic fetching logic using MongoDB ObjectIDs. This guarantees that UI updates reflect the cloud cluster data state instantly with zero ghost arrays or blank loading screens.

### 3. Production Error Handling Middleware
Designed centralized try-catch middleware wrappers across all routing boundaries. The API intercepts standard database connection drops and provides clean, structured JSON tracking messages (`bad auth`, `gateway error`) instead of letting raw stack traces leak to the client console.

---

## 📦 Local Installation & Setup

To run this project locally, ensure you have Node.js and npm installed:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/irajimran5-bot/sync-board.git](https://github.com/irajimran5-bot/sync-board.git)
   cd sync-board
   
2. **Install backend and frontend dependencies:**
```bash
npm install
```
3. **Configure Environment Variables:**
Create a .env file in your root folder and configure your secure MongoDB cloud URI:
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/syncboard
PORT=5000

4. **Start the development server:**
```bash
npm run dev
```
