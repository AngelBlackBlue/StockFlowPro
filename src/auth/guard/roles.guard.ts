import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} //permitirá leer los metadatos
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(), //busca los roles definidos tanto a nivel de método
      context.getClass(), // como a nivel clases
    ]);

    if (!roles) return true;
    const { user } = context.switchToHttp().getRequest();
    return roles === user.role;
  }
}
