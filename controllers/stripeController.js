const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const totalOrderAmount = () => {
    console.log(total_amount);
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalOrderAmount(),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = stripeController;
