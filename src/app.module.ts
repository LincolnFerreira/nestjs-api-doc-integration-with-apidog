import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [ExampleModule, TesteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
