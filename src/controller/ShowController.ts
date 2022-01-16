import {Request, Response} from "express"
import { ShowBusiness } from "../business/ShowBusiness";
import { BandDatabase } from "../data/BandDataBase";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowDatabase } from "../data/ShowDataBase";
import { Show, ShowInputDTO } from "../model/Show";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowController {

    async registreSohws(req: Request, res: Response) {
        try {

            const input: ShowInputDTO = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }

            const showBusiness = new ShowBusiness()
            const token = req.headers.authorization as string
            const show = await showBusiness.resgistreShows(input, token);

            res.status(200).send({ 
                message: "Show marcado com sucesso.",
                show 
            });

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getShowsByWeekDayController(req: Request, res: Response) {

        try {
            const weekDay = Show.week_dayEnum(req.query.weekDay as string)

            const showBusiness = new ShowBusiness()

            const shows = await showBusiness.getShowsByWeekDayBusiness(weekDay)
            res.status(200).send(shows)

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
        
            await BaseDatabase.destroyConnection();
    }


}