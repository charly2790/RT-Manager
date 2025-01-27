import { DBBackupStrategy } from "./dbBackupStrategy.js";
import { exec } from 'child_process';

export class RemoteDBBackupStrategy extends DBBackupStrategy {

    constructor(dbParams) {
        super(dbParams);
    }

    getDbParams() {
        return this.dbParams;
    }

    backup() {
        console.log('this.dbParams: ', this.dbParams);
        const {
            username,
            password,
            database,
            host,
            port,
            containerName,
            backupFile
        } = this.dbParams;

        console.log('Inicio ejecución cron backup db: ', new Date());

        let command = `docker exec ${containerName} sh -c "PGPASSWORD=${password} pg_dump -U ${username} -h ${host} -p ${port} ${database}> ${backupFile}"`

        exec(command, (error, stdout, stderr) => {
            console.log('ejecuta algo?');
            if (error) {
                console.log('error--->', error.message);
                return;
            }
            if (stderr) {
                console.log('stderr-->', stderr);
                return;
            }

            console.log('stdout-->',stdout);
        });
    }
}