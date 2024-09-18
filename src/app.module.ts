import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { SaleModule } from './sale/sale.module';
import { InventoryModule } from './inventory/inventory.module';
import { Product } from './inventory/product.entity';
import { Sale } from './sale/sale.entity';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from './config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User,Product, Sale],
    synchronize: true, // solo para desarrollo, no en producción
  }) ,
    UsersModule,
    SaleModule,
    InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
