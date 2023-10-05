import * as mongoose from 'mongoose';
import 'dotenv/config';

const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

export const connectionToDatabase = () => {
  const strConnection = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
  mongoose
    .connect(strConnection)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log('Something wrong happened: ' + err);
    });
};
