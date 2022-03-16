import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { User } from "../models/user.model";
import { LoginDto, RegistrationDto } from "../dto/login.dto";


@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("/login")
    public async login(@Body() body: LoginDto, @Res() res: Response): Promise<void> {
        const user: User = await this.authService.login(body);
        console.log("User:", user);
        if (user) {
            res.status(HttpStatus.OK).send(user);
        } else {
            res.status(HttpStatus.FORBIDDEN).send({
                message: "Invalid credentials!"
            });
        }
    }

    @Post("/registration")
    public async registration(@Body() body: RegistrationDto, @Res() res: Response): Promise<void> {
        const user: User = await this.authService.registration(body);
        console.log("User:", user);
        if (user) {
            res.status(HttpStatus.CREATED).send({
                message: "Аккаунт успешно зарегистрирован!"
            });
        } else {
            res.status(HttpStatus.OK).send({
                message: "Аккаунт с таким e-mail или телефоном уже существует."
            });
        }
    }

}
