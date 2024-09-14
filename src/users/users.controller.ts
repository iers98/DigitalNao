import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService) {}
    
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado.', type: User })
    @ApiResponse({ status: 400, description: 'Datos incorrectos.' })
    @Post()
    createUser(@Body() newUser: CreateUserDto): Promise<User> {
      return this.userService.createUser(newUser);
    }

    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios.', type: [User] })
    @Get()
    findAll() : Promise<User[]> {
      return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado.', type: User })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(+id);
    }

    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.userService.remove(+id);
    }

    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado.', type: User })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @Patch(':id')
    update(@Param('id',ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
}
