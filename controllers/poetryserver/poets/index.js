// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/mysql')
var $sql = require('../../../mapper/poetSql');
let { getRequestParam,responseDataWrite,queryList } = require('../../../common/reqandresHandle')

// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);


const poetControllers = {
    getPoetryListByDynasty(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [param.dynasty, (param.page - 1) * param.size, param.size]
        let sqlCount = $sql.poetry.dynastyCount
        let sqlStatement = $sql.poetry.dynasty
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },

    getPoetryList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.poetry.listCount
        let sqlStatement = $sql.poetry.list
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },

    getPoemList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.poem.listCount
        let sqlStatement = $sql.poem.list
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)


    },

    getPoetryById(req, res, next) {
        let param = getRequestParam(req)
        pool.getConnection(function (err, connection) {
            console.log($sql.poetry.id,param.author_id)
            connection.query($sql.poetry.id, param.author_id, (err, result) => {
                console.log(result)
                responseDataWrite(res, result[0]);
                connection.release();
            })

        });
    },

    getPoemById(req, res, next) {
        let param = getRequestParam(req)
        let paramSql =  param.author_id
        pool.getConnection(function (err, connection) {
            console.log($sql.poem.id,paramSql)
            connection.query($sql.poem.id,paramSql, (err, result) => {
                responseDataWrite(res, result[0]);
                connection.release();
            })

        });
    }
}


 

module.exports = poetControllers