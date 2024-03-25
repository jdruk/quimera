import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { asyncLocalStorage, AsyncContextService } from '../common/async-context.service';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  constructor(private asyncContextService: AsyncContextService) {}

  use(req: Request, res: Response, next: () => void) {
    asyncLocalStorage.run(new Map(), () => {
      this.asyncContextService.setSaasId(req.headers['x-tenant-id'] as string);
      next();
    });
  }
}
