import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { MyLogger } from './MyLogger';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // 配置public文件夹为静态目录，以达到可直接访问下面文件的目的
  const rootDic = path.join(__dirname, '..');
  app.use('/public', express.static(path.join(rootDic, 'public')));

  // 使用日志
  app.useLogger(new MyLogger());
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
