import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('protected')
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService) {}


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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
