const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    const modelUrl = 'https://storage.googleapis.com/aquamate-backend/model.json';
    try {
        const model = await tf.loadLayersModel(modelUrl);
        console.log('Sukses');
        return model;
    } catch (error) {
        console.error('Gagal memuat model:', error);
        throw error;
    }
}
module.exports = loadModel;