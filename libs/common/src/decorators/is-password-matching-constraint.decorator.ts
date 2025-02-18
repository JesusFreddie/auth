import { SingUpDto } from "@auth/dto";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
	validate(passwordRepeat: string, args: ValidationArguments): Promise<boolean> | boolean {
		const obj = args.object as SingUpDto
		return obj.password === passwordRepeat;
	}

	defaultMessage(validationArguments?: ValidationArguments): string {
		return "Пароли не совпадают";
	}
}