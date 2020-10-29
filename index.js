const express = require('express');
const cors = require('cors');

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({origin: true}))
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('hello'))

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    let paymentIntent;
    try{
        paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
        })
    }catch(err){
        console.log(err);
    }

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

app.listen(port, () => {
    console.log('server running')
})
