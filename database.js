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

//CRIAÇAO TABELAS NO BANCO
//USUARIOS - const script = 'create table usuarios (id_usuario serial, login varchar (20) not null unique, senha varchar (20) not null, email varchar (50) not null unique, tipo bit not null, primary key(id_usuario))'; //tipo: -- 0 = cliente / 1 = empresa

//CLIENTES - const script = 'CREATE TABLE IF NOT EXISTS clientes (id_cliente int not null, nome_cliente varchar (100), telefone varchar (12), primary key (id_cliente), foreign key (id_cliente) references usuarios (id_usuario))'

//EMPRESAS - const script = 'CREATE TABLE IF NOT EXISTS empresas (id_empresa int not null, nome_empresa varchar (100) not null, descricao varchar (500) not null, telefone_um varchar (12) not null, telefone_dois varchar (12), estado varchar (100) not null, cidade varchar (500) not null, endereco varchar (500) not null, primary key (id_empresa), foreign key (id_empresa) references usuarios (id_usuario))' 


//OBRAS - const script = 'CREATE TABLE IF NOT EXISTS obras (id_obra serial, id_empresa int not null, nome_obra varchar (100) not null, data_inicio date not null, data_termino date not null, orcamento money, nome_cliente varchar (100) not null, telefone_cliente varchar (12) not null, estado_obra varchar (100) not null, cidade_obra varchar (500) not null, endereco_obra varchar (500) not null, status_obra int not null, primary key (id_obra), foreign key (id_empresa) references empresas (id_empresa))' //status_obra: -- 0 = agendada, 1 = em andamento, 2 = finalizada

//ETAPAS -

//CRIAÇAO PROCEDURES
//Clientes ================================
//const script = 'CREATE OR REPLACE FUNCTION addCliente (login varchar (20), senha varchar (20), email varchar(50), tipo bit, nome_cliente varchar (100), telefone varchar (12)) RETURNS void AS $$ BEGIN INSERT INTO usuarios VALUES (DEFAULT, login, senha, email, tipo); INSERT INTO clientes VALUES (LASTVAL(), nome_cliente, telefone); END $$ LANGUAGE plpgsql';
//const script = 'CREATE OR REPLACE FUNCTION addsCliente (login varchar (20), senha varchar (20), email varchar(50), tipo bit, nome_cliente varchar (100), telefone varchar (12)) RETURNS void AS $$ BEGIN INSERT INTO usuarios VALUES (DEFAULT, login, senha, email, tipo); INSERT INTO clientes VALUES (LASTVAL(), nome_cliente, telefone); END $$ LANGUAGE plpgsql';

//const script = `CREATE OR REPLACE FUNCTION updCliente (id int, nova_senha varchar (20), novo_email varchar(50), novo_nome_cliente varchar (100), novo_telefone varchar (12)) RETURNS void AS $$ BEGIN UPDATE usuarios SET senha = nova_senha, email = novo_email WHERE id_usuario = id; UPDATE clientes SET nome_cliente = novo_nome_cliente, telefone = novo_telefone WHERE id_cliente = id; END $$ LANGUAGE plpgsql`;

//const script = 'CREATE OR REPLACE FUNCTION delCliente (id int) RETURNS void AS $$ BEGIN DELETE FROM clientes WHERE id_cliente = id; DELETE FROM usuarios WHERE id_usuario = id; END $$ LANGUAGE plpgsql';

//Empresas ================================
//const script = 'CREATE OR REPLACE FUNCTION addEmpresa (login varchar (20), senha varchar (20), email varchar(50), tipo bit, nome_empresa varchar (100), descricao varchar (500), telefone_um varchar (12), telefone_dois varchar (12), estado varchar (100), cidade varchar (500), endereco varchar (500)) RETURNS void AS $$ BEGIN INSERT INTO usuarios VALUES (DEFAULT, login, senha, email, tipo); INSERT INTO empresas VALUES (LASTVAL(), nome_empresa, descricao, telefone_um, telefone_dois, estado, cidade, endereco); END $$ LANGUAGE plpgsql';

