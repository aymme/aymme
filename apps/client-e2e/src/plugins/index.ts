import dotenv from 'dotenv';

import { connectToDB, disconnectDB } from './mongo-connect';

dotenv.config();

export default (on: any, config: any) => {
  config.env.ENVIRONMENT = 'testing';

  on('task', {
    async 'deleteAllProjects'() {
      const db = await connectToDB();
      await db.collection('Project').deleteMany({});

      return null;
    }
  });

  return config;
};
