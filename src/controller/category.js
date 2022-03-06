const Category = require('../models/category');
const slugify = require('slugify');


function createCategories(categories, parentId = null){

    let myCategories = [];
    let category;

    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category= categories.filter(cat => cat.parentId == parentId)
    };

    for(let cate of category){
        myCategories.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        })
    }
    return myCategories;

}


exports.addCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    };

    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    const category = new Category(categoryObj);
    category.save((error, category) => {
        if(error) return res.status(400).json({ error });
        if(category){
            res.status(200).json({ category })
        }
    })

}

exports.getAllCategory = (req, res) => {

    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({ error });
        if(categories){

            const categoryList = createCategories(categories)

            return res.status(201).json({ categoryList })
        }
    })

}