# jsontosql2
###json对象转换成对应的sql语句

* 基础用法
````
var index = require('jsontosql2');
var collection = {
    'name': 'OrderInfo',
    'data': [{
        'Id': 1,
        'Pirce': 1
    }, {
        'Id': 2,
        'Pirce': 2
    }],
    'duplicate': ['Pirce']
};
var sql = index.toInsertSql(collection);
console.log('JsonToInsertSql，使用mysql duplicate关键字：' + sql);
//INSERT INTO `OrderInfo` (`Id`,`Pirce`) VALUES (1,1),(2,2) ON DUPLICATE KEY UPDATE Pirce=VALUES(Pirce)

//////====================================================================

collection = {
    'name': 'OrderInfo',
    'data': [{
        'Id': 1,
        'Pirce': 1
    }, {
        'Id': 2,
        'Pirce': 2
    }]
};
sql = index.toInsertSql(collection);
console.log('JsonToInsertSql，不使用mysql duplicate关键字：' + sql);
//INSERT INTO `OrderInfo` (`Id`,`Pirce`) VALUES (1,1),(2,2)

//////====================================================================

collection = {
    'name': 'OrderInfo',
    'data': {
        'Pirce': 10
    },
    'where': {
        'Id': 1,
    }
};
sql = index.toUpdateSql(collection);
console.log('JsonToUpdateSql：' + sql);
//UPDATE `OrderInfo` SET  `Pirce` = 10  WHERE  `Id` = 1

//////====================================================================

collection = {
    'name' :'OrderInfo',
    'where':{
        'Id':1
    },
    'column':'Id, Price'
};
sql = index.toSelectSql(collection);
console.log('JsonToSelectSql，指定查询列名称：' + sql);
//SELECT Id, Price FROM `OrderInfo` WHERE  `Id` = 1

//////====================================================================

collection = {
    'name' :'OrderInfo',
    'where':{
        'Id':1
    }
};
sql = index.toSelectSql(collection);
console.log('JsonToSelectSql，查询所有列：' + sql);
//SELECT * FROM `OrderInfo` WHERE  `Id` = 1

//////====================================================================
collection = {
    'name' :'OrderInfo',
    'where':{
        'Id':1
    },
    'sort' : 'Id, Price DESC',
    'limit' : 10
};
sql = index.toSelectSql(collection);
console.log('JsonToSelectSql，增加排序和limit条件：' + sql);
//SELECT * FROM `OrderInfo` WHERE  `Id` = 1  ORDER BY Id, Price DESC LIMIT 10

//////====================================================================
collection = {
    'name' :'OrderInfo',
    'where':{
        'Id':1
    }
};
sql = index.toDeleteSql(collection);
console.log('JsonToDeleteSql：' + sql);
//DELETE FROM `OrderInfo` WHERE  `Id` = 1
````