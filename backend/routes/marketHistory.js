const express = require("express");
const router = express.Router();
const MarketSnapshot = require("../models/MarketSnapshots");

router.get("/", async (req,res) => {
    try {
        const snapshots = await MarketSnapshot.find()
        .sort({date : 1}) 
        .limit(7);

        res.json(snapshots);
    } catch (error) {
        console.error("Market history fetch error:", error.message);
        res.status(500).json({error: "Failed to fetch market history"});
    }
});

module.exports = router;