const db = require("./connection");
const date = require("./utils");

const { promisify } = require("util");
const dbQuery = promisify(db.query).bind(db);

const insertData = async (req, res) => {
  try {
    let { tanggal, tarik, keluar, item, online, nilai } = req.body;
    if (keluar === "1") {
      nilai = -nilai;
      if (online === "1") {
        const nilaiTarik = [1, 0];
        const nilaiKeluar = [0, 1];
        const nilaiItem = ["Dana Pembelian Online", item];
        const newNilai = [-nilai, nilai];
        for (let i = 0; i < 2; i++) {
          const sql = `INSERT INTO financial (tanggal, tarik,  keluar, item_keluar, nilai) VALUES (?,?,?,?,?)`;
          const values = [tanggal, nilaiTarik[i], nilaiKeluar[i], nilaiItem[i], newNilai[i]];

          await dbQuery(sql, values);
        }

        res.status(200).json({ message: "Data berhasil dikirim" });
      } else {
        const sql = `INSERT INTO financial (tanggal, tarik,  keluar, item_keluar, nilai) VALUES (?,?,?,?,?)`;
        const values = [tanggal, tarik, keluar, item, nilai];

        await dbQuery(sql, values);

        res.status(200).json({ message: "Data berhasil dikirim" });
      }
    } else {
      const sql = `INSERT INTO financial (tanggal, tarik,  keluar, item_keluar, nilai) VALUES (?,?,?,?,?)`;
      const values = [tanggal, tarik, keluar, item, nilai];

      await dbQuery(sql, values);

      res.status(200).json({ message: "Data berhasil dikirim" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal input data", data: [] });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.body;
    const sql = `DELETE FROM financial WHERE id = ?`;
    const value = [id];

    await dbQuery(sql, value);

    res.status(200).json({ message: "Data berhasil dikirim" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal input data", data: [] });
  }
};

const getThisMonth = async (req, res) => {
  try {
    const sql = `SELECT * FROM financial WHERE tanggal >= ? AND tanggal <= ? ORDER BY tanggal ASC`;
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

module.exports = { insertData, deleteData, getThisMonth, getBeforeMonth };
