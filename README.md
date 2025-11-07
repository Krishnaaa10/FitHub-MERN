<img width="1920" height="1080" alt="Screenshot (73)" src="https://github.com/user-attachments/assets/059f0c02-9f74-4f22-8d81-8ea7b7a468f1" /># 💪 FitHub — Your Ultimate Fitness Oasis

> A full-stack, modern, and high-performance fitness application designed to provide a seamless and immersive user experience. From tracking workouts to managing subscriptions and shopping for supplements — **FitHub** is your all-in-one digital fitness hub.

**Developed with passion by Shrikrishna Patel.**

---

## 🎯 Project Overview

FitHub is a complete MERN stack fitness application featuring modern UI/UX design, real-time workout tracking, exercise library, fitness store, subscription management, and comprehensive user authentication. Built with performance and user experience as top priorities.

---
## ✨ Screenshots

<img width="1920" height="1080" alt="Screenshot (66)" src="https://github.com/user-attachments/assets/44ee2fb7-aa35-421d-87e4-6d1f3edd784f" />

<img width="1920" height="1080" alt="Screenshot (67)" src="https://github.com/user-attachments/assets/db04a110-c5e6-477a-8e2f-3a1047e60974" />

<img width="1920" height="1080" alt="Screenshot (68)" src="https://github.com/user-attachments/assets/27981a9d-5710-417c-8b2e-003bf2f0f7c4" />

<img width="1920" height="1080" alt="Screenshot (69)" src="https://github.com/user-attachments/assets/65b45bc9-4b5a-45a9-abe5-9b3b59777a57" />

<img width="1920" height="1080" alt="Screenshot (70)" src="https://github.com/user-attachments/assets/4b2743c8-6bc4-43ba-a7ab-68055c547e8d" />

<img width="1920" height="1080" alt="Screenshot (71)" src="https://github.com/user-attachments/assets/0124f0b0-7585-498a-956a-ed8d1e65a514" />

<img width="1920" height="1080" alt="Screenshot (72)" src="https://github.com/user-attachments/assets/302cce73-ce06-4571-9f6e-87aa8536f69a" />

<img width="1920" height="1080" alt="Screenshot (73)" src="https://github.com/user-attachments/assets/f8d8ede8-ad80-46c2-88c4-84fadfe9833f" />

---

## ✨ Key Features

### 🔐 Modern Authentication System
- **JWT-based secure authentication** with token management
- **Dynamic login/register pages** with animated particle backgrounds
- **Split-screen design** with glassmorphism effects
- **Real-time backend health checks** and connection diagnostics
- **Protected routes** with session management
- **Password encryption** with bcrypt

### 🏠 Redesigned Landing Page
- **Modern, space-efficient design** with 80% content utilization
- **Hero section** with gradient effects and CTAs
- **Stats bar** displaying key metrics
- **Training programs section** (Strength, Cardio, Yoga, Functional)
- **Yoga practice section** with benefits and styles
- **Features grid** showcasing app capabilities
- **Fully responsive** design

### 🎨 Modern UI/UX Design
- **Animated particle backgrounds** with connecting lines
- **Floating morphing shapes** with smooth animations
- **Glassmorphism effects** throughout the application
- **Smooth transitions** and hover effects
- **Dynamic form inputs** with floating labels
- **Orange/black color scheme** with gradient accents
- **GPU-accelerated animations** for 60-120 FPS performance

### 🏋️ Workout Management
- **Interactive workout calendar** with date-based logging
- **Quick log modal** for fast workout entry
- **Exercise library** with video tutorials
- **Progress tracking** and statistics
- **Workout history** and streak tracking

### 🛒 Fitness Store (E-commerce)
- Modern product showcase with 8 premium supplements
- Product categories: Protein, Performance, Recovery, Energy, Health, Equipment, Nutrition
- Secure checkout integration
- Customer reviews and testimonials
- Why shop with us section

### 💳 FitPass Subscription System
- Three-tier membership plans (Silver, Gold, Elite)
- Modern card-based pricing display
- Integrated payment processing
- Feature comparison and benefits

