const express = require('express'); //import express;
const server = express();

const database = require('./database');

//middleware, são como camadas, que o script ira executar entre os metodos, no caso esse permite que o express utilize o formato json em seus metodos
server.use(express.json()); //

// HTTP REST
//GET (OBTER UM RECURSO JSON) RESPONSAVEL POR LER UMA INFORMAÇÃO DA API - READ
//POST (ADICIONAR UM RECURSO) RESPONSAVEL POR CRIAR UMA INFORMAÇÃO  - CREATE
//PUT (ATUALIZA UM RECURSO) RESPONSAVEL POR ATUALIZAR UMA INFORMAÇÃO - UPDATE
//DELETE (APAGA UM RECURSO) RESPONSAVEL POR APAGAR UM RECURSO - DELETE


// localhost:3000/
server.get('/:contatos', async function(request, response) { //request vem do cliente para o servidor, response vem do servidor para o cliente


    // /?nome=thiago (informação passada pela url) - request.query
    // produto/1 (informação tbm passada pela url) - request.params
    // corpo da mensagem - request.body (JSON)

    const contatos = await database.read();
    response.json(contatos);
})

//localhost:3000/1
server.get('/:id', async function(request, response) { //consultando pelo id
    const id = request.params.id;
    const contato = await database.find(id);
    response.json(contato);
})

server.post('/:contato', async function(request, response){
    const {nome, telefone} = request.body;

    const result = await database.create(nome, telefone);
    
    //contatos.push(contato); //adiciona o contato a lista de contato, semelhante ao append

    response.status(201).send();

})

//CRIAR CLIENTE
server.post('/:cliente', async function(request, response){
    const {login, senha, email, tipo, nome_cliente, telefone} = request.body;

    const result = await database.createCliente(login, senha, email,tipo, nome_cliente, telefone);
    
    //contatos.push(contato); //adiciona o contato a lista de contato, semelhante ao append

    response.status(201).send();
})

//LER USUARIO + CLIENTE
server.get('/:clientes', async function(request, response){
    const clientes = await database.readCliente();
    response.json(clientes);
})

//CRIAR EMPRESA
server.post('/', async function(request, response){
    const {login, senha, email, tipo, nome_empresa, descricao, telefone_um, telefone_dois, estado, cidade, endereco} = request.body;

    const result = await database.createEmpresa(login, senha, email, tipo, nome_empresa, descricao, telefone_um, telefone_dois, estado, cidade, endereco);
    
    //contatos.push(contato); //adiciona o contato a lista de contato, semelhante ao append

    response.status(201).send();
})

//LER USUARIO + EMPRESA
server.get('/', async function(request, response){
    const empresas = await database.readEmpresa();
    response.json(empresas);
})



server.listen(process.env.PORT || 3000);