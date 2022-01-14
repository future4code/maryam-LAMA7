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

}
