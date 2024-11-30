import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './src/app.module'; // ou o caminho correto para o seu AppModule
import * as fs from 'fs';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API NestJS')
    .setDescription('Documentação da API gerada automaticamente pelo Swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Salvar o Swagger em um arquivo JSON
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  console.log('Swagger JSON gerado com sucesso!');
}

generateSwagger();
