import {Request, Response} from "express"
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";

export class BandController {

    async createBand(req: Request, res: Response) {
        try {

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness();
            const token = req.headers.authorization as string
            const band = await bandBusiness.createBand(input, token);

            res.status(200).send( band );

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
    
    async getBandById(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const sort = req.query.sort === "id" ? "id" : "name"
            const order = req.query.order === "DESC" ? "DESC" : "ASC"
           
            const bandBusiness = new BandBusiness();
            const band = await bandBusiness.getBandById(token, sort, order)

            res.status(200).send(band)
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
}