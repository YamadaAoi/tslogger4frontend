import TsLogService from "./tsLogService";
import * as tsLogUtil from "./tsLog.util";

export class TsLog implements TsLogService {
  usetsLog: boolean; // 使用存储及下载日志功能
  doConsole: boolean; // 在控制台打印日志
  itemName: string; // 自定义localStorage存储key值
  maxLen: number; // 日志数量上限
  logName: string; // 日志文件名
  logList: tsLogUtil.LogItem[]; // 日志列表

  constructor(config?: TsLogService) {
    this.doConsole = false;
    this.usetsLog = true;
    this.itemName = "tsLog";
    this.maxLen = 500;
    this.logName = "TSLOG";
    if (config) {
      if (undefined !== config.doConsole) {
        this.doConsole = config.doConsole;
      }
      if (undefined !== config.usetsLog) {
        this.usetsLog = config.usetsLog;
      }
      if (undefined !== config.itemName) {
        this.itemName = config.itemName;
      }
      if (undefined !== config.maxLen) {
        this.maxLen = config.maxLen;
      }
      if (undefined !== config.logName) {
        this.logName = config.logName;
      }
    }
    this.logList = [];
    this._initLog();
  }

  log(obj: any) {
    if (this.doConsole) {
      console.log(obj);
    }
    this._doLog(obj, "INFO");
  }

  warn(obj: any) {
    if (this.doConsole) {
      console.warn(obj);
    }
    this._doLog(obj, "WARN");
  }

  error(obj: any) {
    if (this.doConsole) {
      console.error(obj);
    }
    this._doLog(obj, "ERROR");
  }

  downloadLog() {
    let content: string = "-----TSLOG START-----\n";
    if (this.logList && this.logList.length > 0) {
      this.logList.forEach((log: tsLogUtil.LogItem) => {
        content = `${content}${tsLogUtil.dateFormat(log.date)} ${log.type}：${
          log.log
        }\n`;
      });
    }
    content = `${content}-----TSLOG END-----\n`;
    tsLogUtil.download(
      `${this.logName}${tsLogUtil.dateFormat(
        new Date().getTime(),
        "yyyyMMddhhmmss"
      )}.txt`,
      content
    );
  }

  clear() {
    this.logList = [];
    window.localStorage.removeItem(this.itemName);
  }

  private _initLog() {
    if (!window.localStorage) {
      console.log("当前浏览器不支持localStorage!");
      return;
    }
    let logInStorage = window.localStorage.getItem(this.itemName);
    if (logInStorage) {
      try {
        this.logList = JSON.parse(logInStorage);
      } catch (error) {
        console.error(`解析存储日志失败！`);
        this.logList = [];
      }
    }
  }

  private _doLog(obj: any, type: tsLogUtil.action) {
    if (!this.usetsLog) {
      return;
    }
    if (this.logList && this.logList.length === this.maxLen) {
      this.logList.shift();
    }
    let tempLog: tsLogUtil.LogItem = {
      log: "",
      date: new Date().getTime(),
      type,
    };
    if (typeof obj === "string") {
      tempLog.log = obj;
    } else {
      tempLog.log = JSON.stringify(obj);
    }
    this.logList.push(tempLog);
    this._saveLog(JSON.stringify(this.logList), tempLog);
  }

  private _saveLog(data: string, log?: tsLogUtil.LogItem) {
    if (!window.localStorage) {
      console.log("当前浏览器不支持localStorage!");
      return;
    }
    try {
      window.localStorage.setItem(this.itemName, data);
    } catch (e) {
      console.log(e);
      if ("QuotaExceededError" === e.name) {
        this.clear();
        if (undefined !== log) {
          this.logList.push(log);
          this._saveLog(JSON.stringify(this.logList));
        }
      }
    }
  }
}
