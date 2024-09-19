import { Controller, Get, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('protected')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  getToken() {
    // Genera un token manualmente y lo devuelve
    return { token: this.authService.generateToken() };
  }

  @ApiBearerAuth()  // Añade el decorador ApiBearerAuth para Swagger
  @UseGuards(JwtAuthGuard)  // Usa el guard para proteger la ruta
  @Get('data')
  getProtectedData() {
    return { message: 'This is protected data' };
  }
}
