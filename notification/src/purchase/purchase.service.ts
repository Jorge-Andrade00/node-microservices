import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './model/entities/Product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async findProductBySku(sku: string[]): Promise<Products[]> {
    // POSTGRES QUERY to find products by sku array
    return this.productRepository
      .createQueryBuilder('products')
      .where('products.sku IN (:...sku)', { sku })
      .select(['products.name', 'products.description', 'products.price'])
      .getMany();
  }
}
