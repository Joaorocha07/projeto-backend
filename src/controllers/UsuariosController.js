import User from "../models/User";
import { createSenhaHash } from "../services/auth";

class UsuariosController {
    
    // Listagem de usuarios
    async index(req, res) { 
        try {
            const users = await User.find();
            return res.json(users);
        } catch(erro) {
            console.error(erro);
            return res.status(500).json({ error: "Erro no servidor!" })
        }
    }

    // Mostrar um usuario
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if(!user) {
                return res.status(404).json();
            }

            return res.json(user);

        } catch(erro) {
            console.error(erro);
            return res.status(500).json({ error: "Erro no servidor!" })
        }
    }
    
    // Criar um usuario
    async create(req, res) {
        try {
            const { email, senha } = req.body;

            if(!senha) {
                return res.status(422).json({ msg: " A senha é obrigatorio" })
            }

            const user = await User.findOne({ email });

            if(user) {
                return res.status(422).json({ msg: `Usuario ${email} já cadastrado!` })
            }

            //Criptografando a senha do usuario
            const senhaProtegida = await createSenhaHash(senha);

            const novoUser = await User.create (
                { 
                    email, 
                    senha: senhaProtegida 
                }
            );
            
            return res.status(201).json(novoUser);
        } catch(erro) {
            console.error(erro);
            return res.status(500).json({ error: "Erro no servidor!" })
        }
    }
    
    // Atualizar algo do usuario
    async update(req, res) {
        try {

            const { id } = req.params;
            const { email, senha } = req.body;

            const user = await User.findById(id);

            if(!user) {
                return res.status(404).json();
            }

            const senhaProtegida = await createSenhaHash(senha);

            await user.updateOne (
                { 
                    email, 
                    senha: senhaProtegida
                }
            );
            
            return res.status(200).json();

        } catch(erro) {
            console.error(erro);
            return res.status(500).json({ error: "Erro no servidor!" })
        }
    }
    
    // Deletar algo do usuario
    async delete(req, res) {
        try {

            const { id } = req.params;
            const user = await User.findById(id);

            if(!user) {
                return res.status(404).json();
            }

            await user.deleteOne();

            return res.status(200).json();

        } catch(erro) {
            console.error(erro);
            return res.status(500).json({ error: "Erro no servidor!" })
        }
    }
}

export default new UsuariosController();