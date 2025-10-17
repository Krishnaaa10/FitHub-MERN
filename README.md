💪 FITHUB: Your Ultimate Fitness Oasis, Reimagined.

A full-stack, modern, and aesthetically pleasing fitness application designed to provide a seamless and immersive user experience. From tracking workouts to an e-commerce platform for supplements, Fithub is the all-in-one digital destination for every fitness enthusiast.

Developed with passion by Shrikrishna Patel.

✨ Features & Functionality

Fithub is more than just a website; it's a complete ecosystem. Here's what's packed inside:

🔐 Secure Authentication: A sleek, modern user registration and login system.

🏠 Immersive Homepage: A stunning, dark-themed dashboard that serves as the user's central hub.

🛒 "Storytelling" E-commerce: A unique, aesthetically pleasing, and professional "vice-versa" layout for the Ekart page, showcasing products in an unforgettable narrative style.

💳 Subscription & Payments: A professional, multi-tiered subscription page (FitPass) that flows into a secure and beautifully designed payment form.

🗓️ Interactive Workout Calendar: A fully functional calendar where users can track their daily workout logs, with interactive elements and a design that matches the Fithub brand.

▶️ Professional Video Library: A clean, modern grid of exercise tutorials that play in a slick pop-up modal, powered by YouTube for fast, reliable streaming.

👤 About & Contact Pages: Beautifully designed informational pages with custom backgrounds and a fully functional contact form that saves messages directly to the database.

🚀 Tech Stack

This project is built from the ground up using the powerful MERN stack, ensuring a fast, scalable, and modern application.

Technology

Role

MongoDB

Database (for users, messages, etc.)

Express.js

Backend Framework (for creating the API)

React

Frontend Library (for building the user interface)

Node.js

Backend Runtime Environment

Axios

For making API requests between frontend & backend

Mongoose

For modeling our MongoDB data

📂 Project Structure

The project is cleanly separated into two main parts for professional development and scalability.

fithub-mern/
├── backend/        # The Node.js & Express.js Server
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/       # The React User Interface
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   └── pages/
    └── package.json


🏁 Getting Started: Local Setup

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js installed on your machine.

A MongoDB Atlas account for the database.

Installation

Clone the repository:

git clone [https://github.com/YOUR_USERNAME/fithub-mern.git](https://github.com/YOUR_USERNAME/fithub-mern.git)
cd fithub-mern


Set up the Backend:

cd backend
npm install


Create a file named .env in the backend folder and add your MongoDB connection string:
MONGO_URI=your_mongodb_atlas_connection_string

Set up the Frontend:

cd ../frontend
npm install


Running the Application

You will need two terminals open to run the full application.

Run the Backend Server: (in a terminal pointed at the backend folder)

npm run dev


Your backend will start on http://localhost:5000.

Run the Frontend App: (in a second terminal pointed at the frontend folder)

npm start


Your application will open in your browser at http://localhost:3000.

"HUSTLE FOR THAT MUSCLE."
