import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extrae el token del encabezado Bearer
      ignoreExpiration: false,  // Valida la expiración del token
      secretOrKey: 'yourSecretKey',  // La clave secreta que utilizaste para firmar los tokens
    });
  }

  async validate(payload: any) {
    // Aquí puedes realizar más validaciones o devolver la información del usuario
    return { userId: payload.sub, username: payload.username };
  }
}
