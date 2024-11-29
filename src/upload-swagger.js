// upload-swagger.js
const axios = require('axios');
const fs = require('fs');
require('dotenv').config(); // Carregar as variáveis de ambiente

const API_DOG_API_KEY = process.env.API_DOG_API_KEY; // Chave da API do API Dog
const API_DOG_PROJECT_ID = process.env.API_DOG_PROJECT_ID; // ID do seu projeto no API Dog
const SWAGGER_FILE_PATH = './swagger-spec.json'; // Caminho para o arquivo Swagger gerado

async function uploadSwagger() {
  try {
    // Lê o arquivo Swagger JSON
    const swaggerSpec = fs.readFileSync(SWAGGER_FILE_PATH, 'utf8');

    // Envia o arquivo para o API Dog
    const response = await axios.post(
      `https://api.apidog.com/v1/projects/${API_DOG_PROJECT_ID}/update-swagger`,
      { swagger: JSON.parse(swaggerSpec) },
      {
        headers: {
          Authorization: `Bearer ${API_DOG_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Documentação atualizada no API Dog:', response.data);
  } catch (error) {
    console.error(
      'Erro ao atualizar documentação no API Dog:',
      error.response?.data || error.message,
    );
  }
}

uploadSwagger();
