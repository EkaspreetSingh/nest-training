import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../../db/database/database.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.UserCreateInput): Promise<User> {
    return this.databaseService.user.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'user' | 'admin') {
    if(role) return this.databaseService.user.findMany({
      where: {
        role,
      }
    }) 
    return this.databaseService.user.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      }, data: updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      }
    })
  }
}
