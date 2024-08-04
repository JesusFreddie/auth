import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('user')
export class UserController {

	constructor(
		private readonly userService: UserService
	) {}

	@Post()
	public create(@Body() data: CreateUserDto) {
		return this.userService.create(data);
	}

	@Get(":idOrEmail")
	public findOne(@Param('idOrEmail') isOrEmail: string) {
		return this.userService.findOne(isOrEmail);
	}

	@Delete(":id")
	public delete(@Param('id', ParseUUIDPipe) id: string) {
		return this.userService.delete(id);
	}

}
