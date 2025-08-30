import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from '../../../api-gateway/src/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
