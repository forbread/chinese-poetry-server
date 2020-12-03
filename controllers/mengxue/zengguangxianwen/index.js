// 实现与MySQL交互
var mysql = require('mysql')
var $confMysql = require('../../../config/mysql')
var $sql = require('../../../mapper/mengxue/zgxwSql')
var $classifySql = require('../../../mapper/mengxue/classifySql')
let { getRequestParam, responseDataWrite, queryList } = require('../../../common/reqandresHandle')


// 使用连接池，提升性能
var pool = mysql.createPool($confMysql);

const collectionControllers = {

    getList (req, res, next) {
        let param = getRequestParam(req)
        let paramSql = [(param.page - 1) * param.size, param.size]
        let sqlCount = $sql.listCount.all
        let sqlStatement = $sql.list.all
        pool.getConnection(function (err, connection) {
            console.log(sqlCount, paramSql)
            connection.query(sqlCount, paramSql, function (err, resCount) {
                if (resCount && resCount[0].total > 0) {
                    console.log(sqlStatement, paramSql)
                    connection.query($classifySql.detail, 2, (err, classify) => {
                        let infos = classify.length > 0 ? classify[0] : {}
                        connection.query(sqlStatement, paramSql, (err, result) => {
                            responseDataWrite(res, { total: resCount[0].total, page: param.page, data: {mengxueId:infos.id, title: infos.title, author: infos.author, abstract: infos.abstract, list: result } });
                            connection.release();
                        })
                    })

                } else {
                    responseDataWrite(res, { total: 0, page: param.page, list: [] });
                }
            })
        })
    },
}

module.exports = collectionControllers