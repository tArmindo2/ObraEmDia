const express = require('express'); //import express;
const { uuid } = require('uuidv4');

const server = express();

//middleware, são como camadas, que o script ira executar entre os metodos, no caso esse permite que o express utilize o formato json em seus metodos
server.use(express.json()); //

// HTTP REST
//GET (OBTER UM RECURSO JSON) RESPONSAVEL POR LER UMA INFORMAÇÃO DA API - READ
//POST (ADICIONAR UM RECURSO) RESPONSAVEL POR CRIAR UMA INFORMAÇÃO  - CREATE
//PUT (ATUALIZA UM RECURSO) RESPONSAVEL POR ATUALIZAR UMA INFORMAÇÃO - UPDATE
//DELETE (APAGA UM RECURSO) RESPONSAVEL POR APAGAR UM RECURSO - DELETE

contatos = [];

server.get('/', function(request, response) { //request vem do cliente para o servidor, response vem do servidor para o cliente


    // /?nome=thiago (informação passada pela url) - request.query
    // produto/1 (informação tbm passada pela url) - request.params
    // corpo da mensagem - request.body (JSON)

    response.json(contatos);
})

server.get('/:id', function(request, response) { //consultando pelo id
    const id = request.params.id;
    response.json(id);
})

server.post('/', function(request, response){
    const {nome, telefone} = request.body;

    contato = {
        id: uuid(),
        nome: nome,
        telefone: telefone
    };

    contatos.push(contato); //adiciona o contato a lista de contato, semelhante ao append

    response.status(201).send();

})

server.listen(process.env.PORT || 3000);