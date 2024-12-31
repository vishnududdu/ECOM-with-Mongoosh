import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";
import { productSchema } from "../features/product/product.schema.js";

dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");
        addCategories();
        createIndexes();
    }catch(err){
        console.log("Error while connecting to db");
        console.log(err);
    }
}

async function addCategories(){
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = CategoryModel.find();
    if(!categories || (await categories).length==0){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothing'},{name:'Electronics'}])
    }
    console.log("Categories added");
}

async function createIndexes(){
    try{
        const ProductModel = mongoose.model("Product", productSchema);
        await ProductModel.createIndexes();
    }catch(err){
        console.log(err);
    }
    console.log("Indexes are created");
}