const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const influencerSchema = new Schema({
    name: String,
    email: String,
    desc: String,
    audience: String,
    platforms:[String],
    Field: String
  
});


module.exports = mongoose.model("Influencer", influencerSchema);
