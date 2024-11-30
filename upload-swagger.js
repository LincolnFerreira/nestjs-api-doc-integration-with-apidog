// upload-swagger.js
const axios = require('axios');
const fs = require('fs');
require('dotenv').config(); // Carrega variáveis de ambiente

const API_DOG_API_KEY = process.env.API_DOG_API_KEY; // Chave da API do Apidog
const API_DOG_PROJECT_ID = process.env.API_DOG_PROJECT_ID; // ID do projeto no Apidog
const SWAGGER_FILE_PATH = './swagger-spec.json'; // Caminho para o arquivo Swagger gerado

async function uploadSwagger() {
  try {
    // Lê o arquivo Swagger JSON
    const swaggerSpec = fs.readFileSync(SWAGGER_FILE_PATH, 'utf8');

    // Envia o arquivo Swagger para o Apidog
    const response = await axios.post(
      `https://api.apidog.com/v1/projects/${API_DOG_PROJECT_ID}/import-openapi`,
      {
        input: JSON.parse(swaggerSpec), // Swagger JSON lido do arquivo
        options: {
          endpointOverwriteBehavior: 'CREATE_NEW',
          schemaOverwriteBehavior: 'CREATE_NEW',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_DOG_API_KEY}`,
          'X-Apidog-Api-Version': '2024-03-28',
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Documentação atualizada no Apidog:', response.data);
  } catch (error) {
    console.error(
      'Erro ao atualizar documentação no Apidog:',
      error.response?.data || error.message,
    );
  }
}

uploadSwagger();
