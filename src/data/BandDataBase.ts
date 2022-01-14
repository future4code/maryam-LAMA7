import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

    private static TABLE_NAME = "lama_band";
  
    public async createBand(
      id: string,
      name: string,
      music_genre: string,
      responsible: string
    ): Promise<void> {
      try {
        await this.getConnection()
          .insert({
            id,
            name,
            music_genre,
            responsible
          })
          .into(BandDatabase.TABLE_NAME);
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
  
    public async getBandById(id: string, name: string): Promise<Band[]> {
      try {
        const result = await this.getConnection()
          .select("*")
          .from(BandDatabase.TABLE_NAME)
          .orderBy(name)
        
        return result[0] && Band.toBandModel(result[0]);
        
      } catch (error: any) {
        throw new Error(error.slqMessage || error.message)
      }

    }
    
  
  }