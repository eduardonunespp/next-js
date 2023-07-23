// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const priceId = "price_1NUrJiCLa4esDAgQyk4oW4al";

  const successUrl = `${process.env.NEXT_URL}/success`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return res.status(201).json({ 
    checkoutUrl: checkoutSession.url
  })
};

export default handler;
