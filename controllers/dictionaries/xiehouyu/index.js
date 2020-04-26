// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/dictionaries')
var $sql = require('../../../mapper/dictionaries/xiehouyuSql');

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


const poetryControllers = {
   
    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let paramSql =["%" + param.word + "%", (param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.word
        let sqlStatement = $sql.list.word
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)
        
    },

    getList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.all
        let sqlStatement = $sql.list.all
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)
    },

    

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



module.exports = poetryControllers