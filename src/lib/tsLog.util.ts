export declare type action = "INFO" | "ERROR" | "WARN";

export interface LogItem {
  log: string;
  date: number;
  type: action;
}

export function download(filename: string, text: string) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  element.target = "_blank";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function dateFormat(date: number, fmt: string = "yyyy-MM-dd hh:mm:ss") {
  let formatDate = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (formatDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o: any = {
    "M+": formatDate.getMonth() + 1,
    "d+": formatDate.getDate(),
    "h+": formatDate.getHours(),
    "m+": formatDate.getMinutes(),
    "s+": formatDate.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}
function padLeftZero(str: string) {
  return ("00" + str).substr(str.length);
}
