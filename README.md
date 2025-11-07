# 💪 FitHub — Your Ultimate Fitness Oasis

> A full-stack, modern, and high-performance fitness application designed to provide a seamless and immersive user experience. From tracking workouts to managing subscriptions and shopping for supplements — **FitHub** is your all-in-one digital fitness hub.

**Developed with passion by Shrikrishna Patel.**

---

## ✨ Features & Functionality

FitHub is a **complete fitness ecosystem** built for modern fitness enthusiasts with a focus on performance and user experience.

### 🔐 Authentication & Security
- JWT-based secure user authentication
- Protected routes and session management
- Password encryption with bcrypt

### 🏠 Dashboard & Home
- Personalized greeting and workout suggestions
- Today's workout recommendations (9 exercise library)
- Featured programs with "coming soon" notifications
- Quick access to Fitness Store
- Smooth 60-120 FPS scrolling performance

### 🛒 E-commerce (Fitness Store)
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

### 💰 Payment System
- Secure checkout form
- SSL encryption indicators
- Multiple payment method support
- Professional payment UI

### 🗓️ Workout Calendar
- Interactive workout scheduling
- Track your training schedule
- Visual calendar interface

### ▶️ Video Library
- 9 exercise tutorials with video playback
- Bicep Curl, Barbell Squats, Bench Press, Cable Cross, Chest Fly, Seated Row, Pull-ups, Abs, Push-ups
- Direct video navigation from workout suggestions
- Modal-based video player

### 📧 Contact System
- Professional contact form
- Email notifications to admin (krishnaspattel@gmail.com)
- HTML-formatted email templates
- Message storage in database

### 📄 About & Information
- About Us page with mission and founder info
- Core values display
- Professional presentation

### ⚡ Performance Optimizations
- 60-120 FPS smooth scrolling
- GPU-accelerated animations
- Optimized backdrop filters
- Reduced background-attachment overhead
- Scroll performance optimizer
- Intersection Observer for efficient animations

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
| **Styling** | CSS3 with Glassmorphism, Custom Animations |
| **Dev Tools** | Nodemon 3.1.10, React Scripts 5.0.1 |

---

## 📁 Project Structure

```
FitHub-MERN/
├── backend/                    # Node.js & Express.js Server
│   ├── config/
│   │   └── db.js              # MongoDB connection
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
│   │       ├── exercises.js   # Exercise routes
│   │       ├── workouts.js    # Workout routes
│   │       └── contact.js    # Contact form & email routes
│   ├── server.js              # Main server file
│   ├── test-email.js          # Email configuration test script
│   ├── .env                   # Environment variables (not in git)
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
        │   ├── LandingPage.js     # Landing page
        │   ├── HomePage.js        # Dashboard
        │   ├── LoginPage.js      # Login
        │   ├── RegisterPage.js   # Registration
        │   ├── EkartPage.js      # Fitness Store
        │   ├── SubscriptionPage.js # FitPass
        │   ├── PaymentPage.js    # Checkout
        │   ├── VideoPage.js      # Exercise library
        │   ├── CalendarPage.js   # Workout calendar
        │   ├── AboutPage.js      # About us
        │   ├── ContactPage.js    # Contact form
        │   └── BookingPage.js    # Booking page
        ├── utils/
        │   ├── api.js            # Axios configuration
        │   ├── auth.js           # Auth utilities
        │   └── scrollOptimizer.js # Scroll performance
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
   git clone https://github.com/YOUR_USERNAME/FitHub-MERN.git
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
- **📱 Fully Responsive**: Mobile-first design approach
- **♿ Accessible**: Optimized for screen readers and keyboard navigation
- **⚡ Performance First**: Optimized for smooth scrolling and fast load times

---

## 🔧 Performance Optimizations

FitHub is optimized for **60-120 FPS smooth scrolling**:

- ✅ Removed expensive `background-attachment: fixed`
- ✅ Optimized backdrop-filter blur (reduced from 20-30px to 10px)
- ✅ GPU acceleration with `transform: translateZ(0)`
- ✅ Scroll performance optimizer JavaScript
- ✅ Intersection Observer for efficient animations
- ✅ Reduced repaints with CSS `contain` property
- ✅ Passive event listeners for better scroll performance
- ✅ Optimized animations (transform & opacity only)

---

## 📧 Email System

The contact form sends emails to the admin email address configured in `.env`.

**Features:**
- HTML-formatted emails
- Professional design with FitHub branding
- Includes sender name, email, subject, and message
- Clickable reply-to links
- Automatic email notifications

**Test Email:**
```bash
cd backend
node test-email.js
```

---

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variable protection
- Secure email transmission

---

## 📱 Pages & Routes

### Public Routes
- `/` - Landing Page
- `/register` - User Registration
- `/login` - User Login
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

## 🚀 Features Breakdown

### Landing Page
- Hero section with CTA
- Why FitHub section
- Featured classes
- Testimonials
- Footer

### Home Page (Dashboard)
- Personalized greeting
- Today's workout suggestion (from 9 exercises)
- Featured programs
- Quick access to Fitness Store
- Motivational quotes

### Fitness Store (Ekart)
- 8 premium products
- Product categories
- Customer reviews
- Why shop with us
- Promotional banners

### Subscription Page
- 3 membership tiers
- Feature comparison
- Modern card design

### Payment Page
- Secure checkout form
- SSL indicators
- Multiple payment methods

### Video Library
- 9 exercise videos
- Direct navigation from workout suggestions
- Modal video player

---

## 🐛 Troubleshooting

### Email Not Sending
- Verify `EMAIL_USER` and `EMAIL_PASS` in `.env`
- Ensure you're using an App Password, not regular password
- Check backend server logs for errors
- Test with `node test-email.js`

### Database Connection Issues
- Verify `MONGO_URI` in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure network connectivity

### Performance Issues
- Clear browser cache
- Check browser DevTools Performance tab
- Verify all optimizations are applied

---

## 📝 License

Licensed under the MIT License

---

## 👤 Author

**Shrikrishna Patel**

- Email: krishnaspattel@gmail.com
- Contact form available at `/contact`

---

## 💬 Motto

**"Hustle for that Muscle."**

FitHub — where fitness meets technology.

---

## 🙏 Acknowledgments

- Unsplash for background images
- React community for excellent documentation
- MongoDB Atlas for database hosting
- All contributors and testers

---

**Built with ❤️ and 💪**
