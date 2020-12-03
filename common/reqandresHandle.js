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
var responseDataWrite = function (res, result) {
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

/**
 * 
 * @param {*} req request对象
 * @param {*} res response对象
 * @param {*} next 
 * @param {*} pool mysql连接池
 * @param {*} queryParam paramSql查询参数 sqlCount查询条目SQL语句 sqlStatement查询数据SQL语句
 * @param {*} param 分页参数
 */

let queryList = (req, res, next, pool, queryParam, param) => {
    pool.getConnection(function (err, connection) {
        console.log(queryParam.sqlCount, queryParam.paramSql)
        connection.query(queryParam.sqlCount, queryParam.paramSql, function (err, resCount) {
            if (resCount && resCount[0].total > 0) {
                console.log(queryParam.sqlStatement, queryParam.paramSql)
                connection.query(queryParam.sqlStatement, queryParam.paramSql, (err, result) => {
                    responseDataWrite(res, { total: resCount[0].total, page: param.page, list: result });
                    connection.release();
                })
            } else {
                responseDataWrite(res, { total: 0, page: param.page, list: [] });
            }
        });
    });
}

module.exports = { getRequestParam, responseDataWrite, queryList }
