const mongoose = require('mongoose');
const User = require('./backend/models/User');
require('dotenv').config({ path: './backend/.env' });

const checkUser = async () => {
    try {
        console.log('Connecting to DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const email = 'krishnaspattel@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log('User FOUND:', user.email, user._id);
            console.log('This confirms why Register would fail with 400 (User already exists).');
        } else {
            console.log('User NOT found.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.connection.close();
    }
};

checkUser();
