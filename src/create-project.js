import * as fs from 'fs'
import path from 'path'
import * as ejs from 'ejs'


export default function createProject(projectName,type,callback){
    let currentDir = process.cwd()
    let workSpace = path.resolve(currentDir,projectName);
    fs.mkdir(workSpace,{recursive:true},(err)=>{
        if(err){
            callback(err)
        }
        // 创建src
        fs.mkdirSync(path.resolve(workSpace,'src'))
        
        //创建package.json
        ejs.renderFile(path.resolve(__dirname,'../templates/package.json.ejs'),{projectName,version:'1.1.1',author:'wangkly'},(err,str)=>{
            if(err){
                console.log('ejs err',err)
            }else{
                fs.writeFileSync(path.resolve(workSpace,'package.json'),str)
                callback()
            }
        })

        //复制webpack.config.js
        fs.createReadStream(path.resolve(__dirname,'../templates/webpack.config.js'))
        .pipe(fs.createWriteStream(path.resolve(workSpace,'webpack.config.js')))
        
        //复制babel.config.js
        fs.createReadStream(path.resolve(__dirname,'../templates/babel.config.js'))
            .pipe(fs.createWriteStream(path.resolve(workSpace,'babel.config.js')))
        
        //html模板
        fs.createReadStream(path.resolve(__dirname,'../templates/index.ejs'))
        .pipe(fs.createWriteStream(path.resolve(workSpace,'index.ejs')))

        //创建index.js
        fs.createReadStream(path.resolve(__dirname,'../templates/index.js'))
            .pipe(fs.createWriteStream(path.resolve(workSpace,'src/index.js')))
        
        //创建dashboard.js
        fs.createReadStream(path.resolve(__dirname,'../templates/dashboard.js'))
        .pipe(fs.createWriteStream(path.resolve(workSpace,'src/dashboard.js')))    

        //创建style/index.less
        fs.mkdir(path.resolve(workSpace,'style'),(err)=>{
            fs.writeFile(path.resolve(workSpace,'style/index.less'),`body{
                background-color:lightblue;
            }`,(err)=>{
                // console.log('创建style/index.less')
            
            })
        })

        //创建一个README.MD
        fs.writeFile(path.resolve(workSpace,'README.MD'),'Read Me',(err)=>{


        })




    })
}