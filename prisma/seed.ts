import { PrismaClient } from "@prisma/client";
import { endpointMocks } from './mocks/endpoint';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const project = await prisma.project.create({
    data: {
      name: 'Notion',
      slug: 'notion',
      configuration: {
        create: {
          ignoreParams: undefined,
        },
      },
      collections: {
        create: [{ name: 'default' }],
      },
    },
    include: {
      configuration: true,
      collections: true,
    },
  });

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

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
