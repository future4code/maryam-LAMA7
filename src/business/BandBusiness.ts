import { BandDatabase } from "../data/BandDataBase";
import { Band, BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {

    async createBand(band: BandInputDTO, token: string) {
        if(!band.name || !band.music_genre || !band.responsible){
            throw new Error("Preencha os campos 'name', 'music_genre' e 'responsible'")
        }

        if (!token) {
            throw new Error("Informe um token válido!")
        }

        const userToken = new Authenticator().getData(token)

        if(userToken == null) {
            throw new Error("Você precisa de um token válido!")
        }

        if(userToken.role != UserRole.ADMIN){
            throw new Error("Somente Administradores podem registrar bandas.")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const bandDataBase = new BandDatabase();
        await bandDataBase.createBand(id, band.name, band.music_genre, band.responsible);
    }

    async getBandById(token: string, sort: string, order: string) {

       if(!token) {
        throw new Error("Informe um token válido!")
       }

       const tokenData = new Authenticator().getData(token)

            if(!tokenData) {
                throw new Error("Não autorizado!")
            }

            const bandDataBase = new BandDatabase();
             await bandDataBase.getBandById(tokenData.id, sort, order);

            if (!bandDataBase) {
                throw new Error("Não tem banda registrada.")
            }

            return bandDataBase
    }

}