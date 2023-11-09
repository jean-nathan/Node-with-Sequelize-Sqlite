/*
Em resumo, o arquivo de roteamento é usado no servidor para direcionar solicitações 
HTTP para as funções de controlador apropriadas e é uma parte essencial de um 
aplicativo de backend para controlar como as solicitações dos clientes são processadas 
e tratadas. O banco de dados, por outro lado, é onde os dados são armazenados e 
acessados por meio dos modelos, e não tem relação direta com o roteamento das 
solicitações.
*/

import express from "express";
import UserController from "./controllers/UserController";

const router = express.Router();

// CRUD

//C - CREATE
router.post("/users", UserController.create);

//R - READ
router.get("/users", UserController.findAll);

//Coletar 1 user
router.get("/users/:userId", UserController.findOne);

//U - UPDATE
router.put("/users/:userId", UserController.update);

//D - DELETE
router.delete("/users/:userId", UserController.destroy);

export { router };
