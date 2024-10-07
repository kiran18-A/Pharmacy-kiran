const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const adrSchema = new mongoose.Schema({
    name:{
        type: String
    },
    type:{
        type: String
    },
    name_of_m:{
        type: String
    },
    recation:{
        type: String
    },
    note:{
        type: String
    },
    password:{
        type: String
    }
});
const adr= mongoose.model("adr", adrSchema);
module.exports = adr;