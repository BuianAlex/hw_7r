const path = require('path');
//const fs = require('fs');
const fs = require('fs').promises;
const JSONStream = require('JSONStream');
const file = path.join(__dirname, '../data', 'users');

class Users {
  constructor() {
    this.login = this.login.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  //API Login response { result: Object, errors: Array }
  async addUser(req, res, next) {
    let errors = [];
    let result = {};
    if (req.body['login'] && req.body['password']) {
      const { login, password, email, phone } = req.body;
      const ifUserIs = await this.dbQueryFindUser({ login });
      if (!ifUserIs) {
        const id = (
          Date.now().toString(36) +
          Math.random()
            .toString(36)
            .substr(2, 5)
        ).toUpperCase();
        const photo = 'noavatar92.png';
        try {
          let newData = [];
          const oldData = await this.readDb();
          if (oldData) {
            newData = [...oldData];
            newData.push({ id, login, password, email, phone, photo });
          } else {
            newData.push({ id, login, password, email, phone, photo });
          }
          await fs.writeFile(file, JSON.stringify(newData));
          result = { id, login, email, phone, photo };
        } catch (error) {
          console.error('addUser--' + error);
          errors.push('server ERROR');
        }
      } else {
        errors.push('This login is already used');
      }
    } else {
      errors.push('incorrect data');
    }
    res.send(JSON.stringify({ result: result, errors: errors }));
  }

  async addUserOld(dataObj) {
    if (dataObj['login'] && req.body['password'])
      dataObj.id = (
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2, 5)
      ).toUpperCase();
    dataObj.photo = 'noavatar92.png';
    let oldData;
    let newData = [];
    try {
      oldData = await fs.readFile(file);
      if (oldData.toString().length > 0) {
        newData = [...JSON.parse(oldData)];
        newData.push(dataObj);
      } else {
        newData.push(dataObj);
      }
      await fs.writeFile(file, JSON.stringify(newData));
      return true;
    } catch (err) {
      return { status: false, errors: ['db error'] };
    }
  }

  async readDb() {
    try {
      const dataDB = await fs.readFile(file);
      return JSON.parse(dataDB);
    } catch (error) {
      console.error('readDb--' + error);
    }
    return false;
  }
  // if OK user data Object of ERROr false
  async dbQueryFindUser(query) {
    const dataDB = await this.readDb();
    if (dataDB) {
      let testRes = false;
      let res = dataDB.find(item => {
        testRes = Object.keys(query).find(key => {
          return query[key] !== item[key];
        });
        if (!testRes) {
          return true;
        }
      });
      if (res) {
        return res;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //API Login response { result: Object, errors: Array }
  async login(req, res, next) {
    let errors = [];
    let result = {};
    if (req.body['login'] && req.body['password']) {
      const findRes = await this.dbQueryFindUser(req.body);
      const { id, login, photo } = findRes;
      if (findRes) {
        result = { id, login, photo };
      } else {
        errors.push('Login or password does not match');
      }
    } else {
      errors.push('Login or password does not match');
    }

    res.send(JSON.stringify({ result: result, errors: errors }));

    //console.log(this);

    //console.log(findRes);

    //console.log(req.body);
    // const query = req.body;
    // let dataDB;
    // let dataArr = [];
    // try {
    //   dataDB = await fs.readFile(file);
    //   if (dataDB.toString().length > 0) {
    //     dataArr = [...JSON.parse(dataDB)];
    //     let resQuery = dataArr.find(item => {
    //       tesRes = Object.keys(query).find(key => {
    //         return query[key] !== item[key];
    //       });
    //       if (!tesRes) {
    //         return true;
    //       }
    //     });
    //     if (resQuery) {
    //       const { login, email, phone, id, photo } = resQuery;
    //       result = { login, email, phone, id, photo };
    //     } else {
    //       errors.push('Login or password does not match');
    //     }
    //   }
    //res.send(JSON.stringify({ result: result, errors: errors }));
    //res.send('sdsd');
    // } catch (err) {
    //   console.error('findUser ' + err);
    // }
  }
}

module.exports = Users;

// const test = new Users();
// async function testdd() {
//   // const res = await test.addUser({
//   //   name: 'Kevin',
//   //   suname: 'Mitnick',
//   //   password: '12345',
//   //   photo: 'Kevin-Mitnick.jpg'
//   // });
//   //const param = { login: 'Alex', password: '12345q' };
//   const res = await test.dbQueryFindUser({
//     id: 'K42Q1AVJFMIX5'
//   });
//   console.log(res);
// }
//testdd();
