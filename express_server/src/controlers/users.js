const db = require('../db/database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: (req, res) => {
    ///////check valid/////
    const users = { username, email, password } = req.body

    const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if(username==undefined||password==undefined ||users.username.includes("'")||users.username.includes("\""))
   {
    return res.status(409).json({
      msg: 'invalid name'
    });
   }
    if (!regex_email.test(users.email))
      return res.status(409).json({
        msg: 'invalid emai'
      });

    if (users.password.length < 8)
      return res.status(409).json({
        msg: 'The password msust to be less 8 digits'
      });
    if (users.username.length < 3)
      return res.status(409).json({
        msg: 'The useranme must tobe lest 3 characters'
      });
    db.all(
      `SELECT * FROM user WHERE "` + users.email + `" =email;`, (err, result) => {
        if (result.length) {
          return res.status(409).json({
            msg: 'This email is already in use!'
          });
        } else {
          // username is available
          bcrypt.hash(users.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                msg: err
              });
            } else {
              // has hashed pw => add to database
              db.all(
                `INSERT INTO user (username, email, password) VALUES ("` + users.username + '","' + users.email + '","' + hash + '");',
                (err, result) => {
                  if (err) {
                    return res.status(400).json({
                      msg: err
                    });
                  }
                  return res.status(200).json({
                    msg: 'The user has been registerd with us!'
                  });
                }
              );
            }
          });
        }
      }
    );
  },

  login: (req, res) => {
    const { username, password } = req.body

    if(username.includes("'")||username.includes("\"")||username==undefined||password==undefined)
    {
     return res.status(409).json({
       msg: 'invalid name'
     });
    }
    db.all(
      `SELECT * FROM user WHERE "` + username + `" =username;`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).json({
            msg: err
          });
        }
        if (!result.length) {
          return res.status(401).json({
            msg: 'username or password is incorrect!'
          });
        }
        // check password
        bcrypt.compare(
          password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).json({
                msg: 'username or password is incorrect!'
              });
            }
            if (bResult) {
              const token = jwt.sign({ id: result[0].id }, 'the-super-strong-secrect', { expiresIn: '1h' });
              const expirationDate = new Date();
              expirationDate.setHours(expirationDate.getHours() + 1);
              return res.status(200).json({
                msg: 'Logged in!',
                token,
                expires: expirationDate,
                user: result[0]
              });
            }
            return res.status(401).json({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
  }


}
