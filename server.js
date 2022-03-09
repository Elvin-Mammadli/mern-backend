const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const UserModel = require('./Users');
require('dotenv').config();

app.use(express.json());

mongoose.connect("mongodb+srv://mernfirst:12345@backend-practice.z2wab.mongodb.net/mern-first?retryWrites=true&w=majority")

app.get('/', (req, res) => {
  console.log('"/" endpoint works')
})

app.get('/getUsers', (req, res) => {
  UserModel.find({}, (err, data) => {
    if(err) {
      res.json(err);
    } else {
      res.json(data);
    }
  })
})

app.post('/createUser', async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.put('/updateUser', (req, res) => {
  console.log(req.body)
  const id = req.body.id
  const newName = req.body.name;
  const newAge =   req.body.age;

  UserModel.findById(id, (err, user) => {
    if(err) {
      res.json(err)
    };
    user.name = newName;
    user.age = newAge;

    user.save();
  })
})

app.delete('/deleteUser', (req, res) => {
  const id = req.body.id;

  UserModel.findByIdAndRemove(id, (err, data) => {
    if(err) {
      res.json(err)
    } else {
     console.log('deleted')
    }
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server connected')
})