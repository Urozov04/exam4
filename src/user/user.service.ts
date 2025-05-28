import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserRoles } from 'src/constants';
import { encrypt } from 'src/utils/encript-decrypt';
import config from 'src/config';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(@InjectModel(User) private UserModel: typeof User) {}
  async onModuleInit(): Promise<void> {
    try {
      const hasSuperAdmin = await this.UserModel.findOne({
        where: { role: UserRoles.SUPER_ADMIN },
      });
      if (!hasSuperAdmin) {
        const hashedPassword = await encrypt(config.ADMIN_PASSWORD);
        await this.UserModel.create({
          fullName: config.ADMIN_FULL_NAME,
          email: config.ADMIN_EMAIL,
          phoneNumber: config.ADMIN_PHONE,
          password: hashedPassword,
          role: UserRoles.SUPER_ADMIN,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  createAdmin(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
