var index = require('../index');
var collection = {
    'name': 'OrderInfo',
    'data': [{
        'Id': 1
    },
        {
            'Id': 1,
            'Pirce': 1
        }, {
            'Id': 2,
            'Pirce': 2
        }],
    'duplicate': ['Pirce'],
    'columns': ['Id', 'Pirce']
};
var sql = index.toInsertSql(collection);
console.log('JsonToInsertSql，使用mysql duplicate关键字：' + sql);