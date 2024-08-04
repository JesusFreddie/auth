import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {

	constructor(
		private readonly db: DbService
	) {}

	public create(user: Partial<User>) {
		const hash = this.hashPassword(user.password);
		return this.db.user.create({ data: {
			email: user.email,
			password: hash,
			roles: ['USER']
		} });
	}

	public findOne(idOrEmail: string) {
		return this.db.user.findFirst({ where: {
			OR: [
				{id: idOrEmail},
				{email: idOrEmail}
			]
		} })
	}

	public delete(id: string) {
		return this.db.user.delete({ where: { id } })
	}

	private hashPassword(password: string) {
		return hashSync(password, genSaltSync(10));
	}
}
