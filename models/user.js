const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        require: true,
        default: "Normal"

    },
    password:{
        type: String,
        required: true,
    },
},
{timestamp: true}
);
const User = mongoose.model('user',userSchema);
module.exports = User;