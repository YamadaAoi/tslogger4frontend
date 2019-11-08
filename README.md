# tsLog

记录前端日志并下载

基于 typescript 编写一款前端日志保存并下载插件。
前端日志使用 console 打印不易保存，项目中如使用 websocket 出现异常无法直接定位问题。

日志保存在 localstorage 中，低版本浏览器不兼容，只做开发调试用。
localstorage 大小有限（5M 左右），需要合理安排，仅打印关键部分，下载的日志文件推荐使用 notepad++ 查看。

## 配置介绍：

1、usetsLog：boolean
是否使用此插件，生产版本可由此参数控制不使用此功能，默认打开(true)。

2、doConsole：boolean
是否也在控制台内打印日志，默认不打印(false)。

3、itemName：string
localstorage 自定义存储 key 值，默认 tsLog。

4、maxLen：number
日志存储条数上限，默认 500。

5、logName：string
下载日志文件名，默认 TSLOG，文件名自动添加时间及类型，形如 TSLOG20191107104143.txt。

## 暴露方法：

1、log：保存并打印一般日志

2、warn：保存并打印警告日志

3、error：保存并打印错误日志

4、downloadLog：保存并下载日志

5、clear：清空已保存的日志

## 示例：

1、安装

```bash
$ npm i tslogger4frontend -D
```

2、新建 logger.ts

```js
import TsLog from "tslogger4frontend";
export default new TsLog();
```

3、在项目需要调试处使用，如在 app.tsx 中使用

```js
import TsLog from "./logger.ts";

TsLog.log("11111");
TsLog.log("22222");
TsLog.log("33333");

TsLog.downloadLog();
```

即可下载文件如：TSLOG20191107104143.txt

-----TSLOG START-----

2019-11-07 10:41:43 INFO：11111

2019-11-07 10:41:43 INFO：22222

2019-11-07 10:41:43 INFO：33333

-----TSLOG END-----
