var Server = require('./server.js').Server;
var Import = require('./import.js').Import;

Import.import(function(result){
    console.log(result);
    Server.init();    
});