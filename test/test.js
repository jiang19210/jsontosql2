var test = require('../index');
var d = test.toInsertSql({'name':'a','data':[{'a':'a','b':null},{'a':'a','b':'b','c':'c'}],'duplicate':['a','c'],'columns':['a','b','c','d']});
console.log(d)