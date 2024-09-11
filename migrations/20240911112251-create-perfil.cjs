'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('perfiles', {
      idPerfil: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombreCompleto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fechaNacimiento: {
        type: Sequelize.DATE,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      redesSociales: {
        type: Sequelize.JSON,
      },
      marcasPersonales: {
        type: Sequelize.JSON,
      },
      fechaCreacion: {
        type: Sequelize.DATE,
      },
      idUsuarioCreador: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios', // Nombre de la tabla a la que hace referencia
          key: 'idUsuario', // Llave primaria de la tabla 'usuarios'
        }
      },
      idUsuarioModificador: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'idUsuario',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('perfiles');
  }
};
