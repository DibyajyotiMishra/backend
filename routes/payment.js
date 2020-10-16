//Added By ThyDreams Studio.
//Author : Dibyajyoti Mishra 
//c/o: ThyDreams Studio.

const express = require("express");
const router = express.Router();

const {
    pay
} = require("../controllers/payment");

const { getSubscriptionById } = require("../controllers/subscription");


//Params
router.params("subscriptionId", getSubscriptionById);

//Payment Route
router.post("/pay/:subscriptionId",pay);


module.exports = router;