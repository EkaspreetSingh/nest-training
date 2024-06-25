import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { DatabaseService } from 'src/db/database/database.service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, DatabaseService],
})
export class EmployeeModule {}
