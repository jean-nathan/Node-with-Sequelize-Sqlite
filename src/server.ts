import express, { json } from "express";
import { db, syncDB } from "./database/db";
import { router } from "./router";
import path from "path";
import fs from "fs";

const app = express();

app.use(json());
app.use(router);

const PORT = 3000;

const databasePath = process.env.DATABASE_STORAGE_PATH;
const absolutePath = path.resolve(databasePath);

// Verificar se o diretório do banco de dados existe, caso contrário, criá-lo
const databaseDir = path.dirname(absolutePath);
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

// Ajustar diretamente a propriedade 'storage' na instância do Sequelize
(db as any).options.storage = absolutePath;

console.log("Database Path:", absolutePath);

// Chamar a sincronização do banco de dados apenas uma vez
syncDB();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
