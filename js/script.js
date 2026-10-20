/* ==========================================================================
   JAVASCRIPT LOGIC - CAMPUSEVENT
   Client-side execution, LocalStorage Sync, Search & Filter System
   ========================================================================== */

// 1. DATA CONTOH EVENT KAMPUS (10 EVENT REALIATIS & DIVERSITY)
const EVENTS_DATA = [
  {
    id: "evt-001",
    title: "Seminar Nasional Teknologi Digital & AI 2026",
    category: "Seminar",
    date: "2026-11-15",
    time: "08:30 - 12:30 WIB",
    location: "Auditorium Utama Lantai 3",
    organizer: "Himpunan Mahasiswa Teknologi Informasi (HMTI)",
    quota: 150,
    status: "Buka",
    deadline: "2026-11-10",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "Seminar nasional yang menghadirkan pakar industri teknologi AI untuk mengupas tuntas kecenderungan kecerdasan buatan, dampaknya pada lapangan kerja masa depan, dan persiapan karir mahasiswa di era transformasi digital.",
    requirements: "Mahasiswa Aktif (Semua Jurusan), Membawa Kartu Tanda Mahasiswa (KTM)."
  },
  {
    id: "evt-002",
    title: "Workshop UI/UX Design: Prototyping Figma",
    category: "Workshop",
    date: "2026-11-20",
    time: "13:00 - 17:00 WIB",
    location: "Laboratorium Komputer Terpadu Lab-2",
    organizer: "Komunitas Desain Digital Mahasiswa",
    quota: 50,
    status: "Buka",
    deadline: "2026-11-18",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    description: "Pelatihan interaktif intensif merancang antarmuka pengguna (UI) dan pengalaman pengguna (UX) menggunakan Figma. Materi meliputi Design System, Auto-Layout, hingga pengerjaan proyek Wireframe interaktif.",
    requirements: "Membawa Laptop pribadi yang terinstall browser Chrome & akun Figma aktif."
  },
  {
    id: "evt-003",
    title: "Lomba Inovasi Bisnis Mahasiswa 2026",
    category: "Lomba",
    date: "2026-12-05",
    time: "09:00 - selesai",
    location: "Gedung Student Center Hall A",
    organizer: "Badan Eksekutif Mahasiswa (BEM)",
    quota: 30,
    status: "Mendatang",
    deadline: "2026-11-28",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    description: "Kompetisi Business Plan tingkat kampus yang memberi wadah mahasiswa untuk mempresentasikan ide startup kreatif, solusi sosial terbarukan, serta pitching di depan investor dan dosen penguji.",
    requirements: "Satu tim terdiri dari 3-4 mahasiswa, menyerahkan Proposal Business Plan PDF."
  },
  {
    id: "evt-004",
    title: "Webinar Digital Marketing Mastery",
    category: "Webinar",
    date: "2026-11-08",
    time: "19:00 - 21:00 WIB",
    location: "Online (Zoom Meeting)",
    organizer: "Komunitas Kewirausahaan Mahasiswa",
    quota: 200,
    status: "Buka",
    deadline: "2026-11-07",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
    description: "Belajar strategi pemasaran digital modern, optimasi media sosial Instagram/TikTok untuk bisnis skala kecil, serta teknik pembuatan konten menarik (Copywriting & SEO dasar).",
    requirements: "Terbuka untuk umum dan mahasiswa seluruh angkatan."
  },
  {
    id: "evt-005",
    title: "Pelatihan Public Speaking & Confidence Building",
    category: "Pengembangan Diri",
    date: "2026-11-25",
    time: "09:00 - 12:00 WIB",
    location: "Ruang Mini Theater Kampus",
    organizer: "UKM Pengembangan Diri & Komunikasi",
    quota: 40,
    status: "Buka",
    deadline: "2026-11-22",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    description: "Praktik mengatasi rasa gugup saat berbicara di depan umum, teknik olah vokal, bahasa tubuh yang tepat, dan strategi menyusun presentasi akademik maupun organisasi secara persuasif.",
    requirements: "Berkomitmen mengikuti seluruh sesi simulasi hingga selesai."
  },
  {
    id: "evt-006",
    title: "Festival Seni, Musik, & Budaya Kampus",
    category: "Seni & Budaya",
    date: "2026-12-18",
    time: "15:00 - 22:00 WIB",
    location: "Lapangan Luar Utama Kampus",
    organizer: "UKM Seni & Kebudayaan",
    quota: 500,
    status: "Mendatang",
    deadline: "2026-12-15",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    description: "Panggung apresiasi kreasi seni mahasiswa yang menampilkan konser musik indie lokal, tarian tradisional-modern, pameran seni rupa, serta bazaar kuliner mahasiswa.",
    requirements: "Menunjukkan tiket digital simulasi registrasi saat memasuki area festival."
  },
  {
    id: "evt-007",
    title: "Kompetisi Pemrograman Hackathon 24-Jam",
    category: "Kompetisi",
    date: "2026-12-01",
    time: "08:00 WIB (24 Jam)",
    location: "Lab Komputer Rekayasa Perangkat Lunak",
    organizer: "Himpunan Mahasiswa Informatika",
    quota: 25,
    status: "Mendatang",
    deadline: "2026-11-25",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description: "Tantangan membangun aplikasi web/mobile fungsional dalam waktu 24 jam nonstop untuk menyelesaikan permasalahan perkotaan dan lingkungan hidup setempat.",
    requirements: "1 Tim 3 Orang, Menguasai salah satu Stack Programming (Web/Mobile)."
  },
  {
    id: "evt-008",
    title: "Seminar Kewirausahaan & Mentoring Bisnis",
    category: "Seminar",
    date: "2026-10-15",
    time: "09:00 - 12:00 WIB",
    location: "Aula Rektorat Lt. 2",
    organizer: "Pusat Pengembang Karir & Kewirausahaan",
    quota: 100,
    status: "Selesai",
    deadline: "2026-10-12",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    description: "Acara edukasi strategi memulai usaha sejak masa perkuliahan, pengelolaan dana awal bisnis, serta akses perizinan dan legalitas bagi produk inovasi mahasiswa.",
    requirements: "Acara ini telah dilaksanakan."
  },
  {
    id: "evt-009",
    title: "Workshop Persiapan Karier & Review CV ATS",
    category: "Pengembangan Diri",
    date: "2026-11-28",
    time: "10:00 - 14:00 WIB",
    location: "Ruang Seminar Gedung C",
    organizer: "Komunitas Karir Mahasiswa",
    quota: 60,
    status: "Buka",
    deadline: "2026-11-26",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    description: "Sesi bedah Curriculm Vitae ramah sistem ATS, persiapan wawancara kerja profesional, pembuatan profil LinkedIn menarik, dan tips menembus program magang BUMN/Multinasional.",
    requirements: "Membawa draf CV cetak/digital pribadi."
  },
  {
    id: "evt-010",
    title: "Bakti Sosial & Pengabdian Masyarakat Kampus",
    category: "Sosial",
    date: "2026-12-10",
    time: "07:00 - 16:00 WIB",
    location: "Desa Binaan Sukamaju",
    organizer: "BEM & Divisi Sosial Masyarakat",
    quota: 50,
    status: "Mendatang",
    deadline: "2026-12-02",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    description: "Aksi nyata mahasiswa melalui penyuluhan kebersihan, pembagian sembako, mengajar anak-anak sekolah dasar, dan kerja bakti pembersihan lingkungan desa binaan.",
    requirements: "Sehat jasmani dan siap mengikuti seluruh rangkaian pengabdian."
  }
];

