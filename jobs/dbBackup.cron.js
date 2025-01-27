import { BACKUP_TYPES } from './types/types.js';
import { config } from '../config/config.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { RemoteDBBackupStrategy } from './remoteDbBackupStrategy.js';
import { remoteDBParams } from './types/remoteDbParams.js';
import { resolve } from 'path';
import cron from 'node-cron';
import { DBBackupContext } from './dbBackupContext.js';
import { LocalDBBackupStrategy } from './localDbBackupStrategy.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { backupMode } = config;

const performBackup = async () => {    
  
    const backupFile = resolve(
      __dirname,
      `../backups/backup_${new Date().toISOString().split('T')[0]}.sql`
    );
    let strategy;    
    
    switch(backupMode){
      case BACKUP_TYPES.LOCAL:{      
        strategy = new LocalDBBackupStrategy({...config, backupFile});
      }break;
      case BACKUP_TYPES.REMOTE:{        
        let params = {...remoteDBParams,backupFile};        
        strategy = new RemoteDBBackupStrategy(params);        
      }break;
      default:{
        throw new Error('Tipo de backup no soportado');
      }  
    }      
    const dbBackupContext = new DBBackupContext(strategy);    
    dbBackupContext.backup();  
    console.log('Error al ejecutar db backup cron: ');
  
}

export const dbBackupCron = () => {
  cron.schedule('* * * * *', () => {    
    performBackup();
  });
  console.log('Cron job configurado para las XX:XXX todos los días.');
}