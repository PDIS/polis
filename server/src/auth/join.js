const request = require('request');
const Config = require('../config');
const pg = require('../db/pg-query');
const Log = require('../log');
const Session = require('../session');
const Cookies = require('../utils/cookies');

function signIn(req, res) {
  let url = Config.get('JOIN_SERVER');
  let apiKey = Config.get('JOIN_API_KEY');
  requireToken(req, res, url, apiKey)
    .then(token => {
      return getUserInfo(req, res, url, apiKey, token)
    })
    .then(user => {
      return isUserExist(user);
    })
    .then(result => {
      if (result.existed) {
        login(req, res, result.user, result.uid);
      } else {
        create(req, res, result.user);
      }
    })
    .catch(error => {
      res.send(`Error when signing in with Join: ${error}`);
      console.log(`Error when signing in with Join: ${error}`);
    });
}

function requireToken(req, res, url, apiKey) {
  return new Promise((resolve, reject) => {
    if ('code' in req.query && !!req.query.code) {
      let code = req.query.code;
      if (!url) {
        console.log('Error: JOIN_SERVER is not set.');
        return null;
      }
      if (!apiKey) {
        console.log('Error: JOIN_API_KEY is not set.');
        return null;
      }
      request({
          url: `${url}/portal/api/user/token?code=${code}`,
          headers: {
            'x-api-key': apiKey
          }
        },
        (error, response, body) => {
          if (!error && response.statusCode === 200) {
            let data = JSON.parse(body);
            let token = data.result.accessToken;
            resolve(token);
          } else {
            console.log('Join get token error: ' + response.statusCode);
            console.log(error);
            reject(error);
          }
        });
    } else {
      console.log('Error: No code in join signin request.');
      reject('No code in request.');
    }
  });
}

function getUserInfo(req, res, url, apiKey, token) {
  return new Promise((resolve, reject) => {
    request({
        url: `${url}/portal/api/user/info`,
        headers: {
          'x-api-key': apiKey,
          'Authorization': `Bearer ${token}`
        }
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          let user = {
            uid: data.result.userUid,
            nickname: data.result.name,
            isValid: data.result.isValid,
            picture: data.result.picture
          };
          if (!user.uid) {
            reject(`Lacking uid: ${body}`);
          } else if (!user.nickname) {
            reject(`Lacking nickname: ${body}`);
          } else {
            resolve(user);
          }
        } else {
          console.log('Get user info error: ' + response.statusCode);
          console.log(error);
          reject(`Error ${response.statusCode}\n${token}`);
        }
      }
    );
  });
}

function isUserExist(user) {
  return new Promise((resolve, reject) => {
    pg.queryP('SELECT uid FROM join_users WHERE join_user_id=$1', [user.uid])
      .then(rows => {
        resolve({
          existed: rows.length > 0,
          uid: rows[0] ? rows[0].uid : null,
          user: user
        });
      })
      .catch(err => reject(`Error when checking existence: ${err}`));
  });
}

function login(req, res, user, uid) {
  Session.startSession(uid, (err, token) => {
    if (err) {
      Log.fail(res, 500, "polis_err_reg_failed_to_start_session", err);
      return;
    }
    Cookies.addCookies(req, res, token, uid).then(() => {
      res.writeHeader(200, {"Content-Type": "text/html",});
      res.write('<html><head><meta charset="utf-8"/></head></head><body><script>if (window.name === "signin") ' +
        '{alert("已登入，請關閉此視窗並重新整理原本視窗。");window.close();} ' +
        'else ' +
        '{window.location.href="/";}' +
        '</script></body></html>');
      res.end();
    });
  });
}

function create(req, res, user) {
  pg.queryP("INSERT INTO users " +
    "(hname, site_id, is_owner) VALUES ($1, $2, $3)" +
    "returning uid;",
    [user.nickname, `JOIN_${user.uid}`, true])
    .then(rows => {
      let uid = rows[0].uid;
      return pg.queryP("INSERT INTO join_users" +
        "(uid, join_user_id, nickname, picture, valid) VALUES ($1, $2, $3, $4, $5)" +
        "RETURNING uid;",
        [uid, user.uid, user.nickname, user.picture, user.isValid])
    })
    .then(rows => {
      let uid = rows[0].uid;
      login(req, res, user, uid);
    })
    .catch(err => {
      console.log('Error when creating join user');
      console.log(err);
      res.send(`Error: ${err}`);
    });
}

module.exports = {
  signIn
};
