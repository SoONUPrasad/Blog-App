const { verifyToken } = require("../utils/authentication");

const checkUser = (req, res, next) => {
    const tokenId  = req.cookies?.token;
    // console.log("token:" + tokenId);
    try {
        const user = verifyToken(tokenId);
        if (!user) {
            return res.status(401).redirect("/login");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).redirect("/login");
    }
}

module.exports = { checkUser }