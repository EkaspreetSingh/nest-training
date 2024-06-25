import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable ()

export default class UserService {

  private users: User[] = [];
  private idCounter: number = 1;

  constructor() {
    this.users = [
        {
          id: this.idCounter++,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNo: '+91 9856128211',
          password: 'password123',
          isActive: true,
          role: 'admin',
          gender: 'male',
          age: 30,
          address: '123 Main St, Anytown, USA',
          occupation: 'Software Developer',
        },
        {
          id: this.idCounter++,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phoneNo: '+91 7856128211',
          password: 'password456',
          isActive: false,
          role: 'user',
          gender: 'female',
          age: 25,
          address: '456 Elm St, Anytown, USA',
          occupation: 'Graphic Designer',
        },
        {
          id: this.idCounter++,
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice.johnson@example.com',
          phoneNo: '+91 7718228211',
          password: 'password789',
          isActive: true,
          role: 'user',
          gender: 'female',
          age: 28,
          address: '789 Pine St, Anytown, USA',
          occupation: 'Project Manager',
        },
      ];
  }

  isEmailAlreadyExsists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  findAll (role?: 'user' | 'admin') {
    if (role) {
      const resultUser = this.users.filter(user => user.role === role);
      if(resultUser.length === 0) {
        throw new NotFoundException(`User with role ${role} not found`);
      }
      return resultUser;
    }
    else {
      return this.users;
    }
  }

  create (createUserDto: CreateUserDto) {
    try {
      if(this.isEmailAlreadyExsists(createUserDto.email)) {        
        console.log("bad request")
        throw new HttpException(`User with email ${createUserDto.email} already exists`,400);
      }
      const newUser : User = { id: this.idCounter++, ...createUserDto };
      this.users.push(newUser);
      return newUser;
    }
    catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    try {
      const user = this.users.find(user => user.id == id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    }
    catch (error) {
      throw error;
    }
  }
    
  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if(this.isEmailAlreadyExsists(updateUserDto.email)) {        
        console.log("bad request")
        throw new HttpException(`User with email ${updateUserDto.email} already exists`,400);
      }
      if(updateUserDto.age && updateUserDto.age < 0) {
        throw new HttpException(`Age cannot be negetive`,400);
        
      }
      const userIndex = this.users.findIndex(user => user.id == id);
      if (userIndex === -1) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      const updatedUser = { ...this.users[userIndex], ...updateUserDto };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    catch (error) {
      return error;
    }
  }

  remove(id: number) {
    try {
      const userIndex = this.users.findIndex(user => user.id == id);
      if (userIndex === -1) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      this.users.splice(userIndex, 1);
      return { message: `User with id ${id} removed` };
    }
    catch (error) {
      throw error;
    }
  }

}