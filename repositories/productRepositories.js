const product = require('../models/productModel');

const get = (options) => {
    const {page, pageSize, sort, dir,search}  =  options;

    let direction;

  switch(dir.toLowerCase()) {
    case 'asc' :
        direction = 1;
         break;
    case 'desc' :
        direction = -1;
        break;
     default :
        direction = 1;
        break;         
   }; 
     let filter ={}; 

    if (search){
   filter ={
           $or: [{brand: { $regex: search, $options: 'i' } },
                 {model: { $regex: search, $options: 'i' } },
                 {category: { $regex: search, $options: 'i' } }]
   };
}
     return product
        .find(filter, {__v:0 })
        .sort({[sort]: direction})
        .skip((page-1)* pageSize)
        .limit(pageSize);

};

const getCount = (options) => {
    const { search } = options;
    let filter = {};

    if(search) {
        filter = {
            $0r: [{brand:{ $regex: search, $options: 'i' }},
                 {model: { $regex: search, $options: 'i' }},
                 {category: { $regex: search, $options: 'i' }}]
        };
    }

    return product.count({filter});
};
//we are amking url api in such a way it suits all this conditions api/product/page/1/size/10?search=''&sort&dir
const getById = (id) => {
    return product.findOne({_id:id}, {__v:0});
};

const create = (data) =>{
    const duck = new  product (data);
    return duck.save();
};

const remove = (id) =>{
    return product.deleteOne({_id:id});
};

const update = (id,body) =>{
    return product.findOneAndUpdate({_id:id}, {
        brand :body.brand,
        model :body.model,
        price : body.model,
        instock: body.instock,
        category : body.category,
    });
};

const patch = (id,body) =>{
    return product.findOneAndUpdate({_id:id},body);
};




module.exports = {
    get,
    getCount,
    create,
    getById,
    remove,
    update,
    patch
};