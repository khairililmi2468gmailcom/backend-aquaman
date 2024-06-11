const predictClassification = require('../services/inferenceServices');
const crypto = require('crypto');
const db = require('../db2');

function runQuery(query, params) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this);
    });
  });
}

async function predictModel(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  try {
    const { label, explanation } = await predictClassification(model, image);
    const id = crypto.randomUUID();

    if (!label || !explanation) {
      return h.response({
        status: 'fail',
        message: 'Result or explanation is missing'
      }).code(400);
    }

    const data = {
      id,
      result: label,
      explanation,
      timestamp: new Date().toISOString()
    };
    //simpan data menggunaan sqlite biar cepat
    await runQuery(
      `INSERT INTO predictions (id, result, explanation, timestamp) VALUES (?, ?, ?, ?)`, [data.id, data.result, data.explanation, data.timestamp]
    );

    return h.response({
      status: 'success',
      data
    }).code(201);
  } catch (error) {
    console.error('Error saving prediction to database:', error.message);
    return h.response({
      status: 'fail',
      message: 'Error saving prediction to database'
    }).code(500);
  }
}

async function getAllPredictions(request, h) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM predictions`, [], (err, rows) => {
      if (err) {
        console.error('Error fetching predictions:', err.message);
        return reject(h.response({
          status: 'fail',
          message: 'Error fetching predictions',
          error: err.message
        }).code(500));
      }

      resolve(h.response({
        status: 'success',
        data: rows
      }).code(200));
    });
  });
}

module.exports = { predictModel, getAllPredictions };