const path = require('path');
const envConfig = require('dotenv').config({
  path: path.resolve(__dirname, `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`),
});

function env(key) {
  return envConfig.parsed[key] || process.env[key];
}

console.log(path.resolve('./database/migrations'));

const baseConfig = {
  type: 'sqlite',
  database: path.join(__dirname, env('DATABASE_NAME')),
  entities: [path.join(__dirname, './libs/api/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, './database/migrations/**/*.ts')],
  seeders: [path.join(__dirname, './libs/api/**/seeds/*{.ts,.js}')],
  factories: [path.join(__dirname, './libs/api/**/factories/*{.ts,.js}')],
  defaultSeeder: 'RootSeeder',
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  cli: {
    migrationsDir: path.join(__dirname, './database/migrations'),
  },
};

if (process.env.NODE_ENV !== 'test') {
  module.exports = {
    synchronize: false,
    ...baseConfig,
  };
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  };
}
