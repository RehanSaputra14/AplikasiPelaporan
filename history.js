const scriptURL = "https://script.google.com/macros/s/AKfycbyoagib6o8CG-OmUGs7BchmYSNdgPd_gbvUMk6-KjsR7hLpx-2msFYUJDfbfgqKN6CeZg/exec";

let semuaData = [];

document.addEventListener("DOMContentLoaded", () => {
  tampilkanHistory();

  const filter = document.getElementById("filterStatus");
  if (filter) {
    filter.addEventListener("change", filterData);
  }
});

function statusBadge(status) {
  const s = String(status).toLowerCase();

  if (s === "selesai") return "bg-success px-4 py-2";
  if (s === "diproses") return "bg-warning text-dark px-3 py-2";
  if (s === "ditolak") return "bg-danger px-3 py-2";

  return "bg-secondary";
}

function statusIcon(status) {
  const s = String(status).toLowerCase();

  if (s === "selesai") return "bi-check-circle";
  if (s === "diproses") return "bi-clock";
  if (s === "ditolak") return "bi-x-circle";

  return "bi-question-circle-fill";
}

function tampilkanHistory() {
  const userId = localStorage.getItem("user_id");
  if (!userId) return;

  fetch(`${scriptURL}?user_id=${userId}`)
    .then(res => res.json())
    .then(data => {
      semuaData = data;
      renderData(data);
    });
}

function renderData(data) {
  const container = document.getElementById("historyContainer");
  if (!container) return;

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p class='text-muted text-center'>Belum ada laporan.</p>";
    return;
  }

  data.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-8 col-lg-6 mb-3 history-card";

    card.innerHTML = `
      <div class="p-4 rounded-4 shadow-sm bg-white w-100 m-auto">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center gap-2">
            <span class="badge border border-dark text-dark">${item.kategori}</span>
            <small class="text-muted">${item.waktu}</small>
          </div>

          <span class="badge rounded-pill ${statusBadge(item.status)}">
            <i class="bi ${statusIcon(item.status)} me-1"></i> ${item.status}
          </span>
        </div>

        <h4 class="fw-bold mb-2">${item.judul}</h4>
        <p class="text-muted mb-3">${item.deskripsi}</p>

        <div class="d-inline-flex align-items-center gap-2 px-3 py-2 bg-light rounded-pill">
          <i class="bi bi-geo-alt-fill text-primary"></i>
          <span>${item.lokasi}</span>
        </div>
      </div>
    `;

    container.appendChild(card);

    // 🎬 Animasi bertahap
    setTimeout(() => {
      card.classList.add("show");
    }, index * 120);
  });
}

function filterData() {
  const value = document.getElementById("filterStatus").value.toLowerCase().trim();

  if (value === "all") {
    renderData(semuaData);
    return;
  }

  const filtered = semuaData.filter(item =>
    String(item.status).toLowerCase().trim() === value
  );

  renderData(filtered);
}

