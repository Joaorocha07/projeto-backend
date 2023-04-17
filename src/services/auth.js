// Autenticação de senhas 

/*
 * author João Victor Rocha Santos
 * Função para gerar uma senha protegida
 * 
 * @params String senha
 * @return String hash
*/
import bcrypt from "bcryptjs";

export const createSenhaHash = async(senha) => {
    const hash = await bcrypt.hash(senha, 8);
    return hash;
}

/*
 * author João Victor Rocha Santos
 * Metodo para comparar as senhas protegidas 
 * 
 * @params String user
 * @params String senha
 * @return hash
*/
export const comparandoSenha = async (user, senha) => {
    return await bcrypt.compare(senha, user.senha);
}
