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
```bash
git clone https://github.com/YOUR_USERNAME/fithub-mern.git
cd fithub-mern

Backend:
cd backend
npm install
npm run dev

Frontend:
cd ../frontend
npm install
npm start


Frontend runs at http://localhost:3000
Backend runs at http://localhost:5000

⚙️ Recommended npm Scripts

backend/package.json

{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}


frontend/package.json

{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}

✅ Deployment Notes

Run npm run build in the frontend to generate production assets.

Serve static React build from Express backend in production.

Use environment variables securely (never commit .env).

Enable HTTPS and proper CORS configuration.

🎨 Design Philosophy

Dark theme for a modern, athletic aesthetic.

Engaging animations and transitions.

Narrative-driven e-commerce layout (“vice-versa storytelling”).

Modal-based video playback.

Responsive and accessible (keyboard + screen reader friendly).

🧾 License

Licensed under the MIT License
.

🧰 ONE-TIME FULL SETUP SCRIPT

Save this script as fithub-setup.sh inside your working directory,
then run the following:

chmod +x fithub-setup.sh
./fithub-setup.sh

Script:
#!/usr/bin/env bash
set -e

# ==========================================
# 💪 FITHUB One-Time Setup Script
# ==========================================
REPO_URL="https://github.com/YOUR_USERNAME/fithub-mern.git"
ROOT_DIR="${PWD}/fithub-mern"

echo ""
echo "🏋️  Starting setup for FITHUB..."
echo "----------------------------------"

# Step 1: Clone repo
if [ -d "$ROOT_DIR" ]; then
  echo "✔ Directory already exists, skipping clone."
else
  echo "📥 Cloning repository..."
  git clone "$REPO_URL" "$ROOT_DIR"
fi

cd "$ROOT_DIR"

# Step 2: Backend setup
if [ -d "backend" ]; then
  echo "⚙️  Installing backend dependencies..."
  (cd backend && npm install)

  if [ ! -f backend/.env.example ]; then
    cat > backend/.env.example <<EOF
# ======================================
# 💪 FITHUB Environment Example
# ======================================
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_here
PORT=5000
# STRIPE_SECRET_KEY=sk_test_yourkey
EOF
    echo "🧾 Created backend/.env.example"
  fi
else
  echo "⚠️ Backend folder missing."
fi

# Step 3: Frontend setup
if [ -d "frontend" ]; then
  echo "⚙️  Installing frontend dependencies..."
  (cd frontend && npm install)
else
  echo "⚠️ Frontend folder missing."
fi

# Step 4: Post-setup instructions
echo ""
echo "----------------------------------"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1️⃣  Create your .env file:"
echo "     cp backend/.env.example backend/.env"
echo "     # then edit backend/.env with your MongoDB URI and secret"
echo ""
echo "2️⃣  Start backend (terminal 1):"
echo "     cd backend && npm run dev"
echo ""
echo "3️⃣  Start frontend (terminal 2):"
echo "     cd frontend && npm start"
echo ""
echo "🌐  Backend: http://localhost:5000"
echo "💻  Frontend: http://localhost:3000"
echo ""
echo "💪  HUSTLE FOR THAT MUSCLE!"
echo "----------------------------------"

💬 Motto

"Hustle for that Muscle."

FITHUB — where fitness meets technology.



