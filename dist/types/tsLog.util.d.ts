export declare type action = "INFO" | "ERROR" | "WARN";
export interface LogItem {
    log: string;
    date: number;
    type: action;
}
export declare function download(filename: string, text: string): void;
export declare function dateFormat(date: number, fmt?: string): string;
//# sourceMappingURL=tsLog.util.d.ts.map