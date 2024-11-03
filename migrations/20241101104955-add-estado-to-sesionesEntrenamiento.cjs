'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {  
    up: async ( queryInterface, Sequelize ) => {
      await queryInterface.addColumn('sesiones', 'idEstado', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'estadosDeSesion', //NOMBRE DE LA TABLA
          key: 'idEstado'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    } ,     
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('sesiones','idEstado')
    }  
};
