// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/mysql')
var $sql = require('../../../mapper/poemCollectionSql');
let { getRequestParam,responseDataWrite,queryList } = require('../../../common/reqandresHandle')

 
// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);

const poemCollectionControllers = {
  
    getList(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.all
        let sqlStatement = $sql.list.all
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
       
        
    },

    getListByCondition(req, res, next) {
        let param = getRequestParam(req)
        let paramSql = ["%"+param.keywords+"%",(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount[param.type]
        let sqlStatement = $sql.list[param.type]
        queryList(req, res, next, pool, { sqlCount, paramSql, sqlStatement }, param)
    },

    getAuthorList(req, res, next) {
        let param = getRequestParam(req)
        pool.getConnection(function (err, connection) {
            console.log($sql.poets)
            connection.query($sql.poets, (err, result) => {
                responseDataWrite(res, result);
                connection.release();
            })
        });
    },

    // 查询词牌名
    getRhythmicList(req, res, next) {
        let param = getRequestParam(req)
        pool.getConnection(function (err, connection) {
            console.log($sql.rhythmic)
            connection.query($sql.rhythmic, (err, result) => {
                responseDataWrite(res, result);
                connection.release();
            })
        });
    }
}

 
 


module.exports = poemCollectionControllers