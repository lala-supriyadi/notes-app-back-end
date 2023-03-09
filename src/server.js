// eslint-disable-next-line import/no-extraneous-dependencies
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes/notes');
const NotesService = require('./services/postgres/NotesServices');
const NotesValidator = require('./validator/notes');

// import dotenv dan menjalankan konfigurasinya
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
 
const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
        cors: {
          origin: ['*'],
        },
      },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
 
 
init();