import TsLogService from "./tsLogService";
import * as tsLogUtil from "./tsLog.util";
export default class Tslog implements TsLogService {
    usetsLog: boolean;
    doConsole: boolean;
    itemName: string;
    maxLen: number;
    logName: string;
    logList: tsLogUtil.LogItem[];
    constructor(config: TsLogService);
    log(obj: any): void;
    warn(obj: any): void;
    error(obj: any): void;
    downloadLog(): void;
    private _initLog;
    private _doLog;
}
//# sourceMappingURL=index.d.ts.map