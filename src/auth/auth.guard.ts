import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRET_KEY } from 'src/common/config';
import errmessages from 'src/common/errmessages';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException({
        message: errmessages.SHOULD_CONTAINS_TOKEN,
      });
    }
    const headerParts = authorizationHeader.split(' ');
    if (headerParts[0] !== 'Bearer') {
      throw new UnauthorizedException({
        message: errmessages.INCORRECT_TOKEN,
      });
    }

    const accessToken = headerParts[1];
    let tokenIsValid;
    try {
      tokenIsValid = this.jwtService.verify(accessToken, {
        secret: JWT_SECRET_KEY,
      });
    } catch (e) {
      throw new HttpException(
        errmessages.INCORRECT_TOKEN,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!tokenIsValid) {
      throw new UnauthorizedException({
        message: errmessages.INCORRECT_TOKEN,
      });
    }
    return true;
  }
}
