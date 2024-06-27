import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import UserService from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "src/auth/auth.service";
import { Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService : UserService,
        private authService: AuthService
    ) {}

    @Get()
    findAlL(@Query('role') role?: 'user' | 'admin')  {
        return this.userService.findAll(role);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }

    // @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() loginUserDto: LoginUserDto, @Res({passthrough:true}) res: Response) {
        return this.authService.signIn(loginUserDto, res);
    }
}
