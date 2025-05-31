import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { UserRoles, UserStatus } from 'src/constants';
import { decrypt, encrypt } from 'src/utils/encript-decrypt';
import config from 'src/config';
import { catchError } from 'src/utils/catch-error';
import { sucResponse } from 'src/utils/success-response';
import { SignInDto } from './dto/signInDto';
import { TokenService } from 'src/utils/generate-token';
import { Response } from 'express';
import { writeToCookie } from 'src/utils/writeToCookie';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthUser } from 'src/helpers/user.types';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User) private UserModel: typeof User,
    private readonly token: TokenService,
  ) {}
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
      return catchError(error);
    }
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<Object> {
    try {
      const { email, phoneNumber, password } = createUserDto;
      const isExistEmail = await this.UserModel.findOne({ where: { email } });
      const isExistPhone = await this.UserModel.findOne({
        where: { phoneNumber },
      });
      if (isExistEmail) {
        throw new ConflictException('User with this email already exist');
      }
      if (isExistPhone) {
        throw new ConflictException('User with this phone number exist');
      }
      const hashedPassword = await encrypt(password);
      const newAdmin = await this.UserModel.create({
        ...createUserDto,
        role: UserRoles.ADMIN,
        password: hashedPassword,
        status: UserStatus.ACTIVE,
      });
      return sucResponse('New Admin created', newAdmin);
    } catch (error) {
      return catchError(error);
    }
  }

  async signIn(signInDto: SignInDto, res: Response): Promise<Object> {
    try {
      const { email, password } = signInDto;
      const user = await this.UserModel.findOne({ where: { email } });
      if (!user) {
        throw new BadRequestException('Email or password wrong!');
      }

      const isCorrectPassword = await decrypt(
        password,
        user.dataValues.password,
      );
      if (!isCorrectPassword) {
        throw new BadRequestException('Email or password wrong!');
      }

      const payload: AuthUser = {
        id: user.dataValues.id,
        name: user.dataValues.fullName,
        role: user.dataValues.role,
        status: user.dataValues.status,
      };

      const accessToken = await this.token.generateAccessToken(payload);
      const refreshToken = await this.token.generateRefreshToken(payload);
      writeToCookie(res, 'refreshTokenAdmin', refreshToken);

      return sucResponse('Loggen in successfully', { accessToken });
    } catch (error) {
      return catchError(error);
    }
  }

  async createSeller(createSellerDto: CreateSellerDto): Promise<Object> {
    try {
      const { email, phoneNumber, password } = createSellerDto;
      const seller = await this.UserModel.findOne({ where: { email } });
      const sellerByPhone = await this.UserModel.findOne({
        where: { phoneNumber },
      });

      if (seller) {
        throw new ConflictException('User with this email already exist');
      }
      if (sellerByPhone) {
        throw new ConflictException('User with this phone already exist');
      }

      const hashedPassword = await encrypt(password);

      const newSeller = await this.UserModel.create({
        ...createSellerDto,
        role: UserRoles.SELLER,
        status: UserStatus.ACTIVE,
        password: hashedPassword,
      });

      return sucResponse('New seller created', newSeller);
    } catch (error) {
      return catchError(error);
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<object> {
    try {
      const { email, phoneNumber, password } = signUpDto;
      const user = await this.UserModel.findOne({ where: { email } });
      const existPhone = await this.UserModel.findOne({
        where: { phoneNumber },
      });
      if (user) {
        throw new ConflictException('User with this email already exist!');
      }
      if (existPhone) {
        throw new ConflictException(
          'User with this phone number already exist',
        );
      }
      const hashedPassword = await encrypt(password);
      const newUser = await this.UserModel.create({
        ...signUpDto,
        role: UserRoles.CUSTOMER,
        password: hashedPassword,
      });

      return sucResponse('Signed up successfully', newUser);
    } catch (error) {
      return catchError(error);
    }
  }

  async findAll(): Promise<object> {
    try {
      const allUsers = await this.UserModel.findAll();
      return sucResponse('All users', allUsers);
    } catch (error) {
      return catchError(error);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const user = await this.UserModel.findByPk(id);
      if (!user) {
        throw new NotFoundException('User with this id is not exist');
      }
      return sucResponse('User by id', user);
    } catch (error) {
      return catchError(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