### 📧 Contact & Communication
- Professional contact form with validation
- Email notifications to admin
- HTML-formatted email templates
- Message storage in database

### ⚡ Performance Optimizations
- 60-120 FPS smooth scrolling
- GPU-accelerated animations
- Optimized backdrop filters
- Scroll performance optimizer
- Intersection Observer for efficient animations
- Reduced repaints with CSS contain property
- Passive event listeners

---

## 🚀 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React 18.3.1, React Router DOM 6.23.1 |
| **Backend** | Node.js, Express.js 5.1.0 |
| **Database** | MongoDB (Atlas) with Mongoose 8.19.1 |
| **Authentication** | JWT (jsonwebtoken 9.0.2), bcryptjs 3.0.2 |
| **Email** | Nodemailer 7.0.10 (Gmail SMTP) |
| **API Communication** | Axios 1.7.2 |
| **Styling** | CSS3 with Glassmorphism, Custom Animations, Canvas API |
| **Dev Tools** | Nodemon 3.1.10, React Scripts 5.0.1 |

---

## 📁 Project Structure

```
FitHub-MERN/
├── backend/                    # Node.js & Express.js Server
│   ├── config/
│   │   └── db.js              # MongoDB connection with error handling
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Exercise.js        # Exercise model
│   │   ├── WorkoutLog.js      # Workout log model
│   │   └── Message.js         # Contact form message model
│   ├── routes/
│   │   └── api/
│   │       ├── users.js       # User authentication routes
│   │       ├── exercises.js   # Exercise routes (public)
│   │       ├── workouts.js    # Workout routes
│   │       └── contact.js     # Contact form & email routes
│   ├── server.js              # Main server with CORS & health check
│   ├── test-email.js          # Email configuration test script
│   ├── .env                   # Environment variables (not in git)
│   ├── env.example            # Environment variables template
│   └── package.json
│
└── frontend/                   # React User Interface
    ├── public/
    │   ├── images/            # Product and exercise images
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Layout.js      # Main layout component
        │   ├── Navbar.js      # Navigation bar
        │   ├── ProtectedRoute.js  # Route protection
        │   ├── QuickLogModal.js   # Workout logging modal
        │   └── Toast.js       # Toast notifications
        ├── pages/
        │   ├── LandingPage.js     # Modern landing page
        │   ├── HomePage.js        # Dashboard
        │   ├── LoginPage.js       # Dynamic login page
        │   ├── RegisterPage.js    # Dynamic register page
        │   ├── EkartPage.js       # Fitness Store
        │   ├── SubscriptionPage.js # FitPass
        │   ├── PaymentPage.js     # Checkout
        │   ├── VideoPage.js       # Exercise library
        │   ├── CalendarPage.js    # Workout calendar
        │   ├── AboutPage.js       # About us
        │   ├── ContactPage.js     # Contact form
        │   └── BookingPage.js     # Booking page
        ├── utils/
        │   ├── api.js            # Axios config with health check
        │   ├── auth.js           # Auth utilities
        │   └── scrollOptimizer.js # Scroll performance
        ├── LandingPage.css       # Landing page styles
        ├── AuthPages.css         # Auth pages styles
        ├── PerformanceOptimizations.css  # Performance CSS
        ├── App.js               # Main app component
        └── index.js             # Entry point
```

---

## 🧩 Environment Variables

### Backend (.env)

Create a `.env` file inside `/backend` directory:

