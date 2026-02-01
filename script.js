// Untuk Menyimpan data ke EXCEL 
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
    // Simpan ke local storage
    simpanKeLocalStorage(data);

    alert("Laporan berhasil dikirim. Terima kasih 🙏");
    document.getElementById("LaporanForm").reset();
  })
  .catch(err => {
    alert("Gagal mengirim laporan!");
    console.error(err);
  });
}

// fUNCTION LOCAL STORAGE
function simpanKeLocalStorage(data) {
  let laporan = JSON.parse(localStorage.getItem("laporan")) || [];
  laporan.push({ ...data, waktu: new Date().toLocaleString() });
  localStorage.setItem("laporan", JSON.stringify(laporan));
}

// UNTUK REQUIRED
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("LaporanForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const fields = ["nama", "kelas", "judul", "kategori", "lokasi", "deskripsi"];

    fields.forEach(id => {
      const input = document.getElementById(id);

      if (!input.value.trim()) {
        input.classList.add("is-invalid");
        valid = false;
      } else {
        input.classList.remove("is-invalid");
      }
    });

    if (!valid) return;

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

});

  
// MENAMPILKAN HISTORY
function tampilkanHistory() {
  const container = document.getElementById("historyContainer");
  container.innerHTML = "";

  const laporan = JSON.parse(localStorage.getItem("laporan")) || [];

  if (laporan.length === 0) {
    container.innerHTML = "<p class='text-muted'>Belum ada laporan.</p>";
    return;
  }

  laporan.reverse().forEach(item => {
    const card = document.createElement("div");
    card.className = "card border-0 border-start border-3 border-primary col-md-6 history-card";

    card.innerHTML = `
      <div class="history-content p-3">
        <div class="history-stats d-flex align-items-center justify-content-between"> 
          <h5 class="mb-1 text-start">${item.judul}</h5> <br>
          <p class="mb-1 text-muted">${item.kategori}</p>
          <div class="history-status text-success">
            <i class="bi bi-check-circle-fill me-1"></i> Done
          </div>
        </div>
        <p class="mb-1 text-muted">${item.deskripsi}</p>
        <p class="mb-1 text-muted">${item.lokasi}</p>
        <small class="text-secondary">${item.waktu}</small>
      </div>
    `;

    container.appendChild(card);
  });
}
document.addEventListener("DOMContentLoaded", tampilkanHistory);