//const script = 'CREATE OR REPLACE FUNCTION updEmpresa (id int, nova_senha varchar (20), novo_email varchar(50), novo_nome_empresa varchar (100), nova_descricao varchar (500), novo_telefone_um varchar (12), novo_telefone_dois varchar (12), novo_estado varchar (100), nova_cidade varchar (500), novo_endereco varchar (500)) RETURNS void AS $$ BEGIN UPDATE usuarios SET senha = nova_senha, email = novo_email WHERE id_usuario = id; UPDATE empresas SET nome_empresa = novo_nome_empresa, descricao = nova_descricao, telefone_um = novo_telefone_um, telefone_dois = novo_telefone_dois, estado = novo_estado, cidade = nova_cidade, endereco = novo_endereco WHERE id_empresa = id; END $$ LANGUAGE plpgsql';

//const script = 'CREATE OR REPLACE FUNCTION delEmpresa (id int) RETURNS void AS $$ BEGIN DELETE FROM empresas WHERE id_empresa = id; DELETE FROM usuarios WHERE id_usuario = id; END $$ LANGUAGE plpgsql';

//Obras ====================================
//const script = 'CREATE OR REPLACE FUNCTION addObra (id_empresa int, nome_obra varchar (100), data_inicio date, data_termino date, orcamento money, nome_cliente varchar (100), telefone_cliente varchar (12), estado_obra varchar (100), cidade_obra varchar (500), endereco_obra varchar (500), status_obra int) RETURNS void AS $$ BEGIN INSERT INTO obras VALUES (DEFAULT, id_empresa, nome_obra, data_inicio, data_termino, orcamento, nome_cliente, telefone_cliente, estado_obra, cidade_obra, endereco_obra, status_obra); END $$ LANGUAGE plpgsql';

