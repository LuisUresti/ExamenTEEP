const  {  v4: uuidv4 } =  require ('uuid'); 

const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'Examen',
    port: '5432'
});

const getFoodtype = async (req, res) => {
    const response = await pool.query('select * from food_types');
    res.status(200).json(response.rows);
};

const getFoodtypeByslug = async (req, res) => {
    const slug = req.params.slug;
    const response = await pool.query('select * from food_types where slug = $1', [slug])
    res.json(response.rows);
}

const createFoodtype = async (req, res) => {
    const {name} = req.body;
    const slug = uuidv4();
    const response = await pool.query('insert into food_types (slug, name) values ($1, $2)', [slug, name]);
    res.json({
        message: 'Create type food Succesfully',
        body: {
            food_type: {slug, name}
        }
    });
};

const updateFoodtype = async (req, res) => {
    const slug = req.params.slug;
    const {name} = req.body;
    const response = await pool.query('update food_types set name = $1 where slug = $2', [name, slug]);
    res.json({
        message: 'update type food Succesfully',
        body: {
            food_type: {slug, name}
        }
    });
}

const deleteFoodtype = async (req, res) => {
    const slug = req.params.slug;
    const response = await pool.query('delete from food_types where slug = $1', [slug])
    res.json({
        message: 'Delete type food Succesfully',
        body: {
            food_type: {slug}
        }
    });
}

module.exports = {
    getFoodtype, createFoodtype, getFoodtypeByslug, deleteFoodtype, updateFoodtype
}