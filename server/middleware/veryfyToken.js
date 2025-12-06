import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      authenticated: false,
      message: "no token found",
    });
  }
  const decoded = jwt.verify(token,'hello-this-is')
  req.user = decoded
  next()
  
};
export default verifyToken;
