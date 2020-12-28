Babylonjs tests (c) mjt 2019-2020
---

* In src/index.ts, one can choose which test to run.

---
Uses https://github.com/pandadelphin/babylonjs-typescript-webpack-starter

## How to Start? ##

1. Download and Install Node.js
2. Open Commandline and Enter
```
npm install 
npm install kripken/ammo.js
npm install cannon
npm audit fix
npm update

npm start
```

3. Open Browser and Enter [http://localhost:8080](http://localhost:8080)

## Deployable Product Build ##
1. Build the app
```
npm run build
```
2. Deployable app is in dist folder now

You might need to (in windows)
  set NODE_OPTIONS=--max-old-space-size=8192
or (linux) 
  export NODE_OPTIONS="--max-old-space-size=8192"


If using vscode:
1. start vscode and open src/ directory
2. in vscode's terminal, write  npm start
3. now F5 starts browser
