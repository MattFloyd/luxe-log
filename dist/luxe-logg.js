"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logHistory = void 0;
exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.debugFn = debugFn;
exports.infoFn = infoFn;
exports.warnFn = warnFn;
exports.errorFn = errorFn;
exports.objectLogFn = objectLogFn;
exports.b = b;
exports.u = u;
exports.i = i;
exports.strike = strike;
function levelParts(level) {
    const color = level === "INF" ? "lightgrey" :
        level === "WRN" ? "yellow" :
            level === "DBG" ? "lightblue" :
                level === "ERR" ? "red" : "white";
    return [`%c[${level}]`, `background-color: ${color}`];
}
function logPartsToConsoleLogArray(messageParts) {
    const message = messageParts.reduce((soFar, thisPart) => {
        if (typeof thisPart === "string")
            return `${soFar}%c${thisPart}`;
        else
            return `${soFar}%c${thisPart.msg}`;
    }, "");
    //Either return the string itself, or the "msg" property of logpart, with formatting characters between each
    const formatArray = [];
    messageParts.forEach(part => {
        if (typeof part === "string")
            formatArray.push("");
        else if (part.fmt === "bold")
            formatArray.push("font-weight: bold");
        else if (part.fmt === "underline")
            formatArray.push("text-decoration: underline");
        else if (part.fmt === "italic")
            formatArray.push("font-style: italic");
        else if (part.fmt === "strikethrough")
            formatArray.push("text-decoration: line-through");
        else
            formatArray.push(part.fmt);
    });
    //get the format for each part. If it's just a string, provide an empty string for no formatting
    return [message, ...formatArray];
}
const logHistory = [];
exports.logHistory = logHistory;
function logMessage(level, message) {
    const [lvlMsg, lvlFmt] = levelParts(level);
    const [msg, ...otherFmts] = logPartsToConsoleLogArray(message);
    if (logHistory.length > 200)
        logHistory.shift();
    logHistory.push((lvlMsg + " " + msg).replaceAll("%c", ""));
    return [`${lvlMsg}%c ${msg}`, lvlFmt, "", ...otherFmts];
    //first item is the message itself lvlMsg, format character, then the message with formatting characters inserted
    //next items are formats. The first format is for the level (INFO, DEBUG), the next format of "" to turn off formatting, 
    //then the formats provided by the logPartsToConsoleLogArray method
}
// return logging functions to be executed by the caller
function infoFn(...message) {
    const consoleLogParams = logMessage("INF", message);
    return window.console.log.bind(window.console, ...consoleLogParams);
    //These bind calls are necessary to keep the location of the log accurate (in chrome, the right side of the console window)
    //It has the rather unfortunate downside that you must then execute the returned function on the caller side, eg:
    //infoFn("log your stuff", " here")(); <-- note the extra parens at the end
}
function debugFn(...message) {
    const consoleLogParams = logMessage("DBG", message);
    return window.console.log.bind(window.console, ...consoleLogParams);
}
function warnFn(...message) {
    const consoleLogParams = logMessage("WRN", message);
    return window.console.log.bind(window.console, ...consoleLogParams);
}
function errorFn(...message) {
    const consoleLogParams = logMessage("ERR", message);
    return window.console.log.bind(window.console, ...consoleLogParams);
}
function objectLogFn(obj) {
    logMessage("INF", [JSON.stringify(obj)]);
    return window.console.log.bind(window.console, obj);
    //Sometimes you just want to straight log an object that the console window can browse through.
}
//alternate syntax, provide the arguments to console.log for the caller to log themselves
function debug(...message) {
    return logMessage("DBG", message);
    //all these functions do is provide the arguments for console.log. The caller is meant to use it like this:
    //console.log(...debug("log your stuff", "here"));
    //This also preserves the calling location in the console, but it's a bit wordier. However, it's more difficult
    //to call it wrong. (There's no final pair of () to forget);
}
function info(...message) {
    return logMessage("INF", message);
}
function warn(...message) {
    return logMessage("WRN", message);
}
function error(...message) {
    return logMessage("ERR", message);
}
// these are quick formatters, meant to be used with logging. You can decorate text in your console logs a little easier with this.
// examples: 
//              infoFn("This will log in ", b("BOLD"))();
// console.log(...info("This will log in ", b("BOLD")));
/* bold          */ function b(msg) { return { fmt: "bold", msg: msg || '' }; }
/* underline     */ function u(msg) { return { fmt: "underline", msg: msg || '' }; }
/* italics       */ function i(msg) { return { fmt: "italic", msg: msg || '' }; }
/* strikethrough */ function strike(msg) { return { fmt: "strikethrough", msg: msg || '' }; }
