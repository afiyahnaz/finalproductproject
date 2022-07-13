// const productModel = require('../models/productModel');
const productRepositories = require('../repositories/productRepositories');
const reviewRepository = require('../repositories/reviewRepository');
const logger = require('../utils/appLogger'); // request
// logger request application INFO, WARN ERROR, DEBUG
const getOptions = req =>{

    const pageSize = +req.params.size || 10;
    const page = +req.params.page || 1 ;

    let sort = req.query.sort;
    let dir = req.query.dir || '';
    const search = req.query.search || '';

    if(!sort) {
        sort = 'updatedAt';
        if(!dir){
            dir = 'DESC'
        }
    }
    return {
        page,
         pageSize,
         sort,
         dir,
         search
    };

};

          

  // http://localhost:3000/api/products/page/1/size/10?sort=name&dir=desc         
  const get = async (req,res) => { 
    logger.info('Get Request Made');

    try{
           
            const options = getOptions(req);
            const data= await  productRepositories.get(options);
            const totalRecords = await  productRepositories.getCount(options);
            const totalPages = Math.ceil(totalRecords/ options.pageSize);

            const response ={
                metadata:{
                    totalRecords,
                    totalPages,
                },
                data,
            };

            logger.info( {msg: 'data successfully fetched', data: data});

            res.status(200);
             res.json(response);
    } catch (err) {
        console.log(err);
               res.status(500);
                res.send('Internal server error');
    }
};

//getById http://localhost/api/product/:id
const getById = async (req,res) =>{
    const id = req.params.id;
    const duck = await  productRepositories.getById(id);
    const reviews = await reviewRepository. getReviewByProductId(id);
    const ratingRes = await reviewRepository.getAvgRating(id);
    
    const jsonProduct = duck.toJSON();
    jsonProduct.reviews = reviews;
    const avgRating = ratingRes && ratingRes.length ? ratingRes[0].avgRating : undefined;
    jsonProduct.avgRating =   avgRating;

    res.status(200);
    res.json( jsonProduct);
};


//POST http://localhost/api/product

const post = async (req,res) =>{
    try{ 
        req.body.createdAt = new Date();
        await  productRepositories.create(req.body);
        res.status(201);
        res.send();    
}catch(err){
    logger.error(err);
    if(err && err.message.indexOf('validation failed') > -1 ) {
        res.status(400);
        res.send(err);
    }else{
        res.status(500);
        res.send('Internal server error');

    }     
}
};
//DELETE http://localhost:3000/api/product/:id

const remove = async (req,res) =>{
    const id = req.params.id;
    await  productRepositories.remove(id);

    res.status(204);
    res.send();
};


//PUT http://localhost/api/product:id {body}
const update = async(req,res) => {
    const {id} = req.params;
    const {body} = req;

    await  productRepositories.update(id,body);

    res.status(204);
    res.send();
};

//PATCH http://localhost:3000/api/product/:id

const patch = async (req,res) => {
    const {id} = req.params;
    const {body} = req;
    await productRepositories.patch(id, body);
    res.status(204);
    res.send();
};

module.exports = {
    get,
    post,
    getById,
    remove,
    update,
    patch
};