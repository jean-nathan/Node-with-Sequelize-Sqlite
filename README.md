Anotações do vídeo:

O que é CRUD?

C - Create (Criar algo no banco de dados)
R - Read (Quando você lê algo do banco de dados)
U - Update (Quando você altera algo no banco)
D - Delete (Quando você deleta algo no banco de dados)

——————————————————————————————————————————

Importante: Precisa ter um Back-end Node com TypeScript configurado.

Usaremos uma biblioteca ORM (Object-Relational Mapping) que é uma ferramenta usada em desenvolvimento de software que facilita a interação entre bancos de dados relacionais. Essas bibliotecas permitem que os desenvolvedores acessem e manipulem dados no banco de dados usando objetos e classes em vez de escrever consultas SQL manualmente.

Em especifico usaremos ORM chamado Sequelize.  Execute o comando para adiciona-lo e também incluiremos o driver do Sequelize: yarn add sequelize mysql 

——————————————————————————————————————————

Precisamos ter um banco de dados Msql no Docker rodando.

Após isso, deverá configurar o arquivo .env com as variáveis de ambiente:  DATABASE_HOST='localhost' /* Endereço da hospedagem */ 
DATABASE_PORT='3306' /* Cada banco é um porta diferente */
DATABASE_NAME='database'
DATABASE_USER='root'
DATABASE_PASS='root'

——————————————————————————————————————————
##CONFIGURANDO O ARQUIVO db.ts   Depois disso, crie um pasta dentro de src chamada database e dentro dela teremos um arquivo chamado db.ts no qual iremos configura-lo abaixo:

Após isso iremos o arquivo da seguinte forma:

import { Sequelize } from "sequelize";


/*
Observe que o código atualmente não fornece configurações para a instância db. Normalmente, ao usar
 o Sequelize, você forneceria informações de configuração, como o nome do banco de dados, nome de usuário,
senha, host, e outras opções na chamada new Sequelize({...}). Essas configurações são necessárias para
estabelecer uma conexão válida com o banco de dados desejado. Por exemplo: 
*/

export const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env
      .DATABASE_PORT /* Colocar o + transforma um string em inteiro */,
  },
);

/*
Isso cria uma nova instância da classe Sequelize chamada db. Essa instância representa 
uma conexão com o banco de dados e é usada para configurar e realizar operações no banco de dados. 
 
Em resumo, uma instância da classe Sequelize é fundamental para criar, gerenciar e 
interagir com bancos de dados relacionais em aplicativos JavaScript/Node.js de uma 
maneira mais orientada a objetos e programática, facilitando o desenvolvimento e a 
manutenção de aplicativos que usam bancos de dados.
*/

——————————————————————————————————————————
## ABAIXO CRIAREMOS O CRUD COM USUÁRIO:

Primeiro passo é criar um nova pasta dentro de src chamada models onde ficará salvo os modelos.

Dentro desta pasta criamos por exemplo um modelo de usuário chamado UserModel.ts   /* 
Em uma aplicação de backend em Node.js, o uso de modelos (models) é especialmente 
relevante ao utilizar um banco de dados, como o MySQL, e uma biblioteca 
ORM (Object-Relational Mapping) como o Sequelize. Modelos são usados para definir 
a estrutura dos dados que serão armazenados no banco de dados e para interagir com 
esses dados de maneira programática. Abaixo, vou explicar como usar modelos em um 
aplicativo Node.js com o MySQL e o Sequelize:

*/

import { DataTypes } from "sequelize";
import { db } from "../db";

export const UserModel = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
  },
});

——————————————————————————————————————————
## CONFIGURANDO AS ROTAS:

/*
Em resumo, o arquivo de roteamento é usado no servidor para direcionar solicitações 
HTTP para as funções de controlador apropriadas e é uma parte essencial de um 
aplicativo de backend para controlar como as solicitações dos clientes são processadas 
e tratadas. O banco de dados, por outro lado, é onde os dados são armazenados e 
acessados por meio dos modelos, e não tem relação direta com o roteamento das 
solicitações.
*/

import express from "express";

const router = express.Router();

// CRUD

//C - CREATE
router.post("/users", async () => {});

//R - READ
router.get("/users", async () => {});

//Coletar 1 user
router.get("/users/:userID", async () => {});

//U - UPDATE
router.put("/users/:userID", async () => {});

//D - DELETE
router.delete("/users/:userID", async () => {});

export { router };


Após ter criado as rotas para o Servidor, vamos usa-las abaixo: Acesse o arquivo server.ts e inclua o trecho: app.use(Router);
 Isso fará com que seja acoplado as rotas no Express.  Inclua neste arquivo as seguintes configurações:

import express, { json } from "express"; // Os ... pontos significa que nao foi instalado os tipos, com uso do typescript e necessário. De um (yarn add -D @types/express).
import { db } from "./database/db";
import { router } from "./router";

const app = express();

/* 
app.use(json());

No geral, middleware é uma parte fundamental da construção de aplicativos web, especialmente quando se trata de 
processar e validar dados de solicitação, autenticar usuários e tomar decisões com base nas informações recebidas
nas solicitações PUT e POST. Ele permite adicionar camadas de processamento e segurança às solicitações HTTP
 e facilita o desenvolvimento de aplicativos robustos e seguros.
*/

app.use(json()); // Então tudo que mandarmos no body, será identificado como JSON | Quando lidamos com rotas com put, post. Recebemos infos do body da req, entao para o código entender o body da req, devemos usar um Middleware chamado JSON
app.use(router); // acoplando as rotas no express

app.listen(3000, async () => {
  await db.sync(); // Criar tabelas automaticamente, sincando as tabelas com banco de dados com a funcao assincrona do express
  console.log(`App running at 3000!`);
});

——————————————————————————————————————————
CONFIGURANDO AS CONTROLLERS:

Crie uma pasta dentro de src chamada controllers e nesta pasta crie um arquivo chamado UserController.ts com a seguinte configuração. 

import { Request, Response } from "express";
import { UserModel } from "../database/models/UserModel";

class UserController {
  async findAll(req: Request, res: Response) {}
  async findOne(req: Request, res: Response) {}
  async create(req: Request, res: Response) {
    const { email, nome, idade } = req.body;
    const user = await UserModel.create({
      email,
      nome,
      idade,
    });
    return res.status(201).json(user);
  }
  async update(req: Request, res: Response) {}
  async destroy(req: Request, res: Response) {}
}

export default new UserController();
