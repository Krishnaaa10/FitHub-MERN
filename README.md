# 💪 FITHUB — Your Ultimate Fitness Oasis

> A full-stack, modern, and aesthetically pleasing fitness application designed to provide a seamless and immersive user experience. From tracking workouts to managing subscriptions and shopping for supplements — **FITHUB** is your all-in-one digital fitness hub.

**Developed with passion by Shrikrishna Patel.**

---

## ✨ Features & Functionality

FITHUB isn’t just a website — it’s a **complete ecosystem** built for modern fitness enthusiasts.

- 🔐 **Secure Authentication** — JWT-based user login & registration.
- 🏠 **Immersive Dashboard** — Centralized hub for your fitness journey.
- 🛒 **Storytelling E-commerce (Ekart)** — Unique, narrative-driven shopping experience.
- 💳 **FitPass Subscription System** — Multi-tier plans with integrated payments.
- 🗓️ **Workout Calendar** — Interactive and trackable workout scheduling.
- ▶️ **Video Library** — Exercise tutorials with in-app modal playback.
- 👤 **About & Contact Pages** — Sleek informational pages with message saving.
- ⚡ **Responsive UI** — Optimized for all devices with smooth performance.

---

## 🚀 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Atlas) |
| **ORM** | Mongoose |
| **API Communication** | Axios |
| **Dev Tools** | Nodemon, Concurrently |

---

Project Structure

```
fithub-mern/
├── backend/              # Node.js & Express.js Server
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── frontend/             # React User Interface
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        └── pages/
```

---

## 🧩 Environment Variables

Create a `.env` file inside `/backend` and configure it as follows:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_here
PORT=5000

Optional: STRIPE_SECRET_KEY=sk_test_...


---

## 🏁 Getting Started (Local Setup)

### 1️⃣ Prerequisites
- Node.js (v16+ recommended)
- npm (v8+)
- MongoDB Atlas account

---

### 2️⃣ Installation (Manual)

## 🏁 Getting Started

Follow these steps to set up **FITHUB** locally:

---

### 🧰 Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/fithub-mern.git
cd fithub-mern

```
---

⚙️ Backend Setup
cd backend
npm install
npm run dev

Your backend server will start on:

🌐 http://localhost:5000

---

Frontend Setup
cd ../frontend
npm install
npm start


Your frontend will open automatically at:

💻 http://localhost:3000

---

⚙️ Recommended npm Scripts
📦 backend/package.json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

🎨 frontend/package.json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}

---

🚀 Deployment Notes

To deploy the production build:

Build the Frontend:

cd frontend
npm run build


Serve from Backend:
Integrate the React build with Express and serve static files in production.

Security Best Practices:

Store environment variables securely (never commit .env files).

Use HTTPS in production.

Enable CORS properly and validate API requests.

---

🎨 Design Philosophy

🖤 Dark Theme: Sleek, modern, and athletic aesthetic.

✨ Engaging Animations: Smooth transitions and micro-interactions.

🛍️ Narrative E-commerce Layout: Vice-versa storytelling experience.

🎥 Modal-Based Video Playback: Clean and immersive.

📱 Fully Responsive & Accessible: Optimized for all devices and screen readers.

---

🧾 License

Licensed under the MIT License

---
.

💬 Motto

“Hustle for that Muscle.”
FITHUB — where fitness meets technology.

