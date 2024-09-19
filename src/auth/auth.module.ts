import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey',  // La misma clave secreta utilizada antes
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],  // Registra la estrategia
  exports: [AuthService],
})
export class AuthModule {}