// STATE MANAGEMENT
let registeredEvents = JSON.parse(localStorage.getItem("campusevent_registrations")) || [];

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderStatistics();
  renderCategoryGrid();
  renderFeaturedEvents();
  populateCategoryDropdown();
  populateEventRegistrationSelect();
  renderAllEvents();
  renderMyEvents();
  updateBadgeCount();
});

// 2. NAVIGASI DAN HAMBURGER MENU
function initNavbar() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  hamburgerBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close nav on link click
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

function navigateTo(sectionId) {
  // Update section visibility
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.remove("active");
  });
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update active navbar item
  document.querySelectorAll(".nav-item").forEach(nav => {
    nav.classList.remove("active");
    if (nav.getAttribute("href") === `#${sectionId}`) {
      nav.classList.add("active");
    }
  });
}

// 3. STATISTIK DAN RINGKASAN
function renderStatistics() {
  const total = EVENTS_DATA.length;
  const upcoming = EVENTS_DATA.filter(e => e.status === "Mendatang").length;
  const open = EVENTS_DATA.filter(e => e.status === "Buka").length;
  const categories = [...new Set(EVENTS_DATA.map(e => e.category))].length;

  document.getElementById("stat-total-events").textContent = total;
  document.getElementById("stat-upcoming-events").textContent = upcoming;
  document.getElementById("stat-open-events").textContent = open;
  document.getElementById("stat-categories").textContent = categories;
}

