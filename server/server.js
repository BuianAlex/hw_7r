const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const Comments = require('./controllers/comment');
const User = require('./controllers/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;

const commentsCtrl = new Comments();

//app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/users', new User().addUser);

app.post('/api/login', new User().login);
// app.post('/api/login', function(req, res) {
//   res.send('sds');
// });
// app.post('/api/login', async function(req, res) {
//   console.log(req.body);
//   const { login, password } = req.body;
//   const loginRes = await userCtrl.findUser(login, password);

//   return res.send({ status: false, errors: ['sdsdsds'] });
// });
app.delete('/api/comments', new Comments().deleteComment);

app.get('/api/comments', async function(req, res) {
  const data = await commentsCtrl.getAllComments();
  return res.send(data);
});

app.post('/api/comments', async function(req, res) {
  const pusRes = await commentsCtrl.pushComment(req.body);
  if (pusRes) {
    const upData = await commentsCtrl.getAllComments();
    if (upData) {
      res.send(upData);
    } else {
      res.send('typeof' + upData);
    }
  } else {
    res.send('pusRes no');
  }
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server listening on port ${port}!`)
);
function newFunction() {
  return 'api/comments';
}
