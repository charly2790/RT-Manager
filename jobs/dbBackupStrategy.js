export class DBBackupStrategy {

    constructor(params){
        this.dbParams = params;
    }

    backup(){
        throw new Error("El método backup debe ser implementado");
    }
     
}