const scriptURL = "https://script.google.com/macros/s/AKfycbyoagib6o8CG-OmUGs7BchmYSNdgPd_gbvUMk6-KjsR7hLpx-2msFYUJDfbfgqKN6CeZg/exec";

document.getElementById("LaporanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nama: document.getElementById("nama").value,
    kelas: document.getElementById("kelas").value,
    judul: document.getElementById("judul").value,
    kategori: document.getElementById("kategori").value,
    lokasi: document.getElementById("lokasi").value,
    deskripsi: document.getElementById("deskripsi").value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    alert("Laporan berhasil dikirim. Terima kasih 🙏");
    document.getElementById("LaporanForm").reset();
  })
  .catch(err => {
    alert("Gagal mengirim laporan!");
    console.error(err);
  });
});
