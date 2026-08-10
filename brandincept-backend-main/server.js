import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes.js';
import { sendNotificationEmail } from './controllers/mailController.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
app.use(cors({
    origin: [   
        'http://localhost:5173',
        'https://brandincept-frontend.vercel.app',  
        'https://brandincept.vercel.app',
        'https://brandincept.com',
        'https://www.brandincept.com'
    ],
    credentials: true,
}));
app.use(express.json());
app.use(express.static('public'));

// Disable caching for API responses
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Brand Incept API is running (No DB)');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