```env
# MongoDB Connection
MONGO_URI=your_mongodb_atlas_connection_string

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Node Environment
NODE_ENV=development

# Email Configuration for Contact Form
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Frontend (.env)

Create a `.env` file inside `/frontend` directory:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# For production deployment on Render:
# REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### Email Setup

To enable email notifications from the contact form:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to **App passwords** section
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Add it to `.env` as `EMAIL_PASS`

**Note:** Use the App Password, not your regular Gmail password.

Test email configuration:
```bash
cd backend
node test-email.js
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (v8+) or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Gmail account** (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krishnaaa10/FitHub-MERN.git
   cd FitHub-MERN
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file with your configuration (see Environment Variables section)
   
   ```bash
   npm run dev
   ```
   
   Backend server will start on: **http://localhost:5000**
   - Health check endpoint: `http://localhost:5000/health`

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```
   
   Frontend will open automatically at: **http://localhost:3000**

### Running Both Servers

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

---

## 📦 Available Scripts

### Backend

```bash
npm start      # Run production server
npm run dev    # Run development server with nodemon
```

### Frontend

```bash
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

---

## 🎨 Design Philosophy

- **🖤 Dark Theme**: Sleek, modern, and athletic aesthetic
- **✨ Smooth Animations**: GPU-accelerated, 60-120 FPS performance
- **💎 Glassmorphism**: Modern backdrop blur effects (optimized)
- **🎭 Dynamic Effects**: Animated particles, floating shapes, morphing backgrounds
- **📱 Fully Responsive**: Mobile-first design approach
- **♿ Accessible**: Optimized for screen readers and keyboard navigation
- **⚡ Performance First**: Optimized for smooth scrolling and fast load times

---

## 🌟 Recent Updates

### Version 2.0 - Modern Redesign

#### Landing Page Redesign
- ✅ Complete transformation with modern, space-efficient layout
- ✅ Hero section with gradient effects
- ✅ Stats bar with key metrics
- ✅ Training programs showcase
- ✅ Yoga practice section
- ✅ Features grid
- ✅ Improved navigation with larger fonts

#### Authentication Pages Redesign
- ✅ Dynamic login/register pages with animated particle backgrounds
- ✅ Split-screen design with visual side and form side
- ✅ Glassmorphism effects throughout
- ✅ Floating morphing shapes
- ✅ Animated form inputs with floating labels
- ✅ Smooth transitions and hover effects
- ✅ Canvas-based particle animations

#### Backend Improvements
- ✅ Enhanced CORS configuration for production deployment
- ✅ Health check endpoint (`/health`) for deployment verification
- ✅ Better error handling and logging
- ✅ Improved environment variable documentation

#### Frontend Improvements
- ✅ Enhanced API error handling with diagnostics
- ✅ Backend health check integration
- ✅ Improved connection status display
- ✅ Better error messages for users

---

## 📱 Pages & Routes

### Public Routes
- `/` - Landing Page (Modern redesign)
- `/register` - User Registration (Dynamic design)
- `/login` - User Login (Dynamic design)
- `/booking` - Booking Available Soon page
- `/about` - About Us page
- `/contact` - Contact Us page

### Protected Routes (Require Authentication)
- `/home` - Dashboard/Home Page
- `/ekart` - Fitness Store
- `/subscription` - FitPass Subscription Plans
- `/payment` - Checkout/Payment
- `/video` - Exercise Video Library
- `/calender` - Workout Calendar

---

## 🛡️ Security Features

- JWT-based authentication with secure token storage
- Password hashing with bcrypt
- Protected API routes with middleware
- CORS configuration for production
- Environment variable protection
- Secure email transmission
- Input validation and sanitization

---

## 📝 API Endpoints

### Public Endpoints
- `GET /health` - Health check endpoint
- `GET /api/exercises` - Get all exercises
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Protected Endpoints (Require JWT Token)
- `GET /api/workouts` - Get user's workout logs
- `POST /api/workouts` - Create/update workout log
- `DELETE /api/workouts/:date` - Delete workout log
- `POST /api/contact` - Send contact form message

---

## 🎯 Future Enhancements

- [ ] Social media integration
- [ ] Workout sharing features
- [ ] Advanced analytics and charts
- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Community features
- [ ] Personal trainer integration
- [ ] Nutrition tracking

---

## 📝 License

Licensed under the MIT License

---

## 👤 Author

**Shrikrishna Patel**

- Email: krishnaspattel@gmail.com
- GitHub: [Krishnaaa10](https://github.com/Krishnaaa10)
- Contact form available at `/contact`

---

## 💬 Motto

**"Hustle for that Muscle."**

FitHub — where fitness meets technology.

---

**Built with ❤️ and 💪**
