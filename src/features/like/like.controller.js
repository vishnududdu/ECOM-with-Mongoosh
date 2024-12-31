import { LikeRepository } from "./like.repository.js";


export class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async getLikes(req, res, next){
        try{
            const {id, type} = req.query;
            const likes = await this.likeRepository.getLikes(type, id);
            return res.status(200).send(likes)
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }

    async likeItem(req, res){
        try{
            const {id, type} = req.body;
            if(type!='Product' && type!='Category'){
                return res.status(400).send("Invalid");
            }
            let result="";
            if(type=='Product'){
                result=await this.likeRepository.likeProduct(req.userID, id);
            }else{
                result=await this.likeRepository.likeCategory(req.userID, id);    
            }
            return res.status(201).send(result);
        }catch(err){
            console.log(err);
            return res.status(200).send("Something went wrong");
          }
    }
}