import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TEST_PROJECT = {
  name: 'Test: Project 1',
};

export default (on: any, config: any) => {
  config.env.ENVIRONMENT = 'testing';

  const testDataApiEndpoint = `${process.env.API_URL}`;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const params = new URLSearchParams();
  params.append('name', TEST_PROJECT.name);

  on('task', {
    async 'db:seed'() {
      const { data } = await axios.post(`${testDataApiEndpoint}/projects`, params, axiosConfig);
      return data;
    },
  });

  return config;
};
