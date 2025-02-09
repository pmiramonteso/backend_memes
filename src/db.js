import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST_NAME,
    dialect: 'mysql',
    port: 3306,
    logging: false,
  }
);

const syncroModel = async () => {
  try {
    // Sincronizar el modelo con la base de datos (crear la tabla si no existe)
    // Con "alter: true" se sincronizan las columnas y se crean/eliminan si fuera necesario
    await sequelize.sync({ alter: true }).then(() => {
    }); 
  } catch (error) {
    console.error('Error sincronizando los modelos:', error);
  }
};

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    await syncroModel();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export { sequelize, testConnection };