// 4. KATEGORI GRID
function renderCategoryGrid() {
  const categories = [
    { name: "Seminar", icon: "fa-chalkboard-user" },
    { name: "Workshop", icon: "fa-laptop-code" },
    { name: "Lomba", icon: "fa-trophy" },
    { name: "Webinar", icon: "fa-video" },
    { name: "Pengembangan Diri", icon: "fa-user-gear" },
    { name: "Seni & Budaya", icon: "fa-palette" },
    { name: "Kompetisi", icon: "fa-code" },
    { name: "Sosial", icon: "fa-hand-holding-heart" }
  ];

  const container = document.getElementById("category-grid-home");
  container.innerHTML = categories.map(cat => `
    <div class="cat-card" onclick="filterByCategoryFromHome('${cat.name}')">
      <i class="fa-solid ${cat.icon}"></i>
      <h4>${cat.name}</h4>
    </div>
  `).join("");
}

function filterByCategoryFromHome(categoryName) {
  navigateTo("daftar-event");
  document.getElementById("category-filter").value = categoryName;
  document.getElementById("status-filter").value = "ALL";
  document.getElementById("search-input").value = "";
  handleSearchFilter();
}

function quickFilterStatus(status) {
  navigateTo("daftar-event");
  document.getElementById("status-filter").value = status;
  document.getElementById("category-filter").value = "ALL";
  document.getElementById("search-input").value = "";
  handleSearchFilter();
}

// 5. EVENT PILIHAN TERBARU (BERANDA)
function renderFeaturedEvents() {
  const container = document.getElementById("featured-events-container");
  const featured = EVENTS_DATA.filter(e => e.status === "Buka").slice(0, 3);
  container.innerHTML = featured.map(event => createEventCardHTML(event)).join("");
}

// 6. HELPER GENERATE HTML CARD EVENT
function createEventCardHTML(event) {
  const statusClass = event.status === "Buka" ? "status-buka" : (event.status === "Mendatang" ? "status-mendatang" : "status-selesai");
  const statusLabel = event.status === "Buka" ? "Pendaftaran Dibuka" : (event.status === "Mendatang" ? "Event Mendatang" : "Selesai");

  return `
    <div class="event-card">
      <div class="card-banner">
        <img src="${event.image}" alt="${event.title}" onerror="this.src='https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'">
        <span class="badge-category">${event.category}</span>
        <span class="badge-status ${statusClass}">${statusLabel}</span>
      </div>
      <div class="card-body">
        <h3 class="event-title">${event.title}</h3>
        <ul class="event-meta">
          <li><i class="fa-regular fa-calendar"></i> ${formatDate(event.date)}</li>
          <li><i class="fa-regular fa-clock"></i> ${event.time}</li>
          <li><i class="fa-solid fa-location-dot"></i> ${event.location}</li>
          <li><i class="fa-solid fa-users"></i> Kuota: ${event.quota} peserta</li>
        </ul>
        <p class="event-desc">${event.description}</p>
        <div class="card-footer">
          <button class="btn btn-outline btn-sm" onclick="openEventModal('${event.id}')"><i class="fa-solid fa-circle-info"></i> Detail</button>
          ${event.status === 'Buka' 
            ? `<button class="btn btn-orange btn-sm" onclick="goToRegister('${event.id}')"><i class="fa-solid fa-pen-to-square"></i> Daftar</button>` 
            : `<button class="btn btn-secondary btn-sm" disabled><i class="fa-solid fa-lock"></i> ${statusLabel}</button>`
          }
        </div>
      </div>
    </div>
  `;
}

