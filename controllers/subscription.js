const Subscription = require("../models/subscription");

//create subscription plans
exports.createSubscription = (req,res) => {
    const subscription = new Subscription(req.body);
  subscription.save((err, subscription) => {
    if (err) {
      return res.status(400).json({
        error: `Couldn't save ${subscription} in the DB`,
      });
    }
    res.json({ subscription });
  });
}

//param extractor
exports.getSubscriptionById = (req,res, next, id) => {
    Subscription.findById(id).exec((err, subscription) => {
        if (err) {
          return res.status(400).json({
            error: "Such subscription is not found in the DB",
          });
        }
        req.subscription = subscription;
        next();
      });
}

//details about a subscription plan
exports.getSubscription = (req,res) => {
  return res.json(req.subscription);
}

//details about all subscription plans in the DB.
exports.getAllSubscription = (req,res) => {
  Subscription.find().exec((err, subscriptions) => {
    if (err) {
      return res.status(400).json({
        error: " No Subscription found in the DB",
      });
    }
    res.json(subscriptions);
  });
}
//Update Subscription data
exports.updateSubscription = (req,res) => {
  const subscription = req.subscription;
  
  subscription.name = req.body.name;
  subscription.price = req.body.price;
  subscription.duration = req.body.duration;

  subscription.save((err, updatedSubscription) => {
    if (err) {
      return res.status(400).json({
        error: " Couldn't update Subscription in the DB",
      });
    }
    res.json(updatedSubscription);
  });
}

// Delete a subscription plan
exports.removeSubscription = (req,res) => {
  const subscription = req.subscription;

  subscription.remove((err, subscription) => {
    if (err) {
      return res.status(400).json({
        error: ` Couldn't remove ${subscription} from the DB`,
      });
    }
    res.json({
      message: `Successfully deleted ${subscription} from the databases`,
    });
  });
}