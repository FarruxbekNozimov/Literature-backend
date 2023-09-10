import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserSelfGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException({ msg: 'User unauthorized' });
    const [token, bearer] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ msg: 'User unauthorized' });
    }
    let user: any;
    user = this.jwtService.verify(token, { secret: process.env.TOKEN_KEY });
    if (String(req.user.id) !== req.user.id) {
      throw new UnauthorizedException({ msg: 'User not allowed' });
    }
    return true;
  }
}
