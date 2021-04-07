const  {  v4: uuidv4 } =  require ('uuid'); 
const moment = require ("moment");

const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'Examen',
    port: '5432'
});

const getReviews = async (req, res) => {
    const response = await pool.query('select * from reviews');
    res.status(200).json(response.rows);
};

const getReviewsbyslug = async (req, res) => {
    const slug = req.params.slug;
    const response = await pool.query('select * from reviews where slug = $1', [slug])
    res.json(response.rows);
}

const createReviews = async (req, res) => {
    const {restaurant, email, comments, rating} = req.body;
    const dateNow = Date.now();
    const created = [moment(dateNow).format("DD/MM/YYYY"), moment(dateNow).format("LT")];
    const slug = uuidv4();
    const response = await pool.query('insert into reviews (slug, restaurant, email, comments, rating, created) values ($1, $2, $3, $4, $5, $6)', [slug, restaurant, email, comments, rating, created]);
    res.json({
        message: 'Create Reviews Succesfully',
        body: {
            reviews: {slug, restaurant, email, comments, rating, created}
        }
    });
};

const updateReviews = async (req, res) => {
    const slug = req.params.slug;
    const {restaurant, email, comments, rating} = req.body;
    const response = await pool.query('update reviews set restaurant = $1, email = $2, comments = $3, rating = $4 where slug = $5', [restaurant, email, comments, rating, slug]);
    res.json({
        message: 'update type food Succesfully',
        body: {
            reviews: {slug, restaurant, email, comments, rating}
        }
    });
}

const deleteReviews = async (req, res) => {
    const slug = req.params.slug;
    const response = await pool.query('delete from reviews where slug = $1', [slug])
    res.json({
        message: 'Delete reviews Succesfully',
        body: {
            reviews: {slug}
        }
    });
}

module.exports = {
    getReviews, getReviewsbyslug, createReviews, updateReviews, deleteReviews
}