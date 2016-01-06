var excel = require('excel2array');

var Excel = {};

Excel.Options = {
    hasHeaderRow: true,
    primaryKey: 'Infra_Asset_Template_Name',
    removeEmptyRows: true
}

Excel.ColumnMap = {
    OPERATIONS: ['OPERATIONS'],
    Infra_Asset_Template_Name: ['Infra_Asset_Template_Name'],
    Asset_Classification: ['Asset_Classification'],
    Maximo: ['Maximo'],
    Location_Vector: ['Location_Vector'],
    ATTRIBUTE_1: ['ATTRIBUTE_1'],
    ATTRIBUTE_2: ['ATTRIBUTE_2'],
    ATTRIBUTE_3: ['ATTRIBUTE_3'],
    ATTRIBUTE_4: ['ATTRIBUTE_4'],
    Asset_Image_Simple_Graphical_View: ['Asset_Image_Simple_Graphical_View'],
    Image_Advanced_graphical_View: ['Image_Advanced_Graphical_View']
};

Excel.FilePath = 'template.xlsx';
Excel.SheetName = 'Sheet1';

Excel.readExcel = function(){
    var data = excel(Excel.FilePath, Excel.SheetName, Excel.ColumnMap, Excel.Options);
    ///console.log(data);
    return data;    
};

exports.Excel = Excel;