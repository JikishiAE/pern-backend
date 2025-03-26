import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { UserRoutes } from './users/users.routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/auth', AuthRoutes.routes );

    router.use('/user', UserRoutes.routes );

    return router;
  }


}

