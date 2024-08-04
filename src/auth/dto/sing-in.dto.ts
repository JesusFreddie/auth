import { IsEmail, IsString } from "class-validator";

export class SingInDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}