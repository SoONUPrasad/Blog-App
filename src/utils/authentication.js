const JWT = require("jsonwebtoken");
const secretKey = "secretKey";

function createToken(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = JWT.sign(payload, secretKey, {
        expiresIn: "1d"
    })
    return token;
}

function verifyToken(token) {
    const decoded = JWT.verify(token, secretKey);
    return decoded;
}

module.exports = { createToken, verifyToken };
