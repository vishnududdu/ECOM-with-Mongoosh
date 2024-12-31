import { ObjectId } from "mongodb";
import { cartSchema } from "./cartItems.schema.js";
import mongoose from "mongoose";

const CartModel = mongoose.model("CartItem", cartSchema);
export default class CartItemsRepository{

    async add(productID, userID, quantity){
        try{
            await CartModel.updateOne(
                {productID:new ObjectId(productID), userID:new ObjectId(userID)},
                {
                    $inc:{
                    quantity: quantity
                }},
                {upsert: true})

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async get(userID){
        try{
            return await CartModel.find({userID:new ObjectId(userID)});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async delete(userID, cartItemID){
        try{
            const result = await CartModel.deleteOne({_id: new ObjectId(cartItemID), userID: new ObjectId(userID)});
            return result.deletedCount>0;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }
}