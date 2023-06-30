// Modules to control application life and create native browser window
const {
    app,
    Menu,
    BrowserWindow,
    ipcMain,
    contextBridge
} = require("electron");
const path = require("path");
const fs = require("fs");
const log = require('electron-log'); // npm package will use to generate log files

var app_path = __dirname; // dir of main.js

/**
 * A NOTE IN CASE YOU WANT TO USE THIS LOGGING
 * APPROACH TO GENERATE LOGS IN PRODUCTION APPS
 * PACAKGED BY ELECTRON PACKAGER:
 *
 * Instead of using __dirname, you could use app.getAppPath;
 * it returns "current application directory"
 *  - if starting app with 'npm start', will be dir of main.js
 *  - if starting app via exe generated by electron packager,
 *    will be <app dir>/webapp/resources/app
 *    as that is where electron packager stores main.js
 *
 * https://stackoverflow.com/questions/40511744/where-is-electrons-app-getapppath-pointing-to
 */
//var app_path = app.getAppPath(); // "current application directory" (see note above)

// root log dir for all app runs (lives in same dir as this main.js)
var logdir = path.join(app_path, "logs");

// timestampped log dir for this specific app run
var currentdate = new Date();

function my_timestamp() {
    var options = {
        hour12: false
    };
    var datestr = currentdate.toLocaleString('en-US', options);
    datestr = datestr.replace(/\//g, "-");
    datestr = datestr.replace(", ", "_");
    datestr = datestr.replace(/:/g, "-");
    return datestr;
}
var ts = my_timestamp();

// create app run log dir if doesn't exist
// (recursive create, so will create root log dir
// first time this app runs)
var this_logdir = path.join(logdir, ts);
if (!fs.existsSync(this_logdir)) {
    fs.mkdirSync(this_logdir, {
        recursive: true
    });
}

// the individual log files
//   - one for main process (i.e., this file)
//   - one for renderer process (i.e. browser js/ files run by chromiu )
var renderer_logfile = path.join(this_logdir, "renderer_" + ts + ".txt");
var main_logfile = path.join(this_logdir, "main_" + ts + ".txt");

// add electron cmd parameters to enable logging the renderer logs
app.commandLine.appendSwitch('log-file', renderer_logfile);
app.commandLine.appendSwitch('enable-logging');
// use electron-log to enable logging for main process
log.transports.file.resolvePath = () => path.join(main_logfile);

// set log level (error, warn, info, verbose, debug, or silly)
// default is "silly" level which logs everything
log.transports.console.level = 'info';
log.transports.file.level = 'info';
// overwrite console.log and others and set it to electron-log's
Object.assign(console, log.functions);

console.log("Test regular console log - should still write on cmd terminal when running npm start, but won't appear in external log");
console.error("Test regular error log - should see this on cmd line, and should also appear in external log");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win; // main window

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false // turn off remote
        }
    });
    // and load the index.html of the app.
    win.loadFile(path.join(__dirname, "index.html"));
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    console.log("all closed");
    app.quit();
});