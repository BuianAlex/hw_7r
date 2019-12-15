const path = require('path');
const fs = require('fs').promises;
const User = require('./user');
const file = path.join(__dirname, '../data', 'comments');

class Comments {
  constructor() {
    this.pushComment = this.pushComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.putComment = this.putComment.bind(this);
  }

  async readDb() {
    // TODO: ref to readstream
    try {
      const dataDB = await fs.readFile(file);
      return JSON.parse(dataDB);
    } catch (error) {
      console.error('readDb--' + error);
    }
    return false;
  }

  async getAllComments() {
    let errors = [];
    let result = [];
    try {
      const dataJson = await fs.readFile(file);

      if (dataJson.length === 0) {
        return { data: [], error: [] };
      }
      const dataDB = JSON.parse(dataJson);
      let addAutor = dataDB.map(async item => {
        const { id, text, ctime, utime, parent } = item;
        let newObj = { id, text, ctime, utime, parent };
        let { id: autorID, login, photo } = await new User().dbQueryFindUser({
          id: item.autorID
        });
        newObj.autor = { autorID, login, photo };
        newObj.children = [];
        return newObj;
      });
      let sendData = await Promise.all(addAutor);
      const rootComments = sendData.filter(chItem => {
        return chItem.parent === 0;
      });
      // rootComments.reverse((a, b) => {
      //   console.log(a.utime + ' ' + b.utime);

      //   return a.utime - b.utime;
      // });

      function findChildren(arr) {
        let res = arr.map(item => {
          let chh = sendData.filter(chItem => {
            return chItem.parent === item.id;
          });
          if (chh === undefined) {
            item.children = [];
            return item;
          }
          item.children = findChildren(chh);
          return item;
        });
        return res;
      }
      const finalData = findChildren(rootComments);
      result = finalData;
    } catch (error) {
      console.error('getComment--' + error);
      // errors.push("Server side ERROR")
    }
    return JSON.stringify({ result: result, errors: errors });
  }

  async pushComment(dataObj) {
    // TODO: clean data
    let errors = [];
    let result = [];
    const genID = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();
    dataObj.parent = dataObj.id;
    dataObj.id = genID;

    dataObj.ctime = Date.now();
    dataObj.utime = dataObj.ctime;
    let newData = [];

    const oldData = await this.readDb();
    if (oldData) {
      newData = [...oldData];
      newData.push(dataObj);
    } else {
      newData.push(dataObj);
    }
    // // const oldData = await fs.readFile(file);
    // if (oldData.length > 0) {
    // } else {
    try {
      await fs.writeFile(file, JSON.stringify(newData));
      return { errors: [], result: newData };
    } catch (error) {
      console.error('pushComment--' + error);
    }
  }

  async deleteComment(req, res) {
    let errors = [];
    let result = [];
    const dataDB = await this.readDb();
    if (dataDB) {
      const newData = dataDB.filter(item => item.id !== req.body.id);
      try {
        await fs.writeFile(file, JSON.stringify(newData));
        result = newData;
      } catch (error) {
        console.error('pushComment--' + error);
      }
    }
    res.send(JSON.stringify({ result: result, errors: errors }));
  }

  async putComment(req, res) {
    // TODO: clean data
    let errors = [];
    let result = [];
    const dataDB = await this.readDb();
    if (dataDB) {
      const commentIndex = dataDB.findIndex(item => item.id == req.body.id);
      dataDB[commentIndex].text = req.body.text;
      dataDB[commentIndex].utime = Date.now();
      try {
        await fs.writeFile(file, JSON.stringify(dataDB));
        result = true;
      } catch (error) {
        console.error('putComment--' + error);
      }
    }
    res.send(JSON.stringify({ result: result, errors: errors }));
  }

  async deleteComment(req, res) {
    let errors = [];
    let result = [];
    const dataDB = await this.readDb();
    if (dataDB) {
      const newData = dataDB.filter(item => item.id !== req.body.id);
      try {
        await fs.writeFile(file, JSON.stringify(newData));
        result = newData;
      } catch (error) {
        console.error('pushComment--' + error);
      }
    }
    res.send(JSON.stringify({ result: result, errors: errors }));
  }
}

module.exports = Comments;
