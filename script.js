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
    card.className = "col-md-12";

    card.innerHTML = `
      <div class="p-4 rounded-4 shadow-sm bg-white">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge border border-dark text-dark">${item.kategori}</span>
            <small class="text-muted">${item.waktu}</small>
          </div>

          <span class="badge rounded-pill bg-warning text-dark px-3 py-2">
            <i class="bi bi-clock me-1"></i> ${item.status || "Pending"}
          </span>
        </div>

        <!-- Judul -->
        <h4 class="fw-bold mb-2">${item.judul}</h4>

        <!-- Deskripsi -->
        <p class="text-muted mb-3">${item.deskripsi}</p>

        <!-- Lokasi -->
        <div class="d-inline-flex align-items-center gap-2 px-3 py-2 bg-light rounded-pill">
          <i class="bi bi-geo-alt-fill text-primary"></i>
          <span>${item.lokasi}</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", tampilkanHistory);
