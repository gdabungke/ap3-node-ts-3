/**
 * ============================================================================
 * MODUL         : LAYOUT-LOADER.TS
 * DESKRIPSI     : PEMANGGIL HEAD DAN BODY HTML
 * AUTHOR/OWNER  : AP3 Development Team
 * LAST UPDATED  : 2026
 * ============================================================================
 */

export function loadAppHead(): void {
  const headElements = `
    <!-- Flaticon UIcons CDN -->
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css">
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css">
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css">

    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f59e0b'><path d='M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z'/></svg>">

    <!-- Tempat style dinamis runtime cetak dokumen -->
    <style id="dynamicPaperStyle"></style>
  `;
  document.head.insertAdjacentHTML("beforeend", headElements);
}

export function loadAppBody(): void {
  const bodyContent = `
<div class="auth-overlay" id="authOverlay">
  <div class="auth-card">
    <div class="auth-brand">
      <div class="brand-logo-monogram">
        <i class="fi fi-rr-shield-check" style="font-size: 20px; color: #0b192c;"></i>
      </div>
      <div>
        <div style="font-weight:900; font-size:20px; color:var(--text-main);">AP3 SYSTEM</div>
        <div style="font-size:9px; color:var(--text-muted); font-weight:700;">APLIKASI PENYUSUNAN PENELITIAN PERKARA</div>
      </div>
    </div>

    <div class="auth-tabs">
      <button type="button" class="auth-tab-btn active" id="authTabLoginBtn" onclick="switchAuthTab('login')">
        <i class="fi fi-rr-sign-in-alt"></i> LOGIN
      </button>
      <button type="button" class="auth-tab-btn" id="authTabRegisterBtn" onclick="switchAuthTab('register')">
        <i class="fi fi-rr-user-add"></i> REGISTRASI
      </button>
    </div>

    <form id="loginForm" onsubmit="handleLoginSubmit(event)">
      <div class="auth-form-group">
        <label>Email / Username Pengguna</label>
        <input type="text" id="login_email" class="lowercase-input" placeholder="Contoh: admin" required>
      </div>
      <div class="auth-form-group">
        <label>Kata Sandi</label>
        <input type="password" id="login_password" class="lowercase-input" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn primary" style="width:100%; justify-content:center; padding:10px; margin-top:10px;">
        <i class="fi fi-rr-arrow-right-to-bracket"></i> MASUK
      </button>
    </form>

    <form id="registerForm" style="display:none;" onsubmit="handleRegisterSubmit(event)">
      <div class="auth-form-group">
        <label>Nama Lengkap & Gelar</label>
        <input type="text" id="reg_nama" placeholder="Contoh: James, S.H." required>
      </div>
      <div class="auth-form-group">
        <label>Email / Username Pengguna</label>
        <input type="text" id="reg_email" class="lowercase-input" placeholder="nama@beacukai.go.id" required>
      </div>
      <div class="auth-form-group">
        <label>Klasifikasi Peran / User Role</label>
        <select id="reg_role" required>
          <option value="Admin">Admin</option>
          <option value="Kepala Seksi Penyidikan">Kepala Seksi Penyidikan</option>
          <option value="Penyidik / Ketua Tim Peneliti">Penyidik / Ketua Tim Peneliti (Pelaksana)</option>
        </select>
      </div>
      <div class="auth-form-group">
        <label>Kata Sandi</label>
        <input type="password" id="reg_password" class="lowercase-input" placeholder="••••••••" required>
      </div>
      <button type="submit" class="btn primary" style="width:100%; justify-content:center; padding:10px; margin-top:10px;">
        <i class="fi fi-rr-user-plus"></i> DAFTAR AKUN BARU
      </button>
    </form>
  </div>

  <div class="auth-footer">
    &copy; 2026 DIREKTORAT JENDERAL BEA DAN CUKAI AP3 - APLIKASI PENYUSUNAN PENELITIAN PERKARA
  </div>
</div>

<div class="app-centered-container">
  <div class="app-wrapper">
    <aside class="no-print">
      <div>
        <div class="brand">
          <div class="brand-logo-monogram">
            <i class="fi fi-rr-shield-check" style="font-size: 20px; color: #0b192c;"></i>
          </div>
          <div class="brand-details">
            <span class="brand-title">AP3</span>
            <span class="brand-subtitle">APLIKASI PENYUSUNAN<br>PENELITIAN PERKARA</span>
          </div>
        </div>

        <div class="menu-label">MENU UTAMA</div>
        <nav>
          <button type="button" class="nav-btn active" data-target="dasbor">
            <i class="fi fi-rr-dashboard"></i>
            <span>DASBOR ANALISIS</span>
          </button>
          <button type="button" class="nav-btn" data-target="disposisi">
            <i class="fi fi-rr-paper-plane"></i>
            <span>DISPOSISI BERKAS</span>
          </button>
          <button type="button" class="nav-btn" data-target="data">
            <i class="fi fi-rr-folder"></i>
            <span>DATA PERKARA</span>
          </button>
          <button type="button" class="nav-btn" data-target="laporan">
            <i class="fi fi-rr-document"></i>
            <span>BERKAS LAPORAN</span>
          </button>
          <button type="button" class="nav-btn" data-target="tindaklanjut">
            <i class="fi fi-rr-checkbox"></i>
            <span>TINDAK LANJUT</span>
          </button>
        </nav>

        <div class="menu-label">SYSTEM & KONFIGURASI</div>
        <nav>
          <button type="button" class="nav-btn" data-target="pengaturan">
            <i class="fi fi-rr-settings"></i>
            <span>PENGATURAN</span>
          </button>
        </nav>
      </div>
    </aside>

    <div class="main-wrapper">
      <div class="header-sticky-wrapper no-print">
        <header class="top-header">
          <div class="search-box">
            <i class="fi fi-rr-search"></i>
            <input type="text" placeholder="Cari data perkara, LP, SBP...">
          </div>

          <div class="user-profile-wrapper" style="display: flex; align-items: center; gap: 10px; margin-left: auto;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 3px; line-height: 1.1;">
              <span id="nav_user_name" style="font-size: 13px; font-weight: 700; color: #f8fafc; letter-spacing: 0.2px;">
                Penyidik1
              </span>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span id="nav_user_role" style="font-size: 10px; font-weight: 600; background: #064e3b; color: #34d399; border: 1px solid #059669; padding: 2px 8px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.3px;">
                  Penyidik
                </span>
                <span id="nav_system_status" style="font-size: 10px; font-weight: 600; color: #10b981; display: inline-flex; align-items: center; gap: 4px;">
                  <span style="width: 7px; height: 7px; background-color: #10b981; border-radius: 50%; display: inline-block; box-shadow: 0 0 6px #10b981;"></span>
                  Online
                </span>
              </div>
            </div>

            <div class="user-profile-widget-icononly" onclick="toggleUserDropdown(event)" title="Klik untuk lihat akun" style="cursor: pointer; flex-shrink: 0;">
              <span class="user-avatar-text" id="sidebarAvatarText">P</span>
            </div>

            <div class="user-dropdown-menu" id="userDropdownMenu">
              <div class="dropdown-header-info">
                <div style="font-size: 12px; font-weight: 800; color: var(--text-main);" id="dropdownUserName">Penyidik1</div>
                <div style="font-size: 10px; color: var(--text-muted);" id="dropdownUserEmail">penyidik1@kemenkeu.go.id</div>
                <span class="role-badge-pill" id="dropdownUserRole">Penyidik</span>
              </div>
              <button type="button" class="dropdown-item" onclick="openProfileSettingTab()">
                <i class="fi fi-rr-user-gear"></i>
                <span>Pengaturan Profil</span>
              </button>
              <button type="button" class="dropdown-item danger" onclick="handleLogout()">
                <i class="fi fi-rr-exit"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>
      </div>

      <main>
        <section id="dasbor" class="tab-pane active panel">
          <h2>Dashboard Analisis Perkara</h2>
          <p class="small" style="margin-bottom:16px;">Pemantauan statistik penindakan, sebaran penyelesaian perkara, dan estimasi kerugian negara.</p>
          
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px;">
            <div class="stat-card interactive-stat">
              <div class="stat-card-header">
                <h4>Total Register Perkara</h4>
                <div class="arrow-btn"><i class="fi fi-rr-arrow-up-right"></i></div>
              </div>
              <div class="value" id="statLP">0</div>
              <div style="margin-top:10px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.06); font-size:11px; display:flex; flex-direction:column; gap:4px;">
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted, #94a3b8);">Terbit Dokumen LP:</span>
                  <b id="dash_cnt_lp" style="color:var(--text-main, #f8fafc);">0</b>
                </div>
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted, #94a3b8);">Terbit Dokumen SBP:</span>
                  <b id="dash_cnt_sbp" style="color:var(--text-main, #f8fafc);">0</b>
                </div>
              </div>
            </div>
            
            <div class="stat-card interactive-stat">
              <div class="stat-card-header">
                <h4>Total Kerugian Negara</h4>
                <div class="arrow-btn"><i class="fi fi-rr-arrow-up-right"></i></div>
              </div>
              <div class="value" id="statKerugian" style="font-size:20px; color:#ef4444;">Rp 0</div>
              <div class="stat-badge">Estimasi Taksiran Potensi</div>
            </div>

            <div class="stat-card interactive-stat">
              <div class="stat-card-header">
                <h4>Penindakan</h4>
                <div class="arrow-btn"><i class="fi fi-rr-arrow-up-right"></i></div>
              </div>
              <div style="display:flex; flex-direction:column; gap:5px; font-size:11px; margin-top:4px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span><i class="fi fi-rr-shield-check" style="color:#10b981; margin-right:4px;"></i> Mandiri / Biasa:</span>
                  <b id="dash_cnt_mandiri" style="color:#10b981;">0</b>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span><i class="fi fi-rr-search-alt" style="color:#f59e0b; margin-right:4px;"></i> Operasi NHI:</span>
                  <b id="dash_cnt_nhi" style="color:#f59e0b;">0</b>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span><i class="fi fi-rr-paper-plane" style="color:#6366f1; margin-right:4px;"></i> Limpahan Instansi:</span>
                  <b id="dash_cnt_limpahan" style="color:#6366f1;">0</b>
                </div>
              </div>
            </div>

            <div class="stat-card interactive-stat">
              <div class="stat-card-header">
                <h4>Rincian Tindak Lanjut</h4>
                <div class="arrow-btn"><i class="fi fi-rr-arrow-up-right"></i></div>
              </div>
              <div class="stat-tl-list" id="statTLBreakdown" style="font-size:11px;">
                <div><span>BDN:</span><b id="tl_bdn_cnt">0</b></div>
                <div><span>SPSA:</span><b id="tl_spsa_cnt">0</b></div>
                <div><span>BAST Pemilik:</span><b id="tl_bast_cnt">0</b></div>
                <div><span>BAST Limpah:</span><b id="tl_limpah_cnt">0</b></div>
                <div><span>Lainnya:</span><b id="tl_other_cnt">0</b></div>
              </div>
            </div>
          </div>

          <div class="panel interactive-stat" style="margin-bottom:0; background:#0f172a; border:1px solid var(--border-color, #334155); border-radius:10px; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div>
                <h3 style="margin:0; font-size:14px; font-weight:600; display:flex; align-items:center; gap:6px; color:var(--text-main, #f8fafc);">
                  <i class="fi fi-rr-time-past" style="color:var(--primary, #38bdf8);"></i> Perkara Terbaru (Recent Cases)
                </h3>
                <span class="small" style="color:var(--text-muted, #94a3b8); font-size:11px;">Menampilkan maksimal 3 berkas perkara yang terakhir kali direkam</span>
              </div>
              <button type="button" class="btn secondary" style="font-size:11px; padding:4px 10px;" onclick="document.querySelector('[data-target=\\'data\\']').click()">
                Lihat Semua Perkara <i class="fi fi-rr-arrow-small-right"></i>
              </button>
            </div>

            <div style="overflow-x:auto;">
              <table class="rtable" style="width:100%; border-collapse:collapse; font-size:12px;">
                <thead>
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.08); text-align:left; color:var(--text-muted, #94a3b8);">
                    <th style="padding:8px 6px;">NO. LP / SBP</th>
                    <th style="padding:8px 6px;">NAMA PELAKU</th>
                    <th style="padding:8px 6px;">KOMODITI</th>
                    <th style="padding:8px 6px;">STATUS TAHAPAN</th>
                    <th style="padding:8px 6px; text-align:right;">AKSI</th>
                  </tr>
                </thead>
                <tbody id="dashboardRecentCasesBody"></tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="pengaturan" class="tab-pane panel">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h2>Konfigurasi & Pengaturan Sistem</h2>
              <p class="small" style="margin:0;">Pengelolaan akun pengguna, preferensi ukuran kertas cetak dokumen, pejabat penandatangan, dan cadangan basis data.</p>
            </div>
            <button type="button" class="btn primary" onclick="saveData()">
              <i class="fi fi-rr-disk"></i> SIMPAN PENGATURAN
            </button>
          </div>

          <div class="gemini-settings-layout">
            <div class="gemini-nav-sidebar">
              <button type="button" class="gemini-nav-item active" data-setting-tab="sub-about">
                <i class="fi fi-rr-info"></i>
                <span>Info Aplikasi</span>
              </button>
              <button type="button" class="gemini-nav-item" data-setting-tab="sub-profile">
                <i class="fi fi-rr-user"></i>
                <span>Profil Pengguna</span>
              </button>
              <button type="button" class="gemini-nav-item" data-setting-tab="sub-users" id="tabNavUsers" style="display:none;">
                <i class="fi fi-rr-users-alt"></i>
                <span>Daftar Pengguna</span>
              </button>
              <button type="button" class="gemini-nav-item" data-setting-tab="sub-paper">
                <i class="fi fi-rr-document"></i>
                <span>Format Cetak</span>
              </button>
              <button type="button" class="gemini-nav-item" data-setting-tab="sub-master">
                <i class="fi fi-rr-bank"></i>
                <span>Master Data & Kantor</span>
              </button>
              <button type="button" class="gemini-nav-item" data-setting-tab="sub-pejabat">
                <i class="fi fi-rr-feather"></i>
                <span>Default Pejabat</span>
              </button>
              <button type="button" class="gemini-nav-item" data-setting-tab="sub-danger">
                <i class="fi fi-rr-database"></i>
                <span>Tindakan Database</span>
              </button>
            </div>

            <div class="gemini-settings-content">
              <div id="sub-about" class="setting-subtab-pane active">
                <div class="gemini-card">
                  <div class="gemini-card-header">
                    <div class="gemini-card-icon"><i class="fi fi-rr-info"></i></div>
                    <div>
                      <h3 class="gemini-card-title">Tentang Aplikasi AP3</h3>
                      <p class="gemini-card-sub">Aplikasi Penyusunan Penelitian Perkara</p>
                    </div>
                  </div>
                  <div style="font-size:12px; line-height:1.6; color:var(--text-main);">
                    <p><b>Aplikasi AP3 (Aplikasi Penyusunan Penelitian Perkara)</b> dirancang khusus untuk mengotomatiskan dan mempercepat proses penyusunan berkas administrasi penindakan serta penelitian perkara kepabeanan dan cukai.</p>
                  </div>
                </div>
              </div>

              <div id="sub-profile" class="setting-subtab-pane">
                <div class="gemini-card">
                  <div class="gemini-card-header">
                    <div class="gemini-card-icon"><i class="fi fi-rr-user"></i></div>
                    <div>
                      <h3 class="gemini-card-title">Profil Pengguna</h3>
                      <p class="gemini-card-sub">Informasi pengguna aktif aplikasi AP3</p>
                    </div>
                  </div>
                  <div class="grid" style="align-items:center;">
                    <div>
                      <label>Nama Pengguna</label>
                      <input id="setting_userName" placeholder="Nama Lengkap & Gelar">
                    </div>
                    <div>
                      <label>Email / Username Pengguna</label>
                      <input id="setting_userEmail" class="lowercase-input" placeholder="admin">
                    </div>
                    <div>
                      <label>Role / Klasifikasi Akun</label>
                      <input id="setting_userRole" readonly>
                    </div>
                  </div>
                </div>
              </div>

              <div id="sub-users" class="setting-subtab-pane">
                <div class="gemini-card">
                  <div class="gemini-card-header">
                    <div class="gemini-card-icon"><i class="fi fi-rr-users-alt"></i></div>
                    <div>
                      <h3 class="gemini-card-title">Daftar Pengguna Terdaftar</h3>
                      <p class="gemini-card-sub">Pengelolaan akun pengguna (Khusus Admin)</p>
                    </div>
                  </div>
                  <div class="data-table-container">
                    <table class="data-list-table">
                      <thead>
                        <tr>
                          <th style="width:30px;">No</th>
                          <th>Nama Lengkap</th>
                          <th>Email / Username</th>
                          <th>Kata Sandi</th>
                          <th>Role / Hak Akses</th>
                          <th style="width:140px; text-align:center;">Aksi Admin</th>
                        </tr>
                      </thead>
                      <tbody id="registeredUsersTableBody"></tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div id="sub-paper" class="setting-subtab-pane">
                <div class="gemini-card">
                  <div class="gemini-card-header">
                    <div class="gemini-card-icon"><i class="fi fi-rr-print"></i></div>
                    <div>
                      <h3 class="gemini-card-title">Ukuran Kertas Dokumen Laporan</h3>
                      <p class="gemini-card-sub">Atur dimensi kertas standar saat mencetak berkas</p>
                    </div>
                  </div>
                  <div class="grid" style="align-items:center;">
                    <div>
                      <label>Pilihan Ukuran Kertas</label>
                      <select id="setting_paperSize" onchange="changePaperSize(this.value)">
                        <option value="F4" selected>F4 / FOLIO (215 x 330 mm)</option>
                        <option value="A4">A4 (210 x 297 mm)</option>
                      </select>
                    </div>
                    <div style="padding-top:12px;">
                      <span class="small">Ukuran aktif: <b id="currentPaperSizeLabel" style="color:var(--primary);">F4 (215 x 330 mm)</b></span>
                    </div>
                  </div>
                </div>
              </div>

              <div id="sub-master" class="setting-subtab-pane">
                <div class="gemini-card">
                  <div class="gemini-card-header">
                    <div class="gemini-card-icon"><i class="fi fi-rr-bank"></i></div>
                    <div>
                      <h3 class="gemini-card-title">Daftar Kantor Pendaftaran</h3>
                    </div>
                  </div>
                  <div style="display:flex; gap:6px;">
                    <input id="setting_newKantor" placeholder="Contoh: KPPBC TMP B Tanjungpinang">
                    <button type="button" class="btn primary" onclick="addCustomKantor()">
                      <i class="fi fi-rr-plus"></i> Tambah
                    </button>
                  </div>
                  <div style="margin-top:10px;">
                    <ul id="setting_kantorListDisplay" style="margin:4px 0; padding-left:18px; font-size:11px;"></ul>
                  </div>
                </div>
              </div>

              <div id="sub-pejabat" class="setting-subtab-pane">
                <div class="gemini-card">
                  <div class="gemini-card-header">
                    <div class="gemini-card-icon"><i class="fi fi-rr-feather"></i></div>
                    <div>
                      <h3 class="gemini-card-title">Default Pejabat Penandatangan</h3>
                      <p class="gemini-card-sub">Atur data pejabat bawaan untuk berkas perkara dan disposisi baru</p>
                    </div>
                  </div>
                  
                  <h4 style="font-size:11px; color:var(--primary); margin:12px 0 6px;">1. DEFAULT PEJABAT ESELON III/IV (KABID P2 / KASI P2)</h4>
                  <div class="grid4">
                    <div>
                      <label>Nama Pejabat</label>
                      <input id="setting_defaultKabid" placeholder="Nama Lengkap & Gelar">
                    </div>
                    <div>
                      <label>NIP Pejabat</label>
                      <input id="setting_defaultNipKabid" placeholder="NIP 18 Digit">
                    </div>
                    <div>
                      <label>Jabatan Default</label>
                      <select id="setting_defaultJabatanKabid"></select>
                    </div>
                    <div>
                      <label>Pangkat / Golongan</label>
                      <select id="setting_defaultGolKabid"></select>
                    </div>
                  </div>

                  <h4 style="font-size:11px; color:var(--primary); margin:14px 0 6px;">2. DEFAULT PEJABAT ESELON IV / FUNGSIONAL (KASI PENYIDIKAN / PBC AHLI PERTAMA)</h4>
                  <div class="grid4">
                    <div>
                      <label>Nama Pejabat</label>
                      <input id="setting_defaultKasi" placeholder="Nama Lengkap & Gelar">
                    </div>
                    <div>
                      <label>NIP Pejabat</label>
                      <input id="setting_defaultNipKasi" placeholder="NIP 18 Digit">
                    </div>
                    <div>
                      <label>Jabatan Default</label>
                      <select id="setting_defaultJabatanKasi"></select>
                    </div>
                    <div>
                      <label>Pangkat / Golongan</label>
                      <select id="setting_defaultGolKasi"></select>
                    </div>
                  </div>
                </div>
              </div>                      

              <div id="sub-danger" class="setting-subtab-pane">
                <div class="gemini-card" style="border-color:#ef4444;">
                  <div class="gemini-card-header">
                    <div class="gemini-card-icon" style="background:rgba(239, 68, 68, 0.2); color:#ef4444;"><i class="fi fi-rr-database"></i></div>
                    <div>
                      <h3 class="gemini-card-title" style="color:#f87171;">Tindakan Database</h3>
                    </div>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button type="button" class="btn secondary" onclick="saveData()">
                        <i class="fi fi-rr-disk"></i> Simpan Cadangan Data Aktif
                      </button>
                      <button type="button" class="btn secondary" onclick="loadData()">
                        <i class="fi fi-rr-refresh"></i> Muat Ulang Data
                      </button>
                    </div>
                    <hr style="border:0; border-top:1px solid var(--border-color); width:100%;">
                    <div>
                      <button type="button" class="btn danger" onclick="confirmResetAllData()">
                        <i class="fi fi-rr-trash"></i> HAPUS & RESET SEMUA DATA
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="disposisi" class="tab-pane panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:12px;">
            <div>
              <h2>Disposisi & Pengusulan Berkas</h2>
              <p class="small" style="margin:0;">Pengelolaan usulan penanganan perkara dari unit penindakan serta distribusi tugas ke tim peneliti/penyidik.</p>
            </div>
            
            <div class="action-toolbar-group no-print">
              <button id="btnBuatDisposisiBaru" type="button" class="btn primary" onclick="openDisposisiModal()">
                <i class="fi fi-rr-plus"></i> Buat / Usulkan Disposisi Baru
              </button>
            </div>
          </div>

          <div class="data-table-container">
            <table class="data-list-table">
              <thead>
                <tr>
                  <th style="width:30px;">NO</th>
                  <th>NO. SBP</th>
                  <th>NO. LP</th>
                  <th>NAMA PELAKU</th>
                  <th>JENIS PERKARA</th>
                  <th>KOMODITI / BARANG</th>
                  <th>STATUS DISPOSISI</th>
                  <th>PENYIDIK / PENELITI DITUNJUK</th>
                  <th style="width:140px; text-align:right;">AKSI</th>
                </tr>
              </thead>
              <tbody id="disposisiTableBody"></tbody>
            </table>
          </div>
        </section>

        <section id="data" class="tab-pane panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
            <div>
              <h2>Database & Register Perkara</h2>
              <p class="small" style="margin:0;">Perekaman data pelaku, kronologi penindakan, rincian barang bukti, dan reservasi nomor dokumen.</p>
            </div>

            <div class="action-toolbar-group">
              <button type="button" class="btn primary" id="btnAddNewPerkara" onclick="addNewPerkaraModal()">
                <i class="fi fi-rr-plus"></i> Isi Data Perkara Baru
              </button>

              <div class="btn-group-export">
                <button type="button" class="btn-export btn-excel" onclick="exportDataToExcel()" title="Ekspor ke Excel (.csv)">
                  <i class="fi fi-rr-file-excel"></i> Excel
                </button>
                <button type="button" class="btn-export btn-pdf" onclick="exportDataToPDF()" title="Cetak / Unduh PDF">
                  <i class="fi fi-rr-file-pdf"></i> PDF
                </button>
              </div>
            </div>
          </div>

          <div class="data-table-container">
            <table class="data-list-table">
              <thead>
                <tr>
                  <th style="width:30px;">No</th>
                  <th>No. LP</th>
                  <th>No. SBP</th>
                  <th>Nama Pelaku / Jenis Perkara</th>
                  <th>Komoditi / Barang</th>
                  <th>Status Workflow / Disposisi</th>
                  <th>Status Booking</th>
                  <th style="width:180px; text-align:right;">Aksi</th>
                </tr>
              </thead>
              <tbody id="perkaraTableBody"></tbody>
            </table>
          </div>
        </section>

        <section id="laporan" class="tab-pane panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:12px;">
            <div>
              <h2>Penyusunan Berkas Laporan Penelitian Perkara</h2>
              <p class="small" style="margin:0;">Penyusunan berkas laporan penelitian perkara (LPP, LPF, SPLIT, Sprin Cacah, BA, dan LHP).</p>
            </div>

            <div class="report-action-group no-print">
              <button type="button" class="btn primary" onclick="handleSingleValidation()">
                <i class="fi fi-rr-check"></i> Validasi Data
              </button>

              <div class="doc-select-segment">
                <i class="fi fi-rr-document"></i>
                <select class="select-filter-doc" id="docFilterSelect" onchange="currentDoc = this.value; updatePreviewHeaderUI(this.value); showReportView(this.value);">
                  <option value="ALL">Semua Dokumen</option>
                  <option value="LPP">LPP</option>
                  <option value="LPF">LPF</option>
                  <option value="SPLIT">SPLIT</option>
                  <option value="SPRIN_CACAH">SPRIN CACAH</option>
                  <option value="BA">BA CACAH</option>
                  <option value="LHP">LHP</option>
                </select>
              </div>

              <button type="button" class="btn-group-print" onclick="window.print()" title="Cetak Dokumen Terpilih">
                <i class="fi fi-rr-print"></i> CETAK
              </button>
            </div>
          </div>

          <div class="validator-banner no-print" id="validatorBannerBox">
            <div>
              <span style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Status Perkara Aktif Laporan:</span>
              <div id="reportActiveStatusLabel" style="font-size:13px; font-weight:800; color:var(--primary); margin-top:2px;">BELUM DIVALIDASI / SILAKAN KLIK TOMBOL VALIDASI</div>
            </div>
          </div>

          <div class="data-table-container no-print">
            <table class="data-list-table">
              <thead>
                <tr>
                  <th style="width:160px;">JENIS DOKUMEN</th>
                  <th>NOMOR DOKUMEN</th>
                  <th style="width:160px;">TANGGAL DOKUMEN</th>
                  <th style="width:120px;">STATUS</th>
                  <th style="width:100px; text-align:center;">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">LPP</div><span>Dokumen LPP</span></div></td>
                  <td id="table_num_LPP">-</td><td id="table_date_LPP">-</td><td><span id="badge_status_LPP" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="handleEditDocFocus('LPP')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">LPF</div><span>Dokumen LPF</span></div></td>
                  <td id="table_num_LPF">-</td><td id="table_date_LPF">-</td><td><span id="badge_status_LPF" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="handleEditDocFocus('LPF')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">SPL</div><span>Dokumen SPLIT</span></div></td>
                  <td id="table_num_SPLIT">-</td><td id="table_date_SPLIT">-</td><td><span id="badge_status_SPLIT" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="handleEditDocFocus('SPLIT')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">SPR</div><span>Sprin Cacah</span></div></td>
                  <td id="table_num_SPRIN_CACAH">-</td><td id="table_date_SPRIN_CACAH">-</td><td><span id="badge_status_SPRIN_CACAH" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="handleEditDocFocus('SPRIN_CACAH')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">BAC</div><span>BA Cacah</span></div></td>
                  <td id="table_num_BA">-</td><td id="table_date_BA">-</td><td><span id="badge_status_BA" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="handleEditDocFocus('BA')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">LHP</div><span>Dokumen LHP</span></div></td>
                  <td id="table_num_LHP">-</td><td id="table_date_LHP">-</td><td><span id="badge_status_LHP" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="handleEditDocFocus('LHP')">Edit</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <input type="hidden" id="No_LPP">
          <input type="hidden" id="No_LPF">
          <input type="hidden" id="Nomor_SPLIT">
          <input type="hidden" id="No_SPRIN_CACAH">
          <input type="hidden" id="Nomor_BA">
          <input type="hidden" id="Nomor_LHP">

          <input type="hidden" id="Tanggal_LPP">
          <input type="hidden" id="Catatan_LPP">
          <input type="hidden" id="Detail_Barang_LPP">
          <input type="hidden" id="Tanggal_LPF">
          <input type="hidden" id="Catatan_LPF">
          <input type="hidden" id="Tanggal_SPLIT">
          <input type="hidden" id="Dasar_SPLIT">
          <input type="hidden" id="Tanggal_Sprin_Cacah">
          <input type="hidden" id="Tanggal_BA">
          <input type="hidden" id="Hari_Cacah">
          <input type="hidden" id="TeksTanggal">
          <input type="hidden" id="Tanggal_LHP">

          <div class="preview-header-bar no-print" style="margin-top:18px;">
            <div>
              <div class="preview-title-badge">
                <i id="previewHeaderIcon" class="fi fi-rr-document"></i>
                <span id="previewHeaderText">PRATINJAU DOKUMEN: LEMBAR PENELITIAN PERKARA (LPP)</span>
              </div>
            </div>

            <div>
              <div id="pageSelectorContainer" style="display:none; align-items:center; gap:6px;"></div>
            </div>

            <div>
              <div class="preview-status-pill">
                <i class="fi fi-rr-eye"></i> Mode Pratinjau Cetak
              </div>
            </div>
          </div>
          <div id="reports"></div>
        </section>

        <section id="tindaklanjut" class="tab-pane panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:12px;">
            <div>
              <h2>Pelaksanaan Tindak Lanjut Perkara</h2>
              <p class="small" style="margin:0;">Penerbitan penyelesaian hasil penelitian perkara (BAST Pemilik, BA Segel, Kep BDN, SPSA, dan Limpah Perkara).</p>
            </div>
            
            <div class="report-action-group no-print">
              <button type="button" class="btn primary" onclick="handleSingleValidationTL()" title="Validasi & Hubungkan Data LHP">
                <i class="fi fi-rr-check"></i> Validasi Data
              </button>

              <div class="doc-select-segment">
                <i class="fi fi-rr-checkbox"></i>
                <select class="select-filter-doc" id="tlDocFilterSelect" onchange="switchTLDocTab(this.value)">
                  <option value="ALL">Semua Dokumen</option>
                  <option value="BAST_PEMILIK" selected>BAST KE PEMILIK</option>
                  <option value="BA_SEGEL">BA BUKA SEGEL</option>
                  <option value="KEP_BDN">KEP BDN</option>
                  <option value="SPSA">SPSA</option>
                  <option value="BAST_LIMPAH">BAST LIMPAH</option>
                </select>
              </div>

              <button type="button" class="btn-group-print" onclick="window.print()" title="Cetak Dokumen Terpilih">
                <i class="fi fi-rr-print"></i> CETAK
              </button>
            </div>
          </div>

          <div class="validator-banner no-print" id="tlValidatorBanner" style="display:flex;">
            <div>
              <span style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Status Data Perkara Terpilih:</span>
              <div id="tlActiveStatusLabel" style="font-size:13px; font-weight:800; color:var(--primary); margin-top:2px;">BELUM ADA DATA TERPILIH</div>
            </div>
          </div>

          <div class="data-table-container no-print">
            <table class="data-list-table">
              <thead>
                <tr>
                  <th style="width:160px;">JENIS DOKUMEN</th>
                  <th>NOMOR DOKUMEN</th>
                  <th style="width:160px;">TANGGAL DOKUMEN</th>
                  <th style="width:120px;">STATUS</th>
                  <th style="width:100px; text-align:center;">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">BST</div><span>BAST Ke Pemilik/Kuasa</span></div></td>
                  <td id="tl_table_num_BAST_PEMILIK">-</td><td id="tl_table_date_BAST_PEMILIK">-</td>
                  <td><span id="badge_status_BAST_PEMILIK" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="focusEditTLDoc('BAST_PEMILIK')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">SEG</div><span>BA Buka Segel</span></div></td>
                  <td id="tl_table_num_BA_SEGEL">-</td><td id="tl_table_date_BA_SEGEL">-</td>
                  <td><span id="badge_status_BA_SEGEL" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="focusEditTLDoc('BA_SEGEL')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">KEP</div><span>KEP BDN</span></div></td>
                  <td id="tl_table_num_KEP_BDN">-</td><td id="tl_table_date_KEP_BDN">-</td>
                  <td><span id="badge_status_KEP_BDN" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="focusEditTLDoc('KEP_BDN')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">SPS</div><span>Dokumen SPSA</span></div></td>
                  <td id="tl_table_num_SPSA">-</td><td id="tl_table_date_SPSA">-</td>
                  <td><span id="badge_status_SPSA" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="focusEditTLDoc('SPSA')">Edit</a></td>
                </tr>
                <tr>
                  <td><div class="doc-type-cell"><div class="doc-type-icon">LIM</div><span>BAST Limpah Instansi Lain</span></div></td>
                  <td id="tl_table_num_BAST_LIMPAH">-</td><td id="tl_table_date_BAST_LIMPAH">-</td>
                  <td><span id="badge_status_BAST_LIMPAH" class="badge-status badge-warning">BELUM LENGKAP</span></td>
                  <td style="text-align:center;"><a class="edit-action-link" onclick="focusEditTLDoc('BAST_LIMPAH')">Edit</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="preview-header-bar no-print" style="margin-top:18px;">
            <div>
              <div class="preview-title-badge">
                <i id="tlPreviewHeaderIcon" class="fi fi-rr-document"></i>
                <span id="tlPreviewHeaderText">PRATINJAU DOKUMEN: BAST KE PEMILIK / KUASA</span>
              </div>
            </div>

            <div>
              <div id="tlPageSelectorContainer" style="display:none; align-items:center; gap:6px;"></div>
            </div>

            <div>
              <div class="preview-status-pill">
                <i class="fi fi-rr-eye"></i> Mode Pratinjau Cetak
              </div>
            </div>
          </div>

          <div id="tl_reports"></div>
        </section>

      </main>
    </div>
  </div>
</div>

<footer class="app-footer no-print">
  &copy; 2026 DIREKTORAT JENDERAL BEA DAN CUKAI AP3 - APLIKASI PENYUSUNAN PENELITIAN PERKARA
</footer>

<!-- MODAL DISPOSISI -->
<div class="modal-overlay" id="disposisiModal">
  <div class="modal-container" style="max-width: 900px;">
    <div class="modal-header">
      <h3 id="disposisiModalTitle">Form Pengusulan & Disposisi Berkas</h3>
      <button type="button" class="modal-close" onclick="closeDisposisiModal()"><i class="fi fi-rr-cross"></i></button>
    </div>
    
    <div class="modal-body">
      <input type="hidden" id="editingDisposisiIndex" value="-1">
      <div class="grid">
        <div style="grid-column: span 2;">
          <label>Nama Pelaku</label>
          <input id="dsp_nama_pelaku" class="form-control" placeholder="Nama lengkap pelaku...">
        </div>

        <div style="grid-column: span 2;">
          <div class="grid" style="grid-template-columns: 180px 1fr; gap: 8px;">
            <div>
              <label>Jenis Identitas</label>
              <select id="dsp_jenis_identitas" class="form-control"></select>
            </div>
            <div>
              <label>Nomor Identitas</label>
              <input id="dsp_no_identitas" class="form-control" placeholder="Nomor identitas...">
            </div>
          </div>
        </div>

        <div style="grid-column: span 2;">
          <label>Jenis Perkara</label>
          <select id="dsp_jenis_perkara_select" class="form-control" onchange="syncDspJenisPerkara(this.value)"></select>
          <input id="dsp_jenis_perkara" class="form-control" style="display:none; margin-top:4px;">
        </div>

        <div style="grid-column: span 2;">
          <label>No. & Jenis Dokumen Pemberitahuan</label>
          <div style="display:flex; gap:6px;">
            <select id="dsp_jenis_dok_select" class="form-control" onchange="toggleDspJenisDokumen(this.value)" style="width:160px;"></select>
            <input id="dsp_jenis_dok_manual" class="form-control" placeholder="Ketik jenis..." style="display:none; width:120px;" oninput="syncDspDokumenPemberitahuan()">
            <input id="dsp_nomor_dok" class="form-control" placeholder="Nomor Dokumen..." oninput="syncDspDokumenPemberitahuan()" style="flex:1;" disabled>
          </div>
          <input type="hidden" id="dsp_dokumen_pemberitahuan" value="Tanpa Dokumen">
        </div>

        <div>
          <label>Tanggal Dokumen Pemberitahuan</label>
          <input id="dsp_tgl_dokumen" type="date" class="form-control">
        </div>

        <div></div>

        <div style="grid-column: span 2;">
          <label>Komoditi</label>
          <select id="dsp_komoditi_select" class="form-control" onchange="syncKomoditi(this.value)"></select>
          <input id="Komoditi" class="form-control" style="display:none;">
        </div>

        <div style="grid-column: span 2; background:#0f172a; padding:12px; border-radius:var(--radius-sm, 6px); border:1px solid var(--border-color, #334155); margin-bottom:6px;">
          <label style="color:var(--primary, #3b82f6); margin-bottom:6px; display:block; font-weight:700;">Generator Auto Teks Uraian Barang & Kemasan</label>
          <div class="grid3" style="margin-bottom:8px; display:grid; grid-template-columns: repeat(3, 1fr); gap:8px;">
            <div>
              <label>Jumlah Koli / Kemasan</label>
              <input id="dsp_jumlah_koli" class="form-control" placeholder="Contoh: 1" oninput="generateDspUraianBarangOtomatis()">
            </div>
            <div>
              <label>Jenis Koli / Kemasan</label>
              <select id="dsp_jenis_koli_select" class="form-control" onchange="handleDspJenisKoliChange(this.value)"></select>
              <input id="dsp_jenis_koli" class="form-control" placeholder="Ketik jenis koli..." style="margin-top:4px; display:none;" oninput="generateDspUraianBarangOtomatis()">
            </div>
            <div>
              <label>Nama Barang</label>
              <input id="dsp_auto_barang" class="form-control" placeholder="Contoh: beras, pisang" oninput="generateDspUraianBarangOtomatis()">
            </div>
          </div>
        </div>

        <div style="grid-column: span 2;">
          <label>Uraian Barang (Hasil Auto Teks / Bisa Diedit Langsung)</label>
          <textarea id="dsp_uraian_barang" class="form-control" placeholder="Hasil uraian barang otomatis..."></textarea>
        </div>

        <div>
          <label>Nomor LP (Cukup Angka)</label>
          <input id="dsp_no_lp" class="form-control" placeholder="Contoh: 01" oninput="updateDspCodePreviews()">
          <span class="live-code-preview" id="dsp_preview_NoLP">LP-1/KPU.206/2026</span>
        </div>
        <div>
          <label>Tanggal LP</label>
          <input type="date" id="dsp_tgl_lp" class="form-control">
        </div>

        <div>
          <label>Nomor SBP (Cukup Angka)</label>
          <input id="dsp_no_sbp" class="form-control" placeholder="Contoh: 01" oninput="updateDspCodePreviews()">
          <span class="live-code-preview" id="dsp_preview_SBP">SBP-1/MANDIRI/KPU.2/2026</span>
        </div>
        <div>
          <label>Tanggal SBP</label>
          <input type="date" id="dsp_tgl_sbp" class="form-control">
        </div>

        <div>
          <label>Nomor SPRIN INDAK (Cukup Angka)</label>
          <input id="dsp_no_sprin" class="form-control" placeholder="Contoh: 01" oninput="updateDspCodePreviews()">
          <span class="live-code-preview" id="dsp_preview_SPRIN">SPRIN-01/KPU.206/2026</span>
        </div>
        <div>
          <label>Tanggal SPRIN INDAK</label>
          <input type="date" id="dsp_tgl_sprin" class="form-control">
        </div>

        <div style="grid-column: span 2;">
          <label>Tunjuk Penyidik / Ketua Tim Peneliti</label>
          <select id="dsp_target_penyidik" class="form-control"></select>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn secondary" onclick="closeDisposisiModal()">Batal</button>
      <button type="button" class="btn warning" onclick="simpanDraftDisposisi()">
        <i class="fi fi-rr-disk"></i> Simpan Draf
      </button>
      <button type="button" class="btn primary" onclick="kirimDisposisiBerkat()">
        <i class="fi fi-rr-paper-plane"></i> Kirim Disposisi
      </button>
    </div>
  </div>
</div>

<!-- MODAL PERKARA -->
<div class="modal-overlay" id="perkaraModal">
  <div class="modal-container">
    <div class="modal-header">
      <h3 id="modalTitle">Input Data Perkara</h3>
      <button type="button" class="modal-close" onclick="closeModal()"><i class="fi fi-rr-cross"></i></button>
    </div>
    <div class="modal-body">
      <input type="hidden" id="editingRecordIndex" value="-1">

      <h2 style="font-size:13px; margin-bottom:10px; color:var(--text-main);">Informasi Data Pelanggaran</h2>
      <div class="grid">
        
        <div>
          <label>Nomor SPRIN (Cukup Angka)</label>
          <input id="No_SPRIN_Indak" placeholder="Contoh: 01" oninput="updateLiveCodePreviews()">
          <span class="live-code-preview" id="preview_SPRIN">SPRIN-01/KPU.206/2026</span>
        </div>
        <div>
          <label>Tanggal SPRIN</label>
          <input id="Tanggal_SPRIN_Indak" type="date">
        </div>
      
        <div>
          <label>Nomor SBP (Cukup Angka)</label>
          <input id="Nomor_SBP" placeholder="Contoh: 1" oninput="updateLiveCodePreviews()">
          <span class="live-code-preview" id="preview_SBP">SBP-1/MANDIRI/KPU.2/2026</span>
        </div>
        <div>
          <label>Tanggal SBP</label>
          <input id="Tanggal_SBP" type="date" onchange="updateHariSBP(); generateKronologisOtomatis()">
        </div>
        <div>
          <label>Jam Kejadian (Format 24 Jam WIB)</label>
          <input id="Jam_Kejadian" maxlength="5" placeholder="Contoh: 14.02" oninput="formatJam24(this)" onblur="validateJam24(this); generateKronologisOtomatis()">
        </div> 
        <div>
          <label class="font-bold">HARI SBP</label>
          <select 
            id="Hari_SBP" 
            class="form-select w-full border rounded p-2 pointer-events-none bg-slate-800 text-white" 
            tabindex="-1"
            onchange="generateKronologisOtomatis()"
          ></select>
        </div>

        <div>
          <label>Nomor LP (Cukup Angka)</label>
          <input id="NoLP_LP_1" placeholder="Contoh: 1" oninput="updateLiveCodePreviews(); syncLPToDocs(this.value)">
          <span class="live-code-preview" id="preview_NoLP">LP-1/KPU.206/2026</span>
        </div>
        <div>
          <label>Tanggal LP</label>
          <input id="Tanggal_LP_LP_1" type="date">
        </div>

        <div>
          <label>Asal Perkara</label>
          <select id="Asal_Perkara_Select" onchange="toggleAsalPerkaraManual(this.value)"></select>
          <input id="Asal_Perkara" placeholder="Ketik Asal Perkara..." style="margin-top:4px; display:none;">
        </div>

        <div>
          <label>Jenis Penindakan</label>
          <select id="Jenis_Penindakan_Select" onchange="syncJenisPenindakan(this.value)"></select>
          <input id="Jenis_Penindakan" style="display:none;">
        </div>

        <div>
          <label>Jenis Pelanggaran</label>
          <select id="Jenis_Pelanggaran_Select" onchange="syncJenisPelanggaran(this.value)"></select>
          <input id="Jenis_Pelanggaran" style="display:none;">
        </div>

        <div>
          <label>Jenis Perkara</label>
          <select id="Jenis_Perkara_Select" onchange="syncJenisPerkara(this.value)"></select>
          <input id="Jenis_Perkara" style="display:none;">
        </div>

        <div>
          <label>Status Penangkapan</label>
          <select id="Status_Penangkapan_Select" onchange="syncStatusPenangkapan(this.value)"></select>
          <input id="Status_Penangkapan" style="display:none;">
        </div>

        <div>
          <label>Lokasi Penindakan</label>
          <input id="Lokasi_Penindakan" oninput="generateKronologisOtomatis()">
        </div>

        <div style="grid-column: span 2;">
          <label>Modus Operandi</label>
          <select id="Modus_Operandi_Select" onchange="syncModusOperandi(this.value); generateKronologisOtomatis(); autoGenerateAndAddMasterPasal(this.value);"></select>
          <textarea id="Modus_Operandi" style="display:none;"></textarea>
        </div>

        <div style="grid-column: span 2;">
          <label>Pasal Pelanggaran (Bisa Pilih Lebih Dari Satu)</label>
          <div class="checkbox-group" id="pasal_pelanggaran_checkboxes"></div>
          <textarea id="Pasal_Pelanggaran" placeholder="Hasil gabungan pasal yang dipilih..." style="margin-top:6px;" oninput="generateKesimpulanOtomatis()"></textarea>
        </div>

        <div><label>Nama Pelaku</label><input id="Nama_Pelaku" oninput="generateKronologisOtomatis()"></div>
        
        <div>
          <label>Umur Pelaku</label>
          <select id="Umur_Pelaku"></select>
        </div>

        <div>
          <label>Jenis Kelamin Pelaku</label>
          <select id="Jenis_Kelamin_Pelaku"></select>
        </div>

        <div><label>Tempat/Tanggal Lahir</label><input id="TTL"></div>

        <div style="grid-column: span 2;">
          <label>Identitas Pelaku</label>
          <div style="display:flex; gap:6px;">
            <select id="Jenis_Identitas_Select" onchange="syncIdentitasValue()" style="width:160px;"></select>
            <input id="Nomor_Identitas_Input" placeholder="Masukkan nomor identitas..." style="flex:1;" oninput="syncIdentitasValue()">
          </div>
          <input type="hidden" id="Nomor_Identitas">
        </div>

        <div>
          <label>Pekerjaan Pelaku</label>
          <select id="Pekerjaan_Select" onchange="togglePekerjaanManual(this.value)"></select>
          <input id="Pekerjaan" placeholder="Ketik Pekerjaan Lain..." style="margin-top:4px; display:none;">
        </div>

        <div><label>Alamat Pelaku</label><textarea id="Alamat_Pelaku"></textarea></div>
        <div><label>Nomor Telepon</label><input id="Nomor_Telepon"></div>
        <div><label>Nomor Rekening</label><input id="Nomor_Rekening"></div>
        <div><label>Pengulangan Pelanggaran</label><input id="Pengulangan_Pelanggaran"></div>
      </div>

      <h3 style="margin-top:16px;">Uraian Barang & Kerugian Negara</h3>
      <div class="grid" style="margin-top:10px;">
        <div style="grid-column: span 2;">
          <label>Kronologis Singkat</label>
          <textarea id="Kronologis" placeholder="Hasil pembuatan deskripsi otomatis akan muncul di sini..."></textarea>
        </div>

        <div style="grid-column: span 2;">
          <label>Kesimpulan</label>
          <textarea id="Jenis_Pelanggaran_Pasal" placeholder="Hasil kesimpulan otomatis akan muncul di sini..."></textarea>
        </div>
        
        <div>
          <label>Komoditi</label>
          <select id="Komoditi_Select" onchange="syncKomoditi(this.value)">
            <optgroup label="KOMODITI TAMBAHAN (KUSTOM)" id="optgroup_custom_komoditi"></optgroup>
          </select>
          <input id="Komoditi" style="display:none;">
        </div>

        <div>
          <label>Perkiraan Kerugian Negara (Rp)</label>
          <input id="Kerugian_Negara" placeholder="Contoh: 10000000" oninput="formatRupiahInput(this)" onblur="formatRupiahFinal(this)">
        </div>

        <div style="grid-column: span 2; background:#0f172a; padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-color); margin-bottom:10px;">
          <label style="color:var(--primary); margin-bottom:6px;">Generator Auto Teks Uraian Barang & Kemasan</label>
          <div class="grid3" style="margin-bottom:8px;">
            <div>
              <label>Jumlah Koli / Kemasan</label>
              <input id="Jumlah_Koli" placeholder="Contoh: 1" oninput="generateUraianBarangOtomatis()">
            </div>
            <div>
              <label>Jenis Koli / Kemasan</label>
              <select id="Jenis_Koli_Select" onchange="handleJenisKoliSelectChange(this.value)"></select>
              <input id="Jenis_Koli" placeholder="Ketik jenis koli..." style="margin-top:4px; display:none;" oninput="generateUraianBarangOtomatis()">
            </div>
            <div>
              <label>Nama Barang (Bisa Koma: beras, pisang)</label>
              <input id="auto_barang" placeholder="Contoh: beras, pisang" oninput="generateUraianBarangOtomatis()">
            </div>
          </div>

          <div class="grid" style="margin-bottom:6px;">
            <div>
              <label>Pilihan Tambahan Akhiran (Opsional)</label>
              <select id="auto_akhiran_select" onchange="generateUraianBarangOtomatis()"></select>
            </div>
            <div id="auto_kustom_container" style="display: none; margin-top: 8px;">
              <input type="text" id="auto_kustom_text" placeholder="Ketik tambahan akhiran sendiri..." oninput="generateUraianBarangOtomatis()">
            </div>
          </div>
        </div>

        <div style="grid-column: span 2;">
          <label>Uraian Barang (Hasil Auto Teks / Bisa Diedit Langsung)</label>
          <textarea id="Uraian_Barang" placeholder="Hasil uraian barang otomatis akan muncul di sini..."></textarea>
        </div>

        <div><label>Merek</label><input id="Merek"></div>
        <div><label>Tipe</label><input id="Tipe"></div>
        
        <div>
          <label>Kondisi Barang</label>
          <div class="checkbox-group" style="max-height:120px; overflow-y:auto;" id="kondisi_checkboxes"></div>
          <input type="text" id="Kondisi" placeholder="Hasil gabungan kondisi barang..." style="margin-top:4px;" readonly>
        </div>

        <div><label>Spesifikasi Lain</label><textarea id="Spesifikasi_Lain"></textarea></div>

        <div><label>Pengangkut / No Polisi / Voyage / Flight</label><input id="Pengangkut"></div>
        <div><label>No. Kontainer</label><input id="No_Kontainer"></div>
        
        <div>
          <label>Ukuran Kontainer</label>
          <select id="Ukuran_Kontainer_Select" onchange="toggleUkuranKontainerManual(this.value)"></select>
          <input id="Ukuran_Kontainer" placeholder="Ketik Ukuran Kontainer Lain..." style="margin-top:4px; display:none;">
        </div>

        <div>
          <label>Kantor Pendaftaran Bea Cukai</label>
          <select id="Kantor_Select" onchange="syncKantor(this.value)"></select>
          <input id="Kantor" style="display:none;">
        </div>

        <div style="grid-column: span 2;">
          <label>No. Dokumen Pemberitahuan</label>
          <div style="display:flex; gap:6px;">
            <select id="Jenis_Dok_Pemberitahuan_Select" onchange="toggleJenisDokumen(this.value)" style="width:160px;"></select>
            <input id="Jenis_Dok_Pemberitahuan_Manual" placeholder="Ketik jenis..." style="display:none; width:120px;" oninput="syncDokumenPemberitahuan()">
            <input id="Nomor_Dok_Pemberitahuan" placeholder="Nomor Dokumen..." oninput="syncDokumenPemberitahuan()" style="flex:1;">
          </div>
          <input type="hidden" id="Dokumen_Pemberitahuan">
        </div>

        <div><label>Tanggal Dokumen Pemberitahuan</label><input id="Tanggal_Dokumen_Pemberitahuan" type="date"></div>

        <div style="grid-column: span 2;">
          <label>Dokumen Pelengkap Pabean</label>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <select id="Jenis_Dok_Pelengkap_Select" onchange="handleJenisDokPelengkapChange(this.value)" style="width:200px;"></select>
            <input id="Jenis_Dok_Pelengkap_Manual" placeholder="Ketik jenis dokumen..." style="display:none; width:170px;" oninput="syncDokumenPelengkap()">
            <input id="Nomor_Dok_Pelengkap" placeholder="Nomor Dokumen..." style="flex:1; min-width:140px;" oninput="syncDokumenPelengkap()" disabled>
            <input type="date" id="Tanggal_Dok_Pelengkap" style="width:140px;" onchange="syncDokumenPelengkap()" disabled>
          </div>
          <input type="hidden" id="Dokumen_Pelengkap" value="-">
        </div>
      </div>

      <h3 style="margin-top:16px;">Susunan Pejabat & Pelaksana Penandatangan</h3>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">1. PEJABAT ESELON III/IV (KEPALA BIDANG P2 / KEPALA SEKSI P2)</h4>
      <div class="grid4">
        <div><label>Nama Pejabat</label><input id="form_kabid" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_kabid" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_kabid"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_kabid"></select></div>
      </div>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">2. PEJABAT ESELON IV / FUNGSIONAL AHLI PERTAMA (KEPALA SEKSI PENYIDIKAN / PBC AHLI PERTAMA)</h4>
      <div class="grid4">
        <div><label>Nama Pejabat / Pegawai</label><input id="form_nama_seksi" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_seksi" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_seksi"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_seksi"></select></div>
      </div>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">3. KETUA TIM PENELITI (KETUA TIM)</h4>
      <div class="grid4">
        <div><label>Nama Petugas</label><input id="form_ketua_tim" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_ketua_tim" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_ketua_tim"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_ketua_tim"></select></div>
      </div>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">4. ANGGOTA TIM PENELITI / PEMBUAT LPP</h4>
      <div class="grid4">
        <div><label>Nama Petugas</label><input id="form_pembuat_lpp" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_pembuat_lpp" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_pembuat_lpp"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_pembuat_lpp"></select></div>
      </div>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">5. ANGGOTA TIM PENELITI / PETUGAS LPF</h4>
      <div class="grid4">
        <div><label>Nama Petugas</label><input id="form_petugas_lpf" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_petugas_lpf" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_lpf"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_petugas_lpf"></select></div>
      </div>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">6. PETUGAS PENINDAKAN 1</h4>
      <div class="grid4">
        <div><label>Nama Petugas</label><input id="form_indak_1" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_indak_1" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_indak_1"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_indak_1"></select></div>
      </div>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">7. PETUGAS PENINDAKAN 2</h4>
      <div class="grid4">
        <div><label>Nama Petugas</label><input id="form_indak_2" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_indak_2" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_indak_2"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_indak_2"></select></div>
      </div>

      <h4 style="font-size:11px; color:var(--primary); margin:10px 0 4px;">8. PETUGAS PENINDAKAN 3 / PENCACAH</h4>
      <div class="grid4">
        <div><label>Nama Petugas</label><input id="form_indak_lainnya" placeholder="Nama Lengkap & Gelar"></div>
        <div><label>NIP</label><input id="form_nip_indak_lainnya" placeholder="NIP 18 Digit"></div>
        <div><label>Jabatan</label><select id="form_jabatan_indak_lainnya"></select></div>
        <div><label>Pangkat / Golongan</label><select id="form_gol_indak_lainnya"></select></div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn secondary" onclick="closeModal()">Batal</button>
      <button type="button" class="btn primary" onclick="confirmAndSubmitPerkara()">
        <i class="fi fi-rr-check"></i> Simpan Perkara
      </button>
    </div>
  </div>
</div>

<!-- MODAL EDIT PARAMETER LAPORAN -->
<div class="modal-overlay" id="editDocModal">
  <div class="modal-container">
    <div class="modal-header">
      <h3 id="editDocModalTitle">Edit Parameter Dokumen</h3>
      <button type="button" class="modal-close" onclick="closeEditDocModal()"><i class="fi fi-rr-cross"></i></button>
    </div>
    <div class="modal-body">
      <div id="modalDynamicInputBody"></div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn secondary" onclick="closeEditDocModal()">Tutup</button>
      <button type="button" class="btn primary" onclick="saveAndCloseEditDocModal()">
        <i class="fi fi-rr-disk"></i> Simpan & Terapkan
      </button>
    </div>
  </div>
</div>

<!-- MODAL EDIT PARAMETER TINDAK LANJUT -->
<div class="modal-overlay" id="editTLDocModal">
  <div class="modal-container">
    <div class="modal-header">
      <h3 id="editTLDocModalTitle">Edit Parameter Dokumen Tindak Lanjut</h3>
      <button type="button" class="modal-close" onclick="closeEditTLDocModal()"><i class="fi fi-rr-cross"></i></button>
    </div>
    <div class="modal-body">
      <div id="modalDynamicInputBodyTL"></div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn secondary" onclick="closeEditTLDocModal()">Tutup</button>
      <button type="button" class="btn primary" onclick="saveAndCloseEditTLDocModal()">
        <i class="fi fi-rr-disk"></i> Simpan & Terapkan
      </button>
    </div>
  </div>
</div>

<!-- MODAL PENOLAKAN DISPOSISI -->
<div class="modal-overlay" id="alasanTolakModal">
  <div class="modal-container" style="max-width: 450px;">
    <div class="modal-header">
      <h3>Alasan Penolakan Disposisi</h3>
      <button type="button" class="modal-close" onclick="closeAlasanTolakModal()"><i class="fi fi-rr-cross"></i></button>
    </div>
    <div class="modal-body">
      <input type="hidden" id="currentTolakDspData">
      <label style="margin-bottom: 8px; display: block;">Masukkan alasan penolakan berkas perkara:</label>
      <textarea id="inputAlasanTolak" placeholder="Contoh: Berkas kurang lengkap..." style="width: 100%; min-height: 100px; resize: vertical;"></textarea>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn secondary" onclick="closeAlasanTolakModal()">Batal</button>
      <button type="button" class="btn danger" onclick="submitTolakDisposisi()">
        <i class="fi fi-rr-cross"></i> Konfirmasi Tolak
      </button>
    </div>
  </div>
</div>

<!-- NOTIFIKASI DISPOSISI WIDGET -->
<div class="notification-wrapper" style="position: relative; display: inline-block;">
  <button type="button" class="btn secondary" onclick="toggleNotificationDropdown()" style="position: relative; padding: 8px 12px; border-radius: 50%;">
    <i class="fi fi-rr-bell"></i>
    <span id="notifBadgeCount" class="badge-counter" style="position: absolute; top: -4px; right: -4px; background: #ef4444; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; display: none;">0</span>
  </button>

  <div id="notificationDropdown" style="display: none; position: absolute; right: 0; top: 45px; width: 320px; background: var(--bg-card, #1e293b); border: 1px solid var(--border-color, #334155); border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); z-index: 1000; overflow: hidden;">
    <div style="padding: 12px 16px; border-bottom: 1px solid var(--border-color, #334155); display: flex; justify-content: space-between; align-items: center;">
      <b style="font-size: 13px;">Riwayat Disposisi Masuk</b>
      <span style="font-size: 11px; color: var(--text-muted, #94a3b8); cursor: pointer;" onclick="markAllDisposisiAsRead()">Tandai Dibaca</span>
    </div>
    <div id="notificationListContent" style="max-height: 280px; overflow-y: auto;"></div>
  </div>
</div>

<div class="toast-container" id="toastContainer"></div>

<!-- MODAL AUTO-BOOKING -->
<div class="modal-overlay" id="customConfirmModal" style="pointer-events: none; opacity: 0;">
  <div style="background: #ffffff; padding: 24px; border-radius: 12px; width: 90%; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); transform: translateY(-20px); transition: transform 0.3s ease;">
    <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #0f172a; font-weight: 600;">Konfirmasi Auto-Booking</h3>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">Nomor dokumen awal (LPP, LPF, SPLIT) akan di-booking otomatis untuk perkara ini. Lanjutkan?</p>
    <div style="display: flex; justify-content: flex-end; gap: 10px;">
      <button type="button" id="cancelConfirmBtn" style="padding: 8px 16px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">Batal</button>
      <button type="button" id="okConfirmBtn" style="padding: 8px 16px; background: #0f172a; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">Ya, Lanjutkan</button>
    </div>
  </div>
</div>
  `;

  document.body.insertAdjacentHTML("afterbegin", bodyContent);
}

// 1. Pasang elemen head & body
loadAppHead();
loadAppBody();

// 2. Fungsi hilangkan layar loading
function dismissLoadingScreen(): void {
  const loader = document.getElementById("app-loading-screen");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 350);
  }
}
dismissLoadingScreen();