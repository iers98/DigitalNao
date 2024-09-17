// src/sale/sale.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Sale } from './sale.entity';

@ApiTags('Ventas')
@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}
  
  @ApiOperation({ summary: 'Registrar una nueva venta' })
  @ApiResponse({ status: 201, description: 'Venta registrada.', type: Sale })
  @ApiResponse({ status: 400, description: 'Datos incorrectos.' })
  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @ApiOperation({ summary: 'Obtener todas las ventas' })
  @ApiResponse({ status: 200, description: 'Lista de ventas.', type: [Sale] })
  @Get('/all')
  findAll() {
    return this.saleService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @ApiResponse({ status: 200, description: 'Venta encontrada.', type: Sale })
  @ApiResponse({ status: 404, description: 'Venta no encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar una venta' })
  @ApiResponse({ status: 200, description: 'Venta actualizada.', type: Sale })
  @ApiResponse({ status: 404, description: 'Venta no encontrada.' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }
  
  @ApiOperation({ summary: 'Eliminar una venta' })
  @ApiResponse({ status: 200, description: 'Venta eliminada.' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
}
