var express = require('express');
var router = express.Router();
// execute command line
const execSync = require('child_process').execSync;
// file upload
const multer = require('multer');
// load model
const User = require('../schemas/user-schema');

// setting multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({storage: storage});

/* Get users. */
router.get('/',(req,res,next)=>{
  //response all user.
})

/* POST user info. */
router.post('/',upload.single('image'),function(req, res, next){
  //console.log(req.file);
  let file = req.file;
  if(!file){
    return res.send("file undefined");
  }

  let name = req.body['name'];
  let email = req.body['e-mail'];
  let image_path = file.filename;
  let bef_image_path;
  User.findOne({email: email},(err,findUser)=>{
    if(err){
      console.error(err);
      res.send(err);
    }
    else if(!findUser){ //emailが見つからなかったら
      //save user in mongoDB
      let newUser = new User({
        name: name,
        email: email,
        image_path: image_path
      })
      newUser.save((err)=>{
        if(err){
          return res.send(err);
        }
        else{
          console.log('saved user.');
          return res.redirect("success.html");
        }
      });
    }
    else{ //emailが既に登録されていたら
      bef_image_path = findUser.image_path;
      //update the user in DB
      User.update({email: email},
        {$set: {
            image_path: image_path
        }},(err,raw)=>{
          if(err){
            return res.send(err);
          }
          else{
            const result =  execSync('ls ' + __dirname +'/../public/images').toString();
            console.log(result);
            return res.redirect("success.html");
          }
        });
    }
  })
  
});

module.exports = router;