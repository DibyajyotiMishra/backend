//Added By ThyDreams Studio.
//Author : Dibyajyoti Mishra 
//c/o: ThyDreams Studio.


const Razorpay = require("razorpay");


const razorpay = new Razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET,
  });

  
  exports.pay = async (req,res) => {
    const amount = req.subscription.price * 100;
  
    const payment_capture = 1;
    const currency = "INR";
  
    const options = {
      amount: amount,
      currency,
      receipt: req.subscription._id.toString(),
      payment_capture,
    };
    try {
      const response = await razorpay.orders.create(options, (err, order) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Some Error has occurred. Are you online?" });
        }
  
        return res.status(200).json({
          id: order.id,
          amount: order.amount,
          currency: order.currency,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