// 7. DAFTAR EVENT (FILTER & SEARCH)
function populateCategoryDropdown() {
  const select = document.getElementById("category-filter");
  const categories = [...new Set(EVENTS_DATA.map(e => e.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

function renderAllEvents(eventsToRender = EVENTS_DATA) {
  const container = document.getElementById("all-events-container");
  const emptyState = document.getElementById("no-events-found");
  const resultCount = document.getElementById("result-count");

  resultCount.textContent = eventsToRender.length;

  if (eventsToRender.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    container.innerHTML = eventsToRender.map(event => createEventCardHTML(event)).join("");
  }
}

function handleSearchFilter() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase().trim();
  const selectedCategory = document.getElementById("category-filter").value;
  const selectedStatus = document.getElementById("status-filter").value;

  const filtered = EVENTS_DATA.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                          event.description.toLowerCase().includes(searchTerm) ||
                          event.location.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "ALL" || event.category === selectedCategory;
    const matchesStatus = selectedStatus === "ALL" || event.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  renderAllEvents(filtered);
}

function resetFilters() {
  document.getElementById("search-input").value = "";
  document.getElementById("category-filter").value = "ALL";
  document.getElementById("status-filter").value = "ALL";
  renderAllEvents(EVENTS_DATA);
}

// 8. MODAL DETAIL EVENT
function openEventModal(eventId) {
  const event = EVENTS_DATA.find(e => e.id === eventId);
  if (!event) return;

  const modal = document.getElementById("event-modal");
  const modalBody = document.getElementById("modal-detail-body");

  const statusClass = event.status === "Buka" ? "status-buka" : (event.status === "Mendatang" ? "status-mendatang" : "status-selesai");
  const statusLabel = event.status === "Buka" ? "Pendaftaran Dibuka" : (event.status === "Mendatang" ? "Event Mendatang" : "Selesai");

  modalBody.innerHTML = `
    <div class="modal-banner">
      <img src="${event.image}" alt="${event.title}" onerror="this.src='https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80'">
    </div>
    <div class="modal-body-content">
      <div style="display: flex; gap: 10px; margin-bottom: 12px; align-items: center;">
        <span class="badge-category" style="position:static;">${event.category}</span>
        <span class="badge-status ${statusClass}" style="position:static;">${statusLabel}</span>
      </div>
      <h2 style="color: var(--primary-dark); font-size: 1.6rem; margin-bottom: 12px;">${event.title}</h2>
      <p style="color: var(--text-muted); font-size: 0.9rem;"><i class="fa-solid fa-user-tie"></i> Penyelenggara: <strong>${event.organizer}</strong></p>

      <div class="modal-grid-info">
        <div><i class="fa-regular fa-calendar"></i> <strong>Tanggal:</strong><br>${formatDate(event.date)}</div>
        <div><i class="fa-regular fa-clock"></i> <strong>Waktu:</strong><br>${event.time}</div>
        <div><i class="fa-solid fa-location-dot"></i> <strong>Lokasi:</strong><br>${event.location}</div>
        <div><i class="fa-solid fa-users"></i> <strong>Kuota:</strong><br>${event.quota} Peserta</div>
        <div><i class="fa-solid fa-hourglass-end"></i> <strong>Batas Pendaftaran:</strong><br>${formatDate(event.deadline)}</div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="color: var(--primary-dark); margin-bottom: 6px;">Deskripsi Kegiatan</h4>
        <p style="color: #475569; font-size: 0.95rem;">${event.description}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="color: var(--primary-dark); margin-bottom: 6px;">Persyaratan Peserta</h4>
        <p style="color: #475569; font-size: 0.95rem;">${event.requirements}</p>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button class="btn btn-outline" onclick="closeEventModal()">Tutup</button>
        ${event.status === 'Buka' 
          ? `<button class="btn btn-orange" onclick="closeEventModal(); goToRegister('${event.id}')"><i class="fa-solid fa-pen-to-square"></i> Daftar Sekarang</button>` 
          : `<button class="btn btn-secondary" disabled>Pendaftaran Ditutup</button>`
        }
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeEventModal() {
  document.getElementById("event-modal").classList.remove("active");
}

// Close modal when clicking on overlay background
document.getElementById("event-modal").addEventListener("click", (e) => {
  if (e.target.id === "event-modal") {
    closeEventModal();
  }
});

// 9. FORM PENDAFTARAN SIMULASI
function populateEventRegistrationSelect() {
  const select = document.getElementById("reg-event-select");
  select.innerHTML = `<option value="" disabled selected>-- Pilih Event Kegiatan --</option>`;
  
  const openEvents = EVENTS_DATA.filter(e => e.status === "Buka");
  openEvents.forEach(event => {
    const opt = document.createElement("option");
    opt.value = event.id;
    opt.textContent = `${event.title} (${formatDate(event.date)})`;
    select.appendChild(opt);
  });
}

function goToRegister(eventId) {
  navigateTo("pendaftaran");
  const select = document.getElementById("reg-event-select");
  select.value = eventId;
  updateSelectedEventSummary();
}

function updateSelectedEventSummary() {
  const select = document.getElementById("reg-event-select");
  const summaryBox = document.getElementById("event-summary-box");
  const selectedId = select.value;

  const event = EVENTS_DATA.find(e => e.id === selectedId);
  if (event) {
    document.getElementById("sum-title").textContent = event.title;
    document.getElementById("sum-date").textContent = formatDate(event.date);
    document.getElementById("sum-location").textContent = event.location;
    document.getElementById("sum-quota").textContent = `${event.quota} Orang`;
    summaryBox.classList.remove("hidden");
  } else {
    summaryBox.classList.add("hidden");
  }
}

function handleRegistrationSubmit(e) {
  e.preventDefault();

  const eventId = document.getElementById("reg-event-select").value;
  const fullname = document.getElementById("reg-fullname").value.trim();
  const nim = document.getElementById("reg-nim").value.trim();
  const prodi = document.getElementById("reg-prodi").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const whatsapp = document.getElementById("reg-whatsapp").value.trim();

  // Validasi Sederhana
  if (!eventId || !fullname || !nim || !prodi || !email || !whatsapp) {
    showToast("Harap isi seluruh formulir pendaftaran dengan benar!", "error");
    return;
  }

  const selectedEvent = EVENTS_DATA.find(e => e.id === eventId);
  if (!selectedEvent) return;

  // Cek jika sudah pernah mendaftar di event ini
  const isAlreadyRegistered = registeredEvents.some(reg => reg.eventId === eventId && reg.nim === nim);
  if (isAlreadyRegistered) {
    showToast("Anda (NIM tersebut) sudah terdaftar dalam simulasi event ini!", "error");
    return;
  }

  // Buat Tiket Pendaftaran
  const newRegistration = {
    ticketCode: "EVT-" + Math.floor(100000 + Math.random() * 900000),
    eventId: selectedEvent.id,
    eventTitle: selectedEvent.title,
    eventDate: selectedEvent.date,
    eventTime: selectedEvent.time,
    eventLocation: selectedEvent.location,
    fullname,
    nim,
    prodi,
    email,
    whatsapp,
    registeredAt: new Date().toISOString()
  };

  registeredEvents.push(newRegistration);
  localStorage.setItem("campusevent_registrations", JSON.stringify(registeredEvents));

  showToast("Simulasi Pendaftaran Berhasil! Tiket Anda telah dibuat.", "success");
  resetForm();
  renderMyEvents();
  updateBadgeCount();
  navigateTo("event-saya");
}

function resetForm() {
  document.getElementById("registration-form").reset();
  document.getElementById("event-summary-box").classList.add("hidden");
}

// 10. EVENT SAYA (MY EVENTS)
function renderMyEvents() {
  const container = document.getElementById("my-events-list");
  const emptyState = document.getElementById("no-my-events");

  if (registeredEvents.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  container.innerHTML = registeredEvents.map(ticket => `
    <div class="ticket-card">
      <div class="ticket-header">
        <span class="ticket-id"><i class="fa-solid fa-qrcode"></i> ${ticket.ticketCode}</span>
        <span style="font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">Simulasi Terverifikasi</span>
      </div>
      <div class="ticket-body">
        <h4 class="ticket-title">${ticket.eventTitle}</h4>
        <div class="ticket-user-info">
          <p><strong><i class="fa-solid fa-user"></i> ${ticket.fullname}</strong> (${ticket.nim})</p>
          <p><i class="fa-solid fa-graduation-cap"></i> ${ticket.prodi}</p>
          <p><i class="fa-solid fa-envelope"></i> ${ticket.email}</p>
        </div>
        <ul class="event-meta">
          <li><i class="fa-regular fa-calendar"></i> ${formatDate(ticket.eventDate)}</li>
          <li><i class="fa-regular fa-clock"></i> ${ticket.eventTime}</li>
          <li><i class="fa-solid fa-location-dot"></i> ${ticket.eventLocation}</li>
        </ul>
      </div>
      <div class="ticket-footer">
        <button class="btn btn-outline btn-sm" onclick="openEventModal('${ticket.eventId}')"><i class="fa-solid fa-circle-info"></i> Info Event</button>
        <button class="btn btn-danger btn-sm" onclick="cancelRegistration('${ticket.ticketCode}')"><i class="fa-solid fa-trash"></i> Batal Simulasi</button>
      </div>
    </div>
  `).join("");
}

function cancelRegistration(ticketCode) {
  if (confirm("Apakah Anda yakin ingin membatalkan simulasi pendaftaran pada tiket ini?")) {
    registeredEvents = registeredEvents.filter(t => t.ticketCode !== ticketCode);
    localStorage.setItem("campusevent_registrations", JSON.stringify(registeredEvents));
    renderMyEvents();
    updateBadgeCount();
    showToast("Simulasi pendaftaran berhasil dibatalkan.", "info");
  }
}

function updateBadgeCount() {
  const badge = document.getElementById("my-events-badge");
  badge.textContent = registeredEvents.length;
}

// 11. TOAST NOTIFICATIONS & UTILS
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-triangle-exclamation";

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}