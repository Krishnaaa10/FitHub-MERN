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

git clone https://github.com/YOUR_USERNAME/fithub-mern.git
cd fithub-mern

---

Backend:
cd backend
npm install
npm run dev

---

Frontend:
cd ../frontend
npm install
npm start

---

Frontend runs at http://localhost:3000
Backend runs at http://localhost:5000

---

### ⚙️ Recommended npm Scripts

---

backend/package.json

{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}

---

frontend/package.json

{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}

---

###✅ Deployment Notes

Run npm run build in the frontend to generate production assets.

Serve static React build from Express backend in production.

Use environment variables securely (never commit .env).

Enable HTTPS and proper CORS configuration.

---

🎨 Design Philosophy

Dark theme for a modern, athletic aesthetic.

Engaging animations and transitions.

Narrative-driven e-commerce layout (“vice-versa storytelling”).

Modal-based video playback.

Responsive and accessible (keyboard + screen reader friendly).

---

🧾 License

Licensed under the MIT License
.

---

💬 Motto

"Hustle for that Muscle."

FITHUB — where fitness meets technology.



