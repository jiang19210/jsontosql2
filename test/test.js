var index = require('../index');
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
collection = {
    'name' :'OrderInfo',
    'where':{
        'Id':1
    },
    'column':'Id, Price'
};
sql = index.toSelectSql(collection);
console.log('JsonToSelectSql，指定查询列名称：' + sql);
collection = {
    'name' :'OrderInfo',
    'where':{
        'Id':1
    }
};
sql = index.toSelectSql(collection);
console.log('JsonToSelectSql，查询所有列：' + sql);

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

collection = {
    'name' :'OrderInfo',
    'where':{
        'Id':1
    }
};
sql = index.toDeleteSql(collection);
console.log('JsonToDeleteSql：' + sql);