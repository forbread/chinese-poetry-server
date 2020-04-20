const Request = require("../../tools/Request")

const url = require("url")

const requestApi = new Request({
    AccessKeyId: "5e957255040b84103e531c5b",
    AccessKeySecret: "f02ea6335844cd3cfdc1deec2c4823de",
    ServerAddress: "https://account.getlove.cn/apiGetWay/5b010c7445657b2b64ada7a2"
})

const forwardController={
    forwardRequests(request, response) {
        console.log("api请求转发")
        var pathname = url.parse(request.url,).pathname;
        console.log("param:",request.params)
        if(request.params.pathParam){
            pathname= `${pathname}/${request.params.pathParam}`
            request.params={}
        }
        requestApi.http({
            url: 'api/v1'+pathname,
            method: request.method,
            params:request.params,
        }).then(function (res) {
            // console.log(response)
            console.log("------返回值--------")
            console.log(res.data)
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(res.data));
            response.end();
        })
    }
}

  



module.exports=forwardController
 
 
