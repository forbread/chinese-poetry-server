// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../config/mysql')
var $sql = require('../../mapper/poetSql');

// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);

// 获取请求参数&添加分页参数
let getRequestParam = (req) => {
    if (req.method === 'GET') {
        console.log('GET请求参数：', req.query)
        let param = req.query
        param.page = parseInt(param.page) ? parseInt(param.page) : 1
        param.size = parseInt(param.size) ? parseInt(param.size) : 20
        return param
    } else {
        console.log('POST请求参数：', req.body)
        let param = req.body
        param.page = parseInt(param.page) ? parseInt(param.page) : 1
        param.size = parseInt(param.size) ? parseInt(param.size) : 20
        return req.body
    }
}

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, result) {
    if (typeof result === 'undefined') {
        res.json({
            code: 500,
            msg: 'error'
        });
    } else if (result.total && result.total === 0) {
        res.json({
            code: 200,
            msg: 'success',
            data: []
        });
    } else {
        res.json({
            code: 200,
            msg: 'success',
            data: result
        });
    }
};



const poetControllers = {
    getPoetryListByDynasty(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [param.dynasty, (param.page - 1) * param.size, param.size]
        let sqlCount = $sql.poetry.dynastyCount
        let sqlStatement = $sql.poetry.dynasty
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)
    },

    getPoetryList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.poem.count
        let sqlStatement = $sql.poem.list
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)
    },

    getPoemList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.poetry.listCount
        let sqlStatement = $sql.poetry.list
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)


    },

    getPoetryById(req, res, next) {
        let param = getRequestParam(req)
        pool.getConnection(function (err, connection) {
            console.log($sql.poetry.id,param.author_id)
            connection.query($sql.poetry.id, param.author_id, (err, result) => {
                jsonWrite(res, result);
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
                jsonWrite(res, result);
                connection.release();
            })

        });
    }
}



let queryList = (req, res, next, queryParam, param) => {
    pool.getConnection(function (err, connection) {
        console.log(queryParam.sqlCount, queryParam.paramSql)
        connection.query(queryParam.sqlCount, queryParam.paramSql, function (err, resCount) {
            if (resCount && resCount[0].total > 0) {
                console.log(queryParam.sqlStatement, queryParam.paramSql)
                connection.query(queryParam.sqlStatement, queryParam.paramSql, (err, result) => {
                    jsonWrite(res, { total: resCount[0].total, page: param.page, list: result });
                    connection.release();
                })
            } else {
                jsonWrite(res, { total: 0, page: param.page, list: [] });
            }
        });
    });
}



module.exports = poetControllers