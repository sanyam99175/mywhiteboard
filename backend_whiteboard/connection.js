var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ganda@73511"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("DROP DATABASE mywhiteboard", function (err, result) {
    if (err) throw err;
    console.log("Database destroyed");
  });

con.query("CREATE DATABASE mywhiteboard", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  
con.query("USE mywhiteboard", function (err, result) {
    if (err) throw err;
    console.log("Database used");
  });

var sql = "CREATE TABLE whiteboard (user_id VARCHAR(255), name VARCHAR(255), room_id VARCHAR(255), host BOOLEAN, presenter BOOLEAN)";
con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });