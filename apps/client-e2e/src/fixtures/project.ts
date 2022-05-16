export const ProjectMocks = {
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
};