//const script = 'CREATE OR REPLACE FUNCTION updObra (id int, new_nome_obra varchar (100), new_data_inicio date, new_data_termino date, new_orcamento money, new_nome_cliente varchar (100), new_telefone_cliente varchar (12), new_estado_obra varchar (100), new_cidade_obra varchar (500), new_endereco_obra varchar (500), new_status_obra int) RETURNS void AS $$ BEGIN UPDATE obras SET nome_obra = new_nome_obra, data_inicio = new_data_inicio, data_termino = new_data_termino, orcamento = new_orcamento, nome_cliente = new_nome_cliente, telefone_cliente = new_telefone_cliente, estado_obra = new_estado_obra, cidade_obra = new_cidade_obra, endereco_obra = new_endereco_obra, status_obra = new_status_obra WHERE id_obra = id; END $$ LANGUAGE plpgsql';



  /* pool.query(script, function(error, result){
    if(error)
        throw error;
    
    console.log('Tabela criada com sucesso');
}) */  

   /* pool.query(script, function(error, result){
    if(error)
        throw error;
    
    console.log('Procedure criada com sucesso');
})  */ 


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
    },

    async find(id){
        const sql = 'SELECT * FROM contatos WHERE ID = $1';
        const result = await pool.query(sql,[id]);
        return result.rows;
    }, 

    async update(id, nome, telefone){
        const sql = 'UPDATE contatos SET nome = $1, telefone = $2 WHERE ID = $3';
        const result = await pool.query(sql,[nome, telefone, id]);
        return result.rows;
    },

    async delete(id){
        const sql = 'DELETE FROM contatos WHERE ID = $1';
        const result = await pool.query(sql,[id]);
        return result.rows;
    },

    //============ CLIENTE ==================================================
    //MODULO DE CRIAÇÃO DO CLIENTE
    async createCliente(login, senha, email, tipo, nome_cliente, telefone){
        try{
            const sql = 'SELECT addsCliente ($1, $2, $3, $4, $5, $6)';
            const result = await pool.query(sql,[login, senha, email, tipo, nome_cliente, telefone]);
            return result.rows;
        }catch(error){
            console.log(error);
            return -1;
        }
    },

    
    //MODULO DE LEITURA DO USUARIO + CLIENTE
    async readCliente(){
        const sql = 'SELECT * FROM usuarios INNER JOIN clientes ON usuarios.id_usuario = clientes.id_cliente';
        const result = await pool.query(sql);
        return result.rows;
    },

    //MODULO DE UPDATE DO USUARIO + CLIENTE
    async upCliente(id, nova_senha, novo_email, novo_nome, novo_telefone){
        const sql = 'SELECT updCliente ($1, $2, $3, $4, $5)';
        const result = await pool.query(sql,[id, nova_senha, novo_email, novo_nome, novo_telefone]);
        return result.rows;
    },

    //MODULO DE DELETE DO USUARIO + CLIENTE
    async deleteCliente(id){
        const sql = 'SELECT delCliente ($1)';
        const result = await pool.query(sql,[id]);
        return result.rows;
    },

    //============ EMPRESA ==================================================
    
    //MODULO DE CRIAÇAO DE EMPRESA
    async createEmpresa(login, senha, email, tipo, nome_empresa, descricao, telefone_um, telefone_dois, estado, cidade, endereco){
        try{
            const sql = 'SELECT addEmpresa ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
            const result = await pool.query(sql,[login, senha, email, tipo, nome_empresa, descricao, telefone_um, telefone_dois, estado, cidade, endereco]);
            return result.rows;
        }catch(error){
            console.log(error);
            return -1;
        }
    },

    //MODULO DE LEITURA DO USUARIO + EMPRESA
    async readEmpresa(){
        const sql = 'SELECT * FROM usuarios INNER JOIN empresas ON usuarios.id_usuario = empresas.id_empresa';
        const result = await pool.query(sql);
        return result.rows;
    },

    //MODULO DE UPDATE DA EMPRESA
    async upEmpresa(id, nova_senha, novo_email,novo_nome_empresa, nova_descricao, novo_telefone_um, novo_telefone_dois, novo_estado, nova_cidade, novo_endereco){
        const sql = 'SELECT updEmpresa ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const result = await pool.query(sql,[id, nova_senha, novo_email,novo_nome_empresa, nova_descricao, novo_telefone_um, novo_telefone_dois, novo_estado, nova_cidade, novo_endereco]);
        return result.rows;
    },

    //MODULO DE DELETE DA EMPRESA
    async deleteEmpresa(id){
        const sql = 'SELECT delEmpresa ($1)';
        const result = await pool.query(sql,[id]);
        return result.rows;
    },

    //============ OBRAS ==================================================
    //MODULO CRIAÇAO DE OBRAS
    async createObra(id_empresa, nome_obra, data_inicio, data_termino, orcamento, nome_cliente, telefone_cliente, estado_obra, cidade_obra,  endereco_obra, status_obra){
        try{
            const sql = 'SELECT addObra ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
            const result = await pool.query(sql,[id_empresa, nome_obra, data_inicio, data_termino, orcamento, nome_cliente, telefone_cliente, estado_obra, cidade_obra,  endereco_obra, status_obra]);
            return result.rows;
        }catch(error){
            console.log(error);
            return -1;
        }
    },

    //MODULO LEITURA DE OBRAS
    async readObra(){
        const sql = 'SELECT * FROM obras';
        const result = await pool.query(sql);
        return result.rows;
    },

    //MODULO UPDATE DE OBRAS
    async upObras(id, new_nome_obra, new_data_inicio, new_data_termino, new_orcamento, new_nome_cliente, new_telefone_cliente, new_estado_obra, new_cidade_obra, new_endereco_obra, new_status_obra){
        const sql = 'SELECT updObra ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const result = await pool.query(sql,[id, new_nome_obra, new_data_inicio, new_data_termino, new_orcamento, new_nome_cliente, new_telefone_cliente, new_estado_obra, new_cidade_obra, new_endereco_obra, new_status_obra]);
        return result.rows;
    },

    //MODULO DE DELETE DE OBRAS
    async deleteObra(id){
        const sql = 'DELETE FROM obras WHERE id_obra= $1';
        const result = await pool.query(sql,[id]);
        return result.rows;
    },

    //============ ETAPAS ==================================================
}


    
