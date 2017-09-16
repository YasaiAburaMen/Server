var express = require('express');
var router = express.Router();
// load model
const User = require('../schemas/user-schema');

/* Get users listing. */
router.get('/',(req,res,next)=>{
  //response all user.
})

/* POST users listing. */
router.post('/', function(req, res, next){
  console.log(req.body);
  let query = JSON.parse(JSON.stringify(req.body));
  let name = query['name'];
  let email = query['e-mail'];
  let image_path = "dummy"; //後で画像アップロードに対応します。

  
  //save user in mongoDB
  let newUser = new User({
    name: name,
    email: email,
    image_path: image_path
  })
  newUser.save((err)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send("success");
      console.log('saved user.');
    }
  });
});

module.exports = router;
