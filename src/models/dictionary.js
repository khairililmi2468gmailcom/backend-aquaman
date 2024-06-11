const db = require('../db');
const { FieldValue } = require('@google-cloud/firestore');

class Dictionary{
    static async create(data) {
        const answerRef = db.collection('fishDictionary').doc();
        await answerRef.set({
          ...data,
          createdAt: FieldValue.serverTimestamp(),
        });
        return answerRef.id;
      }
      static async getAll() {
        try {
          const questionsSnapshot = await db.collection('fishDictionary').get();
          if (questionsSnapshot.empty) {
            console.log('No matching documents.');
            return [];
          }
          return questionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error('Error getting documents: ', error);
          throw new Error('Unable to retrieve dictionary entries');
        }
      }

      static async getById(id) {
        try {
          const doc = await db.collection('fishDictionary').doc(id).get();
          if (!doc.exists) {
            throw new Error('No such document!');
          }
          return { id: doc.id, ...doc.data() };
        } catch (error) {
          console.error('Error getting document:', error);
          throw new Error('Unable to retrieve dictionary entry');
        }
      }
}

module.exports = Dictionary;