const mongoose = require("mongoose");

const marketSnapshotSchema = new mongoose.Schema({
    date : { type: Date, default: Date.now, unique: true},

coins:{
    bitcoins: Number,
    ethereum: Number,
    dogecoin: Number,
    solana: Number,
    cardano : Number,
    ripple: Number,
    bnb: Number
},

indices:{
    nasdaq:Number,
    change:Number,
    percent:Number,
    high:Number,
    low:Number 
}
});

module.exports = mongoose.model("MarketSnapshot", marketSnapshotSchema);