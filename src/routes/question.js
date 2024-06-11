const questionDB = require('../models/question');

const questionRoutes = [
    {
      method: 'POST',
      path: '/aquamate/questions',
      handler: async (request, h) => {
        try {
          const id = await questionDB.create({
            questionName: request.payload.questionName,
            questionUrl: request.payload.questionUrl,
          });
          return h.response({
            status: true,
            message: "Question added successfully",
            id: id
          }).code(201);
        } catch (e) {
          return h.response({
            status: false,
            message: "Error while adding question"
          }).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/aquamate/questions',
      handler: async (request, h) => {
        try {
          const questions = await questionDB.getAllWithAnswers();
          return h.response(questions).code(200);
        } catch (e) {
          return h.response({
            status: false,
            message: "Unable to get the question details"
          }).code(500);
        }
      }
    },
    {
      method: 'DELETE',
      path: '/aquamate/questions/{id}',
      handler: async (request, h) => {
        try {
          const id = request.params.id;
          await questionDB.delete(id);
          return h.response({
            status: true,
            message: "Question and its related answers deleted successfully"
          }).code(200);
        } catch (e) {
          return h.response({
            status: false,
            message: "Error while deleting question"
          }).code(500);
        }
      }
    }
  ];
  
  module.exports = questionRoutes;