var express = require('express');
var router = express.Router();
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
      return res.send("success");
    }
  });
  
});

module.exports = router;
