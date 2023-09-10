import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException({ msg: 'User unauthorized' });
    }

    try {
      const user = this.jwtService.verify(token, {
        secret: process.env.TOKEN_KEY,
      });
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ msg: 'User unauthorized' });
    }
  }
}
