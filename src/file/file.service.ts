import { Injectable } from "@nestjs/common";
import { existsSync, mkdirSync, writeFile } from "fs";
import { extname, join, resolve } from "path";
import config from "src/config";
import { catchError } from "src/utils/catch-error";
import { v4 } from "uuid";

@Injectable()
export class FileService{
    private readonly baseUrl = config.BASE_URL;
    private readonly filePath=resolve(__dirname,'..','..','..','uploads')

    async createFile(file:Express.Multer.File){
        try {
            const ext=extname(file.originalname)
            const fileName=`${file.originalname.split('.')[0]}_${v4()}${ext}`
            if(!existsSync(this.filePath)){
                mkdirSync(this.filePath,{recursive:true})
            }
            await new Promise<void>((res,rej)=>{
                writeFile(join(this.filePath,fileName),file.buffer,(err)=>{
                    if(err) rej(err)
                        res()
                })
            })
            return `${this.baseUrl}${fileName}`
        } catch (error) {
            return catchError(error)
        }
    }

    async deleteFile(fileName:string):Promise<void>{
        
    }

}