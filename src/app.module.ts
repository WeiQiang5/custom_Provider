import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PipelearnModule } from './pipelearn/pipelearn.module';

@Module({
  imports: [PipelearnModule],
  controllers: [AppController],
  // 这是写法1，是写法2的简写
  // providers: [AppService],
  // 写法2
  // providers: [
  //   {
  //     provide: AppService,
  //     useClass: AppService,
  //   },
  // ],
  // 写法3，provide用作字符串
  providers: [
    AppService,
    {
      provide: 'app_service',
      useClass: AppService,
    },
    // 这里还可以直接指定一个值，让ioc容器来注入
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    // provider的值可能是动态产生的，nest也同样支持
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      inject: ['person', AppService],
    },
  ],
})
export class AppModule {}
