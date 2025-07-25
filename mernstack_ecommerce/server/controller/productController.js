const { exists } = require("../models/categoryModels");
const Products = require("../models/productModel");
const qs = require('qs');

// filter , sorting and pagination

class APIfeatures{
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Transform operators into MongoDB format
        for (let key in queryObj) {
        if (typeof queryObj[key] === 'object') {
            for (let op in queryObj[key]) {
            const value = queryObj[key][op];
            const mongoOp = `$${op}`;
            queryObj[key][mongoOp] = isNaN(value) ? value : Number(value); // number if applicable
            delete queryObj[key][op];
            }
        }
        }

        console.log("Mongo Filter:", queryObj);
        this.query = this.query.find(queryObj);
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
        } else {
        this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
    
}

const productController ={
    getProducts: async (req, res) => {
        try {
            const parsedQuery = qs.parse(req._parsedUrl.query);
            console.log("Parsed Query:", parsedQuery);

            const features = new APIfeatures(Products.find(), parsedQuery)
            .filtering()
            .sorting()
            .pagination();

            const products = await features.query;

            res.json({
            result: products.length,
            products
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createProducts: async (req,res)=>{
        try {

            const {product_id,title,price,description,content,images,category} = req.body;
            

            if(!images) return res.status(400).json({msg:"no image"})
            
            const product = await Products.findOne({product_id})

            if(product)
                return res.status(400).json({msg:"product already exists"})

            

            const newProduct = new Products({
                product_id, title : title.toLowerCase(),price,description,content,images,category
            })

            await newProduct.save();

            res.json({msg:"product is created"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteProduct:async(req,res)=>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg:"product deleted successfully"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    updateProduct:async(req,res) => {
        try {
            const {title,price,description,content,images,category} = req.body;
            
            if(!images) return res.status(500).json({msg:"No image upload"})

            await Products.findByIdAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),price,description,content,images,category
            })

            res.json({msg:"product updated"})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = productController