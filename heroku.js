var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use('/', express.static(__dirname + "/src/"));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
