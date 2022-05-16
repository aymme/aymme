import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

import { connectToDB, disconnectDB } from './mongo-connect';

import { endpointMocks, ProjectMocks } from '../fixtures';

const prisma = new PrismaClient();

dotenv.config();

export default (on: any, config: any) => {
  config.env.ENVIRONMENT = 'testing';

  on('task', {
    async deleteAllProjects() {
      const db = await connectToDB();
      await db.collection('Project').deleteMany({});

      return null;
    },
    async seedProjects() {
      console.log('Start seeding ...');

      try {
        const project = await prisma.project.create(ProjectMocks);

        console.log(`Created Project with ID: ${project.id} and Collection with ID: ${project.collections[0].id}`);

        for (const e of endpointMocks) {
          const endpoint = await prisma.endpoint.create({
            data: {
              ...e,
              project: {
                connect: {
                  id: project.id,
                },
              },
              collection: {
                connect: {
                  id: project.collections[0].id,
                },
              },
              responses: {
                create: [{ statusCode: 500 }],
              },
            },
          });
          console.log(`Created Endpoint with ID: ${endpoint.id}`);
        }

        return project;
      } catch (e) {
        console.error(e);
        return true;
      }

      return project;
    },
    async cleanupDatabase() {
      const db = await connectToDB();

      try {
        await db.collection('Project').deleteMany({});
        await db.collection('Collection').deleteMany({});
        await db.collection('Endpoint').deleteMany({});
        await db.collection('Response').deleteMany({});
      } catch (e) {
        console.error(e);
        return true;
      }

      return null;
    },
  });

  return config;
};
