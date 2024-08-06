  const jwt = require("jsonwebtoken");

  module.exports = async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      // console.log("id apv",token)

      const verify = await jwt.verify(token, process.env.JWT_SECRET);

      if(!verify){
        res.status(401).json({
          message: "Auth failed",
          success: false,
        });
      }
      
      const userId = verify.id;
      req.userId = userId;
      // console.log( req.userId,"userId",verify.id )

      next();
    } catch (error) {

      return res.status(401).json({
        message: "Auth failed",
        success: false,
      });
    }
  };
