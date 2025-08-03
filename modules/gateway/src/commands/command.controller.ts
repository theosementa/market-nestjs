import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('commands')
export class CommandController {
  constructor(@Inject('COMMAND_SERVICE') private commandClient: ClientProxy) {}

  @Get()
  findAll(): Observable<any> {
    return this.commandClient.send({ cmd: 'findAllCommands' }, {});
  }

  @Post()
  create(@Body() commandData: any): Observable<any> {
    return this.commandClient.send({ cmd: 'createCommand' }, commandData);
  }
}