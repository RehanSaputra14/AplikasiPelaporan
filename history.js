const scriptURL = "https://script.google.com/macros/s/AKfycbyoagib6o8CG-OmUGs7BchmYSNdgPd_gbvUMk6-KjsR7hLpx-2msFYUJDfbfgqKN6CeZg/exec";

document.addEventListener("DOMContentLoaded", tampilkanHistory);

function statusBadge(status) {
  const s = String(status).toLowerCase();

  if (s === "done") return "bg-success";
  if (s === "pending") return "bg-warning";
  if (s === "reject") return "bg-danger";

  return "bg-secondary";
}

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
          <div class="p-2 rounded-4 shadow-sm bg-white w-100 m-auto">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge border border-dark text-dark">${item.kategori}</span>
            <small class="text-muted">${item.waktu}</small>
          </div>

          <span class="badge ${statusBadge(item.status)}">
            ${item.status}
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