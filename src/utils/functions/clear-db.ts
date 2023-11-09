// Importando o módulo sqlite3 que fornece a implementação do SQLite para Node.js
import sqlite3 from "sqlite3";
// Importando a função open do módulo sqlite, que será usada para abrir uma conexão com o banco de dados
import { open } from "sqlite";

// Definindo uma função assíncrona chamada clearDatabase
const clearDatabase = async () => {
  try {
    // Abrindo uma conexão com o banco de dados SQLite utilizando o módulo sqlite e sqlite3 como driver
    const db = await open({
      filename: "./src/database.sqlite", // Caminho para o arquivo do banco de dados
      driver: sqlite3.Database, // Especificando o driver SQLite a ser utilizado
    });

    // Desativando as chaves estrangeiras temporariamente
    await db.exec("PRAGMA foreign_keys=off;");
    // Iniciando uma transação SQLite
    await db.exec("BEGIN TRANSACTION;");

    // Consultando o banco de dados para obter uma lista de tabelas
    const tables = await db.all(
      'SELECT name FROM sqlite_master WHERE type="table";',
    );

    // Iterando sobre as tabelas e deletando todos os registros
    for (const table of tables) {
      await db.exec(`DELETE FROM ${table.name};`);
    }

    // Finalizando a transação SQLite
    await db.exec("COMMIT;");

    // Exibindo uma mensagem indicando que o banco de dados foi limpo com sucesso
    console.log("Banco de dados limpo com sucesso.");
    // Exibindo a lista de tabelas que foram encontradas no banco de dados
    console.log("Tabelas", tables);
  } catch (error) {
    // Lidando com qualquer erro que possa ocorrer durante o processo de limpeza do banco de dados
    console.error("Erro ao limpar o banco de dados:", error);
  }
};

// Chamando a função clearDatabase para iniciar o processo de limpeza do banco de dados
clearDatabase();

/*
EXPLICACAO DO SCRIPT ACIMA

Claro, vou simplificar a explicação para quem não tem conhecimento em SQLite:

1. **O que é SQLite?**
   - SQLite é um sistema de gerenciamento de banco de dados (SGBD) que permite armazenar e organizar dados de maneira eficiente.

2. **Para que serve o script que você mostrou:**
   - O script é como um conjunto de instruções para "limpar" um banco de dados SQLite. Limpar significa apagar todos os dados que estão armazenados nas tabelas do banco de dados.

3. **Como o script funciona:**
   - O script usa dois módulos chamados `sqlite` e `sqlite3`. O `sqlite` é como uma ferramenta mais fácil de usar para interagir com o SQLite, enquanto o `sqlite3` é como o "mecanismo" que faz as coisas acontecerem nos bastidores.

4. **O que cada parte do script faz:**
   - `import sqlite3 from "sqlite3";`: Aqui, estamos importando uma ferramenta chamada `sqlite3` que nos ajuda a trabalhar com SQLite.
   - `import { open } from "sqlite";`: Também estamos importando outra ferramenta chamada `sqlite`, que torna mais fácil para nós interagirmos com o SQLite.

   - `const db = await open({ filename: "./src/database.sqlite", driver: sqlite3.Database });`: Aqui, estamos abrindo o banco de dados SQLite localizado no arquivo `database.sqlite` dentro da pasta `src`. O `sqlite3` é usado como o "motor" que lida com os detalhes internos.

   - `await db.exec("PRAGMA foreign_keys=off;");`: Desativa temporariamente uma funcionalidade chamada "chaves estrangeiras" para facilitar a limpeza.

   - `await db.exec("BEGIN TRANSACTION;");`: Inicia uma "transação", que é como uma série de operações que podem ser desfeitas se algo der errado.

   - `const tables = await db.all('SELECT name FROM sqlite_master WHERE type="table";');`: Aqui, estamos perguntando ao banco de dados quais tabelas existem nele.

   - `for (const table of tables) { await db.exec(`DELETE FROM ${table.name};`); }`: Estamos percorrendo todas as tabelas e apagando todos os dados nelas.

   - `await db.exec("COMMIT;");`: Finaliza a "transação", confirmando todas as operações que fizemos. Se chegamos até aqui sem problemas, então tudo foi limpo com sucesso.

   - `console.log("Banco de dados limpo com sucesso.");`: Mostra uma mensagem dizendo que o banco de dados foi limpo com sucesso.

   - `console.log("Tabelas", tables);`: Mostra na tela a lista de tabelas que existiam no banco de dados antes de serem limpas.

5. **Por que alguém faria isso:**
   - Às vezes, precisamos começar com um banco de dados "limpo" para testar nossos aplicativos ou para outras situações em que queremos apagar todos os dados existentes.

Espero que isso torne mais claro o que o script está fazendo!
*/
