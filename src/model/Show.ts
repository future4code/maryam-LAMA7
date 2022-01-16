export class Show{
    constructor(
    private id: string,
    private week_day: string,
    private start_time: number,
    private end_time: number,
    private band_id: string
    ){}

    getId(){
        return this.id;
    }

    getWeekDay(){
        return this.week_day
    }

    getStartTime(){
        return this.start_time
    }

    getEndTime(){
        return this.end_time
    }

    getBandId(){
        return this.band_id
    }


    setId(id: string){
        this.id = id;
    }

    setWeekDay(week_day: string){
        this.week_day = week_day
    }

    setStartTime(start_time: number){
        this.start_time = start_time
    }

    setEndTime(end_time: number){
        this.end_time = end_time
    }

    setBandId(band_id: string){
        this.band_id =band_id
    }

    static toShowModel(show: any): Show {
        return new Show(show.id, show.week_day, show.start_time, show.end_time, show.band_id);
      }

      public static week_dayEnum(data?: any): Weekday {
        switch(data) {
            case "SEXTA":
                return Weekday.SEXTA
            case "SÁBADO":
                return Weekday.SABADO
            case "DOMINGO":
                return Weekday.DOMINGO
            default:
                throw new Error("Dia do festival inválido.")
        }
    }

}

export interface ShowInputDTO{
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
}


export enum Weekday {
    SEXTA = "SEXTA",
    SABADO = "SÁBADO",
    DOMINGO = "DOMINGO"
}

export interface ShowOutputDTO {
    id: string,
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
    mainGenre?: string,
    bandName?: string
}
