import { DBBackupStrategy } from "./dbBackupStrategy.js";
import { exec } from 'child_process';

export class LocalDBBackupStrategy extends DBBackupStrategy {

    constructor(dbParams) {
        super(dbParams);
    }

    async backup() {
        const {
            username,
            password,
            database,
            host,
            port,            
            backupFile
        } = this.dbParams;

        let command = `PGPASSWORD=${password} pg_dump -U ${username} -h ${host} -p ${port} ${database} > ${backupFile}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`[${new Date()}] Error al realizar el backup:`, error.message);
                return;
            }
            if (stderr) {
                console.error(`[${new Date()}] stderr:`, stderr);
                return;
            }
            console.log(`[${new Date()}] Backup exitoso: ${this.params.backupFile}`);
        });
    }

}