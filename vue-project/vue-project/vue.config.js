const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('');

module.exports = {
  devServer: {
    before: function(app) {
      app.use(bodyParser.json());

      app.post('/api/create-payment-intent', async (req, res) => {
        try {
          const { amount, currency } = req.body;
          const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
          });
          res.json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });

      app.post('/api/submit-additional-details', async (req, res) => {
        try {
          const { paymentIntentId, businessName, businessAddress, abnAcn, tier, subscriptionLength } = req.body;
          
          // Here you would typically store this information in your database
          // For this example, we'll just log it
          console.log('Additional details received:', {
            paymentIntentId,
            businessName,
            businessAddress,
            abnAcn,
            tier,
            subscriptionLength
          });

          // You might want to update the PaymentIntent with the additional details
          await stripe.paymentIntents.update(paymentIntentId, {
            metadata: {
              businessName,
              businessAddress,
              abnAcn,
              tier,
              subscriptionLength
            }
          });

          res.json({ success: true });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
    }
  },
  transpileDependencies: true
};
