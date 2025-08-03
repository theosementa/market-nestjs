import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommandService } from './command.service';
import { CommandBodyDto } from './models/dto/command.body.dto';

@Controller('/commands')
export class CommandController {
  constructor(private readonly appService: CommandService) {}

  @Get()
  findAll() {
    return this.appService.findAllCommands();
  }

  @Post()
  createCommand(@Body() body: CommandBodyDto) {
    return this.appService.createCommand(body);
  }

  // Endpoints TCP pour la gateway
  @MessagePattern({ cmd: 'findAllCommands' })
  findAllTcp() {
    return this.appService.findAllCommands();
  }

  @MessagePattern({ cmd: 'createCommand' })
  createCommandTcp(data: CommandBodyDto) {
    return this.appService.createCommand(data);
  }

}
