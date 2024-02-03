const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { createToken } = require("../utils/authentication");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    }
})

// !Salt and Hashing User Password
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString();
    const hashPass = createHmac("sha256", salt).update(user.password).digest("hex");

    user.salt = salt;
    user.password = hashPass;

    next();
})

userSchema.static("matchUser", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw Error("Incorrect Email");
    const UserProvidedHashPass = createHmac("sha256", user.salt).update(password).digest("hex");
    if (UserProvidedHashPass !== user.password) throw Error("Incorrect Password");
    // return user
    const token = createToken(user);
    return token
})

const User = mongoose.model("User", userSchema);

module.exports = User;