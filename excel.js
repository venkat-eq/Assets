var excel = require('excel2array');

var Excel = {};

Excel.Options = {
    hasHeaderRow: true,
    primaryKey: 'ASSET_INSTANCE_NAME',
    removeEmptyRows: true
}

Excel.ColumnMap = {
    OPERATION: [' OPERATION'],
    ASSET_INSTANCE_NAME: ['ASSET_INSTANCE_NAME'],
    MAXIMO_ASSET_ID: ['MAXIMO_ASSET_ID'],
    MAXIMO_ASSET_NUM: ['MAXIMO_ASSET_NUM'],
    MAXIMO_SITE_ID: ['MAXIMO_SITE_ID'],
    serialnum: ['serialnum'],
    description: ['description'],
    vendor: ['vendor'],
    manufacturer: ['manufacturer'],
    Asset_Visible_to_Customer: ['Asset_Visible_to_Customer'],
    IBX :['IBX'],
    PROTOCOL :['PROTOCOL'],
    Scan_Frequency: ['Scan_Frequency']
};

Excel.FilePath = 'instance.xlsx';
Excel.SheetName = 'Sheet1';

Excel.readExcel = function(){
    var data = excel(Excel.FilePath, Excel.SheetName, Excel.ColumnMap, Excel.Options);
    ///console.log(data);
    return data;    
};

exports.Excel = Excel;