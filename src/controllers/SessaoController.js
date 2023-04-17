// Faço a verificação de rotas do projeto

import jwt from "jsonwebtoken";
import User from "../models/User";
import { comparandoSenha } from "../services/auth";
import authConfig from "../config/auth";

class SessaoController {
    async create(req, res) {
        const { email, senha } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(401).json({ error: "Usuario ou senha invalido! - erro 1" })
        }

        const senhaValida = await comparandoSenha(user, senha);

        if(!senhaValida) {
            return res.status(401).json({ error: "Usuario ou senha invalido! - erro 2" })
        }

        const { id } = user;

        // Gerando o token para o usuario
        return res.json ({
            user: {
                id,
                email,
                senha,
            },

            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}

export default new SessaoController();