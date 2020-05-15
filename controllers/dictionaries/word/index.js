// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/dictionaries')
var $sql = require('../../../mapper/dictionaries/wordSql');
let { getRequestParam,queryList } = require('../../../common/reqandresHandle')

// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);

const poetryControllers = {
   
    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let formatparam = param.type === 'strokes' ? parseInt(param.keywords) : "%" + param.keywords + "%"
        let paramSql =[formatparam, (param.page - 1) * param.size, param.size]
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

    

}


module.exports = poetryControllers