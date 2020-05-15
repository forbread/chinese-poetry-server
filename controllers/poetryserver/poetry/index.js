// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/mysql')
var $sql = require('../../../mapper/poetrySql');
let { getRequestParam,responseDataWrite,queryList } = require('../../../common/reqandresHandle')

// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);

const poetryControllers = {
   
    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let paramSql =["%" + param.keywords + "%", (param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount[param.type]
        let sqlStatement = $sql.list[param.type]
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
        
    },

    getList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.all
        let sqlStatement = $sql.list.all
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },

    getListByAuthorId(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [param.author_id,(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.author_id
        let sqlStatement = $sql.list.author_id
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },



    getDetailByAuthorId(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        pool.getConnection(function (err, connection) {
            connection.query($sql.listCount.author_id, paramSql, function (err, resCount) {
                if (resCount && resCount[0].total > 0) {
                    connection.query($sql.list.author_id, paramSql, (err, result) => {
                        responseDataWrite(res, { total: resCount[0].total, page: param.page, list: result });
                        connection.release();
                    })
                } else {
                    responseDataWrite(res, { total: 0, page: param.page, list: [] });
                }
            });
        });
    },

}





module.exports = poetryControllers