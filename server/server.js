const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Comments = require('./controllers/comment');
const User = require('./controllers/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8080;

const commentsCtrl = new Comments();

app.post('/api/users', new User().addUser);

app.post('/api/login', new User().login);

app.post('/api/logout', function(req, res) {
  // TODO:
  res.send('goodbye');
});

app.delete('/api/comments', new Comments().deleteComment);
app.put('/api/comments', new Comments().putComment);

app.get('/api/comments', async function(req, res) {
  // TODO:
  const data = await commentsCtrl.getAllComments();
  return res.send(data);
});

app.post('/api/comments', async function(req, res) {
  // TODO:
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
