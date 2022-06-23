const Review = require('../models/reviewModel');

const create = (data) => {

    const review = new Review(data);
    return review.save();

};

const getReviewByProductId = (productId) => {
    return Review.find({ productId}, {__v:0, _id:0});

};


module.exports = {create,
    getReviewByProductId
};