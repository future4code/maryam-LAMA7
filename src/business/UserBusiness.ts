import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        if(!user.name || !user.email || !user.password || !user.role){
            throw new Error("Preencha os campos 'name', 'email', 'password' e 'role'")
        }

        if (!user.email.includes("@") || !user.email.includes(".com")) {
            throw new Error('Formato de e-mail inválido. O e-mail deve conter "@" e ".com" ');
        }

        if(!user.password || user.password.length < 6) {
            throw new Error("Senha inválida por favor a senha deve ter 6 caractres ou mais");
        }

        const userDataBase = new UserDatabase();

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        await userDataBase.createUser(id,user.name, user.email, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        if(!user.email || !user.password) {
            throw new Error(" 'email' e 'password' são obrigatórios")
        }

        const userDataBase = new UserDatabase();
        const userFromDB = await userDataBase.getUserByUser(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }
        
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        return accessToken;
    }
}