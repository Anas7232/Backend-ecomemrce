const Product = require('../../models/product');
const Category = require('../../models/category');

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

exports.initialData = async (req, res) => {

    const categories = await Category.find({}).exec();
    const products = await Product.find({}).select(' _id name price quantity description category productPicture ').populate({ path: 'category',select: '_id name' }).exec()
    res.status(200).json({
        categories: createCategories(categories),
        products
    })

}