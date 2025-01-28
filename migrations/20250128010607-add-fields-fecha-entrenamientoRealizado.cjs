'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('entrenamientos', 'fechaEntrenamiento', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('entrenamientos', 'entrenamientoRealizado', {
            type: Sequelize.TEXT,
            allowNull: true
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('entrenamientos', 'fechaEntrenamiento');
        await queryInterface.removeColumn('entrenamientos', 'entrenamientoRealizado');
    }
};
