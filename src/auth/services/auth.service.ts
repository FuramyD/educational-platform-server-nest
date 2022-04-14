import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../../models/user.model";
import { JwtDto, RegistrationDto } from "../../dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "../../users/services/users.repository";
import { UserDocument, UserModel } from "../../schemas/user.schema";
import { ConfigService } from "@nestjs/config";
const { createTransport } = require("nodemailer");

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UsersRepository,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    public async validateUser(login: string, password: string): Promise<UserDocument> {
        return await this.userRepository.findOne({
            $or: [
                { email: login, password },
                { phone: login, password }
            ]
        });
    }

    public async login({ _doc: user }: UserModel): Promise<JwtDto> {
        const payload = { id: user._id };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    public async registration(registrationDto: RegistrationDto): Promise<User> {
        const user = await this.userRepository.findOne({
            $or: [
                { email: registrationDto.email },
                { phone: registrationDto.phone }
            ]
        });

        if (user) {
            return null;
        }

        const createdUser = await this.userRepository.createOne(registrationDto);
        const { password, ...securedUser } = createdUser;
        return securedUser;
    }

    public async restorePassword(email: string): Promise<unknown> {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new BadRequestException({ message: "Пользователь не найден" });
        }

        await this.sendEmail(user);
        return true;
    }

    public async changePassword(id: string, newPassword: string): Promise<boolean> {
        const user = await this.userRepository.findOneById(id);

        if (user?.passwordEditable) {
            await this.userRepository.updateUserById(id, { password: newPassword, passwordEditable: false });
            return true;
        }
        throw new BadRequestException({ message: "Пользователь с таким e-mail не отправлял запрос на смену пароля" });
    }

    private async sendEmail(user: UserDocument): Promise<void> {
        const urlStart = process.env.PORT
            ? "https://educational-platform.herokuapp.com"
            : "http://localhost:4200";

        const email = user.email;

        await user.update({ passwordEditable: true }).exec();
        const url = `${urlStart}/auth/change-password?userId=${user._id}`;

        const senderEmail = this.configService.get<string>("SENDER_EMAIL");
        const senderEmailPass = this.configService.get<string>("SENDER_EMAIL_PASS");

        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: senderEmail,
                pass: senderEmailPass,
            },
        });

        await transporter.sendMail({
            from: `"Educationl Platform" <${senderEmail}>`,
            to: email,
            subject: "Restore password",
            html: `
                Link to restore password: ${url}
            `,
        });
    }

}
