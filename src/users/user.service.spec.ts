import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un nuevo usuario', async () => {
    const createUserDto = { id:1 ,username: 'johndoe', password: 'johndoe', createdAt: new Date(),authStrategy:'dsry'};
    jest.spyOn(repository, 'save').mockResolvedValueOnce(createUserDto as User);

    const result = await service.createUser(createUserDto);
    expect(result).toEqual(createUserDto);
  });

  it('debería obtener todos los usuarios', async () => {
    const users = [{ id:1 ,username: 'johndoe', password: 'johndoe', createdAt: new Date(),authStrategy:'dsry'}];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(users as User[]);

    const result = await service.findAll();
    expect(result).toEqual(users);
  });

  it('debería obtener un usuario por ID', async () => {
    const user =  { id:1 ,username: 'johndoe', password: 'johndoe', createdAt: new Date(),authStrategy:'dsry'};
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(user as User);

    const result = await service.findOne(1);
    expect(result).toEqual(user);
  });

  it('debería actualizar un usuario', async () => {
    const updatedUser =  { id:1 ,username: 'johndoe', password: 'johndoe', createdAt: new Date(),authStrategy:'dsry'};
    jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedUser as User);

    const result = await service.update(1, updatedUser);
    expect(result).toEqual(updatedUser);
  });

  it('debería eliminar un usuario', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValueOnce({ affected: 1 } as any);

    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
  });
});
