import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandBodyDto } from './models/dto/command.body.dto';
import { CommandProductEntity } from './models/entities/command-product.entity';
import { CommandEntity } from './models/entities/command.entity';
import { DuplicatedProductEntity } from './models/entities/duplicated-product.entity';

@Injectable()
export class CommandService {

  constructor(
    @InjectRepository(CommandEntity) private commandRepository: Repository<CommandEntity>,
    @InjectRepository(DuplicatedProductEntity) private duplicatedProductRepository: Repository<DuplicatedProductEntity>,
    @InjectRepository(CommandProductEntity) private commandProductRepository: Repository<CommandProductEntity>
  ) { }

  async createCommand(body: CommandBodyDto): Promise<CommandEntity | null> {
    const products: DuplicatedProductEntity[] = [];

    for (const productId of body.productsIds) {
      const duplicatedProduct = await this.duplicatedProductRepository.findOneBy({ productId: Number(productId) });
      if (duplicatedProduct) {
        products.push(duplicatedProduct);
      }
    }

    if (products.length === 0) {
      throw new Error('No valid products found for the command');
    }

    const command = this.commandRepository.create({
      commandNumber: body.commandNumber,
      createdAt: body.date
    });
    const savedCommand = await this.commandRepository.save(command);

    const commandProducts: CommandProductEntity[] = [];
    for (const product of products) {
      const commandProduct = this.commandProductRepository.create({
        command: savedCommand,
        product: product
      });
      commandProducts.push(commandProduct);
    }

    await this.commandProductRepository.save(commandProducts);

    return this.commandRepository.findOne({
      where: { id: savedCommand.id },
      relations: ['commandProducts', 'commandProducts.product']
    });
  }

}
