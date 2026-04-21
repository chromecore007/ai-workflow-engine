import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private service: RequestsService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get()
  findAll(@Query() query) {
    return this.service.findAll(query);
  }
}