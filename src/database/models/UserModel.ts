/* 
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
