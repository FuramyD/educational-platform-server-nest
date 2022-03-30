import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./services/auth.service";
import { User } from "../models/user.model";
import { ChangePasswordDto, JwtDto, RegistrationDto, RestorePasswordDto } from "../dto/auth.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserModel } from "../schemas/user.schema";
import { JwtPayload } from "../models/auth.model";

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard("local"))
    @Post("/login")
    public async login(@Req() req: Request): Promise<JwtDto> {
        return this.authService.login(req.user as UserModel);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/profile")
    public async profile(@Req() req: Request): Promise<JwtPayload> {
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

    @Post("/restore-password")
    public async restorePassword(@Body() body: RestorePasswordDto): Promise<unknown> {
        return this.authService.restorePassword(body.email);
    }

    @Post("/change-password")
    public async changePassword(@Body() { id, password }: ChangePasswordDto): Promise<unknown> {
        return this.authService.changePassword(id, password);
    }

}
