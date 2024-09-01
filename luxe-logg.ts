
type LogLevel = "INF" | "DBG" | "WRN" | "ERR";
type LogFormat = "bold" | "underline" | "italic" | "strikethrough" | string;
type LogPart = {fmt: LogFormat, msg: string}

function levelParts(level: LogLevel) : string[] {
   const color = level === "INF" ? "lightgrey" : 
      level === "WRN" ? "yellow" :
      level === "DBG" ? "lightblue" :
      level === "ERR" ? "red" : "white";

   return [`%c[${level}]`, `background-color: ${color}`];
}

function logPartsToConsoleLogArray(messageParts: (LogPart | string)[]) : string[] {
   const message : string = messageParts.reduce((soFar, thisPart) : string => {
      if (typeof thisPart === "string") return `${soFar}%c${thisPart}`;
      else return `${soFar}%c${thisPart.msg}`;
   }, "") as string;
   //Either return the string itself, or the "msg" property of logpart, with formatting characters between each

   const formatArray : string[] = []
   messageParts.forEach(part => {
      if (typeof part === "string") formatArray.push("");
      else if (part.fmt === "bold") formatArray.push("font-weight: bold");
      else if (part.fmt === "underline") formatArray.push("text-decoration: underline");
      else if (part.fmt === "italic") formatArray.push("font-style: italic");
      else if (part.fmt === "strikethrough") formatArray.push("text-decoration: line-through");
      else formatArray.push(part.fmt);
   });
   //get the format for each part. If it's just a string, provide an empty string for no formatting

   return [message, ...formatArray];
}

const logHistory : string[] = [];

function logMessage(level: LogLevel, message: (LogPart | string)[]) : string[] {
   const [lvlMsg, lvlFmt] = levelParts(level);
   const [msg, ...otherFmts] = logPartsToConsoleLogArray(message)

   if (logHistory.length > 200) logHistory.shift();
   logHistory.push((lvlMsg + " " + msg).replaceAll("%c", ""));

   return [`${lvlMsg}%c ${msg}`, lvlFmt, "", ...otherFmts];
   //first item is the message itself lvlMsg, format character, then the message with formatting characters inserted
   //next items are formats. The first format is for the level (INFO, DEBUG), the next format of "" to turn off formatting, 
   //then the formats provided by the logPartsToConsoleLogArray method
}

// return logging functions to be executed by the caller

function infoFn(...message: (LogPart | string)[]) {
   const consoleLogParams = logMessage("INF", message);
   return window.console.log.bind(window.console, ...consoleLogParams) 
   //These bind calls are necessary to keep the location of the log accurate (in chrome, the right side of the console window)
   //It has the rather unfortunate downside that you must then execute the returned function on the caller side, eg:
   //infoFn("log your stuff", " here")(); <-- note the extra parens at the end
}
function debugFn(...message: (LogPart | string)[]) {
   const consoleLogParams = logMessage("DBG", message);
   return window.console.log.bind(window.console, ...consoleLogParams)
}
function warnFn(...message: (LogPart | string)[]) {
   const consoleLogParams = logMessage("WRN", message);
   return window.console.log.bind(window.console, ...consoleLogParams)
}
function errorFn(...message: (LogPart | string)[]) {
   const consoleLogParams = logMessage("ERR", message);
   return window.console.log.bind(window.console, ...consoleLogParams)
}
function objectLogFn(obj: any) {
   logMessage("INF", [JSON.stringify(obj)]);
   return window.console.log.bind(window.console, obj)
   //Sometimes you just want to straight log an object that the console window can browse through.
}

//alternate syntax, provide the arguments to console.log for the caller to log themselves

function debug(...message: (LogPart | string)[]) : string[] {
   return logMessage("DBG", message);
   //all these functions do is provide the arguments for console.log. The caller is meant to use it like this:
   //console.log(...debug("log your stuff", "here"));
   //This also preserves the calling location in the console, but it's a bit wordier. However, it's more difficult
   //to call it wrong. (There's no final pair of () to forget);
}

function info(...message: (LogPart | string)[]) : string[] {
   return logMessage("INF", message);
}

function warn(...message: (LogPart | string)[]) : string[] {
   return logMessage("WRN", message);
}

function error(...message: (LogPart | string)[]) : string[] {
   return logMessage("ERR", message);
}

// these are quick formatters, meant to be used with logging. You can decorate text in your console logs a little easier with this.
// examples: 
//              infoFn("This will log in ", b("BOLD"))();
// console.log(...info("This will log in ", b("BOLD")));

/* bold          */ function b     (msg?: string | null) : LogPart { return {fmt: "bold",          msg: msg || ''} }
/* underline     */ function u     (msg?: string | null) : LogPart { return {fmt: "underline",     msg: msg || ''} }
/* italics       */ function i     (msg?: string | null) : LogPart { return {fmt: "italic",        msg: msg || ''} }
/* strikethrough */ function strike(msg?: string | null) : LogPart { return {fmt: "strikethrough", msg: msg || ''} }

console.info = (...argses) => {
   infoFn(...argses)();
 }
 console.debug = (...argses) => {
   debugFn(...argses)();
 }
 console.warn = (...argses) => {
   warnFn(...argses)();
 }
 console.error = (...argses) => {
   errorFn(...argses)();
 }
 (console as any).logObj = (argy : any) => {
   objectLogFn(argy)();
 }

export { 
   debug, info, warn, error, 
   debugFn, infoFn, warnFn, errorFn,
   objectLogFn,
   b, u, i, strike, 
   LogPart, LogFormat,
   logHistory
};