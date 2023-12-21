import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PipelearnService } from './pipelearn.service';
import { PipelearnPipe } from './pipelearn.pipe';

enum Ggg {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}

// 关于pipe的使用
@Controller('pipelearn')
export class PipelearnController {
  constructor(private readonly pipelearnService: PipelearnService) {}

  @Get()
  getHello(
    @Query(
      'aa',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.NOT_FOUND,
        // 自己主动抛出错误
        exceptionFactory: (msg) => {
          console.log(msg);
          throw new HttpException('xxx ' + msg, HttpStatus.NOT_IMPLEMENTED);
        },
      }),
    )
    aa: number,
  ): number {
    return aa;
  }
  // 将参数转换为float类型
  @Get('cc')
  cc(@Query('cc', ParseFloatPipe) cc: number) {
    return cc + 1;
  }

  @Get('dd')
  dd(@Query('dd', ParseBoolPipe) dd: boolean) {
    return typeof dd;
  }

  @Get('ee')
  ee(
    @Query(
      'ee',
      new ParseArrayPipe({
        // 将每一项处理为number
        items: Number,
      }),
    )
    ee: Array<number>,
  ) {
    return ee.reduce((total, item) => total + item, 0);
  }
  @Get('ff')
  ff(
    @Query(
      'ff',
      new ParseArrayPipe({
        // 指定分隔符
        separator: '..',
        // 解决不传参数报错
        optional: true,
      }),
    )
    ff: Array<number>,
  ) {
    return ff;
  }

  // 使用enum可以限制范围,报错也可以通过errorHttpStatusCode和exceptionFactory来定制
  @Get('gg/:enum')
  gg(@Param('enum', new ParseEnumPipe(Ggg)) e: Ggg) {
    return e;
  }

  // 设置参数默认值
  @Get('kkk')
  kkk(@Query('kkk', new DefaultValuePipe('aa')) kkk: string) {
    return kkk;
  }

  @Get('nnn/:bbb')
  nnn(
    @Query('aaa', PipelearnPipe) aaa: string,
    @Param('bbb', PipelearnPipe) bbb: string,
  ) {
    return aaa + bbb;
  }
}
