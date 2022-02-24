import dotenv from 'dotenv';

dotenv.config();

export default (on: any, config: any) => {
  config.env.ENVIRONMENT = 'testing';

  on('task', {
    async 'db:seed'() {
      cy.exec('');
    },
  });

  return config;
};
