import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import config from 'src/config';
import { UserStatus } from 'src/constants';
import { catchError } from 'src/utils/catch-error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const auth = req.headers?.authorization;
      if (!auth) {
        throw new UnauthorizedException('Unauthorized user!');
      }
      const bearer = auth.split(' ')[0];
      const token = auth.split(' ')[1];
      if (bearer != 'Bearer' || !token) {
        throw new UnauthorizedException('Token not found');
      }
      const user = this.jwtService.verify(token, {
        secret: config.ACCESS_SECRET,
      });
      if (user?.status === UserStatus.INACTIVE) {
        throw new BadRequestException('This user is blocked by moderator');
      }
      req.user = user;
      return true;
    } catch (error) {
      return catchError(error);
    }
  }
}
