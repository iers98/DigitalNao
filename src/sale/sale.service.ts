// src/sale/sale.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';


@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const newSale = this.salesRepository.create(createSaleDto);
    return this.salesRepository.save(newSale);
  }

  findAll(): Promise<Sale[]> {
    return this.salesRepository.find();
  }

  findOne(id: number): Promise<Sale> {
    return this.salesRepository.findOneBy({ id });
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    await this.salesRepository.update(id, updateSaleDto);
    return this.salesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.salesRepository.delete(id);
  }
}
