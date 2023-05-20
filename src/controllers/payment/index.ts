import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(+amount * 100),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.json(paymentIntent);
};
