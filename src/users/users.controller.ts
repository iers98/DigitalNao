import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


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
    @Get('/all')
    findAll() : Promise<User[]> {
      return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado.', type: User })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(+id);
    }

    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.userService.remove(+id);
    }

    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado.', type: User })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Patch(':id')
    update(@Param('id',ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
}
