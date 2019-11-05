# tsLog

记录前端日志并下载

基于 typescript 编写一款前端日志保存并下载插件。
前端日志使用 console 打印不易保存，项目中如使用 websocket 出现异常无法直接定位问题。

日志保存在 localstorage 中，低版本浏览器不兼容，只做开发调试用。

配置介绍：
1、usetsLog：boolean
是否使用此插件，生产版本可由此参数控制不使用此功能，默认打开(true)。

2、doConsole：boolean
是否也在控制台内打印日志，默认不打印(false)。

3、itemName：string
localstorage 自定义存储 key 值，默认 tsLog。

4、maxLen：number
日志存储条数上限，默认 500。

5、logName：string
下载日志文件名，默认 TSLOG，文件名自动添加时间及类型，形如 TSLOG2019103911.txt。
