// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/mysql')
var $sql = require('../../../mapper/shijingSql');
let { getRequestParam,responseDataWrite,queryList } = require('../../../common/reqandresHandle')

// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);


const poetryControllers = {
 
    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = ["%"+param.keywords+"%",(param.page - 1) * param.size, param.size]
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

    getChapter(req, res, next) {
        let param = getRequestParam(req)
        pool.getConnection(function (err, connection) {
            connection.query($sql.chapter, function (err, result) {
                responseDataWrite(res,result );
                connection.release();
            });
        });
    },

    getSection(req, res, next) {
        let param = getRequestParam(req)
        pool.getConnection(function (err, connection) {
            connection.query($sql.section, function (err, result) {
                responseDataWrite(res,result );
                connection.release();
            });
        });
    },

    getSishuwujingList(req, res, next) {
        let param = getRequestParam(req)
        pool.getConnection(function (err, connection) {
            connection.query($sql.sishuwujing,param.title, function (err, result) {
                responseDataWrite(res,result );
                connection.release();
            });
        });
    }
}


module.exports = poetryControllers