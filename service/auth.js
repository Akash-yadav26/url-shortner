const jwt = require("jsonwebtoken");
const secret = "piyush$123@s";
//
function setUser(user){
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,

  },
  secret
);
}

function getUser(token){
  if (!token) return null;
  try{
    return jwt.verify(token,secret);
  } catch(error){
    return null;
  }
}
// --> these  // marked function will make tokens
module.exports = {
    setUser,
    getUser,
};