import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World of Digital Nao, welcome to my project!';
  }
}
