import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ApplicationsService } from 'src/applications/applications.service';
import { TokenService } from 'src/auth/services/token.service';

export class ProjectManagerGuard implements CanActivate {
  constructor(
    private applicationsService: ApplicationsService,
    private tokenService: TokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const token = request.headers.authorization?.split(' ')[1];

      const uid = this.tokenService.validateAccessToken(token);

      const isProjectManager =
        this.applicationsService.checkIsProjectManager(uid);

      return isProjectManager;
    } catch (e) {
      return false;
    }
  }
}
