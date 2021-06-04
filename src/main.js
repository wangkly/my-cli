const {program} = require('commander')
const fs = require('fs')
const path  = require('path')
const chalk = require('chalk');
var inquirer = require('inquirer')
const execa = require('execa')
const Listr = require('listr')

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
      name:'toolkit',
      message:'would you want to use @reduxjs/toolkit ?',
      default:true
    },
    {
      type:'confirm',
      name:'install',
      message:'would you want to auto install dependencys?',
      default:true
    }
  ]
  
  inquirer.prompt(questions).then(answers => {
    let {template,toolkit,install} = answers;

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
          title:'init project, create folder & files',
          task:(ctx,task)=>{
            createProject(projectName,template,toolkit,(err)=>{
              if(err){
                console.log(chalk.red(`create project failed!!！err:${err}`))
              }
            })
          }
        },
      ])

      if(install == true){
        tasks.add({ 
          title:'Install package dependencies with yarn',
          task:(ctx, task) => execa('yarn',{
            cwd:path.resolve(process.cwd(),projectName),
          }).catch(()=>{
            ctx.yarn = false;
            task.skip('yarn is not availablle ,install via npm install')
          })
        }).add({
          title:'Install package dependencies with npm ',
          enabled: ctx => ctx.yarn === false,
          task:() => execa('npm', ['install'],{
            cwd:path.resolve(process.cwd(),projectName),
          })
        })
      }

      tasks.run().catch(err=>{
        console.log(chalk.red(`listr task run err:${err}`))
      }).finally(()=>{
        execa('echo',['have a nice day!']).stdout.pipe(process.stdout)
        // chalk.green('all done ,have a nice day!')
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
// const options = program.opts();

// console.log(chalk.green(JSON.stringify(options)))

