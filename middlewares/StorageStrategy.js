export class StorageStrategy {

    constructor() {
        this.settings = null;
    }

    upload(data){
        throw new Error("El método upload debe ser implementado");
    }

    setSettings(){
        throw new Error("El método setStorage debe ser implementado");
    }

    getSettings(){
        throw new Error("El método getStorage debe ser implementado");
    }
}



