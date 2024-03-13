const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let users;

fs.readFile(path.resolve(__dirname, './data/users.json'), function(err, data) {
  console.log('reading file ... ');
  if(err) throw err;
  users = JSON.parse(data);
})

const addMsgToRequest = function (req, res, next) {
  if(users) {
    req.users = users;
    next();
  }
  else {
    return res.json({
        error: {message: 'users not found', status: 404}
    });
  }
}

router.use('/usernames', addMsgToRequest);

router.get('/usernames', (req, res) => {
  let usernames = req.users.map(function(user) {
    return {id: user.id, username: user.username};
  });
  res.send(usernames);
});

router.use('/username/:name', addMsgToRequest);
router.get('/username/:name', (req, res) => {
  let usernames = req.users.filter((user) => {return user.username === req.params.name});
  if (!usernames[0]){
      return res.status(404).json({error:{message:'User not Found', status:404}});
  }
  res.send(usernames);
});

module.exports = router;
