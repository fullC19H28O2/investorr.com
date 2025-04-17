const express = require("express");
const axios = require("axios");
const router = express.Router();
const MarketSnapshot = require("../models/MarketSnapshots")
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const coinUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,cardano,ripple,binancecoin&vs_currencies=usd";
    const finnhubKey = process.env.FINNHUB_API_KEY;
    
    const [coinData,nasdaqData] = await Promise.all([
      axios.get(coinUrl),
      axios.get(`https://finnhub.io/api/v1/quote?symbol=QQQ&token=${finnhubKey}`)
    ]);
    const newSnapshot = new MarketSnapshot({
      coins: {
        bitcoin: coinData.data.bitcoin.usd,
        ethereum: coinData.data.ethereum.usd,
        dogecoin: coinData.data.dogecoin.usd,
        solana: coinData.data.solana.usd,
        cardano: coinData.data.cardano.usd,
        ripple: coinData.data.ripple.usd,
        bnb: coinData.data.binancecoin.usd
      },
      indices: {
        nasdaq: nasdaqData.data.c,
        change: nasdaqData.data.d,
        percent: nasdaqData.data.dp,
        high : nasdaqData.data.h,
        low: nasdaqData.data.l
      }
    });

    await newSnapshot.save();
    res.json({
      coins: {
        bitcoin: coinData.data.bitcoin.usd,
        ethereum: coinData.data.ethereum.usd,
        dogecoin: coinData.data.dogecoin.usd,
        solana: coinData.data.solana.usd,
        cardano: coinData.data.cardano.usd,
        ripple: coinData.data.ripple.usd,
        bnb: coinData.data.binancecoin.usd
      },
      indices: {
        nasdaq: nasdaqData.data.c,
        change: nasdaqData.data.d,
        percent: nasdaqData.data.dp,
        high : nasdaqData.data.h,
        low: nasdaqData.data.l
      }
    });

  } catch (error) {
    console.error("Market data error:", error.message);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});
module.exports = router;