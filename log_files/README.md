# Dummy electron logging

## Overview

This is a basic electron example that shows how to generate log files for javascript console output during app runs.

* Creates a new timestampped directory each app run. (Root log dir is 'logs' in same dir as main.js; it will get created on the first run of this app.)
* Separate log files are genearted for the [main](https://www.electronjs.org/docs/latest/tutorial/process-model#the-main-process) and [renderer](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process) processes.
    * [Main process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-main-process): nodejs environment that manages the app (in this example, main.js)
    * [Renderer process](https://www.electronjs.org/docs/latest/tutorial/process-model#the-renderer-process): process for rendering web content (in this example, examplejs.js) _Note: electron spawns an individual renderer process for each BrowserWindow you create; in this example, just using a single renderer process and logfile._
* Uses lightweight npm package <a href="https://www.npmjs.com/package/electron-log" target="_blank">electron-log</a>
* Uses console.log statements just like normal; you won't need to change any existing console statements in your project. It simply maps those statements to the electron-log instance, by one line of code in main.js
* Console output still appears on your cmd where you are running npm start
* This example can be extended to be used in production apps packaged by [electron-packager](https://www.npmjs.com/package/electron-packager).

## To run example

Checkout this code.

In root dir for code (where `main.js` is contained), run:

```
npm install
npm start
```
