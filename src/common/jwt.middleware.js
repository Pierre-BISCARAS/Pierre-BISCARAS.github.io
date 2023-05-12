const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

 
verifyJWT = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;
      req.auth = {
           userId: userId,
      };
      if (decodedToken.admin){
         next();
      }
      else{
         res.status(403).json({ error: 'Unauthorized' });
      }
   } catch(error) {
       res.status(401).json({ error });
   }
};


module.exports = verifyJWT;