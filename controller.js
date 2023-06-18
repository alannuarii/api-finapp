const db = require("./connection");
const date = require("./utils");

const { promisify } = require("util");
const dbQuery = promisify(db.query).bind(db);

const insert = async (req, res) => {
  try {
    const { tanggal, tarik, extra, keluar, item, nilai } = req.body;
    const sql = `INSERT INTO financial (tanggal, tarik, extra, keluar, item_keluar, nilai) VALUES (?,?,?,?,?,?)`;
    const values = [tanggal, tarik, extra, keluar, item, nilai];

    await dbQuery(sql, values);

    res.status(200).json({ message: "Data berhasil dikirim" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal input data", data: [] });
  }
};

const getThisMonth = async (req, res) => {
  try {
    const sql = `SELECT * FROM financial WHERE tanggal >= ? AND tanggal <= ?`;
    const values = date.getDate();

    const result = await dbQuery(sql, values);

    res.status(200).json({
      message: "Berhasil",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, data: [] });
  }
};

const getBeforeMonth = async (req, res) => {
  try {
    const sql = `SELECT * FROM financial WHERE tanggal >= ? AND tanggal <= ?`;
    const values = date.getDateBefore();

    const result = await dbQuery(sql, values);

    res.status(200).json({
      message: "Berhasil",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, data: [] });
  }
};

module.exports = { insert, getThisMonth, getBeforeMonth };
