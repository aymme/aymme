import axios from 'axios';
import dotenv from 'dotenv';
import projectsData from '../seed-data/projects';

dotenv.config();

export default (on: any, config: any) => {
  config.env.ENVIRONMENT = 'testing';

  console.log('xx', projectsData);

  const testDataApiEndpoint = `${process.env.API_URL}/`;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const params = new URLSearchParams();
  params.append('name', 'project-1');

  on('task', {
    async 'db:seed:projects'() {
      const { data } = await axios.post(`http://localhost:3333/api/projects`, params, axiosConfig);
      return data;
    },
  });

  return config;
};
