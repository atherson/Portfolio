const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PayPal Client Setup
const paypalEnv = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const paypalClient = new paypal.core.PayPalHttpClient(paypalEnv);

// API to get exchange rates from Binance
app.get('/api/rates', async (req, res) => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exchange rates', details: error.message });
    }
});

// Payment Processing
app.post('/api/payment', async (req, res) => {
    const { method, amount, currency, token } = req.body;

    try {
        switch (method) {
            case 'credit':
                const charge = await stripe.charges.create({
                    amount: amount * 100,
                    currency,
                    source: token,
                    description: 'Payment for order',
                });
                res.json({ success: true, charge });
                break;

            case 'paypal':
                let request = new paypal.orders.OrdersCreateRequest();
                request.requestBody({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: { currency_code: currency, value: amount }
                    }]
                });

                const order = await paypalClient.execute(request);
                res.json({ success: true, orderId: order.result.id });
                break;

            case 'bitcoin':
                // Generate a Binance Pay order
                const binancePayUrl = `https://www.binance.com/en/binancepay?amount=${amount}&currency=${currency}&merchant_id=${process.env.BINANCE_MERCHANT_ID}`;
                res.json({ success: true, payment_url: binancePayUrl });
                break;

            default:
                res.status(400).json({ error: 'Invalid payment method' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Payment processing failed', details: error.message });
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
