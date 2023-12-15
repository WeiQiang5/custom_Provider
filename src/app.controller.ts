import {
  Controller,
  Get,
  Inject,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppService, MyFormmater } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';
import { Ccc, MyHeaders } from './ccc.decorator';

@Controller()
export class AppController {
  // 以下两种写法是基于provides下面的provide不是字符串的情况下
  // 注入AppService，写法1
  // constructor(private readonly appService: AppService) {}
  // 写法2:
  // @Inject(AppService)
  // private readonly appService: AppService;

  // 字符串情况下
  // 写法1:
  // constructor(@Inject('app_service') private readonly appService: AppService) {}
  // 写法2:
  @Inject('app_service')
  private readonly appService: AppService;

  @Inject('person')
  private readonly person: { name: string; age: number };

  @Inject('person2')
  private readonly person2: { name: string; age: number };

  @Get()
  getHello(): string {
    console.log(this.person, this.person2);
    return this.appService.getHello();
  }

  // 自定义装饰器写法1
  @Get('hah')
  @SetMetadata('aaa', 'admin')
  @UseGuards(AaaGuard)
  getMyName(): MyFormmater[] {
    return this.appService.getName();
  }

  // 自定义装饰器写法2
  @Get('hello')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello2(): string {
    return this.appService.getHello();
  }

  // 自定义装饰器写法3
  @Bbb('hello2', 'admin')
  getHello3(): string {
    return this.appService.getHello();
  }

  // 自定义参数装饰器
  @Get('hello4')
  getHello4(@Ccc() c) {
    return c;
  }

  @Get('hello5')
  getHello5(@MyHeaders('Accept') headers1, @MyHeaders('Accept') headers2) {
    console.log('header1', headers1);
    console.log('header2', headers2);
  }
}
