import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookie = createParamDecorator((key: string, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest() as Request;
	return key ? req.cookies[key] : req.cookies;
});