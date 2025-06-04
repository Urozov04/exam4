import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/constants';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    if (user.role === UserRoles.SUPER_ADMIN || user.id == params.id) {
      return true;
    }
    throw new ForbiddenException('Forbidden user');
  }
}
