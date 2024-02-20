var express = require("express");
var router = express.Router();

var database = require("../database");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", session: req.session });
});

router.post("/login", function (request, response, next) {
   try{
    var user_email_address = request.body.user_email_address;
    var user_password = request.body.user_password;
    console.log(`{
      ${user_email_address} ,
      ${user_password}
    }`);
    if (user_email_address && user_password) {
      query = `
      SELECT * FROM user_login
      WHERE email = '${user_email_address}' AND password = '${user_password}'
      `;
      database.query(query, function (error, data) {
        if (!data || data.length < 0) {
          response.status(401).send("Incorect Email Address");
        } else {
          console.log(data);
            if (data[0]?.password == user_password && data[0]?.email==user_email_address) {
              console.log("Data in the house");
              request.session.user_id = data.user_id;
              response.status(200).render("main")
            } else {
              response.status(401).send("Incorrect Password");
            }
        }
        response.end();
      });
    } else {
      response.send("Please Enter Email Address and Password Details");
      response.end();
    }
   }catch(error){
     res.json({
      "status" : "Failed",
      "message" : error.message
     })
   }
});

router.get("/logout", function (request, response, next) {
  request.session.destroy();

  response.redirect("/");
});

module.exports = router;
