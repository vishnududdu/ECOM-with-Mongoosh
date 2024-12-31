
import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    inStock: Number,
    imageUrl:String,
    sizes:[String],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
});

productSchema.index({price:1});
productSchema.index({name:1, category:-1});
productSchema.index({desc:"text"});