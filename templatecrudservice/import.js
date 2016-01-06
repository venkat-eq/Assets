var Import = {};
var excel = require('./excel.js').Excel;
var templateDB = require('./asset.js').TemplateDB;

excel.FileName = "template.xlsx";

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
            templateDB.addAssets(data.list, function(){
                
            });
        }
    });
    callback('Import finished');
};

exports.Import = Import;