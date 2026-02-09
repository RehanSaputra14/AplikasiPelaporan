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
            <h5 class="fw-bold">${item.judul}</h5>
            <p class="text-muted">${item.deskripsi}</p>

            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-secondary">${item.kategori}</span>
              <span class="badge ${item.status === "Selesai" ? "bg-success" : "bg-warning"}">
                ${item.status}
              </span>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    });
}
