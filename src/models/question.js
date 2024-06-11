const db = require('../db');
const { FieldValue } = require('@google-cloud/firestore');

class Question {
  static async create(data) {
    const questionRef = db.collection('questions').doc();
    await questionRef.set({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
    });
    return questionRef.id;
  }

  static async findById(id) {
    const questionDoc = await db.collection('questions').doc(id).get();
    if (!questionDoc.exists) {
      throw new Error('Question not found');
    }
    return questionDoc.data();
  }

  static async getAll() {
    const questionsSnapshot = await db.collection('questions').get();
    return questionsSnapshot.docs.map(doc => doc.data());
  }

  static async getAllWithAnswers() {
    const questionsSnapshot = await db.collection('questions').get();
    const questions = await Promise.all(
      questionsSnapshot.docs.map(async (doc) => {
        const answersSnapshot = await db.collection('answers').where('questionId', '==', doc.id).get();
        const allAnswers = answersSnapshot.docs.map(answerDoc => ({ id: answerDoc.id, ...answerDoc.data() }));
        return {
          id: doc.id,
          ...doc.data(),
          allAnswers
        };
      })
    );
    return questions;
  }

  static async update(id, data) {
    const questionRef = db.collection('questions').doc(id);
    await questionRef.update({
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  static async delete(id) {
    const batch = db.batch();

    // Delete all answers related to the question
    const answersSnapshot = await db.collection('answers').where('questionId', '==', id).get();
    answersSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete the question itself
    const questionRef = db.collection('questions').doc(id);
    batch.delete(questionRef);

    await batch.commit();
  }
}

module.exports = Question;