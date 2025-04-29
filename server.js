// Modo antigo de importar a biblioteca
// const express = require('express');

// todas as vezes que incuir um elemento , tem que parar o servidor (ctrl + c), e rodar novamente o comando (node server.js) 
// ou da o comando node --watch server.js, para ele ficar rodando automaticamente, e quando salvar ele atualiza automaticamente.


// Modo novo de importar a biblioteca

import express from 'express'; // Importando o express, sem as chaves esta trazendo todo o express do node_modules, 
import cors from 'cors'
import { PrismaClient } from '@prisma/client'  // Importando o prisma, com as chaves somente o que eu quero

const prisma = new PrismaClient() // Iniciando o prisma

const app = express(); // Iniciando o express
app.use(express.json()) // Para o express entender o formato json
app.use(cors()) // Para o express entender o cors





app.get ('/usuarios', async (req, res) => {  // Rota/ req: requisição, res: resposta.    Aqui temos uma rota get para listar os usuarios. :id é uma variavel.

    const users = await prisma.user.findMany()  // findMany é um metodo do prisma, que retorna todos os usuarios.

    res.status(200).json(users)             
})


app.post ('/usuarios', async (req, res) => {    //isso é uma arrow function, e o req e res são parametros, async é uma função assincrona, ou seja, ela vai esperar a execução da função para continuar.
                                                // async/await é uma forma de esperar a execução da função para continuar, uma promise
  const user =  await prisma.user.create({       // create é um metodo do prisma, que cria um usuario.
        data: {                                  // Dados que serão inseridos no banco de dados
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        }
    })


    res.status(201).json (user)
})


app.put ('/usuarios/:id', async (req, res) => {  
    

const user = await prisma.user.update ({ 
        where: {
            id: req.params.id
        },
        data: {  
            name: req.body.name,                                
            email: req.body.email,
            age: req.body.age
        }
})

        res.status(200).json(user)
})

app.delete ('/usuarios/:id', async (req, res) => {
    const user = await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

                res.status(200).json( {menssage: "Usuário deletado com sucesso!"})

})


app.listen(3000)




// http:localhost:3000   

//User Mongo Db: evertonmoreira1985
//senha:niSRV3sCnojQUmPe

// npx prisma studio -> para rodar o prisma na porta  http://localhost:5555, uma interface de visualização do banco de dados.
