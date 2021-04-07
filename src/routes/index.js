const {Router} = require('express');
const router = Router();

const {getFoodtype, createFoodtype, getFoodtypeByslug, deleteFoodtype, updateFoodtype} = require('../controller/food_types/index.controller')

//#region endpoint food_types
router.get('/food_types', getFoodtype);
router.get('/food_types/:slug', getFoodtypeByslug);
router.post('/food_types', createFoodtype);
router.delete('/food_types/:slug', deleteFoodtype);
router.put('/food_types/:slug', updateFoodtype);
//#endregion

const {getReviews, getReviewsbyslug, createReviews, updateReviews, deleteReviews} = require('../controller/reviews/index.controller')

//#region endpoint reviews
router.get('/reviews', getReviews);
router.get('/reviews/:slug', getReviewsbyslug);
router.post('/reviews', createReviews);
router.delete('/reviews/:slug', deleteReviews);
router.put('/reviews/:slug', updateReviews);
//#endregion

const {getRestaurant, getRestaurantByslug, createRestaurant, updateRestaurant, deleteRestaurant} = require('../controller/restaurant/index.controller')

//#region endpoint restaurant
router.get('/restaurant', getRestaurant);
router.get('/restaurant/:slug', getRestaurantByslug);
router.post('/restaurant', createRestaurant);
router.delete('/restaurant/:slug', deleteRestaurant);
router.put('/restaurant/:slug', updateRestaurant);
//#endregion

module.exports = router;