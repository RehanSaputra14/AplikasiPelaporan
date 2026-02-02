// MENAMPILKAN HISTORY
function tampilkanHistory() {
  const container = document.getElementById("historyContainer");

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
