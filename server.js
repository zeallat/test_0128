var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./rest.js");
var app  = express();

//객체 생성
function REST(){
    var self = this;
    self.connectMysql();
};

//DB 설정 및 연결
REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'testdb1.cow8tthhqbik.ap-northeast-1.rds.amazonaws.com',
        user     : 'test',
        password : 'rmfnrltnf123',
        database : 'test_db',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

//Express 프레임워크 설정
REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

//서버 시작 함수
REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

//서버 중지 함수
REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();