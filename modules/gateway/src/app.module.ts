import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './products/product.controller';
import { CommandController } from './commands/command.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PRODUCT_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.PRODUCT_SERVICE_PORT || '3001'),
        },
      },
      {
        name: 'COMMAND_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.COMMAND_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.COMMAND_SERVICE_PORT || '3002'),
        },
      },
    ]),
  ],
  controllers: [AppController, ProductController, CommandController],
  providers: [AppService],
})
export class AppModule {}