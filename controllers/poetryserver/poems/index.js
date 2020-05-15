// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/mysql')
var $sql = require('../../../mapper/poemSql');
let { getRequestParam,queryList } = require('../../../common/reqandresHandle')

// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);


const poemControllers = {
 
    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let paramSql=["%"+param.keywords+"%",(param.page-1)*param.size,param.size]
        let sqlCount = $sql.listCount[param.type]
        let sqlStatement = $sql.list[param.type]
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },

    getList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql=[(param.page-1)*param.size,param.size]
        let sqlCount = $sql.listCount.all
        let sqlStatement = $sql.list.all
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },
    getPoemTitleList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql=[(param.page-1)*param.size,param.size]
        let sqlCount = $sql.listCount.poemsNmae
        let sqlStatement = $sql.list.poemsNmae
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },
    getListByAuthorId(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [param.author_id,(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.author_id
        let sqlStatement = $sql.list.author_id
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },

}

module.exports = poemControllers