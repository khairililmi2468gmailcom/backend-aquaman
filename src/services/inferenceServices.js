const tf = require('@tensorflow/tfjs-node');

async function predictClassification(model, image) {
  // Decode dan preprocess gambar
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([150, 150])
    .expandDims()
    .toFloat();

  // Melakukan prediksi menggunakan model
  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const confidenceScore = Math.max(...score) * 100;

  // Daftar kelas yang sesuai dengan model Anda
  const classes = [
    'Bacterial Red disease', 
    'Bacterial diseases - Aeromoniasis', 
    'Bacterial gill disease',
    'Fungal diseases Saprolegniasis', 
    'Healthy Fish', 
    'Parasitic diseases', 
    'Viral diseases White tail disease'
  ];

  // Menentukan kelas hasil prediksi
  const classResult = tf.argMax(prediction, 1).dataSync()[0];
  const label = classes[classResult];

  // Menyediakan penjelasan dan saran berdasarkan hasil prediksi
  let explanation, suggestion;

  switch (label) {
    case 'Bacterial diseases - Aeromoniasis':
      explanation = "Bacterial diseases - Aeromoniasis";
      suggestion = "Treatment suggestion for Bacterial diseases - Aeromoniasis";
      break;
    case 'Bacterial gill disease':
      explanation = "Bacterial gill disease";
      suggestion = "Treatment suggestion for Bacterial gill disease";
      break;
    case 'Bacterial Red disease':
      explanation = "Bacterial Red disease";
      suggestion = "Treatment suggestion for Bacterial Red disease";
      break;
    case 'Fungal diseases Saprolegniasis':
      explanation = "Fungal diseases Saprolegniasis";
      suggestion = "Treatment suggestion for Fungal diseases Saprolegniasis";
      break;
    case 'Healthy Fish':
      explanation = "Healthy Fish";
      suggestion = "No treatment needed.";
      break;
    case 'Parasitic diseases':
      explanation = "Parasitic diseases";
      suggestion = "Treatment suggestion for Parasitic diseases";
      break;
    case 'Viral diseases White tail disease':
      explanation = "Viral diseases White tail disease";
      suggestion = "Treatment suggestion for Viral diseases White tail disease";
      break;
    default:
      explanation = "Unknown";
      suggestion = "No suggestion available.";
  }

  return { confidenceScore, label, explanation, suggestion };
}

module.exports = predictClassification;