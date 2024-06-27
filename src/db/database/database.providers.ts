import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/user/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'ekaspreet',
        password: 'chaipassword',
        database: 'chaiDB123',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];