import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./services/auth.service";
import { User } from "../models/user.model";
import { JwtDto, RegistrationDto } from "../dto/login.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserModel } from "../schemas/user.schema";


@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("/login")
    public async login(@Req() req: Request): Promise<JwtDto> {
        return this.authService.login(req.user as UserModel);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/profile")
    public async profile(@Req() req: Request): Promise<unknown> {
        return req.user;
    }
    
    @Post("/registration")
    public async registration(@Body() body: RegistrationDto, @Res() res: Response): Promise<void> {
        const user: User = await this.authService.registration(body);
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
