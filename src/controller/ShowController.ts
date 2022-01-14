import {Request, Response} from "express"
import { ShowBusiness } from "../business/ShowBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { ShowInputDTO } from "../model/Show";

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

}