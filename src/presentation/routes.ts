import { Router } from 'express';
import { AuthRoutes } from './auth/auth.routes';
import { UserRoutes } from './users/users.routes';
import { BusinessRoutes } from './business/business.routes';
import { ProductsRoutes } from './products/products.routes';
import { OrdersRoutes } from './orders/orders.routes';


export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/auth', AuthRoutes.routes );

    router.use('/user', UserRoutes.routes );

    router.use('/business', BusinessRoutes.routes );

    router.use('/orders', OrdersRoutes.routes )

    router.use('/products', ProductsRoutes.routes );

    return router;
  }


}

