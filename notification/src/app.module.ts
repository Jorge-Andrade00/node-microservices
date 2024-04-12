import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppImports } from './app.imports';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: AppImports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
