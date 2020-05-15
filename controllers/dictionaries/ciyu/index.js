// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/dictionaries')
var $sql = require('../../../mapper/dictionaries/ciyuSql');
let { getRequestParam,queryList } = require('../../../common/reqandresHandle')

// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);



const ciYucontrollers = {

    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = ["%" + param.word + "%", (param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.word
        let sqlStatement = $sql.list.word
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)

    },

    getList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.all
        let sqlStatement = $sql.list.all
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },



}






module.exports = ciYucontrollers