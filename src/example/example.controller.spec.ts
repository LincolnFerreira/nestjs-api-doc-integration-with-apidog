import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Example') // Agrupamento no Swagger
@Controller('example')
export class ExampleController {
  @Get()
  getExample() {
    return { message: 'Bem-vindo à API NestJS!' };
  }

  @Get('status')
  getStatus() {
    return { status: 'OK', uptime: process.uptime() };
  }
}
