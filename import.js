var Import = {};
var excel = require('./excel.js').Excel;
var instanceDB = require('./asset.js').InstanceDB;

excel.FileName = "instance.xlsx";

var sheets = ['Sheet1'];

Import.import = function (callback) {
    console.log('Importing data from Excel');
    sheets.forEach(function (sheet) {
        console.log('Importing from ' + sheet );
        excel.SheetName = sheet;
        var data = excel.readExcel();
        if(data.errors != undefined && data.errors.length > 0){
            console.error(data.errors);
            callback('Import finished with errors');   
        }
        else{
            instanceDB.addAssets(data.list, function(){
                
            });
        }
    });
    callback('Import finished');
};

exports.Import = Import;