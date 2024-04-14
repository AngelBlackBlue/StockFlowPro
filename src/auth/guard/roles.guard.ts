import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {} //permitirá leer los metadatos
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(), //busca los roles definidos tanto a nivel de método
      context.getClass(), // como en clases
    ]);

    return true;
  }
}
