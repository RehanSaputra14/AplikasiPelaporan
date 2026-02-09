const scriptURL = "https://script.google.com/macros/s/AKfycbyoagib6o8CG-OmUGs7BchmYSNdgPd_gbvUMk6-KjsR7hLpx-2msFYUJDfbfgqKN6CeZg/exec";

document.addEventListener("DOMContentLoaded", tampilkanHistory);

function tampilkanHistory() {
  const userId = localStorage.getItem("user_id");
  if (!userId) return;

  fetch(`${scriptURL}?user_id=${userId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("historyContainer");
      if (!container) return;

      container.innerHTML = "";

      if (data.length === 0) {
        container.innerHTML = "<p class='text-muted'>Belum ada laporan.</p>";
        return;
      }

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-12";

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
    });
}