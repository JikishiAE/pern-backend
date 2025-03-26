import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { UserRoutes } from './users/users.routes';
import { BusinessRoutes } from './business/business.routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/auth', AuthRoutes.routes );

    router.use('/user', UserRoutes.routes );

    router.use('/business', BusinessRoutes.routes );

    return router;
  }


}

