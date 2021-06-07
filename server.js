const express = require('express'); //import express;
const server = express();
const cors = require('cors');

const database = require('./database');

//middleware, são como camadas, que o script ira executar entre os metodos, no caso esse permite que o express utilize o formato json em seus metodos
server.use(express.json())
server.use(cors())

// HTTP REST
//GET (OBTER UM RECURSO JSON) RESPONSAVEL POR LER UMA INFORMAÇÃO DA API - READ
//POST (ADICIONAR UM RECURSO) RESPONSAVEL POR CRIAR UMA INFORMAÇÃO  - CREATE
//PUT (ATUALIZA UM RECURSO) RESPONSAVEL POR ATUALIZAR UMA INFORMAÇÃO - UPDATE
//DELETE (APAGA UM RECURSO) RESPONSAVEL POR APAGAR UM RECURSO - DELETE


// localhost:3000/
/* server.get('/:contatos', async function(request, response) { //request vem do cliente para o servidor, response vem do servidor para o cliente


    // /?nome=thiago (informação passada pela url) - request.query
    // produto/1 (informação tbm passada pela url) - request.params
    // corpo da mensagem - request.body (JSON)

    const contatos = await database.read();
    response.json(contatos);
}) */

//localhost:3000/1
/* server.get('/:id', async function(request, response) { //consultando pelo id
    const id = request.params.id;
    const contato = await database.find(id);
    response.json(contato);
}) */

/* server.post('/:contato', async function(request, response){
    const {nome, telefone} = request.body;

    const result = await database.create(nome, telefone);
    
    //contatos.push(contato); //adiciona o contato a lista de contato, semelhante ao append

    response.status(201).send();

}) */

/* server.put('/:id', async function (request,response){
    const id = request.params.id;
    const nome = request.body.nome;
    const telefone = request.body.telefone;

    const result = await database.update(id, nome, telefone);
    response.status(200).send(); //a maneira ideal seria verificar as linhas afetadas e retornar uma mensagem de erro ou sucesso
}) */


/* server.delete('/:id', async function (request, response){
    const id = request.params.id;

    const result = await database.delete(id);
    response.status(200).send();//ideal colocar o delete e update dentro de try/catch para tratar excessões
}) */

//============ CLIENTE ==================================================
//CRIAR CLIENTE
server.post('/cliente', async function(request, response){
    const {login, senha, email, tipo, nome_cliente, telefone} = request.body;

    const result = await database.createCliente(login, senha, email,tipo, nome_cliente, telefone);

    response.status(201).send();
})

//LER USUARIO + CLIENTE
server.get('/cliente', async function(request, response){
    const clientes = await database.readCliente();
    response.json(clientes);
})

//ATUALIZAR USUARIO + CLIENTE
server.put('/cliente/:id', async function (request,response){
    const id = request.params.id;
    const {nova_senha, novo_email, novo_nome, novo_telefone} = request.body;

    const result = await database.upCliente(id, nova_senha, novo_email, novo_nome, novo_telefone);
    response.status(200).send(); //a maneira ideal seria verificar as linhas afetadas e retornar uma mensagem de erro ou sucesso
})

//DELETE USUARIO + CLIENTE
server.delete('/cliente/:id', async function (request, response){
    const id = request.params.id;

    const result = await database.deleteCliente(id);
    response.status(200).send();//ideal colocar o delete e update dentro de try/catch para tratar excessões
})

//============ EMPRESA ==================================================
//CRIAR EMPRESA
server.post('/empresa', async function(request, response){
    const {login, senha, email, tipo, nome_empresa, descricao, telefone_um, telefone_dois, estado, cidade, endereco} = request.body;

    const result = await database.createEmpresa(login, senha, email, tipo, nome_empresa, descricao, telefone_um, telefone_dois, estado, cidade, endereco);

    response.status(201).send();
})

//LER USUARIO + EMPRESA
server.get('/empresa', async function(request, response){
    const empresas = await database.readEmpresa();
    response.json(empresas);
})

//UPDATE USUARIO + EMPRESA
server.put('/empresa/:id', async function (request,response){
    const id = request.params.id;
    const {nova_senha, novo_email,novo_nome_empresa, nova_descricao, novo_telefone_um, novo_telefone_dois, novo_estado, nova_cidade, novo_endereco} = request.body;

    const result = await database.upEmpresa(id, nova_senha, novo_email,novo_nome_empresa, nova_descricao, novo_telefone_um, novo_telefone_dois, novo_estado, nova_cidade, novo_endereco);
    response.status(200).send(); //a maneira ideal seria verificar as linhas afetadas e retornar uma mensagem de erro ou sucesso
})

//DELETE USUARIO + EMPRESA
server.delete('/empresa/:id', async function (request, response){
    const id = request.params.id;

    const result = await database.deleteEmpresa(id);
    response.status(200).send();//ideal colocar o delete e update dentro de try/catch para tratar excessões
})

//============ OBRA ==================================================
//CRIAÇAO DE OBRAS
server.post('/obra', async function(request, response){
    const id_empresa = request.params.id;
    const {nome_obra, data_inicio, data_termino, orcamento, nome_cliente, telefone_cliente, estado_obra, cidade_obra,  endereco_obra, status_obra} = request.body;

    const result = await database.createObra(id_empresa, nome_obra, data_inicio, data_termino, orcamento, nome_cliente, telefone_cliente, estado_obra, cidade_obra,  endereco_obra, status_obra);

    response.status(201).send();
})

//LEITURA DE OBRAS
server.get('/obra', async function(request, response){
    const obras = await database.readObra();
    response.json(obras);
})

//UPDATE DE OBRAS
server.put('/obra/:id', async function (request,response){
    const id = request.params.id;
    const {new_nome_obra, new_data_inicio, new_data_termino, new_orcamento, new_nome_cliente, new_telefone_cliente, new_estado_obra, new_cidade_obra, new_endereco_obra, new_status_obra} = request.body;

    const result = await database.upObras(id, new_nome_obra, new_data_inicio, new_data_termino, new_orcamento, new_nome_cliente, new_telefone_cliente, new_estado_obra, new_cidade_obra, new_endereco_obra, new_status_obra);
    response.status(200).send(); //a maneira ideal seria verificar as linhas afetadas e retornar uma mensagem de erro ou sucesso
})

//DELETE OBRAS
server.delete('/obra/:id', async function (request, response){
    const id = request.params.id;

    const result = await database.deleteObra(id);
    response.status(200).send();//ideal colocar o delete e update dentro de try/catch para tratar excessões
})


server.listen(process.env.PORT || 3000);