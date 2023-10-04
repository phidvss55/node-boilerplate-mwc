import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (request, response) => {
  response.send('Hello world!');
});
