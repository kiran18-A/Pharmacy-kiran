const mongoose = require("mongoose");
const { kMaxLength } = require("buffer");
const { type } = require("os");
const jobSchema = new mongoose.Schema({
    name_of_post:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile_number:{
        type: Number
    },
    location:{
        type: String,
        required: true
    },
    qulification:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});
const job= mongoose.model("job", jobSchema);
module.exports = job;