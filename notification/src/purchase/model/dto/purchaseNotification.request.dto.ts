import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PurchaseNotificationRequestDto {
  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  sku: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
