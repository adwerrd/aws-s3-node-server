<h2 align="center">aws s3 node server</h2>
<p align="center">解决 aws-js-sdk 在浏览器端的跨域调用问题</p>

### 特性

包装 [AWS S3](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html) 的基本 API

### API

- login

```
login(accesskey, secretkey, host, region, timeout) => (success => {
  buckets: API:listBuckets => data
  // 该 token 用在 handler() 调用时的身份校验, 需添加在 request header 中
  token: keys&host&region(base64encode)
}, error => {
  AWSError(https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Response.html#error-property)
})
```

- handler
  ⚠️ request header 中务必加入 `{ Authorization: token }`

```
handler(method, params, timeout) => (success => {
  API:method => data
}, error => {
  AWSError(https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Response.html#error-property)
})
```

### 例子

调用 `listObjects`, 使用 `aws-sdk`

```
var params = {
  Bucket: "examplebucket",
  MaxKeys: 2
};
s3.listObjects(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);
}
```

使用 `aws-s3-node-server`

```
var params = {
  Bucket: "examplebucket",
  MaxKeys: 2
};
handler('listObjects', params).then(data, err)
```

### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 以容器的方式部署

1. 安装docker环境,参考[点击查看](https://docs.docker.com/v17.09/engine/installation)

2. build 镜像

  ```bash
  docker  build -t aws-s3-node-server:0.9 .
  ```

3. 运行容器

  ```bash
  docker run -tid --network=host aws-s3-node-server:0.9
  ```

4. 验证服务,如下输出说明服务正常

  ```
  ✗ curl 127.0.0.1:8080
  aws s3 node server ok
  ```

5. 将容器镜像推送到白山镜像仓库(可选)

  - 先登录白山镜像仓库（这里以bsc_storage用户为例）

    ```
    ✗ docker login  hub.bscstorage.com
    Username: *****
    Password: *****
    ```
  - 将镜像push 到白山镜像仓库

  ```
  ✗ docker tag aws-s3-node-server:0.9 hub.bscstorage.com/public/aws-s3-node-server:0.9
  ✗ docker push hub.bscstorage.com/public/aws-s3-node-server:0.9
  ```

  - 使用白山边缘云服务, 将服务部署在公有云上

    欢迎试用: 白山云边缘云服务 [http://computron.bscstorage.com](http://computron.bscstorage.com)
