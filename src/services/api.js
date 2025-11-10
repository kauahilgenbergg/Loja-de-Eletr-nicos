import axios from 'axios';

const API_URL = 'https://690d0786a6d92d83e8504357.mockapi.io/'; // api fake com usuários e produtos. para acessar a cada endpoint, usar /usuario no final do link, ou /produtos. Atentar-se aos campos existentes em cada entidade.

export const api = axios.create({
  baseURL: API_URL,
});