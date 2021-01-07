import {MinLength, IsString, IsNotEmpty, IsEmail} from "class-validator";
export class CreateUserDto {
    // login
    @IsNotEmpty({
        message: "Логин обязательное поле"
    })
    @MinLength(6, {
        message: "Логин должен содержать не меньше 6 символов"
    })
    @IsString({
        message: "Логин является строкой"
    })
    login: string;
    // password
    @IsNotEmpty({
        message: "Пароль обязательное поле"
    })
    @MinLength(6, {
        message: "Пароль должен содержать не меньше 6 символов"
    })
    @IsString({
        message: "Пароль является строкой"
    })
    password: string;
    // email
    @IsNotEmpty({
        message: "email обязательное поле"
    })
    @MinLength(6, {
        message: "email должен содержать не меньше 6 символов"
    })
    @IsString({
        message: "email является строкой"
    })
    @IsEmail({}, {message:"не корретно указан email"})
    email: string;
}
