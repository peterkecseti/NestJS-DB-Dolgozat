import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import {MacskaDto} from './macska.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listMacskak(){
    const [rows] = await db.execute(
      'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC'
    );
    return {
      macskak: rows,
    };
  }



  @Get('macskak/new')
  @Render('form')
  newMacskaForm() {
    return {};
  }
  @Post('macskak/new')
  @Redirect()
  async newMacska(@Body() macska: MacskaDto){
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macska.szem_szin, macska.suly],
    );
    return {
      url: '/',
    };
  }
}
