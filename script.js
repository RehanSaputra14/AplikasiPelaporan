// Inisialisasi EmailJS
(function(){
  emailjs.init("QtVREGDxgTJLDH1fj");
})();

document.getElementById("laporanForm").addEventListener("submit", function(e){
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const kelas = document.getElementById("kelas").value;
  const judul = document.getElementById("judul").value;
  const lokasi = document.getElementById("lokasi").value;
  const isiLaporan = document.getElementById("deskripsi").value;

  const laporan = {
    nama,
    kelas,
    judul,
    lokasi,
    isiLaporan,
    waktu: new Date().toLocaleString()
  };

  // 🔹 SIMPAN KE LOCAL STORAGE
  let data = JSON.parse(localStorage.getItem("riwayatLaporan")) || [];
  data.push(laporan);
  localStorage.setItem("riwayatLaporan", JSON.stringify(data));

  // 🔹 KIRIM EMAIL
  emailjs.send("service_g44qnpp", "template_df5bc1p", {
    nama: nama,
    kelas: kelas,
    judul: judul,
    lokasi: lokasi,
    laporan: isiLaporan,
    waktu: laporan.waktu
  }).then(() => {
    alert("Laporan berhasil dikirim!");
    document.getElementById("laporanForm").reset();
  }).catch((error) => {
    alert("Gagal mengirim email");
    console.log(error);
  });
});

