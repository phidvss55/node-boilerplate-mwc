import { cleanEnv, port, str } from 'envalid';

export function validateEnv(): void {
  cleanEnv(process.env, {
    MONGO_HOST: str(),
    MONGO_DATABASE: str(),
    MONGO_PORT: port(),
  });
}
