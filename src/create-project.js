import * as fs from 'fs'
import path from 'path'
import * as ejs from 'ejs'
import chalk from 'chalk'
import os from 'os'


export default function createProject(projectName,type,toolkit,callback){
    let currentDir = process.cwd()
    let workSpace = path.resolve(currentDir,projectName);
    fs.mkdir(workSpace,{recursive:true},(err)=>{
        if(err){
            callback&&callback(err)
        }
        // 创建src
        fs.mkdirSync(path.resolve(workSpace,'src'))
        let userInfo = os.userInfo();
        let {username} = userInfo;
        //创建package.json
        ejs.renderFile(path.resolve(__dirname,'../templates/package.json.ejs'),{projectName,type,version:'1.1.1',author:username||'',toolkit},(err,str)=>{
            if(err){
                console.log(chalk.red(`create package.json failed, err:${err}`))
            }else{
                fs.writeFileSync(path.resolve(workSpace,'package.json'),str)
                callback()
            }
        })

        ejs.renderFile(path.resolve(__dirname,'../templates/webpack.config.js.ejs'),{type},(err,str)=>{
            if(err){
                console.log(chalk.red(`create webpack.config.js failed, err:${err}`))
            }else{
                fs.writeFileSync(path.resolve(workSpace,'webpack.config.js'),str)
                callback()
            }
        })

        ejs.renderFile(path.resolve(__dirname,'../templates/webpack.pro.config.js.ejs'),{type},(err,str)=>{
            if(err){
                console.log(chalk.red(`create wwebpack.pro.config.js failed, err:${err}`))
            }else{
                fs.writeFileSync(path.resolve(workSpace,'webpack.pro.config.js'),str)
                callback()
            }
        })
        
        //复制babel.config.js
        // fs.createReadStream(path.resolve(__dirname,'../templates/babel.config.js'))
        //     .pipe(fs.createWriteStream(path.resolve(workSpace,'babel.config.js')))

        ejs.renderFile(path.resolve(__dirname,'../templates/babel.config.js.ejs'),{type},(err,str)=>{
            if(err){
                console.log(chalk.red(`create babel.config.js failed, err:${err}`))
            }else{
                fs.writeFileSync(path.resolve(workSpace,'babel.config.js'),str)
                callback()
            }

        })    
        
        //html模板
        fs.createReadStream(path.resolve(__dirname,'../templates/index.ejs'))
        .pipe(fs.createWriteStream(path.resolve(workSpace,'index.ejs')))

        if(type == 'typescript'){
            //index.tsx
            fs.createReadStream(path.resolve(__dirname,'../templates/index.tsx'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/index.tsx')))

            //是否使用@reduxjs/toolkit    
            if(toolkit){
                fs.createReadStream(path.resolve(__dirname,'../templates/store-tookit.ts'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/store.ts')))

                fs.mkdir(path.resolve(workSpace,'src/reducers'),(err)=>{
                    if(!err){
                        //count_reducer.ts
                        fs.createReadStream(path.resolve(__dirname,'../templates/count.ts'))
                        .pipe(fs.createWriteStream(path.resolve(workSpace,'src/reducers/count.ts')))  
                    }
                })

                fs.createReadStream(path.resolve(__dirname,'../templates/hooks.ts'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/hooks.ts')))


                //saga.ts
                fs.createReadStream(path.resolve(__dirname,'../templates/saga-toolkit.ts'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/saga.ts')))

            }else{
                //store.ts
                fs.createReadStream(path.resolve(__dirname,'../templates/store.ts'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/store.ts')))

                fs.mkdir(path.resolve(workSpace,'src/reducers'),(err)=>{
                    if(!err){
                        //count_reducer.ts
                        fs.createReadStream(path.resolve(__dirname,'../templates/count_reducer.ts'))
                        .pipe(fs.createWriteStream(path.resolve(workSpace,'src/reducers/count_reducer.ts')))  
                    }
                })

                //saga.ts
                fs.createReadStream(path.resolve(__dirname,'../templates/saga.ts'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/saga.ts')))

            }    

            //创建dashboard.tsx
            fs.createReadStream(path.resolve(__dirname,'../templates/dashboard.tsx'))
            .pipe(fs.createWriteStream(path.resolve(workSpace,'src/dashboard.tsx')))    

        }else{
            //创建index.js
            fs.createReadStream(path.resolve(__dirname,'../templates/index.js'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/index.js')))

            if(toolkit){
                //store.js
                fs.createReadStream(path.resolve(__dirname,'../templates/store-tookit.js'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/store.js')))
                //saga.js
                fs.createReadStream(path.resolve(__dirname,'../templates/saga-toolkit.js'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/saga.js')))
    
                fs.mkdir(path.resolve(workSpace,'src/reducers'),(err)=>{
                    if(!err){
                        //count_reducer.js
                        fs.createReadStream(path.resolve(__dirname,'../templates/count.js'))
                        .pipe(fs.createWriteStream(path.resolve(workSpace,'src/reducers/count.js')))      
                    }
                })
            }else{
                //store.js
                fs.createReadStream(path.resolve(__dirname,'../templates/store.js'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/store.js')))
                //saga.js
                fs.createReadStream(path.resolve(__dirname,'../templates/saga.js'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'src/saga.js')))
    
                fs.mkdir(path.resolve(workSpace,'src/reducers'),(err)=>{
                    if(!err){
                        //count_reducer.js
                        fs.createReadStream(path.resolve(__dirname,'../templates/count_reducer.js'))
                        .pipe(fs.createWriteStream(path.resolve(workSpace,'src/reducers/count_reducer.js')))      
                    }
                })
            }    

            
            //创建dashboard.js
            fs.createReadStream(path.resolve(__dirname,'../templates/dashboard.js'))
            .pipe(fs.createWriteStream(path.resolve(workSpace,'src/dashboard.js')))    
        }

        //创建style/index.less
        fs.mkdir(path.resolve(workSpace,'style'),(err)=>{
            fs.writeFile(path.resolve(workSpace,'style/index.less'),`body{
                background-color:lightblue;
            }`,(err)=>{
                if(err){
                    console.log(chalk.red(`create style/index.less'  failed, err:${err}`))       
                }
            })
        })

        fs.createReadStream(path.resolve(__dirname,'../templates/.prettierrc.js')).pipe(
            fs.createWriteStream(path.resolve(workSpace,'.prettierrc.js'))
        )

        ejs.renderFile(path.resolve(__dirname,'../templates/.eslintrc.js.ejs'),{type},(err,str)=>{
            if(err){
                console.log(chalk.red(`create .eslintrc.js failed, err:${err}`))
            }else{
                fs.writeFileSync(path.resolve(workSpace,'.eslintrc.js'),str)
            }
        })

        fs.createReadStream(path.resolve(__dirname,'../templates/.eslintignore')).pipe(
            fs.createWriteStream(path.resolve(workSpace,'.eslintignore'))
        )

        if(type == 'typescript'){
            fs.createReadStream(path.resolve(__dirname,'../templates/tsconfig.json'))
                .pipe(fs.createWriteStream(path.resolve(workSpace,'tsconfig.json')))
        }

        //创建一个README.MD
        fs.writeFile(path.resolve(workSpace,'README.MD'),'Read Me',(err)=>{
            
        })
    })
}