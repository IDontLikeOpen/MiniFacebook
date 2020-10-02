const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) => {
 // Get token from header
 const token = req.header('x-auth-token')

 // check if not token
 if (!token) {
  return res.status(401).json({ msg: 'No token, authorization denied' })
 }

 try {
  const decoded = jwt.verify( token, config.get('jwtSecret') )
  req.user = decoded.user // we pass this very request to the req in the next auth file?? --a- yes, and we append here
  next() // WHAT IS HAPPENING IN THESE TWO --a- you know now
 } catch (err) {
  res.status(401).json({ msg: 'Token is not valid' })
 }
}
