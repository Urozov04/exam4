import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signInDto';
import { Response } from 'express';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CheckRoles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/constants';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/user.guard';
import { SelfGuard } from 'src/guards/self.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { ConfirmLoginDto } from './dto/confirm-login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN)
  @Post('admin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.createAdmin(createUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  @Post('seller')
  createSeller(@Body() createSellerDto: CreateSellerDto) {
    return this.userService.createSeller(createSellerDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto) {
    return this.userService.signIn(signInDto);
  }

  @Post('confirm')
  confirmLogin(
    @Body() confirmLoginDto: ConfirmLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.confirmLogin(confirmLoginDto, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@UserDecorator() user: any) {
    return this.userService.profile(user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(UserRoles.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
