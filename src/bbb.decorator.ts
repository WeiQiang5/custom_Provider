import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';

// 合并装饰器
export function Bbb(path, role) {
  return applyDecorators(Get(path), Aaa(role), UseGuards(AaaGuard));
}
