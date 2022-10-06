const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  console.log("verifyJWT")
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  console.log('Authorize token :' + token);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("token not verified");
        return res.sendStatus(403);
      }; //invalid token
      req.user = decoded.UserInfo.username;
      console.log("Token Verified");
      next();
    }
  );
};

module.exports = verifyJWT;