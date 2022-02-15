import { ShowDatabase } from "../data/ShowDataBase"
import { ShowInputDTO, Weekday } from "../model/Show"
import { UserRole } from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ShowBusiness {

    async resgistreShows(show: ShowInputDTO, token: any) {
        if(!show.week_day || !show.start_time || !show.end_time || !show.band_id){
            throw new Error("Preencha os campos 'week_day', 'start_time', 'end_time' e 'band_id'")
        }

        if (!token) {
            throw new Error("Informe um token válido!")
        }

        const userToken = new Authenticator().getData(token)

        if (userToken.role !== UserRole.ADMIN) {
            throw new Error("Somente administradores tem acesso.")
        }

        if(
        show.week_day !== "sexta" && 
        show.week_day !== "sábado" && 
        show.week_day !== "domingo"){
            throw new Error(`O festival será somente 'sexta', 'sábado' e 'domingo'. Registre a banda nesses dias.`)
        }
        
        if(!Number.isInteger(show.start_time) && !Number.isInteger(show.end_time)){
            throw new Error(`A marcação do harário do show so pode ser arredondados.`)
        }

        if(show.start_time <= 7 || show.start_time > 23 && show.end_time <= 7 || show.end_time > 23){
            throw new Error(`Os horários do evento Lama começa as 08hrs e termina as 23hrs.`)
        } 

        if (show.band_id != show.band_id) {
            throw new Error("Não existe banda registrada.")
        }
    
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const showDataBase = new ShowDatabase();

        const validateTimes = await showDataBase.getShowsTimes(show.week_day, show.start_time, show.end_time)

        if (validateTimes.length) {
            throw new Error("Não é possível registrar mais shows nesse horário.")
        }
        await showDataBase.registreShow(id, show.week_day, show.start_time, show.end_time, show.band_id);
    }

    async getShowsByWeekDayBusiness(weekDay: Weekday) {
      
        if (!weekDay) {
            throw new Error("Entrada inválida para obter shows por dia da semana")
        }

        const shows = await new ShowDatabase().getShowsByWeekDay(weekDay)

        return shows
    }
}


