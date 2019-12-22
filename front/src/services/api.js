import axios from 'axios';
import {setLocalUser} from  './localStorage'

async function getComments() {
  let res = {};
  try {
    const servRes = await axios.get('api/comments');
    if (servRes.status === 200) {
      if (servRes.data.result && servRes.data.result.length > 0) {
        res.result = servRes.data.result;
      } else {
        res.error = 'No comments yet';
      }
    }
  } catch (error) {
    if (error) {
      res.error = 'Server does not respond.';
    }
  }
  return res;
}

async function postComments(data) {
  let res = {};
  try {
    const servRes = await axios.post('/api/comments ', data);
    if (servRes.status === 200) {
      if (servRes.data.result && servRes.data.result.length > 0) {
        res.result = servRes.data.result;
      } else {
        res.error = 'No comments yet';
      }
    }
  } catch (error) {
    if (error) {
      res.error = 'Server does not respond.';
    }
  }
  return res;
}
//  TODO: putComment
async function putComment(data) {
  let res = {};
  try {
    const servRes = await axios.put('/api/comments', data);
    if (servRes.status === 200) {
      if (servRes.data.result && servRes.data.result.length > 0) {
        res.result = servRes.data.result;
      } else {
        res.error = 'No comments yet';
      }
    }
  } catch (error) {
    if (error) {
      res.error = 'Server does not respond.';
    }
  }
  return res;
}

async function deleteComment(commentID) {
  let res = {};
  try {
    const servRes = await axios.delete('/api/comments', {
      data: { id: commentID }
    });
    if (servRes.status === 200) {
      if (servRes.data.result) {
        res.result = servRes.data.result;
      } else {
        res.error = 'No comments yet';
      }
    }
  } catch (error) {
    if (error) {
      res.error = 'Server does not respond.';
    }
  }
  return res;
}

async function userRegister(data) {
  try {
    const res = await axios.post('/api/users', data);
    return res.data;
  } catch (err) {}
}

async function userLogIn(data) {
  try {
    const res = await axios.post('/api/login', data);
    if (res.status === 200) {
      if (res.data.errors.length === 0) {
        setLocalUser(res.data.result);
      }
      return res.data;
    } else {
      let message = {};
      message.errors = ['Server does not respond.'];
      return message;
    }
  } catch (err) {
    console.error(err);
    
    let message = {};
    message.errors = ['Server does not respond.'];
    return message;
  }
}

export {
  getComments,
  postComments,
  userRegister,
  userLogIn,
  deleteComment,
  putComment
};
