import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Función para generar un token
  generateToken(): string {
    const payload = {     
        username: "Ivan Enrique",
        password: "password123", };  // Puedes agregar datos que quieras incluir en el token
    return this.jwtService.sign(payload);
  }
}
