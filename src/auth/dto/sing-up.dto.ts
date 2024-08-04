import { IsPasswordMatchingConstraint } from "@common/decorators/is-password-matching-constraint.decorator";
import { IsEmail, IsString, MinLength, Validate } from "class-validator";

export class SingUpDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	password: string;

	@IsString()
	@Validate(IsPasswordMatchingConstraint)
	passwordRepeat: string;
}