const {program} = require('commander')
const fs = require('fs')
const path  = require('path')
const chalk = require('chalk');
var inquirer = require('inquirer')
const execa = require('execa')
const Listr = require('listr')
// const {spawn, exec} = require("child_process")
// import {projectInstall} from 'pkg-install'

import createProject from './create-project'

program.version('0.0.1')
program.command('init <name>').description('create a project with the name given').action((projectName)=>{
  console.log(chalk.bold(`init project named:${projectName}`))
  var questions=[
    {
      type:'list',
      name:'template',
      message:'Please choosse one tempalte',
      choices:['javascript','typescript'],
      default:'javascript'
    },
    {
      type:'confirm',
      name:'install',
      message:'would you want to auto install dependencys?',
      default:false
    }
  ]
  
  inquirer.prompt(questions).then(answers=>{
    // console.log('answers===>',answers)
    let {template,install} = answers;

      // exec('npm install',{cwd:path.resolve(process.cwd(),projectName)},()=>{
      //   console.log(`work complated`)
      // })

      // spawn('npm',['install'],{cwd:path.resolve(process.cwd(),projectName)}).stdout.pipe(process.stdout)

      /******* 使用pkg-install 安装依赖************/
      // (async()=>{
      //   const stdout = await projectInstall({
      //                     cwd:path.resolve(process.cwd(),projectName),
      //                     prefer:'npm'
      //                   })
      //   console.log(stdout);
      // })()


      /*********使用listr execa 安装依赖*********** */
      const tasks = new Listr([
        {
          title:'init project folder,create files',
          task:(ctx,task)=>{
            createProject(projectName,template,(err)=>{
              if(err){
                console.log('create project failed!!！')
              }
            })
          }
        },
        { 
          title:'Install package dependencies with yarn',
          task:(ctx, task) => execa('yarn',{
            cwd:path.resolve(process.cwd(),projectName),
          }).catch(()=>{
            ctx.yarn = false;
            task.skip('yarn is not availablle ,install via npm install')
          })
        },
        {
          title:'Install package dependencies with npm ',
          enabled: ctx => ctx.yarn === false,
          task:() => execa('npm', ['install'],{
            cwd:path.resolve(process.cwd(),projectName),
          })
        },
        {
          title:'all work done',
          task:(ctx,task)=>{
          }
        }
      ])

      tasks.run().catch(err=>{
        console.log(err)
      })

  })

})



// program.command('clone <source> [destination]')
// .description('clone a repository into a newly created directory')
// .action((source, destination) => {
//   console.log('clone command called',source,destination);
// });

// program.option('-d, --debug','output extra debugging')
// program.option('-n, --name <name>','create file name')//参数放<>里可以拿到值
// program.option('-c, --content <content>','create file with content')


//parse 要放到command下面执行
program.parse(process.argv);
const options = program.opts();
// console.log(chalk.blue('hello , my-cli'))
console.log(chalk.green(JSON.stringify(options)))


// if(options.name){
//     console.log('name===>',options.name)
//     console.log(`Current directory: ${process.cwd()}`);
//     const currentDir = process.cwd()
//     fs.writeFileSync(path.resolve(currentDir,options.name),options.content)
// }

