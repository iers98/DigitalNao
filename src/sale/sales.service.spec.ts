import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Sale } from './sale.entity';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';

describe('SaleService', () => {
  let service: SaleService;
  let repository: Repository<Sale>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleService,
        {
          provide: getRepositoryToken(Sale),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SaleService>(SaleService);
    repository = module.get<Repository<Sale>>(getRepositoryToken(Sale));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería registrar una nueva venta', async () => {
    const createSaleDto = {customerName: "Juan Perez",product: "Laptop",totalAmount: 1200.50,saleDate: new Date() };
    jest.spyOn(repository, 'save').mockResolvedValueOnce(createSaleDto as Sale);

    const result = await service.create(createSaleDto);
    expect(result).toEqual(createSaleDto);
  });

  it('debería obtener todas las ventas', async () => {
    const sales = [{customerName: "Juan Perez",product: "Laptop",totalAmount: 1200.50,saleDate: new Date() }];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(sales as Sale[]);

    const result = await service.findAll();
    expect(result).toEqual(sales);
  });

  it('debería obtener una venta por ID', async () => {
    const sale ={customerName: "Juan Perez",product: "Laptop",totalAmount: 1200.50,saleDate: new Date() };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(sale as Sale);

    const result = await service.findOne(1);
    expect(result).toEqual(sale);
  });

  it('debería actualizar una venta', async () => {
    const updatedSale ={customerName: "Juan Perez",product: "Laptop",totalAmount: 1200.50,saleDate: new Date() };
    jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedSale as Sale);

    const result = await service.update(1, updatedSale);
    expect(result).toEqual(updatedSale);
  });

  it('debería eliminar una venta', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
  });
});
