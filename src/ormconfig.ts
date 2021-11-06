export default {
  type: 'postgres',
  host: 'db-pg',
  port: 5432,
  username: 'spirit',
  password: 'api',
  database: 'emasa_ci',
  synchronize: true,
  logging: false,
  entities: ['dist/src/model/**/*.js'],
  cli: {
    entitiesDir: 'dist/src/model',
    migrationsDir: 'dist/src/migration',
    subscribersDir: 'dist/src/subscriber',
  },
};
