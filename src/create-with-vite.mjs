import ora from "ora";
import chalk from "chalk";
import * as cp from "child_process";
import * as fs from "fs";
import * as ejs from "ejs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { spawn } = cp;

const options = {
  text: chalk.bold.green("init project with vite...\n"),
  spinner: "soccerHeader",
};

const spinner = ora(options);

const dependencies = [
  "redux",
  "react-redux",
  "react-router",
  "react-router-dom",
  "@reduxjs/toolkit",
  "redux-saga",
  "use-immer",
  "less",
  "redux-devtools-extension",
];

export default function createByVite(projectName, type, toolkit, install) {
  let currentDir = process.cwd();
  let workSpace = path.resolve(currentDir, projectName);

  let isYarn = true;
  let { error } = cp.spawnSync("yarn", ["-v"]);
  if (error) {
    isYarn = false;
  }

  let templateArgs = "react";
  if (type == "typescript") {
    templateArgs = "react-ts";
  }
  spinner.start();

  const initCmd = isYarn
    ? `yarn create vite ${projectName}`
    : `npm init vite@latest`;
  const args = isYarn
    ? ["--template", templateArgs]
    : ["--", "--template", templateArgs];

  const sp = spawn(initCmd, args, { shell: true });

  sp.on("close", (code) => {
    if (code == 0) {
      spinner.succeed("init success with vite");
      spinner.text = "copy some files...";
      spinner.start();

      //复制eslint prettier 配置文件
      fs.createReadStream(
        path.resolve(__dirname, "../templates/.prettierrc.js")
      ).pipe(fs.createWriteStream(path.resolve(workSpace, ".prettierrc.js")));

      ejs.renderFile(
        path.resolve(__dirname, "../templates/.eslintrc.js.ejs"),
        { type },
        (err, str) => {
          if (err) {
            console.log(chalk.red(`create .eslintrc.js failed, err:${err}`));
          } else {
            fs.writeFileSync(path.resolve(workSpace, ".eslintrc.js"), str);
          }
        }
      );

      fs.createReadStream(
        path.resolve(__dirname, "../templates/.eslintignore")
      ).pipe(fs.createWriteStream(path.resolve(workSpace, ".eslintignore")));

      //创建style/index.less
      fs.mkdir(path.resolve(workSpace, "style"), (err) => {
        fs.writeFile(
          path.resolve(workSpace, "style/index.less"),
          `body{
        background-color:lightblue;
    }`,
          (err) => {
            if (err) {
              console.log(
                chalk.red(`create style/index.less'  failed, err:${err}`)
              );
            }
          }
        );
      });

      //选的typescript
      if (type == "typescript") {
        fs.createReadStream(
          path.resolve(__dirname, "../templates/App.tsx")
        ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/App.tsx")));

        //创建dashboard.tsx
        fs.createReadStream(
          path.resolve(__dirname, "../templates/dashboard.tsx")
        ).pipe(
          fs.createWriteStream(path.resolve(workSpace, "src/dashboard.tsx"))
        );

        //是否使用@reduxjs/toolkit
        if (toolkit) {
          fs.createReadStream(
            path.resolve(__dirname, "../templates/store-tookit.ts")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/store.ts")));

          fs.mkdir(path.resolve(workSpace, "src/reducers"), (err) => {
            if (!err) {
              //count_reducer.ts
              fs.createReadStream(
                path.resolve(__dirname, "../templates/count.ts")
              ).pipe(
                fs.createWriteStream(
                  path.resolve(workSpace, "src/reducers/count.ts")
                )
              );
            }
          });

          fs.createReadStream(
            path.resolve(__dirname, "../templates/hooks.ts")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/hooks.ts")));

          //saga.ts
          fs.createReadStream(
            path.resolve(__dirname, "../templates/saga-toolkit.ts")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/saga.ts")));
        } else {
          //store.ts
          fs.createReadStream(
            path.resolve(__dirname, "../templates/store.ts")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/store.ts")));

          fs.mkdir(path.resolve(workSpace, "src/reducers"), (err) => {
            if (!err) {
              //count_reducer.ts
              fs.createReadStream(
                path.resolve(__dirname, "../templates/count_reducer.ts")
              ).pipe(
                fs.createWriteStream(
                  path.resolve(workSpace, "src/reducers/count_reducer.ts")
                )
              );
            }
          });

          //saga.ts
          fs.createReadStream(
            path.resolve(__dirname, "../templates/saga.ts")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/saga.ts")));
        }
      } else {
        // 选用javascript 模板
        fs.createReadStream(
          path.resolve(__dirname, "../templates/App.js")
        ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/App.jsx")));

        //创建dashboard.js
        fs.createReadStream(
          path.resolve(__dirname, "../templates/dashboard.js")
        ).pipe(
          fs.createWriteStream(path.resolve(workSpace, "src/dashboard.jsx"))
        );

        // 使用@reduxjs/toolkit
        if (toolkit) {
          //store.js
          fs.createReadStream(
            path.resolve(__dirname, "../templates/store-tookit.js")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/store.js")));
          //saga.js
          fs.createReadStream(
            path.resolve(__dirname, "../templates/saga-toolkit.js")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/saga.js")));

          fs.mkdir(path.resolve(workSpace, "src/reducers"), (err) => {
            if (!err) {
              //count_reducer.js
              fs.createReadStream(
                path.resolve(__dirname, "../templates/count.js")
              ).pipe(
                fs.createWriteStream(
                  path.resolve(workSpace, "src/reducers/count.js")
                )
              );
            }
          });
        } else {
          //store.js
          fs.createReadStream(
            path.resolve(__dirname, "../templates/store.js")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/store.js")));
          //saga.js
          fs.createReadStream(
            path.resolve(__dirname, "../templates/saga.js")
          ).pipe(fs.createWriteStream(path.resolve(workSpace, "src/saga.js")));

          fs.mkdir(path.resolve(workSpace, "src/reducers"), (err) => {
            if (!err) {
              //count_reducer.js
              fs.createReadStream(
                path.resolve(__dirname, "../templates/count_reducer.js")
              ).pipe(
                fs.createWriteStream(
                  path.resolve(workSpace, "src/reducers/count_reducer.js")
                )
              );
            }
          });
        }
      }

      spinner.succeed("file copied successful");
      spinner.text = chalk.green.bold("add dependency...");
      spinner.start();

      const addCmd = isYarn ? "yarn add" : "npm install";
      const chp = spawn(addCmd, dependencies, {
        shell: true,
        cwd: path.resolve(workSpace),
      });
      chp.on("close", (code, signal) => {
        // console.log("chp complete", code);
        if (code == 0) {
          spinner.succeed("dependency added successful");
        }

        // 修改项目文件
        if (install) {
          spinner.text = "install dependencies...";
          spinner.start();
          const cmd = isYarn ? "yarn" : "npm install";
          const sp2 = spawn(cmd, {
            shell: true,
            cwd: path.resolve(workSpace),
          });

          sp2.on("close", (code, signal) => {
            if (code == 0) {
              spinner.succeed("install dependency succeed");
            }
            console.log(chalk.green.bold("all work done ,have a nice day!"));
          });
        }
      });

      chp.stdout.on("error", (err) => {
        console.log(chalk.red.bold(`get err ${err}`));
      });
    }
  });

  sp.on("error", (err) => {
    console.error(err);
    spinner.fail("get some error");
  });
}
