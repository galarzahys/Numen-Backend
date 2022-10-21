const getSerie = async (req, res) => {
  const { range } = req.query;
  var serie = [0, 1];
  var limit = 20;

  if (range) limit = range;

  try {
    for (let i = 2; i < limit; i++) {
      serie.push(serie[i - 1] + serie[i - 2]);
    }
    return res.status(200).json({ serie });
  } catch {
    res.status(400).json({ message: "Error inesperado. Revise la solicitud e Intente nuevamente." });
  }
};

module.exports = { getSerie };
