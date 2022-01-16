import { ShowOutputDTO, Weekday } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "lama_shows";
  
    public async registreShow(
      id: string,
      week_day: string,
      start_time: number,
      end_time: number,
      band_id: string
      
    ): Promise<void> {
      try {
        await this.getConnection()
          .insert({
            id,
            week_day,
            start_time,
            end_time,
            band_id
          })
          .into(ShowDatabase.TABLE_NAME);
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }

    public async getShowsTimes(week_day: string, start_time: number, end_time: number): Promise<ShowOutputDTO[]> {

      const shows = await this.getConnection()
          .select("*")
          .where("end_time", ">", `${start_time}`)
          .andWhere("start_time", "<", `${end_time}`)
          .from(ShowDatabase.TABLE_NAME)

      return shows.map((show: any) => {
          return {
              id: show.id,
              band_id: show.band_id,
              start_time: show.start_time,
              end_time: show.end_time,
              week_day: show.week_day
          }
      })
  }

  public async getShowsByWeekDay(weekDay: Weekday): Promise<ShowOutputDTO[]> {

    const shows = await this.getConnection()
        .raw(  `
        SELECT  s.id as id,
                b.id as bandId,
                s.start_time as startTime,
                s.end_time as endTime,
                s.week_day as weekDay,
                b.name as bandName,
                b.music_genre as mainGenre
        FROM lama_shows s
        LEFT JOIN lama_band b ON b.id = s.band_id
        WHERE s.week_day = "${weekDay}"
        ORDER BY startTime ASC
        `
        )

    return shows[0].map((data: any) => ({
        id: data.id,
        band_id: data.id,
        start_time: data.start_time,
        end_time: data.end_time,
        week_day: data.week_day,
        mainGenre: data.mainGenre
    }))
}

}
