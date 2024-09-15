import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Product } from './product.entity';

describe('InventoryService', () => {
  let service: InventoryService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un nuevo producto', async () => {
    const createProductDto = {
      name: 'Producto de prueba',
      description: 'Descripción de prueba',
      quantity: 100,
      price: 49.99,
    };

    jest.spyOn(repository, 'save').mockResolvedValueOnce(createProductDto as Product);

    const result = await service.create(createProductDto);
    expect(result).toEqual(createProductDto);
    expect(repository.save).toHaveBeenCalledWith(createProductDto);
  });

  it('debería obtener todos los productos', async () => {
    const products = [{ id: 1, name: 'Laptop', description: 'Dell XPS', quantity: 10, price: 999.99 }];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(products as Product[]);

    const result = await service.findAll();
    expect(result).toEqual(products);
  });

  it('debería obtener un producto por ID', async () => {
    const product = { id: 1, name: 'Laptop', description: 'Dell XPS', quantity: 10, price: 999.99 };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(product as Product);

    const result = await service.findOne(1);
    expect(result).toEqual(product);
  });

  it('debería actualizar un producto', async () => {
    const updatedProduct = { id: 1, name: 'Laptop actualizada', description: 'Dell XPS actualizado', quantity: 8, price: 1099.99 };
    jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedProduct as Product);

    const result = await service.update(1, updatedProduct);
    expect(result).toEqual(updatedProduct);
  });

  it('debería eliminar un producto', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
  });
});
