// Untuk Menyimpan data ke EXCEL 
// -----------------------------
const scriptURL = "https://script.google.com/macros/s/AKfycbyoagib6o8CG-OmUGs7BchmYSNdgPd_gbvUMk6-KjsR7hLpx-2msFYUJDfbfgqKN6CeZg/exec";

function kirimData() {

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
};

// Untuk Required
// -----------------------------
document.getElementById("LaporanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const fields = [
    "nama",
    "kelas",
    "judul",
    "kategori",
    "lokasi",
    "deskripsi"
  ];

  fields.forEach(id => {
    const input = document.getElementById(id);

    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      valid = false;
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (!valid) return; // STOP SUBMIT

  // ✅ lanjut kirim data
  kirimData();
});

document.querySelectorAll("#LaporanForm input, #LaporanForm select, #LaporanForm textarea")
  .forEach(el => {
    el.addEventListener("input", () => {
      if (el.value.trim()) {
        el.classList.remove("is-invalid");
      }
    });
  });
