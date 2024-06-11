const db = require('../db');
const { FieldValue } = require('@google-cloud/firestore');

class Answer {
  static async create(data) {
    const answerRef = db.collection('answers').doc();
    await answerRef.set({
      ...data,
      createdAt: FieldValue.serverTimestamp(),
    });
    return answerRef.id;
  }

  static async findById(id) {
    const answerDoc = await db.collection('answers').doc(id).get();
    if (!answerDoc.exists) {
      throw new Error('Answer not found');
    }
    return answerDoc.data();
  }

  static async update(id, data) {
    const answerRef = db.collection('answers').doc(id);
    await answerRef.update({
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    });
  }

  static async delete(id) {
    await db.collection('answers').doc(id).delete();
  }
}

module.exports = Answer;