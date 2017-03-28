import Joi from 'joi';

require('babel-polyfill');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  INTERACTIVE_STREAM_LIMIT: Joi.number().integer().min(0).default('10')
      .description('INTERACTIVE_STREAM_LIMIT is required'),
  REDIS_URL: Joi.string().required(),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  fireBaseAuthDomain: 'opentok-ib.firebaseapp.com',
  firebaseDatabaseURL: 'https://opentok-ib.firebaseio.com',
  interactiveStreamLimit: envVars.INTERACTIVE_STREAM_LIMIT || Infinity,
  redisUrl: envVars.REDIS_URL,
};

export default config;
