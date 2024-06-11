const dictionaryDB = require('../models/dictionary');

const dictionaryRoutes = [
    {
        method: 'POST',
        path: '/aquamate/dictionary',
        handler: async (request, h) => {
          try {
            const id = await dictionaryDB.create({
              fishImage: request.payload.fishImage,
              fishName: request.payload.fishName,
              fishLatinName: request.payload.fishLatinName,
              fishDesc: request.payload.fishDesc,
            });
            return h.response({
              status: true,
              message: "Question added successfully",
              id: id
            }).code(201);
          } catch (e) {
            return h.response({
              status: false,
              message: "Error while adding dictionary"
            }).code(500);
          }
        }
      },
      {
        method: 'GET',
        path: '/aquamate/dictionary',
        handler: async (request, h) => {
          try {
            const dictionary = await dictionaryDB.getAll();
            return h.response({
              status: true,
              data: dictionary
            }).code(200);
          } catch (e) {
            return h.response({
              status: false,
              message: "Unable to get the dictionary details"
            }).code(500);
          }
        }
    },

    {
        method: 'GET',
        path: '/aquamate/dictionary/{id}',
        handler: async (request, h) => {
          try {
            const id = request.params.id;
            const dictionaryEntry = await dictionaryDB.getById(id);
            return h.response({
              status: true,
              data: dictionaryEntry
            }).code(200);
          } catch (e) {
            return h.response({
              status: false,
              message: "Unable to get the dictionary entry details"
            }).code(500);
          }
        }
      }

]

module.exports = dictionaryRoutes;