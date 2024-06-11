const answerDB = require("../models/answer");

const answerRoutes = [
    {
      method: 'POST',
      path: '/aquamate/answers',
      handler: async (request, h) => {
        try {
          const id = await answerDB.create({
            answer: request.payload.answer,
            questionId: request.payload.questionId,
            user: request.payload.user,
          });
          return h.response({
            status: true,
            message: "Answer added successfully",
            id: id
          }).code(201);
        } catch (e) {
          return h.response({
            status: false,
            message: "Error while adding answer"
          }).code(500);
        }
      }
    }
  ];
  
  module.exports = answerRoutes;