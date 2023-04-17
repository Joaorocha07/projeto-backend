import { Router } from "express";

import auth from "./middlewares/auth";

import HelloController from "./controllers/HelloController";
import UsuariosController from "./controllers/UsuariosController";
import SessaoController from "./controllers/SessaoController";

const routes = new Router();

// Controllers Publico
routes.post('/sessions', SessaoController.create);
routes.get('/hello', HelloController.index);


// Controllers Privado
// routes.use(auth);

routes.get('/usuarios', UsuariosController.index);
routes.get('/usuarios/:id', UsuariosController.show);
routes.post('/usuarios', UsuariosController.create);
routes.put('/usuarios/:id', UsuariosController.update);
routes.delete('/usuarios/:id', UsuariosController.delete);

export default routes;