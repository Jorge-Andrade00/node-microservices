import { Controller, Post, Inject, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { PurchaseNotificationRequestDto } from './model/dto/purchaseNotification.request.dto';
import { PurchaseService } from './purchase.service';

@ApiTags('Purchase')
@Controller('purchase')
export class PurshaseController {
  constructor(
    @Inject('PURCHASE_TRANSPORT_SERVICE')
    private readonly kafkaClient: ClientKafka,
    private readonly purchaseService: PurchaseService,
  ) {}

  @Post()
  async purchaseNotification(
    @Body() purchaseNotificationRequestDto: PurchaseNotificationRequestDto,
  ): Promise<boolean> {
    const products = await this.purchaseService.findProductBySku(
      purchaseNotificationRequestDto.sku,
    );

    const msg = {
      products,
      email: purchaseNotificationRequestDto.email,
    };

    this.kafkaClient.emit('topic-test', JSON.stringify(msg));

    return true;
  }
}
