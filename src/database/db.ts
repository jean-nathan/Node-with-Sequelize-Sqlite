import { Sequelize } from "sequelize";

/*
Observe que o código atualmente não fornece configurações para a instância db. Normalmente, ao usar
 o Sequelize, você forneceria informações de configuração, como o nome do banco de dados, nome de usuário,
senha, host, e outras opções na chamada new Sequelize({...}). Essas configurações são necessárias para
estabelecer uma conexão válida com o banco de dados desejado. Por exemplo: 
*/

export const db = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DATABASE_STORAGE_PATH || ":memory:",
});

export const syncDB = async () => {
  try {
    await db.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};
/*
Isso cria uma nova instância da classe Sequelize chamada db. Essa instância representa 
uma conexão com o banco de dados e é usada para configurar e realizar operações no banco de dados. 
 
Em resumo, uma instância da classe Sequelize é fundamental para criar, gerenciar e 
interagir com bancos de dados relacionais em aplicativos JavaScript/Node.js de uma 
maneira mais orientada a objetos e programática, facilitando o desenvolvimento e a 
manutenção de aplicativos que usam bancos de dados.
*/
