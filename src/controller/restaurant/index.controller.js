const  {  v4: uuidv4 } =  require ('uuid'); 

const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'Examen',
    port: '5432'
});

const getRestaurant = async (req, res) => {
    const response = await pool.query('select * from restaurant');
    var slugRes;
    const Array=[];
        for(var x = 0; x < response.rowCount; x++)
        {
            slugRes = response.rows[x].slug;
            const response1 = await pool.query('select * from reviews where restaurant = $1', [slugRes]);
            if(response1.rowCount >= 1)
            {
                var promedioTemp=0,promedioGnal=0;
                response1.rows.forEach(element => {
                    promedioTemp= promedioTemp+ element.rating;
                });
                promedioGnal = promedioTemp/response.rowCount;
                const resultRest= {
                    slug:response.rows[x].slug,
                    name:response.rows[x].name,
                    description:response.rows[x].description,
                    logo: response.rows[x].logo,
                    rating: promedioGnal,
                    food_type: response.rows[x].food_type,
                    reviews:JSON.stringify(response1.rows),
                };
                Array.push(resultRest);
            }
            else{
                const resultRest= {
                    slug:response.rows[x].slug,
                    name:response.rows[x].name,
                    description:response.rows[x].description,
                    logo: response.rows[x].logo,
                    rating: null,
                    food_type: response.rows[x].food_type,
                    reviews:null,
                };
                Array.push(resultRest);
            }
        }
    res.status(200).json(Array)
};

const getRestaurantByslug = async (req, res) => {
    const slug = req.params.slug;
    const response = await pool.query('select * from restaurant where slug = $1', [slug])
    res.json(response.rows);
}

const createRestaurant = async (req, res) => {
    const {name, description, logo, rating, food_type} = req.body;
    const slug = uuidv4();
    const response = await pool.query('insert into restaurant (slug, name, description, logo, rating, food_type) values ($1, $2, $3, $4, $5, $6)', [slug, name, description, logo, rating, food_type]);
    res.json({
        message: 'Create restaurant Succesfully',
        body: {
            food_type: {slug, name, description, logo, rating, food_type}
        }
    });
};

const updateRestaurant = async (req, res) => {
    const slug = req.params.slug;
    const {name, description, logo, rating, food_type} = req.body;
    const response = await pool.query('update restaurant set name = $1, description = $2, logo = $3, rating = $4, food_type = $5 where slug = $6', [name, description, logo, rating, food_type, slug]);
    res.json({
        message: 'update restaurant Succesfully',
        body: {
            food_type: {slug, name, description, logo, food_type, rating}
        }
    });
}

const deleteRestaurant = async (req, res) => {
    const slug = req.params.slug;
    const response = await pool.query('delete from restaurant where slug = $1', [slug])
    res.json({
        message: 'Delete restaurant Succesfully',
        body: {
            food_type: {slug}
        }
    });
}

module.exports = {
    getRestaurant, getRestaurantByslug, createRestaurant, updateRestaurant, deleteRestaurant
}