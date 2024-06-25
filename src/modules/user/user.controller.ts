import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import UserService from "./user.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";


@Controller('user')
export class UserController {
    // constructor(private userService : UserService) {}
    constructor(private readonly userService : UserService) {}

    @Get()
    findAlL(@Query('role') role?: 'user' | 'admin') : User[] {
        return this.userService.findAll(role);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }

}
