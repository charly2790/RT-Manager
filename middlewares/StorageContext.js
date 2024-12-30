export class StorageContext {
    constructor(strategy){
        this.strategy = strategy;
    }

    async upload(req, res, next){
        if(!this.strategy) throw new Error('Estrategia no definida');
        this.strategy.upload(req, res, next);        
    }

    setSettings(settings){
        if(!this.strategy) throw new Error('Estrategia no definida');
        return this.strategy.setSettings(settings);
    }
}