"use strict";
const strings = require('./lib/strings');
const mysql = require('mysql');

exports.toSelectSql = function (collection) {
    let where = collection.where;
    let name = collection.name;
    let column = collection.column;
    let fields = [name];

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
    sql = mysql.format(sql, fields);
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

    let fields = [name];
    let a = 'INSERT INTO ?? (';
    for (let key in data[0]) {
        fields.push(key);
        a += '??,';
    }
    let sql = strings.reEndComma(a, ',') + ') VALUES ';
    var values = '(';
    for (let i = 0; i < data.length; i++) {
        let pair = data[i];
        for (let key in pair) {
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
        for (var i = 0; i < duplicate.length; i++) {
            sql += duplicate[i] + '=VALUES(' + duplicate[i] + '),';
        }
    }
    sql = strings.reEndComma(sql, ',');
    sql = mysql.format(sql, fields);
    return sql;
};

exports.toUpdateSql = function (collection) {
    let name = collection.name;
    let data = collection.data;
    let where = collection.where;
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
    sql = mysql.format(sql, fields);
    return sql;
};

exports.toDeleteSql = function (collection) {
    let where = collection.where;
    let name = collection.name;
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
    sql = mysql.format(sql, fields);
    return sql;
};