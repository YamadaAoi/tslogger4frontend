import TsLogService from "./tsLogService";
import * as tsLogUtil from "./tsLog.util";

export class TsLog implements TsLogService {
  usetsLog: boolean; // 使用存储及下载日志功能
  doConsole: boolean; // 在控制台打印日志
  itemName: string; // 自定义localStorage存储key值
  maxLen: number; // 日志数量上限
  logName: string; // 日志文件名
  logList: tsLogUtil.LogItem[]; // 日志列表
  constructor(config: TsLogService) {
    this.doConsole = config.doConsole || false;
    this.usetsLog = config.usetsLog || true;
    this.itemName = config.itemName || "tsLog";
    this.maxLen = config.maxLen || 500;
    this.logName = config.logName || "TSLOG";
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

  private _initLog() {
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
    if (typeof obj === "string") {
      this.logList.push({ log: obj, date: new Date().getTime(), type });
    } else {
      this.logList.push({
        log: JSON.stringify(obj),
        date: new Date().getTime(),
        type
      });
    }
    // window.localStorage.removeItem(this.itemName);
    window.localStorage.setItem(this.itemName, JSON.stringify(this.logList));
  }
}
