const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

function userAuthMiddleware(req, res, next) {

  if (!req.headers.authorization) {
    return res.json({ error: true, message: 'SignIn' });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, jwt_secret);
    req.userInfo = data;
    next();
  } catch (error) {
    return res.json({ error: true, message: error.message });
  }
}

function adminAuthMiddleware(req, res, next) {
  try {
    // console.log("dfghjk")
    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      return res.json({ error: true, message: 'SignIn' });
    }
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, jwt_secret);
    req.adminInfo = data;
    // console.log(req.adminInfo);
    next();
  } catch (error) {
    return res.json({ error: true, message: error.message });
  }
}

function partnerAuthMiddleware(req, res, next) {
  try {
    // console.log("dfghjk")
    // console.log(req.headers.authorization)
    if (!req.headers.authorization) {
      return res.json({ error: true, message: 'SignIn' });
    }
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, jwt_secret);
    req.partnerInfo = data;
    // console.log(req.partnerInfo);
    next();
  } catch (error) {
    return res.json({ error: true, message: error.message });
  }
}

module.exports = { userAuthMiddleware, adminAuthMiddleware, partnerAuthMiddleware };