const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' }); // Load from .env.local if available, or .env

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Import handlers
const submitHandler = require('./api/submit');
const createPaymentIntentHandler = require('./api/create-payment-intent');

// Wrap Vercel serverless functions for Express
const adapt = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Routes
app.post('/api/submit', adapt(submitHandler));
app.post('/api/create-payment-intent', adapt(createPaymentIntentHandler));
// Also support GET for submit as per original code
app.get('/api/submit', adapt(submitHandler));

app.listen(port, () => {
    console.log(`Backend local corriendo en http://localhost:${port}`);
});
