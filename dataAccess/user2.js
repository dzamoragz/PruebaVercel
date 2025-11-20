const {Pool}= require('pg');

//Conecion usando el database_url

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
});

async function sumarValores(valor1, valor2){
    const result = await pool.query('SELECT sumar_valores_fn($1, $2) AS resultado', [valor1, valor2]);
    return result.rows[0].resultado;
}

async function insertUserVLA(username, password, state) {
    const result = await pool.query('SELECT insert_user_vla_fn($1,$2,$3) AS pruebita', [username,password,state]);
    return result.rows[0].pruebita;
    
}

async function updateUserVLA(userId, password, state = true) {
    const result = await pool.query('SELECT update_user_vla_fn($1,$2,$3) AS pruebita', [userId,password,state]);
    return result.rows[0].pruebita;
    
}

async function existUser(username) {
    const result = await pool.query('SELECT user_vla_exist_fn($1) AS pruebita', [username]);
    return result.rows[0].pruebita;
    
}
module.exports = {
    sumarValores,
    insertUserVLA,
    updateUserVLA,
    existUser
};