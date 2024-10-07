const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const applySchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    mobile:{
        type: Number
    },
    eduction:{
        type: String
    },
    post:{
        type: String
    },
    email_of_r:{
        type: String
    }
});
const apply= mongoose.model("apply", applySchema);
module.exports = apply;