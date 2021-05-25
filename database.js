const Pool = require('pg').Pool; //O sistema controla automaticamente a abertura e fechamento da conexão com o b.d

const pool = new Pool({
    user:'rcbnumepqwmxvs',
    password:'b71478b0ae05be7f0146a6c9bae3640bc05036210b5ea5e8a3ac4f702408c3e3',
    host:'ec2-3-212-75-25.compute-1.amazonaws.com',
    database:'df52rtcfrcrtpt',
    port: 5432,
    ssl:{rejectUnauthorized: false}
});

//const script = 'CREATE TABLE IF NOT EXISTS contatos ( ID serial primary key, nome varchar(60) not null, telefone varchar(20) not null)';

//pool.query(script, function(error, result){
//    if(error)
//        throw error;
//    
//    console.log('Tabela criada com sucesso');
//})

module.exports = {

    async create(nome, telefone){
        try{
            const sql = 'INSERT INTO contatos (nome, telefone) VALUES ($1, $2)';
            const result = await pool.query(sql,[nome, telefone]);
            return result.rows;
        }catch(error){
            console.log(error);
            return -1;
        }
    },

    async read(){
        const sql = 'SELECT * FROM contatos order by nome';
        const result = await pool.query(sql);
        return result.rows;
    }
}


    
