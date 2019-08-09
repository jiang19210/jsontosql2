"use strict";
const strings = require('./lib/strings');
const sqlstring = require('sqlstring');

exports.toSelectSql = function (collection) {
    let where = collection.where;
    let name = collection.name;
    let column = collection.column;
    let fields = [name];
    if (!name) {
        throw new Error('name is not null');
    }

    let sql = "SELECT * FROM ??";
    if (column) {
        sql = "SELECT " + column + " FROM ??";
    }
    if (where) {
        sql += ' WHERE ';
        let flag = true;
        for (let key in where) {
            fields.push(key);
            fields.push(where[key]);
            if (flag) {
                flag = false;
                sql += ' ?? = ? ';
            } else {
                sql += ' AND ?? = ? ';
            }
        }
    }
    sql = sqlstring.format(sql, fields);
    if (collection.sort) {
        sql += ' ORDER BY ' + collection.sort
    }
    if (collection.limit) {
        sql += ' LIMIT ' + collection.limit;
    }
    return sql;
};

exports.toInsertSql = function (collection) {
    let name = collection.name;
    let data = collection.data;
    let duplicate = collection.duplicate;
    let columns = collection.columns;
    if (!name) {
        throw new Error('name is not null');
    }
    if (!data) {
        throw new Error('data is not null');
    }

    let insertFields = [];
    let fields = [name];
    let a = 'INSERT INTO ?? (';
    if (columns) {
        for (let i = 0; i < columns.length; i ++) {
            fields.push(columns[i]);
            insertFields.push(columns[i]);
            a += '??,';
        }
    } else {
        for (let key in data[0]) {
            fields.push(key);
            insertFields.push(key);
            a += '??,';
        }
    }

    let sql = strings.reEndComma(a, ',') + ') VALUES ';
    let values = '(';
    for (let i = 0; i < data.length; i++) {
        let pair = data[i];
        for (let j = 0; j < insertFields.length; j++) {
            let key = insertFields[j];
            fields.push(pair[key]);
            values += '?,';
        }
        values = strings.reEndComma(values, ',') + '),';
        sql += values;
        values = '(';
    }
    if (duplicate) {
        sql = strings.reEndComma(sql, ',');
        sql += ' ON DUPLICATE KEY UPDATE ';
        for (let i = 0; i < duplicate.length; i++) {
            sql += duplicate[i] + '=VALUES(' + duplicate[i] + '),';
        }
    }
    sql = strings.reEndComma(sql, ',');
    sql = sqlstring.format(sql, fields);
    return sql;
};

exports.toUpdateSql = function (collection) {
    let name = collection.name;
    let data = collection.data;
    let where = collection.where;

    if (!name) {
        throw new Error('name is not null');
    }

    if (!data) {
        throw new Error('data is not null');
    }

    let fields = [name];
    let sql = 'UPDATE ?? SET ';
    for (let key in data) {
        fields.push(key);
        fields.push(data[key]);
        sql += ' ?? = ? ,';
    }
    sql = strings.reEndComma(sql, ',');
    if (where) {
        let flag = true;
        sql += ' WHERE ';
        for (let key in where) {
            fields.push(key);
            fields.push(where[key]);
            if (flag) {
                flag = false;
                sql += ' ?? = ? ';
            } else {
                sql += ' AND ?? = ? ';
            }
        }
    }
    sql = sqlstring.format(sql, fields);
    return sql;
};

exports.toDeleteSql = function (collection) {
    let where = collection.where;
    let name = collection.name;

    if (!name) {
        throw new Error('name is not null');
    }

    let fields = [name];

    let sql = "DELETE FROM ??";
    if (where) {
        sql += ' WHERE ';
        let flag = true;
        for (let key in where) {
            fields.push(key);
            fields.push(where[key]);
            if (flag) {
                flag = false;
                sql += ' ?? = ? ';
            } else {
                sql += ' AND ?? = ? ';
            }
        }
    }
    sql = sqlstring.format(sql, fields);
    return sql;
};