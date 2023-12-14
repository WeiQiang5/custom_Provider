import { Controller, Get, Inject } from '@nestjs/common';
import { AppService, MyFormmater } from './app.service';

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

  @Get('hah')
  getMyName(): MyFormmater[] {
    return this.appService.getName();
  }
}
