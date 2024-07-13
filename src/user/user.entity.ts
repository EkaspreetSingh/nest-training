import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName?: string;

  @Column({ unique: true })
  email: string;

  @Column
  phoneNo: string;

  @Column
  password: string;

  @Column
  isActive?: boolean;

  @Column
  role: string;

  @Column
  gender: string;

  @Column
  age?: number;

  @Column
  address?: string;

  @Column
  occupation?: string;
}
