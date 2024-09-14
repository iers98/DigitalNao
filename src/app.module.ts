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

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'nestdb',
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
