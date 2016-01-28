var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })

    //유저 추가
    //HTTP 메소드 타입 선택
    //URI 선택
    router.post("/users", function(req, res){
      //작업 완료시 콜백되는 함수입니다.
      //쿼리문 작성
      var query = "INSERT INTO ??(??,??) VALUES (?,?)";
      var table = ["user_info","user_email","user_password",req.body.user_email,md5(req.body.user_password)];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows){
        if(err){
          //에러 발생시
          res.json({"Error" : true, "Message" : "Error during executing query - "+err});
        } else {
          //정상 처리시
          res.json({"Error" : false, "Message" : "Success"});
        }
      });
    });

    //유저 목록 조회
    router.get("/users", function(req, res){
      var query = "SELECT * FROM ??";
      var table = ["user_info"];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows){
        if(err){
          res.json({"Error" : true, "Message" : "Error during executing query - "+err});
        } else {
          res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        }
      });
    });

    //특정 유저 조회
    router.get("/users/:user_id", function(req, res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var table = ["user_info","user_id",req.params.user_id];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows){
        if(err){
          res.json({"Error" : true, "Message" : "Error during executing query - "+err});
        } else {
          res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        }
      });
    });

    //특정 유저 업데이트
    router.put("/users/:user_id", function(req, res){
      var query = "SELECT * FROM ?? WHERE ??=?";
      var query = "UPDATE ?? SET ??=? WHERE ??=?"
      var table = ["user_info","user_password",md5(req.body.user_password), "user_id", req.params.user_id];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows){
        if(err){
          res.json({"Error" : true, "Message" : "Error during executing query - "+err});
        } else {
          res.json({"Error" : false, "Message" : "Success"});
        }
      });
    });

    //특정 유저 삭제
    router.delete("/users/:user_id", function(req, res){
      var query = "DELETE FROM ?? WHERE ??=?";
      var table = ["user_info","user_id",req.params.user_id];
      query = mysql.format(query, table);
      connection.query(query, function(err, rows){
        if(err){
          res.json({"Error" : true, "Message" : "Error during executing query - "+err});
        } else {
          res.json({"Error" : false, "Message" : "Success"});
        }
      });
    });
}

module.exports = REST_ROUTER;