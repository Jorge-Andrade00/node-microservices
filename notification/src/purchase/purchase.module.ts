import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PurshaseController } from './purshase.controller';
import { PurchaseService } from './purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './model/entities/Product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    ClientsModule.register([
      {
        name: 'PURCHASE_TRANSPORT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [PurshaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
