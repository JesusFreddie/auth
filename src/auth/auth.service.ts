import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { SingInDto, SingUpDto } from './dto';
import { UserService } from 'src/user/user.service';
import { Token, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { Tokens } from './interfaces';

@Injectable()
export class AuthService {

	private readonly logger = new Logger(AuthService.name);
	
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly db: DbService
	) {}

	public async singUp(data: SingUpDto) {
		const user: User = await this.userService.findOne(data.email).catch(err => {
			this.logger.error(err)
			return null;
		})

		if (user) {
			throw new ConflictException('Пользователь с таким email уже зарегистрирован');
		}

		return this.userService.create(data).catch(err => {
			this.logger.error(err);
			return null;
		})
	}

	public async singIn(data: SingInDto): Promise<Tokens> {
		const user: User = await this.userService.findOne(data.email).catch(err => {
			this.logger.error(err)
			return null;
		})

		if (!user || !compareSync(data.password, user.password)) {
			throw new UnauthorizedException("Не верный логин или пароль")
		}

		const accessToken = "Bearer " + this.jwtService.sign({
			id: user.id, 
			email: user.email,
			roles: user.roles
		})

		const refreshToken = await this.getRefreshToken(user.id);

		return { accessToken, refreshToken }

	}

	private async getRefreshToken(userId: string): Promise<Token> {
		return this.db.token.create({
			data: {
				token: v4(),
				exp: add(new Date(), { months: 1 }),
				userId,
			}
		})
	}

}
