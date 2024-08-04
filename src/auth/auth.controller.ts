import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException } from '@nestjs/common';
import { SingInDto, SingUpDto } from './dto';
import { Tokens } from './interfaces';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Cookie } from '@common/decorators';

const REFRESH_TOKEN = 'refresh_token'

@Controller('auth')
export class AuthController {

	constructor(
		private readonly authService: AuthService,
		private readonly config: ConfigService
	) {}

	@Post('sing-up')
	public async singUp(@Body() data: SingUpDto) {
		const user = await this.authService.singUp(data);
		if (!user) {
			throw new BadRequestException(`Не получается зарегистрировать пользователя с данными ${JSON.stringify(data)}`);
		}
		
	}

	@Post('sing-in')
	public async singIn(@Body() data: SingInDto, @Res() res: Response) {
		const tokens = await this.authService.singIn(data);
		if (!tokens) {
			throw new BadRequestException('Не удалось войти');
		}
		
		this.setRefreshTokenToCookies(tokens, res);
	}

	@Get('refresh')
	public refreshTokrn() {
		
	}

	private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
		if (!tokens) {
			throw new UnauthorizedException();
		}
		res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
			httpOnly: true,
			sameSite: 'lax',
			expires: new Date(tokens.refreshToken.exp),
			secure: this.config.get("NODE_ENV", 'development') === 'production',
			path: '/'
		});
		res.status(HttpStatus.ACCEPTED).json({ accessToken: tokens.accessToken })
	}

	@Get('refresh-tokens')
	public async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
		if (!refreshToken) {
			throw new UnauthorizedException();
		}
		const tokens = await this.authService. // остановился на создании метода для получения пары токена
	}

}
