export class DBBackupContext {

    constructor(strategy){
        this.strategy = strategy;
    }

    backup(){
        if(!this.strategy) throw new Error('Estrategia no definida');
        this.strategy.backup();
    }

    getDbParams(){
        this.strategy.getDbParams();
    }



}