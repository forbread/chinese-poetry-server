// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../config/mysql')
var $sql = require('../../mapper/poetrySql');

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
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {}  param.type  author author_id title content  查询属性
     * @param {}  param.keywords   查询参数
     */
    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let paramSql =["%" + param.keywords + "%", (param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount[param.type]
        let sqlStatement = $sql.list[param.type]
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)
        
    },

    getList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.all
        let sqlStatement = $sql.list.all
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)
    },

    getListByAuthorId(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [param.author_id,(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.author_id
        let sqlStatement = $sql.list.author_id
        queryList(req, res, next, { sqlCount, paramSql, sqlStatement }, param)
    },



    getDetailByAuthorId(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        pool.getConnection(function (err, connection) {
            connection.query($sql.listCount.author_id, paramSql, function (err, resCount) {
                if (resCount && resCount[0].total > 0) {
                    connection.query($sql.list.author_id, paramSql, (err, result) => {
                        jsonWrite(res, { total: resCount[0].total, page: param.page, list: result });
                        connection.release();
                    })
                } else {
                    jsonWrite(res, { total: 0, page: param.page, list: [] });
                }
            });
        });
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