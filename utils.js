const getDate = () => {
  const hariIni = new Date();
  const tanggal = hariIni.getDate();
  let bulan = hariIni.getMonth();
  const tahun = hariIni.getFullYear();
  let tanggal25BulanIni;
  let tanggal24BulanDepan;

  if (tanggal >= 25) {
    tanggal25BulanIni = new Date(tahun, bulan, 26);
    tanggal24BulanDepan = new Date(tahun, bulan + 1, 25);
  } else {
    if (bulan === 0) {
      tahun--;
      bulan = 11;
    } else {
      bulan--;
    }
    tanggal25BulanIni = new Date(tahun, bulan, 26);
    tanggal24BulanDepan = new Date(tahun, bulan + 1, 25);
  }

  return [tanggal25BulanIni.toISOString().split("T")[0], tanggal24BulanDepan.toISOString().split("T")[0]];
};

// const getDateBefore = () => {
//   const hariIni = new Date();
//   const tanggal = hariIni.getDate();
//   let bulan = hariIni.getMonth();
//   const tahun = hariIni.getFullYear();
//   let tanggal25BulanIni;
//   let tanggal24BulanLalu;

//   if (tanggal >= 25) {
//     tanggal25BulanIni = new Date(tahun, bulan - 1, 26);
//     bulan++;
//     if (bulan === 12) {
//       tahun++;
//       bulan = 0;
//     }
//     tanggal24BulanLalu = new Date(tahun, bulan - 1, 25);
//   } else {
//     bulan -= 2;
//     if (bulan < 0) {
//       tahun--;
//       bulan += 12;
//     }
//     tanggal25BulanIni = new Date(tahun, bulan, 26);
//     tanggal24BulanLalu = new Date(tahun, bulan + 1, 25);
//   }

//   return [tanggal25BulanIni.toISOString().split("T")[0], tanggal24BulanLalu.toISOString().split("T")[0]];
// };

const getDateBefore = () => {
  const hariIni = new Date();
  const tanggal = hariIni.getDate();
  let bulan = hariIni.getMonth();
  const tahun = hariIni.getFullYear();

  if (tanggal <= 25) {
    bulan -= 2;
    if (bulan < 0) {
      tahun--;
      bulan += 12;
    }
  }

  const tanggal24BulanLalu = new Date(tahun, bulan, 25).toISOString().split("T")[0];
  return tanggal24BulanLalu;
};

module.exports = { getDate, getDateBefore };
