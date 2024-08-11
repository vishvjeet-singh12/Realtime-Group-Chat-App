require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt');
const { MongoClient, ObjectId } = require('mongodb'); // include mongodb library 
const url = process.env.MONGODB_URI; // Connection URL
const client = new MongoClient(url);
const jwt = require('jsonwebtoken');
const multer = require('multer')
const fs = require('fs')
const app = express()

var cookieParser = require('cookie-parser');
// --------------------------------------------------------
app.use(cors())//cross origin resource sharing
app.use(express.json())
app.use(cookieParser());// use for cookie
client.connect(); // Use connect method to connect to the server
// ------------------------------------------------------------------------------
const db = client.db('adminpanel');// database Name
collection = db.collection('user'); // users table name
imgcollection = db.collection('userImg');// usersDoc table name
chatcollection = db.collection('chat');// usersDoc table name
// ---------------------------------------------------------------------------------
var storage = multer.diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {

    cb(null, Date.now() + ".." + file.originalname);
  }
});// for file upload destination path and name of file
var upload = multer({ storage });
//-----------------------------------------------------------------

//------------------------------------------ user verify isLogin or not by middleware------------------------------------------

const Authenticate = async (req, res, next) => {
  console.log(req.cookies.ankush)

  try {
    token = req.cookies.ankush
    const compair = await jwt.verify(token, process.env.SECRETKEY);
    const email = compair.email
    collection.findOne({
      email: req.body.email

    },
      function (err, result) {
        console.log("login Success", result)
        if (err) throw err;
        next();
      });
  }
  catch (err) {
    res.status(400).json('please lOGIN')
  }
}
//--------------------------------------------------------------------------------
app.post('/upload', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  imgcollection.insertOne({
    "doc": req.file.path,
    "des": req.body.des
  },
    function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });

  // req.body will hold the text fields, if there were any
})

// login Process
app.post('/login', function (req, res) {
  if (req.body.email != '') {
    console.log(req.body)
    console.log(req.body.email)
    collection.findOne({
      email: req.body.email
    },
      async function (err, result) {
        console.log("login Success")
        if (err) throw err;
        let password = req.body.password

        let isLogin = await bcrypt.compare(password, result.password)// for compair hash password
        if (isLogin) {
          token = await generateAuthToken(result)
          res.cookie('ankush', token);// set cookie where cookie name is ankush
          res.status(200).json({ "messege": "loginSuccess", "email": result.email });
        }
        else {
          res.status(500).json({ "messege": "USER IS NOT FOUND" })
        }
      });
  }
  else {
    res.status(500).json({ "messege": "USER IS NOT FOUND" })
  }
})
// generate  Token Function
const generateAuthToken = (user) => {
  try {

    let token = jwt.sign({ 'email': user.email }, process.env.SECRETKEY, { expiresIn: '5000s' })
    return token
  }
  catch (error) {
    console.log(error);
  }
}
// user Registration 
app.post('/register', async function (req, res) {
  console.log("hey")
  let password = req.body.password
  const hashpassword = await bcrypt.hash(password, 10)// hash the password and save  into a database
  if (req.body.email != "" || req.body.password != "") {
    collection.insertOne({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashpassword,
      cnfpassword: hashpassword,
    },
      function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  }
  else {
    res.status(400).json("Pleaswe Fill All the Fields")
  }
})

// Logout process
app.get('/logout', (req, res) => {

  res.clearCookie('ankush');//clear a cookie
  res.status(200).json('logout success')
});
app.post('/userList', Authenticate, (req, res) => {
  collection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result);
  });
});

//userDocument Uploading Process
app.get('/userImg', Authenticate, (req, res) => {
  imgcollection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result);
  });
});
//delete user 
app.delete('/userDelete/:email', function (req, res) { // DELETE API, delete user
  console.log(req.params.email)
  collection.deleteOne({ email: req.params.email })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => console.error(error))
})
app.put('/edit', function (req, res) { // PUT API, update user
  console.log(req.body.Editemail)
  collection.findOneAndUpdate({ email: req.body.Editemail }, {
    $set: {
      name: req.body.name,
      email: req.body.emailData,

    }
  }, {
    upsert: true
  })
    .then(result => res.json(result))
    .catch(error => console.error(error))
})
app.post('/isLogin', async function (req, res) {
  console.log(req.cookies.ankush)
  try {
    token = req.cookies.ankush
    const compair = await jwt.verify(token, process.env.SECRETKEY);
    const email = compair.email
    collection.findOne({
      email: email

    },
      function (err, result) {
        console.log("login Success", result)
        if (err) throw err;
        res.status(200).json(result)
      });
  }
  catch (err) {
    res.status(400).json('please lOGIN')
  }
});
app.put('/editDoc', function (req, res) { // PUT API, update user
  console.log(req.body.id)
  console.log(req.body.editdes)
  imgcollection.findOneAndUpdate({ _id: new ObjectId(req.body.id) }, {
    $set: {

      des: req.body.editdes,

    }
  }, {
    upsert: true
  })
    .then(

      (result) => {
        res.status(200).json(result)
        console.log(result)
      })
    .catch(error => console.error(error))
})
app.delete('/deleteDoc', function (req, res) { // DELETE API, delete user
  console.log(req.body.id)
  imgcollection.findOneAndDelete(
    { _id: new ObjectId(req.body.id) }

  ).then(result => {
    console.log("hii")
    console.log(result)
    console.log(`./${result.value.doc}`)
    fs.unlink(`./${result.value.doc}`, (err) => {
      if (err) {
        console.error(err)
        return
      }

      //file removed
    })
    res.json(result);
  }).catch(error => console.error(error))
})

app.post('/Chat', function (req, res) { // POST API, add user
  try {
    console.log(req.body.msg)
    chatcollection.insertOne({
      time: req.body.time,
      name: req.body.name,
      msg: req.body.msg,
    },
      function (err, result) {
        if (err) throw err;
        console.log(result)
        res.json(result);
      });
  }
  catch (e) {
    console.log(e)
  }
});
app.get('/ChatList', Authenticate, (req, res) => {
  chatcollection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`listing the port at ${process.env.PORT}`);
})