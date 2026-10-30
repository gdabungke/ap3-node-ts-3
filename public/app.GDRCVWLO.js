var $n=Object.defineProperty;var ca=(a,e)=>{for(var t in e)$n(a,t,{get:e[t],enumerable:!0})};function jn(){document.head.insertAdjacentHTML("beforeend",`
    <!-- Flaticon UIcons CDN -->
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css">
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css">
    <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css">

    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f59e0b'><path d='M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z'/></svg>">

    <!-- Modular CSS -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/layout.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/print.css">
    <style id="dynamicPaperStyle"></style>
  `)}function Cn(){document.body.insertAdjacentHTML("afterbegin",`
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
        <input type="password" id="login_password" class="lowercase-input" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>
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
        <input type="password" id="reg_password" class="lowercase-input" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>
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
  `)}jn();Cn();function Jn(){let a=document.getElementById("app-loading-screen");a&&(a.style.opacity="0",a.style.pointerEvents="none",setTimeout(()=>a.remove(),350))}Jn();var d={currentUser:null,userAccounts:[],currentDoc:"LPP",currentTLDoc:"BAST_PEMILIK",selectedPaperSize:"F4",databasePerkara:[],activeRecordIndex:-1,visiblePasswordIndex:-1,selectedViewPage:"ALL",currentActivePageIdx:0};function w(){localStorage.setItem("databasePerkara",JSON.stringify(d.databasePerkara));try{fetch("/api/perkara/bulk",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({list:d.databasePerkara})}).catch(()=>{})}catch{}}function ft(){let a=localStorage.getItem("databasePerkara");if(a)try{d.databasePerkara=JSON.parse(a)}catch{d.databasePerkara=[]}else d.databasePerkara=[];try{fetch("/api/perkara").then(e=>e.json()).then(e=>{e&&e.success&&Array.isArray(e.data)&&e.data.length>0&&(d.databasePerkara=e.data,localStorage.setItem("databasePerkara",JSON.stringify(d.databasePerkara)),typeof window.renderPerkaraTable=="function"&&window.renderPerkaraTable(),typeof window.updateDashboardStats=="function"&&window.updateDashboardStats())}).catch(()=>{})}catch{}return d.databasePerkara}var _a=["Kantor Pelayanan Utama Bea Dan Cukai Tipe B Batam","KPPBC TMP B Tanjungpinang","KPPBC TMP C Tiban","Kantor Wilayah DJBC Khusus Kepulauan Riau"];var J=["Pengatur Muda (II/a)","Pengatur Muda Tk. I (II/b)","Pengatur (II/c)","Pengatur Tk. I (II/d)","Penata Muda (III/a)","Penata Muda Tk. I (III/b)","Penata (III/c)","Penata Tk. I (III/d)","Pembina (IV/a)","Pembina Tk. I (IV/b)","Pembina Utama Muda (IV/c)"],Pa=["Kepala Kantor","Kepala Bidang Penindakan dan Penyidikan","Kepala Seksi Penindakan dan Penyidikan","Kepala Seksi Penyidikan","Kepala Seksi Intelijen","Pemeriksa Bea dan Cukai Ahli Pertama","Pemeriksa Bea dan Cukai Ahli Muda","Pemeriksa Bea dan Cukai Ahli Madya","Pemeriksa Bea dan Cukai Terampil","Pemeriksa Bea dan Cukai Mahir","Pemeriksa Bea dan Cukai Penyelia","Fungsional Pemeriksa Bea dan Cukai","Penyidik Pegawai Negeri Sipil (PPNS)","Pelaksana"],ba=["Ketua Tim Peneliti","Penyidik","Anggota Tim Peneliti","Petugas LPP","Petugas LPF","Petugas Penindakan 1","Petugas Penindakan 2","Petugas Penindakan 3","Petugas Pencacah","Petugas Pembuka Segel","Petugas Penyerah"],kt=["Seksi Penindakan","Instansi/Unit Lain","Lainnya"],_t=["Pemeriksaan, penegahan, dan penyegelan barang","Penegahan dan penyegelan barang"],Ke=["Kepabeanan","Cukai"],Ea=["Cukai - HT (Hasil Tembakau)","Cukai - EA (Etil Alkohol)","Cukai - MMEA (Minuman Mengandung Etil Alkohol)","Cukai - Pita Cukai Palsu / Bekas","Impor - Umum / Kargo","Impor - Barang Penumpang","Impor - Barang Kiriman","Impor - Pesisir / Laut (Penyelundupan)","Ekspor - Umum / Kargo","Ekspor - Barang Penumpang","Ekspor - Barang Kiriman","Ekspor - Sumber Daya Alam / Tambang","Fasilitas - FTZ (Free Trade Zone)","Fasilitas - TPB (Kawasan Berikat / Gudang Berikat)","Fasilitas - KITE","Fasilitas - Impor Sementara","NPP - Narkotika, Psikotropika, dan Prekursor","Lartas - Pakaian Bekas (Balepressed)","Lartas - Senjata Api & Bahan Peledak","Lartas - Flora / Fauna (CITES)","Pelanggaran Dokumen / Kepabeanan Lainnya"],Me=["Penindakan Biasa","NHI","Limpahan Instansi Lain"],De={"UU KEPABEANAN":["Pasal 7A Ayat (1) UU No. 17 Tahun 2006 (Kewajiban RKSP)","Pasal 7A Ayat (4) UU No. 17 Tahun 2006 (Sanksi RKSP)","Pasal 7A Ayat (2) UU No. 17 Tahun 2006 (Inward Manifest)","Pasal 7A Ayat (3) UU No. 17 Tahun 2006 (Batas Waktu)","Pasal 7A Ayat (5) UU No. 17 Tahun 2006 (Sanksi Manifes)","Pasal 7A Ayat (7) UU No. 17 Tahun 2006 (Selisih Kurang)","Pasal 7A Ayat (8) UU No. 17 Tahun 2006 (Selisih Lebih)","Pasal 9 Ayat (1) & (2) UU No. 17 Tahun 2006 (Pembongkaran Ilegal)","Pasal 7A Ayat (11) UU No. 17 Tahun 2006 (Outward Manifest)","Pasal 7A Ayat (12) UU No. 17 Tahun 2006 (Sanksi Manifes)","Pasal 104 UU No. 17 Tahun 2006 (Tanpa Manifes)","Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)","Pasal 53 Ayat (3) UU No. 17 Tahun 2006 (Penegahan Lartas)","Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)","Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)","Pasal 102A UU No. 17 Tahun 2006 (Penyelundupan Ekspor)","Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)","Pasal 108 UU No. 17 Tahun 2006 (Pertanggungjawaban Pidana)"],"UU CUKAI":["Pasal 27 UU No. 39 Tahun 2007 (Pengangkutan BKC)","Pasal 50 UU No. 39 Tahun 2007 (Tanpa NPPBKC)","Pasal 52 UU No. 39 Tahun 2007 (Pengeluaran BKC)","Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)","Pasal 55 UU No. 39 Tahun 2007 (Pita Palsu)","Pasal 56 UU No. 39 Tahun 2007 (Cukai Ilegal)","Pasal 58 UU No. 39 Tahun 2007 (Salah Personalisasi)"],"UU INSTANSI LAIN":["Pasal 34 UU No. 8 Tahun 2010 (Uang Tunai)","Pasal 35 UU No. 8 Tahun 2010 (Pemeriksaan Tunai)","Pasal 36 UU No. 8 Tahun 2010 (Sanksi Tunai)","UU No. 7 Tahun 2011 tentang Mata Uang (Mata Uang)","Pasal 113 UU No. 35 Tahun 2009 tentang Narkotika (Penyelundupan Narkotika)","Pasal 114 UU No. 35 Tahun 2009 tentang Narkotika (Peredaran Narkotika)","UU No. 5 Tahun 1997 tentang Psikotropika (Psikotropika)","UU No. 17 Tahun 2023 tentang Kesehatan (Kesehatan)","Pasal 33 jo. Pasal 86 UU No. 21 Tahun 2019 (Karantina)","Pasal 34 jo. Pasal 87 UU No. 21 Tahun 2019 (Karantina)","Pasal 47 jo. Pasal 111 UU No. 7 Tahun 2014 tentang Perdagangan (Balepress)","Pasal 51 jo. Pasal 112 UU No. 7 Tahun 2014 tentang Perdagangan (Perizinan Berusaha)","UU No. 3 Tahun 2014 tentang Perindustrian (Perindustrian)"],"PERATURAN PEMERINTAH":["Pasal 70 Ayat (1) PP No. 41 Tahun 2021 (RKSP Batam)","Pasal 70 Ayat (2) huruf a PP No. 41 Tahun 2021 (Inward Batam)","Pasal 70 Ayat (2) huruf b PP No. 41 Tahun 2021 (Outward Batam)","Pasal 71 Ayat (1) PP No. 41 Tahun 2021 (Izin BP)","Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)","Pasal 72 PP No. 41 Tahun 2021 (Tatalaksana FTZ)","Pasal 73 PP No. 41 Tahun 2021 (Pembongkaran Manifes)","Pasal 74 PP No. 41 Tahun 2021 (Pemuatan Manifes)","PP No. 49 Tahun 2022 tentang Perlakuan Perpajakan atas Penyerahan BKP/JKP di Kawasan Perdagangan Bebas (Pajak FTZ)","Pasal 3 & Pasal 4 PP No. 99 Tahun 2016 (Tata Cara)","Pasal 10 PP No. 99 Tahun 2016 (Sanksi Denda)"],"PERATURAN MENTERI KEUANGAN":["Pasal 2 & Pasal 4 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Ketentuan RKSP)","Pasal 6 & Pasal 7 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Inward Manifest)","Pasal 12 s.d. 17 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Selisih Manifes)","Pasal 21 s.d. 23 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Outward Manifest)","Pasal 4 PMK No. 34/PMK.04/2021 (RKSP Batam)","Pasal 5 & Pasal 7 PMK No. 34/PMK.04/2021 (Inward Batam)","Pasal 6 & Pasal 8 PMK No. 34/PMK.04/2021 (Outward Batam)","Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)","Pasal 3 & Pasal 4 PMK No. 100/PMK.04/2018 jo. PMK No. 203/PMK.04/2017 (Pemberitahuan Tunai)","Pasal 19 s.d. 21 PMK No. 100/PMK.04/2018 jo. PMK No. 203/PMK.04/2017 (Sanksi Tunai)","Pasal 14 s.d. 16 PMK No. 178/PMK.04/2019 (Izin Sementara)","Pasal 18 & Pasal 22 PMK No. 178/PMK.04/2019 (Sanksi Sementara)","Pasal 2 & Pasal 3 PMK No. 161/PMK.04/2019 (Dokumen CK-5)","Pasal 11 & Pasal 14 PMK No. 161/PMK.04/2019 (Penindakan Cukai)","Pasal 2 & Pasal 8 PMK No. 226/PMK.04/2021 (Pembebasan Cukai)","Pasal 14 & Pasal 19 PMK No. 226/PMK.04/2021 (Sanksi Pembebasan)"],"PERATURAN MENTERI/BADAN LAIN":["Pasal 2 & Pasal 4 PBI No. 20/2/PBI/2018 (Izin BI)","Pasal 15 & Pasal 16 PBI No. 20/2/PBI/2018 (Sanksi BI)","PADG BI No. 20/17/PADG/2018 (Juknis UKA)","Peraturan BP Batam terkait Perizinan Berusaha Pemasukan Barang Konsumsi / Kuota Barang ke Kawasan Bebas Batam (Kuota Batam)","Peraturan BP Batam terkait Pemasukan Barang Modal Bukan Baru / Workshop Container ke Kawasan Bebas Batam (Workshop Container)","Peraturan Menteri Perdagangan tentang Kebijakan dan Pengaturan Impor (Lartas Impor)","Peraturan Menteri Perdagangan tentang Kebijakan dan Pengaturan Ekspor (Lartas Ekspor)","Peraturan Menteri Perdagangan tentang Larangan Ekspor Barang Tertentu / Pakaian Bekas (Lartas Ekspor)","Peraturan BPOM tentang Pemasukan Obat dan Makanan ke Dalam Wilayah Indonesia (SKI BPOM)","Peraturan Menteri Lingkungan Hidup dan Kehutanan tentang Peredaran Tumbuhan dan Satwa Liar (CITES)"]},pe={"Barang Impor Sementara yang Belum Dilakukan Pemenuhan Kewajiban Kepabeanan Melebihi Jangka Waktu":[{cluster:"UU KEPABEANAN",pasal:"Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 18 & Pasal 22 PMK No. 178/PMK.04/2019 (Sanksi Sementara)"}],"Belum Adanya Penyelesaian Kewajiban Kepabeanan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 72 PP No. 41 Tahun 2021 (Tatalaksana FTZ)"}],"Ditemukan Adanya Selisih Lebih Jumlah Muatan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas Batam":[{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (8) UU No. 17 Tahun 2006 (Selisih Lebih)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 12 s.d. 17 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Selisih Manifes)"}],"Pemasukan Barang ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas dari Luar Daerah Pabean tanpa Perizinan Berusaha dari Badan Pengusahaan":[{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (1) PP No. 41 Tahun 2021 (Izin BP)"},{cluster:"PERATURAN MENTERI/BADAN LAIN",pasal:"Peraturan BP Batam terkait Perizinan Berusaha Pemasukan Barang Konsumsi / Kuota Barang ke Kawasan Bebas Batam (Kuota Batam)"}],"Pemasukan Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Lain ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pemasukan Barang Larangan dan Pembatasan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa Kelengkapan Dokumen Perizinan dari Instansi Terkait":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (3) UU No. 17 Tahun 2006 (Penegahan Lartas)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)"},{cluster:"PERATURAN MENTERI/BADAN LAIN",pasal:"Peraturan Menteri Perdagangan tentang Kebijakan dan Pengaturan Impor (Lartas Impor)"}],"Pemasukan Barang Larangan dan Pembatasan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pemasukan Barang Larangan dan Pembatasan dari Tempat Lain dalam Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pemasukan Workshop Container dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)"},{cluster:"PERATURAN MENTERI/BADAN LAIN",pasal:"Peraturan BP Batam terkait Pemasukan Barang Modal Bukan Baru / Workshop Container ke Kawasan Bebas Batam (Workshop Container)"}],"Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Luar Daerah Pabean tanpa/salah Pemberitahuan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 102A UU No. 17 Tahun 2006 (Penyelundupan Ekspor)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)"}],"Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Tempat Lain dalam Daerah Pabean tanpa/salah Pemberitahuan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (2) PP No. 41 Tahun 2021 (Lartas Batam)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pemasukan Barang Impor yang Diberitahukan Secara Tidak Benar Terkait Jumlah dan/atau Jenis Barang":[{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"}],"Pemasukan Barang Bekas Tertentu yang Dilarang untuk Diimpor ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"UU INSTANSI LAIN",pasal:"Pasal 47 jo. Pasal 111 UU No. 7 Tahun 2014 tentang Perdagangan (Balepress)"}],"Pemasukan Kendaraan Bermotor Eks-Impor ke Kawasan Bebas Batam tanpa Memiliki Dokumen Perizinan dan Form Pendaftaran yang Sah":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (1) PP No. 41 Tahun 2021 (Izin BP)"}],"Penimbunan Barang Impor yang Belum Selesai Kewajiban Pabeannya di Gudang Ilegal di Luar Area Kawasan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penyampaian Dokumen Pelindung Impor Berupa Invoice dan Packing List Palsu untuk Menghindari Ketentuan Lartas":[{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 108 UU No. 17 Tahun 2006 (Pertanggungjawaban Pidana)"}],"Pembongkaran Barang Impor yang Tidak Diberitahukan di Dokumen Pemberitahuan Kepabeanan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 9 Ayat (1) & (2) UU No. 17 Tahun 2006 (Pembongkaran Ilegal)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 73 PP No. 41 Tahun 2021 (Pembongkaran Manifes)"}],"Pembongkaran Peti Kemas atau Muatan Impor yang Tidak Sesuai dengan Pos Manifest yang Disetujui":[{cluster:"UU KEPABEANAN",pasal:"Pasal 9 Ayat (1) & (2) UU No. 17 Tahun 2006 (Pembongkaran Ilegal)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 5 & Pasal 7 PMK No. 34/PMK.04/2021 (Inward Batam)"}],"Pembongkaran Barang Impor di Luar Kawasan Pabean atau Tempat Penimbunan Sementara tanpa Izin Kepala Kantor Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 9 Ayat (1) & (2) UU No. 17 Tahun 2006 (Pembongkaran Ilegal)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 73 PP No. 41 Tahun 2021 (Pembongkaran Manifes)"}],"Pengangkutan Barang yang Tidak Diberitahukan dalam Outward Manifest":[{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (11) UU No. 17 Tahun 2006 (Outward Manifest)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 104 UU No. 17 Tahun 2006 (Tanpa Manifes)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 21 s.d. 23 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Outward Manifest)"}],"Pengangkutan Barang Impor yang Tidak Tercantum dalam Inward Manifest (Manifes Kedatangan Sarana Pengangkut)":[{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (2) UU No. 17 Tahun 2006 (Inward Manifest)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 104 UU No. 17 Tahun 2006 (Tanpa Manifes)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 6 & Pasal 7 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Inward Manifest)"}],"Pengangkutan Barang Ekspor yang Tidak Tercantum dalam Outward Manifest (Manifes Keberangkatan Sarana Pengangkut)":[{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (11) UU No. 17 Tahun 2006 (Outward Manifest)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 104 UU No. 17 Tahun 2006 (Tanpa Manifes)"},{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 70 Ayat (2) huruf b PP No. 41 Tahun 2021 (Outward Batam)"}],"Pengangkutan Barang Ekspor tanpa Dilengkapi Dokumen Pemberitahuan Ekspor Barang (PEB) yang Sah":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102A UU No. 17 Tahun 2006 (Penyelundupan Ekspor)"}],"Penyampaian Data Manifest yang Tidak Sesuai Terkait Jumlah Kemasan, Jenis Kemasan, dan/atau Nomor Peti Kemas":[{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (5) UU No. 17 Tahun 2006 (Sanksi Manifes)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 6 & Pasal 7 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Inward Manifest)"}],"Keterlambatan atau Tidak Disampaikannya RKSP dan Inward Manifest oleh Pengangkut Sebelum Kedatangan Sarana Pengangkut":[{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (4) UU No. 17 Tahun 2006 (Sanksi RKSP)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (5) UU No. 17 Tahun 2006 (Sanksi Manifes)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 2 & Pasal 4 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Ketentuan RKSP)"}],"Penyerahan Barang Impor dari Sarana Pengangkut Sebelum Disampaikannya Inward Manifest kepada Pejabat Bea dan Cukai":[{cluster:"UU KEPABEANAN",pasal:"Pasal 7A Ayat (5) UU No. 17 Tahun 2006 (Sanksi Manifes)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 6 & Pasal 7 PMK No. 158/PMK.04/2017 jo. PMK No. 97/PMK.04/2020 (Inward Manifest)"}],"Penyembunyian Barang Impor Larangan dan Pembatasan di dalam Kompartemen Khusus Sarana Pengangkut (False Compartment)":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pemindahan Barang Impor dari Satu Sarana Pengangkut ke Sarana Pengangkut Lain (Ship to Ship) di Luar Area Labuh Resmi tanpa Izin Bea Cukai":[{cluster:"UU KEPABEANAN",pasal:"Pasal 9 Ayat (1) & (2) UU No. 17 Tahun 2006 (Pembongkaran Ilegal)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penggunaan Barang Impor Sementara Tidak Sesuai dengan Tujuan dan Peruntukan Izin yang Diberikan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 14 s.d. 16 PMK No. 178/PMK.04/2019 (Izin Sementara)"}],"Tidak Diekspornya Kembali Barang Impor Sementara Setelah Melewati Batas Waktu Izin yang Ditetapkan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 18 & Pasal 22 PMK No. 178/PMK.04/2019 (Sanksi Sementara)"}],"Pindah Tangan atau Pemindahtanganan Barang Impor Sementara kepada Pihak Lain tanpa Persetujuan Kepala Kantor Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 14 s.d. 16 PMK No. 178/PMK.04/2019 (Izin Sementara)"}],"Pengalihan Lokasi Penggunaan Barang Impor Sementara ke Luar Lokasi yang Ditentukan dalam Surat Keputusan Izin":[{cluster:"UU KEPABEANAN",pasal:"Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 14 s.d. 16 PMK No. 178/PMK.04/2019 (Izin Sementara)"}],"Pemindahtanganan atau Penjualan Kendaraan Bermotor/Alat Berat Impor Sementara ke Pasar Domestik tanpa Pelunasan Bea Masuk dan PDRI":[{cluster:"UU KEPABEANAN",pasal:"Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 18 & Pasal 22 PMK No. 178/PMK.04/2019 (Sanksi Sementara)"}],"Penggantian Komponen atau Perubahan Bentuk Utama atas Barang Impor Sementara tanpa Persetujuan DJBC":[{cluster:"UU KEPABEANAN",pasal:"Pasal 27 UU No. 17 Tahun 2006 (Impor Sementara)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 14 s.d. 16 PMK No. 178/PMK.04/2019 (Izin Sementara)"}],"Keterlambatan Pengajuan Perpanjangan Jangka Waktu Izin Impor Sementara Sebelum Masa Izin Berakhir":[{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 14 s.d. 16 PMK No. 178/PMK.04/2019 (Izin Sementara)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 18 & Pasal 22 PMK No. 178/PMK.04/2019 (Sanksi Sementara)"}],"Pengeluaran Barang Impor dari Tempat Penimbunan Sementara sebelum Memperoleh Persetujuan Pengeluaran Dokumen (SPPB)":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pengeluaran Barang Impor Fasilitas Tempat Penimbunan Berikat (TPB) ke Peredaran Bebas tanpa Dokumen Pemberitahuan dan Pelunasan Bea Masuk serta PDRI":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pemasukan atau Pengeluaran Barang Fasilitas Kawasan Berikat yang Tidak Sesuai dengan Dokumen BC 2.3, BC 2.5, BC 2.7, atau BC 4.0":[{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"}],"Pengalihan atau Penjualan Bahan Baku Impor Fasilitas Kawasan Berikat ke Tempat Lain dalam Daerah Pabean (TLDDP) tanpa Izin Kepala Kantor Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penyalahgunaan Fasilitas Gudang Berikat dengan Melakukan Penimbunan Barang yang Melebihi Batas Waktu Maksimal Penimbunan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pengeluaran Barang dari Pusat Logistik Berikat (PLB) yang Tidak Dilengkapi Dokumen Persetujuan Pabean dan Pelunasan Pungutan Negara":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Manipulasi Laporan Pertanggungjawaban Mutasi Bahan Baku dan Hasil Produksi (IT Inventory) pada Pengusaha Kawasan Berikat":[{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 108 UU No. 17 Tahun 2006 (Pertanggungjawaban Pidana)"}],"Penyimpanan Barang yang Tidak Terdaftar dalam Ruang Lingkup Izin Penyelenggara/Pengusaha Tempat Penimbunan Berikat":[{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"}],"Subkontrak Pekerjaan dari Kawasan Berikat ke Perusahaan di TLDDP tanpa Dilengkapi Dokumen Jaminan dan Persetujuan Bea dan Cukai":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penyalahgunaan Bahan Baku Fasilitas KITE dengan Menjual Langsung ke Pasar Domestik tanpa Diproses Lebih Lanjut Menjadi Hasil Produksi":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Ketidaksesuaian Konversi Pemakaian Bahan Baku (Konversi Bahan Baku ke Produk Jadi) dalam Laporan Pertanggungjawaban Fasilitas KITE":[{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"}],"Tidak Terealisasinya Ekspor atas Hasil Produksi dari Bahan Baku Fasilitas KITE Melebihi Batas Waktu Periode Pembebasan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penyampaian Dokumen Ekspor Palsu atau Manipulatif untuk Mempertanggungjawabkan Pembebasan Bea Masuk Fasilitas KITE":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102A UU No. 17 Tahun 2006 (Penyelundupan Ekspor)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"}],"Penyalahgunaan Barang Modal/Mesin Impor Fasilitas Pembebasan Bea Masuk BKPM yang Dipindahtangankan Sebelum Melewati Jangka Waktu Pembatasan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penggunaan Mesin atau Peralatan Fasilitas Pembebasan Bea Masuk di Luar Lokasi Proyek yang Telah Disetujui dalam Surat Keputusan":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penyalahgunaan Fasilitas Impor Barang Hibah/Bantuan Sosial untuk Kepentingan Komersial tanpa Pelunasan Bea Masuk dan Cukai":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penyalahgunaan Izin Fasilitas Impor untuk Keperluan Riset, Pendidikan, atau Olahraga yang Digunakan untuk Kegiatan Usaha Lain":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pengeluaran Barang Impor Fasilitas Bebas Bea Masuk dari Kawasan Bebas Batam ke TLDDP tanpa Pelunasan Bea Masuk, Cukai, dan Pajak (PPN/PPh)":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"},{cluster:"PERATURAN PEMERINTAH",pasal:"PP No. 49 Tahun 2022 tentang Perlakuan Perpajakan atas Penyerahan BKP/JKP di Kawasan Perdagangan Bebas (Pajak FTZ)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pemasukan Barang Konsumsi ke Kawasan Bebas Batam Melebihi Kuota yang Telah Ditetapkan oleh Badan Pengusahaan":[{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 71 Ayat (1) PP No. 41 Tahun 2021 (Izin BP)"},{cluster:"PERATURAN MENTERI/BADAN LAIN",pasal:"Peraturan BP Batam terkait Perizinan Berusaha Pemasukan Barang Konsumsi / Kuota Barang ke Kawasan Bebas Batam (Kuota Batam)"}],"Pengangkutan Barang Antarpulau dari Kawasan Bebas Batam tanpa Dilengkapi Dokumen Pemberitahuan Pabean PPFTZ-01 atau PPFTZ-02":[{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 72 PP No. 41 Tahun 2021 (Tatalaksana FTZ)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pengangkutan Barang Berfasilitas Pembebasan Pajak Antar-Kawasan Bebas tanpa Dilengkapi Dokumen Pemberitahuan PPFTZ-02":[{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 72 PP No. 41 Tahun 2021 (Tatalaksana FTZ)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pemanfaatan Bahan Baku Asal Luar Daerah Pabean yang Memperoleh Fasilitas FTZ untuk Produksi Barang yang Dikeluarkan ke TLDDP tanpa Pembayaran Bea Masuk Elemen Impor":[{cluster:"PERATURAN PEMERINTAH",pasal:"Pasal 72 PP No. 41 Tahun 2021 (Tatalaksana FTZ)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pengangkutan BKC tanpa Dilengkapi Dokumen Pelindung Pengangkutan dan Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Tempat Lain dalam Daerah Pabean tanpa Pemberitahuan Pabean":[{cluster:"UU CUKAI",pasal:"Pasal 27 UU No. 39 Tahun 2007 (Pengangkutan BKC)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 2 & Pasal 3 PMK No. 161/PMK.04/2019 (Dokumen CK-5)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"}],"Penyediaan dan atau Penimbunan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan/atau Salah Etiket dan/atau Tidak Memiliki NPPBKC":[{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"},{cluster:"UU CUKAI",pasal:"Pasal 56 UU No. 39 Tahun 2007 (Cukai Ilegal)"},{cluster:"UU CUKAI",pasal:"Pasal 50 UU No. 39 Tahun 2007 (Tanpa NPPBKC)"}],"Penyerahan Barang Kena Cukai Hasil Produksi di Tempat Lain dalam Daerah Pabean yang Dimasukkan ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam dan Belum Dilunasi Pita Cukai-nya":[{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"}],"Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya":[{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"}],"Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pemasukan Barang Larangan dan Pembatasan dari Luar Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean":[{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pemasukan Barang Larangan dan Pembatasan dari Tempat Lain dalam Daerah Pabean ke Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam tanpa/salah Pemberitahuan Pabean":[{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Tempat Lain dalam Daerah Pabean tanpa/salah Pemberitahuan Pabean":[{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Penyerahan Barang Kena Cukai yang Tidak Dilekati Pita Cukai atau Tidak Dibubuhi Tanda Pelunasan Cukai Lainnya dan Pengeluaran Barang Larangan dan Pembatasan dari Kawasan Perdagangan Bebas dan Pelabuhan Bebas Batam ke Kawasan Perdagangan Bebas dan Pelabuhan Lainnya tanpa/salah Pemberitahuan Pabean":[{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"},{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 22 PMK No. 34/PMK.04/2021 (Pemeriksaan FTZ)"}],"Pengangkutan Barang Kena Cukai Hasil Tembakau tanpa Dilekati Pita Cukai Melalui Jalur Laut Menggunakan High Speed Craft (HSC)":[{cluster:"UU CUKAI",pasal:"Pasal 27 UU No. 39 Tahun 2007 (Pengangkutan BKC)"},{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"}],"Penyediaan dan/atau Penjualan Minuman Mengandung Etil Alkohol (MMEA) Ilegal tanpa Memiliki Izin NPPBKC":[{cluster:"UU CUKAI",pasal:"Pasal 50 UU No. 39 Tahun 2007 (Tanpa NPPBKC)"},{cluster:"UU CUKAI",pasal:"Pasal 54 UU No. 39 Tahun 2007 (Tanpa Pita)"}],"Pelekatan Pita Cukai Bekas dan/atau Pita Cukai Palsu pada Barang Kena Cukai Hasil Tembakau":[{cluster:"UU CUKAI",pasal:"Pasal 55 UU No. 39 Tahun 2007 (Pita Palsu)"}],"Penggunaan Pita Cukai yang Bukan Haknya atau Tidak Sesuai Personalisasi dan Golongan Tarif Cukai":[{cluster:"UU CUKAI",pasal:"Pasal 58 UU No. 39 Tahun 2007 (Salah Personalisasi)"}],"Penyalahgunaan Fasilitas Pembebasan Bea Masuk Barang Pribadi Penumpang Melalui Modus Split Baggage atau Pembagian Koper kepada Jastip":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pemasukan Barang Bawaan Awak Sarana Pengangkut (Crew) yang Melebihi Batas Nilai FOB Pembebasan tanpa Pemberitahuan Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pemasukan Barang Dagangan Komersial Menggunakan Fasilitas Jalur Hijau Barang Bawaan Pribadi Penumpang":[{cluster:"UU KEPABEANAN",pasal:"Pasal 103 UU No. 17 Tahun 2006 (Dokumen Palsu)"}],"Penyalahgunaan Fasilitas Pembebasan Bea Masuk dan Cukai atas Barang Bawaan Penumpang Melebihi Batas Nilai Pabean":[{cluster:"UU KEPABEANAN",pasal:"Pasal 102 UU No. 17 Tahun 2006 (Penyelundupan Impor)"}],"Pemasukan Narkotika, Psikotropika, dan Prekursor (NPP) Melalui Barang Kiriman Pos/Ekspedisi dengan Modus False Declaration":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"UU INSTANSI LAIN",pasal:"Pasal 113 UU No. 35 Tahun 2009 tentang Narkotika (Penyelundupan Narkotika)"}],"Penyembunyian Narkotika, Psikotropika, dan Prekursor (NPP) pada Badan Penumpang (Body Strapped) Melalui Terminal Kedatangan Internasional":[{cluster:"UU KEPABEANAN",pasal:"Pasal 53 Ayat (4) UU No. 17 Tahun 2006 (Lartas)"},{cluster:"UU INSTANSI LAIN",pasal:"Pasal 113 UU No. 35 Tahun 2009 tentang Narkotika (Penyelundupan Narkotika)"}],"Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Luar Daerah Pabean ke Kawasan Perdagangan dan Pelabuhan Bebas Batam yang Telah Diberitahukan namun Tidak Memiliki Persetujuan atas Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Bank Indonesia":[{cluster:"UU INSTANSI LAIN",pasal:"Pasal 34 UU No. 8 Tahun 2010 (Uang Tunai)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 19 s.d. 21 PMK No. 100/PMK.04/2018 jo. PMK No. 203/PMK.04/2017 (Sanksi Tunai)"},{cluster:"PERATURAN MENTERI/BADAN LAIN",pasal:"Pasal 2 & Pasal 4 PBI No. 20/2/PBI/2018 (Izin BI)"}],"Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Luar Daerah Pabean ke Kawasan Perdagangan dan Pelabuhan Bebas Batam yang Tidak Diberitahukan Melebihi Seratus Juta Rupiah atau Setara dengan Itu":[{cluster:"UU INSTANSI LAIN",pasal:"Pasal 34 UU No. 8 Tahun 2010 (Uang Tunai)"},{cluster:"UU INSTANSI LAIN",pasal:"Pasal 36 UU No. 8 Tahun 2010 (Sanksi Tunai)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 19 s.d. 21 PMK No. 100/PMK.04/2018 jo. PMK No. 203/PMK.04/2017 (Sanksi Tunai)"}],"Pembawaan Uang Tunai Berupa Uang Kertas Asing dari Kawasan Perdagangan dan Pelabuhan Bebas Batam ke Luar Daerah Pabean yang Tidak Diberitahukan Melebihi Seratus Juta Rupiah atau Setara dengan Itu":[{cluster:"UU INSTANSI LAIN",pasal:"Pasal 34 UU No. 8 Tahun 2010 (Uang Tunai)"},{cluster:"UU INSTANSI LAIN",pasal:"Pasal 36 UU No. 8 Tahun 2010 (Sanksi Tunai)"},{cluster:"PERATURAN MENTERI KEUANGAN",pasal:"Pasal 19 s.d. 21 PMK No. 100/PMK.04/2018 jo. PMK No. 203/PMK.04/2017 (Sanksi Tunai)"}]},Ue=Object.keys(pe),ge=Array.from({length:71},(a,e)=>`${e+15} Tahun`),Re=["Laki-Laki","Perempuan"],ue=["Karyawan Swasta","Wiraswasta","PNS / ASN","TNI","POLRI","Pegawai BUMN / BUMD","Buruh Harian Lepas","Petani / Nelayan","Pedagang","Nakhoda / Kapten Kapal","Pelaut / ABK (Anak Buah Kapal)","Pengemudi / Supir / Kurir","Pengurus Jasa Kepabeanan (PPJK)","Buruh Pelabuhan / TKBM","Pelajar / Mahasiswa","Ibu Rumah Tangga","Tidak Bekerja","LAINNYA"],vt=["Baik","Baru","Bukan baru","Tidak teridentifikasi"],oa=["koli","karton","box","karung","peti","pallet","bag","bundel","pack","bale","crate","basket","kontainer","drum","jerigen","botol","kaleng","pail","tabung","tangki","pcs","unit","set","slop","batang","lembar","roll","sachet","strip","blister","vial","ampul","koper","tas","lusin","gross","rim","pk","npr","kg","gram","ton","liter"];var da=["Tanpa Dokumen","CN","PIBK","PIB","PEB","NPPE","SPPB","BC 1.0","BC 1.1","BC 1.2","BC 1.6","BC 1.7","BC 2.0","BC 2.1","BC 2.2","BC 2.3","BC 2.5","BC 3.0","BC 4.0","PPFTZ-01","PPFTZ-02","PPFTZ-03"],He=["Invoice","Packing List","Bill of Lading (B/L)","Air Way Bill (AWB)","Delivery Order (DO)","Polis Asuransi","Bukti Pembayaran / TT / Letter of Credit (L/C)","Manifes / BC 1.1","Pemberitahuan Impor Barang (PIB / BC 2.0)","Pemberitahuan Ekspor Barang (PEB / BC 3.0)","Dokumen Pabean FTZ (PPFTZ-01 / PPFTZ-02 / PPFTZ-03)","Dokumen TPB (BC 2.3 / BC 2.7 / BC 4.0)","Persetujuan Impor Sementara","Persetujuan Impor (PI Kementerian Perdagangan)","Persetujuan Ekspor (PE Kementerian Perdagangan)","Laporan Surveyor (LS)","Sertifikat / Izin Karantina (KH / KI / KT)","Surat Keterangan Impor BPOM (SKI BPOM)","Persetujuan Pemasukan / Pengeluaran BP Batam","Surat Persetujuan Pembawaan UKA (Bank Indonesia)","Izin CITES (Flora & Fauna)","Izin Angkut / Rekomendasi POLRI (Handak / Senpi)","Surat Keterangan Asal / Certificate of Origin (SKA / COO)","Dokumen Pelindung Pengangkutan BKC (CK-5)","Nomor Pokok Pengusaha Barang Kena Cukai (NPPBKC)","DOKUMEN LAINNYA"],va=["NIK","Paspor","NIB","NPWP","SIM","Identitas Lain"],ht=["FCL (Full Container Load)","LCL (Less than Container Load)","Part Container / Empty Container","Loose Cargo / Break Bulk","Bulk Cargo - Dry (Curah Kering)","Bulk Cargo - Liquid (Curah Cair)","Ro-Ro / Kendaraan Bermotor","Over Dimension / Heavy Lift","Lainnya"],me=["20 feet","40 feet","40 feet High Cube (HC)","45 feet","45 feet High Cube (HC)","20 feet High Cube (HC)","10 feet","Ukuran Lainnya"],Na=["Hasil Tembakau - Sigaret Kretek Mesin (SKM)","Hasil Tembakau - Sigaret Putih Mesin (SPM)","Hasil Tembakau - Sigaret Kretek Tangan (SKT)","Hasil Tembakau - Tembakau Iris (TIS)","Hasil Tembakau - Cerutu (CRT) / Rokok Daun","Hasil Tembakau - Rokok Elektrik (REL / Liquid / Vapors)","Hasil Pengolahan Tembakau Lainnya (HPTL / Shisha / Molasses)","Pita Cukai Palsu / Bekas / Pelanggaran Desain Cukai","Minuman Mengandung Etil Alkohol (MMEA) Golongan A","Minuman Mengandung Etil Alkohol (MMEA) Golongan B","Minuman Mengandung Etil Alkohol (MMEA) Golongan C","Etil Alkohol (EA)","Narkotika, Psikotropika, dan Prekursor (NPP)","Obat-obatan, Suplemen, dan Bahan Baku Obat Ilegal","Kosmetik, Skincare, dan Produk Perawatan Diri Tanpa Izin","Alat Kesehatan (Alkes) & Sediaan Farmasi Tanpa Izin Edar","Telepon Seluler, Komputer Genggam, dan Tablet (HKT)","Elektronik Rumah Tangga, Konsol Game, Kamera, & Komponen PC","Perangkat Telekomunikasi / Radio / Drone Tanpa Sertifikasi","Tekstil dan Produk Tekstil (TPT) / Kain / Benang Roll","Pakaian Bekas / Ballpressed / Karpet Bekas","Tas, Sepatu, Aksesoris, & Produk Fashion Branded / Mewah","Jam Tangan Mewah, Logam Mulia, Perhiasan, & Permata","Kendaraan Bermotor CBU (Mobil / Sepeda Motor Utuh / Moge)","Sarana Pengangkut Laut (Speedboat, Yacht, Jet Ski, Mesin Tempel)","Suku Cadang / Spare Part Kendaraan Bermotor (Automotive Parts)","Suku Cadang / Spare Part Mesin Industri & Pabrik","Barang Modal Bukan Baru / Mesin Bekas / Alat Berat","Workshop Container / Offshore Container","Besi, Baja, Besi Tua (Scrap Metal), dan Produk Metalurgi","Minyak Bumi, BBM (Solar / MFO / Bensin), dan Gas","Hasil Tambang & Mineral (Pasir Timah, Nikel, Bauksit, Batubara)","Bahan Kimia Berbahaya dan Bahan Beracun (B3)","Limbah B3 / Sampah Plastik & Elektronik Ilegal","Tumbuhan dan Satwa Liar Dilindungi (TSL / CITES)","Produk Hasil Perikanan, Pertanian, Peternakan, dan Hewan (Karantina)","Senjata Api, Senjata Angin / Airsoft Gun, dan Amunisi","Bahan Peledak, Amonium Nitrat, dan Kembang Api / Petasan","Valuta Asing / Uang Kertas Asing (UKA) / Tunai / Instrumen Pembayaran","Produk Makanan, Minuman Olahan, dan Bahan Pangan","Barang Kiriman Pos / E-Commerce Umum","Barang Campuran / Kargo Lepas Lainnya"],Ra=[{value:"",label:"- Tanpa Tambahan Akhiran -"},{value:"dll",label:"dll."},{value:"etc",label:"etc."},{value:"dan sebagainya",label:"dan sebagainya."},{value:"dan barang lainnya",label:"dan barang lainnya."},{value:"manual",label:"Kustom / Ketik Sendiri"}],ce=["Tidak ditemukan pelanggaran kepabeanan dan/atau cukai","Penyelesaian kewajiban pabean dengan pembuatan dokumen pemberitahuan pabean","Penyelesaian kewajiban pabean berupa pembayaran Bea Masuk/Pajak Dalam Rangka Impor dan/atau Denda SPSA","Penyelesaian kewajiban pabean dengan pemenuhan izin larangan dan/atau pembatasan (Lartas)","Pengeluaran sebagian barang yang tidak terkena larangan dan/atau pembatasan","Penyelesaian sanksi administrasi cukai / asas ultimum remedium (Pasal 64B UU Cukai)","Penyelesaian dengan re-ekspor barang ke luar Daerah Pabean","Pemusnahan barang di bawah pengawasan pabean","Pelimpahan perkara dan tersangka/BB ke Kepolisian Republik Indonesia","Pelimpahan perkara dan tersangka/BB ke Badan Narkotika Nasional (BNN)","Pelimpahan berkas perkara, tersangka, dan barang bukti ke Kejaksaan Negeri (Tahap II)","Pelimpahan barang dan penanganan ke Badan Karantina Indonesia","Pelimpahan perkara dan barang bukti ke Balai Konservasi Sumber Daya Alam (BKSDA) / Gakkum KLHK","Pelimpahan perkara pembawaan UKA ke Bank Indonesia","Penyelesaian / Pelimpahan lainnya"];function ia(a,e="",t="- Pilih -"){let n=t?`<option value="">${t}</option>`:"",i=(e||"").trim().toLowerCase();a.forEach(l=>{let o=typeof l=="object"&&l!==null?l.value:l,u=typeof l=="object"&&l!==null?l.label:l;if(o===""&&t)return;let c=String(o).trim().toLowerCase()===i&&i!==""?"selected":"";n+=`<option value="${o}" ${c}>${u}</option>`});let s=a.some(l=>{let o=typeof l=="object"&&l!==null?l.value:l;return String(o).trim().toLowerCase()===i});return i&&i!=="-"&&!s&&(n+=`<option value="${e}" selected>${e}</option>`),n}function _(a,e,t="",n="- Pilih -"){let i=document.getElementById(a);i&&(i.innerHTML=ia(e,t,n))}async function X(a,e=""){try{let t=await fetch(`/api/config/${a}`);if(t.ok)return(await t.json())?.value??e}catch(t){console.warn(`Gagal mengambil config ${a} dari database backend, beralih ke local:`,t)}return localStorage.getItem(a)||e}async function Q(a,e){localStorage.setItem(a,e);try{await fetch(`/api/config/${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:a,value:e})})}catch(t){console.error(`Gagal menyimpan config ${a} ke database:`,t)}}async function Pe(){let a=Array.from(new Set([...Pa,...ba])),e=await X("setting_defaultKabid"),t=await X("setting_defaultNipKabid"),n=await X("setting_defaultJabatanKabid","Kepala Bidang Penindakan dan Penyidikan"),i=await X("setting_defaultGolKabid","Pembina (IV/a)"),s=await X("setting_defaultKasi"),l=await X("setting_defaultNipKasi"),o=await X("setting_defaultJabatanKasi","Kepala Seksi Penyidikan"),u=await X("setting_defaultGolKasi","Penata (III/c)"),g=document.getElementById("setting_defaultKabid");g&&(g.value=e);let c=document.getElementById("setting_defaultNipKabid");c&&(c.value=t);let P=document.getElementById("setting_defaultKasi");P&&(P.value=s);let m=document.getElementById("setting_defaultNipKasi");m&&(m.value=l),_("setting_defaultJabatanKabid",a,n,"- Pilih Jabatan -"),_("setting_defaultGolKabid",J,i,"- Pilih Golongan -"),_("setting_defaultJabatanKasi",a,o,"- Pilih Jabatan -"),_("setting_defaultGolKasi",J,u,"- Pilih Golongan -");let k=await X("setting_paperSize","F4"),y=document.getElementById("setting_paperSize");y&&(y.value=k),xt(k),$e()}async function zn(){let a=document.getElementById("setting_defaultKabid")?.value||"",e=document.getElementById("setting_defaultNipKabid")?.value||"",t=document.getElementById("setting_defaultJabatanKabid")?.value||"",n=document.getElementById("setting_defaultGolKabid")?.value||"",i=document.getElementById("setting_defaultKasi")?.value||"",s=document.getElementById("setting_defaultNipKasi")?.value||"",l=document.getElementById("setting_defaultJabatanKasi")?.value||"",o=document.getElementById("setting_defaultGolKasi")?.value||"",u=document.getElementById("setting_paperSize")?.value||"F4";await Promise.all([Q("setting_defaultKabid",a),Q("setting_defaultNipKabid",e),Q("setting_defaultJabatanKabid",t),Q("setting_defaultGolKabid",n),Q("setting_defaultKasi",i),Q("setting_defaultNipKasi",s),Q("setting_defaultJabatanKasi",l),Q("setting_defaultGolKasi",o),Q("setting_paperSize",u)]),w(),typeof window.showToast=="function"?window.showToast("Pengaturan pejabat berhasil disimpan ke database!"):alert("Pengaturan pejabat berhasil disimpan ke database!")}function On(a){Q("setting_paperSize",a),xt(a);let e=document.getElementById("dynamicPaperStyle");e&&(a==="A4"?e.innerHTML="@page { size: 210mm 297mm; margin: 15mm; }":e.innerHTML="@page { size: 215mm 330mm; margin: 15mm; }")}function xt(a){let e=document.getElementById("currentPaperSizeLabel");e&&(e.textContent=a==="A4"?"A4 (210 x 297 mm)":"F4 / FOLIO (215 x 330 mm)")}async function Gn(){let a=document.getElementById("setting_newKantor");if(!a)return;let e=a.value.trim();if(!e)return;let t=[];try{let n=await X("custom_kantor_list","[]");t=JSON.parse(n)}catch{t=[]}t.includes(e)||(t.push(e),await Q("custom_kantor_list",JSON.stringify(t)),a.value="",$e())}async function Fn(a){let e=[];try{let t=await X("custom_kantor_list","[]");e=JSON.parse(t)}catch{e=[]}e[a]&&(e.splice(a,1),await Q("custom_kantor_list",JSON.stringify(e)),$e())}async function $e(){let a=document.getElementById("setting_kantorListDisplay");if(!a)return;let e=[];try{let t=await X("custom_kantor_list","[]");e=JSON.parse(t)}catch{e=[]}if(e.length===0){a.innerHTML='<li style="color:var(--text-muted); list-style:none;">Belum ada kantor kustom tambahan.</li>';return}a.innerHTML=e.map((t,n)=>`
    <li style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
      <span>${t}</span>
      <a href="javascript:void(0)" onclick="removeCustomKantor(${n})" style="color:#ef4444; font-size:11px; margin-left:8px;">Hapus</a>
    </li>
  `).join("")}async function Vn(){try{await Pe(),typeof window.refreshAllTables=="function"&&window.refreshAllTables(),alert("Data pengaturan berhasil disinkronkan dari database.")}catch(a){alert("Gagal memuat data dari database: "+a)}}function Yn(){confirm("PERINGATAN: Apakah Anda yakin ingin menghapus dan mereset SEMUA data perkara, disposisi, dan pengaturan sistem? Tindakan ini tidak dapat dibatalkan!")&&(localStorage.clear(),d.databasePerkara=[],d.databaseDisposisi=[],d.activeRecordIndex=-1,alert("Semua data lokal berhasil dibersihkan. Halaman akan dimuat ulang."),window.location.reload())}typeof window<"u"&&(window.saveData=zn,window.loadData=Vn,window.changePaperSize=On,window.addCustomKantor=Gn,window.removeCustomKantor=Fn,window.confirmResetAllData=Yn,window.initSettingPejabatDropdowns=Pe);var Ce={};ca(Ce,{autoGenerateTeksTanggalBA:()=>ea,escText:()=>r,formatDate:()=>v,formatDateIndo:()=>j,formatJam24:()=>Wn,formatModusVerb:()=>la,formatProperCase:()=>ha,formatRowTrailingDashes:()=>pa,formatRowTrailingDots:()=>ai,formatRupiahFinal:()=>Qn,formatRupiahInput:()=>Xn,formatTrailingDashes:()=>V,getVal:()=>p,tanggalKeTeks:()=>je,terbilang:()=>qn,terbilangHuruf:()=>z,validateJam24:()=>Zn});function ha(a){if(!a||a==="-")return"-";let e=["dan","di","ke","dari","yang","untuk","pada","dengan","dalam","atas","oleh","sebagai","atau","serta","terkait","karena","tanpa","salah"],t=["PT","CV","UD","PO","NV","FIRMA","TBK","BUMN","BUMD","UU","PP","PMK","PER","KEP","SE","SOP","UUD","KUHP","KUHAP","FTZ","TLDDP","KPBPB","PLB","TPB","KPU","BC","TMP","KPPBC","DJBC","BPOM","PBI","WIB","WITA","WIT","SBP","LP","LPP","LPF","SPLIT","LHP","BAP","BA","BDN","SPSA","BAST","EA","MMEA","HT","REL","HPTL","BKC","NPPBKC","NPP","CN","PIBK","PIB","PEB","SPBL","SPJM","SPJK","SPPB","NHI"],n=(l,o)=>{let u=l.toLowerCase(),g=l.toUpperCase();return u==="no"||u==="no."?"No":u==="nomor"?"Nomor":u==="lartas"?"Lartas":t.includes(g)?g:/^[0-9]+$/.test(l)?l:l.includes("/")&&/[0-9]/.test(l)?g:e.includes(u)&&!o?u:u==="tentang"?"Tentang":l.charAt(0).toUpperCase()+l.slice(1).toLowerCase()},i=(l,o)=>{let u=l.match(/^([^a-zA-Z0-9]*)(.*?)([^a-zA-Z0-9]*)$/);if(!u)return l;let g=u[1],c=u[2],P=u[3];if(!c)return l;if(c.includes("/")&&!/[0-9]/.test(c)){let k=c.split("/").map(y=>n(y,o)).join("/");return`${g}${k}${P}`}return`${g}${n(c,o)}${P}`};return a.toString().trim().split(/\s+/).map((l,o)=>i(l,o===0)).join(" ")}function p(a){let e=document.getElementById(a);if(!e)return"-";let t=String(e.value||"").trim();return t!==""?ha(t):"-"}function r(a){return String(a??"-").replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]||e)}function la(a){if(!a||a==="-")return"-";let e=a.trim(),t=[{from:/^Pemasukan/i,to:"memasukkan"},{from:/^Pengeluaran/i,to:"mengeluarkan"},{from:/^Penyediaan/i,to:"menyediakan"},{from:/^Penyerahan/i,to:"menyerahkan"},{from:/^Pengangkutan/i,to:"mengangkut"},{from:/^Pembawaan/i,to:"membawa"},{from:/^Pembongkaran/i,to:"membongkar"},{from:/^Penimbunan/i,to:"menimbun"}];for(let n of t)if(n.from.test(e)){e=e.replace(n.from,n.to);break}return e.charAt(0).toLowerCase()+e.slice(1)}function z(a){let e=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"],t=parseInt(a,10);return isNaN(t)?String(a):t<12?e[t]:t<20?z(t-10)+" belas":t<100?z(Math.floor(t/10))+" puluh "+z(t%10):t<200?"seratus "+z(t-100):t<1e3?z(Math.floor(t/100))+" ratus "+z(t%100):t<2e3?"seribu "+z(t-1e3):t<1e6?z(Math.floor(t/1e3))+" ribu "+z(t%1e3):t.toString()}function qn(a){return z(a)}function Wn(a){let e=a.value.replace(/[^0-9]/g,"");e.length>=3?a.value=e.slice(0,2)+"."+e.slice(2,4):a.value=e}function Zn(a){let e=a.value.trim().replace(":",".");if(!e)return;let t=e.split(".");if(t.length===2){let n=parseInt(t[0],10),i=parseInt(t[1],10);(isNaN(n)||n<0||n>23)&&(n=0),(isNaN(i)||i<0||i>59)&&(i=0);let s=String(n).padStart(2,"0"),l=String(i).padStart(2,"0");a.value=`${s}.${l}`}else if(t.length===1&&t[0].length>=2){let n=parseInt(t[0].slice(0,2),10);(isNaN(n)||n<0||n>23)&&(n=0),a.value=`${String(n).padStart(2,"0")}.00`}}function Xn(a){let e=a.value.replace(/[^0-9]/g,"");if(!e){a.value="";return}let t=parseInt(e,10).toLocaleString("id-ID");a.value=`Rp ${t}`}function Qn(a){let e=a.value.replace(/[^0-9]/g,"");if(!e){a.value="";return}let t=parseInt(e,10).toLocaleString("id-ID");a.value=`Rp ${t},00`}function j(a){if(!a||a==="-")return"-";let e=String(a).trim(),t=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];if(/^\d{4}-\d{2}-\d{2}$/.test(e)){let[n,i,s]=e.split("-"),l=parseInt(i,10)-1;return`${String(parseInt(s,10)).padStart(2,"0")} ${t[l]} ${n}`}if(/^\d{2}-\d{2}-\d{4}$/.test(e)){let[n,i,s]=e.split("-"),l=parseInt(i,10)-1;return`${String(parseInt(n,10)).padStart(2,"0")} ${t[l]} ${s}`}return e}function v(a){let e=document.getElementById(a),t=e?e.value:"";if(!t){let n=p(a);return n!=="-"?j(n):"-"}return j(t)}function ea(a){if(!a)return{hari:"",teksLengkap:""};let e=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],t=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],n=a.split("-");if(n.length!==3)return{hari:"",teksLengkap:""};let i=parseInt(n[0],10),s=parseInt(n[1],10)-1,l=parseInt(n[2],10),o=new Date(i,s,l),u=e[o.getDay()],g=t[s],c=`${z(l)} bulan ${g.toLowerCase()} tahun ${z(i)}`;return{hari:u,teksLengkap:c}}function je(a){return ea(a).teksLengkap}function V(a,e=""){let t=(a||"").trim();return`
    <div style="position: relative; overflow: hidden; text-align: justify; margin: 4px 0; font-family: Arial, Helvetica, sans-serif !important; font-size: 11pt !important; line-height: 1.35; color: #000 !important; white-space: normal;">
      <span>${e?`${e}`:""}${t}</span>
      <span aria-hidden="true" style="position: absolute; padding-left: 4px; white-space: nowrap; color: #000; font-family: inherit; font-size: inherit; font-weight: normal; letter-spacing: 0;">----------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
    </div>
  `.trim()}function pa(a,e,t="271px"){let n=(e||"-").trim();return n!=="-"&&!n.endsWith(".")&&(n+="."),`
    <tr style="font-family: Arial, Helvetica, sans-serif !important; font-size: 11pt !important; color: #000 !important;">
      <td style="width: ${t}; border: none !important; padding: 1px 0; vertical-align: top;">${a}</td>
      <td style="width: 18px; border: none !important; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
      <td style="border: none !important; padding: 1px 4px; vertical-align: top;">
        <div style="position: relative; overflow: hidden; white-space: nowrap; width: 100%;">
          <span>${n}</span>
          <span aria-hidden="true" style="position: absolute; padding-left: 4px; color: #000; font-family: inherit; font-size: inherit; font-weight: normal; letter-spacing: 0;">----------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
        </div>
      </td>
    </tr>
  `.trim()}function ai(a,e,t="271px"){let n=(e||"-").trim();return`
    <tr style="font-family: Arial, Helvetica, sans-serif !important; font-size: 11pt !important; color: #000 !important;">
      <td style="width: ${t}; border: none !important; padding: 1px 0; vertical-align: top;">${a}</td>
      <td style="width: 18px; border: none !important; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
      <td style="border: none !important; padding: 1px 4px; vertical-align: top;">
        <div style="position: relative; overflow: hidden; white-space: nowrap; width: 100%;">
          <span>${n}</span>
          <span aria-hidden="true" style="position: absolute; padding-left: 4px; color: #000; font-family: inherit; font-size: inherit; font-weight: normal; letter-spacing: 1px;">................................................................................................................................................................</span>
        </div>
      </td>
    </tr>
  `.trim()}var Ye={};ca(Ye,{applyUserProfile:()=>Fe,checkLoginSession:()=>Ge,confirmResetAllData:()=>$t,deleteUserAccount:()=>Mt,getFilteredDataForUser:()=>ga,handleLoginSubmit:()=>Bt,handleLogout:()=>Ht,handleRegisterSubmit:()=>wt,initUserAccounts:()=>ye,openProfileSettingTab:()=>Rt,populateDisposisiUserDropdown:()=>Dt,renderRegisteredUsersTable:()=>Ve,switchAuthTab:()=>St,toggleDropdown:()=>ti,togglePasswordPreview:()=>Kt,toggleUserDropdown:()=>Ut});var Oe={};ca(Oe,{applyPageNumbers:()=>$a,autoPaginateReports:()=>Ha,changePaperSize:()=>be,closeEditDocModal:()=>Je,closeEditTLDocModal:()=>ze,focusEditTLDoc:()=>It,handleEditDocFocus:()=>At,handleSingleValidation:()=>ei,handleSingleValidationTL:()=>Nt,navigatePreviewPage:()=>ya,renderPageSelector:()=>Sa,saveAndCloseEditDocModal:()=>Lt,saveAndCloseEditTLDocModal:()=>Et,selectPreviewPage:()=>Tt,showToast:()=>A,showToastConfirm:()=>ra,updatePreviewHeaderUI:()=>ja,updateTLPreviewHeaderUI:()=>Ba});function A(a,e,t="success"){let n=document.getElementById("toastContainer");if(!n)return;let i=document.createElement("div");i.className=`toast ${t}`;let s=t==="success"?'<i class="fi fi-rr-check"></i>':t==="warning"?'<i class="fi fi-rr-exclamation"></i>':'<i class="fi fi-rr-cross"></i>';i.innerHTML=`
    <div class="toast-icon">${s}</div>
    <div class="toast-body">
      <div class="toast-title">${r(a)}</div>
      <div class="toast-desc">${r(e)}</div>
    </div>
  `,n.appendChild(i),setTimeout(()=>i.classList.add("show"),10),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300)},3500)}function ra(a,e,t){let n=document.getElementById("toastContainer");if(!n)return;let i=document.createElement("div");i.className="toast warning",i.innerHTML=`
    <div class="toast-icon"><i class="fi fi-rr-exclamation"></i></div>
    <div class="toast-body">
      <div class="toast-title">${r(a)}</div>
      <div class="toast-desc">${r(e)}</div>
      <div class="toast-actions">
        <button type="button" class="btn primary" id="toastYesBtn" style="padding:2px 8px; font-size:10px;">Ya</button>
        <button type="button" class="btn secondary" id="toastNoBtn" style="padding:2px 8px; font-size:10px;">Batal</button>
      </div>
    </div>
  `,n.appendChild(i),setTimeout(()=>i.classList.add("show"),10);let s=i.querySelector("#toastYesBtn"),l=i.querySelector("#toastNoBtn");s&&(s.onclick=()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300),t()}),l&&(l.onclick=()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),300)})}function be(a){d.selectedPaperSize=a;let e=document.getElementById("dynamicPaperStyle"),t=document.getElementById("currentPaperSizeLabel"),n=document.getElementById("setting_paperSize");n&&(n.value=a),a==="A4"?(e&&(e.innerHTML="@page { size: A4; margin: 0; } @page landscape-page { size: A4 landscape; margin: 0; } @media print { .report { width: 210mm !important; min-height: 297mm !important; } .report.landscape { width: 297mm !important; min-height: 210mm !important; } }"),t&&(t.textContent="A4 (210 x 297 mm)")):(e&&(e.innerHTML="@page { size: 215mm 330mm; margin: 0; } @page landscape-page { size: 330mm 215mm; margin: 0; } @media print { .report { width: 215mm !important; min-height: 330mm !important; } .report.landscape { width: 330mm !important; min-height: 215mm !important; } }"),t&&(t.textContent="F4 / FOLIO (215 x 330 mm)")),window.showReportView&&window.showReportView(d.currentDoc),window.showTLReportView&&window.showTLReportView(d.currentTLDoc),window.saveData&&window.saveData()}function Ha(a="reports"){let e=document.getElementById(a);if(!e)return;Array.from(e.querySelectorAll(".report")).forEach(n=>{if(n.classList.contains("landscape")||n.dataset.paginated==="true")return;let i=n.innerText||"";if(!(i.includes("SURAT PERINTAH PENELITIAN (SPLIT)")||i.includes("SURAT PERINTAH PENCACAHAN")||i.includes("BERITA ACARA SERAH TERIMA BARANG BUKTI")||i.includes("BERITA ACARA PEMBUKAAN SEGEL")||i.includes("SURAT PENETAPAN SANKSI ADMINISTRASI")||i.includes("BERITA ACARA SERAH TERIMA"))&&n.scrollHeight>1250){n.dataset.paginated="true";let s=document.createElement("div");s.className=n.className,s.dataset.paginated="true",s.innerHTML="";let l=Array.from(n.children),o=!1,u=0;l.forEach(c=>{if(c.classList.contains("office-left")||c.classList.contains("title-center")||c.classList.contains("nomor-center")){u+=c.offsetHeight;return}if(c.tagName==="TABLE"&&!o){let P=Array.from(c.querySelectorAll("tr")),m=c,k=m.querySelectorAll("tr:first-child > td, tr:first-child > th"),y=Array.from(k).map(x=>x.style.width||x.getAttribute("width")||""),f=m.cloneNode(!1);f.style.tableLayout="fixed";let h=document.createElement("tbody");f.appendChild(h);let T=!1;P.forEach(x=>{let L=x.offsetHeight||24;if(u+L>1150||T){if(T=!0,o=!0,h.children.length===0&&y.length>0){let I=x.children;for(let S=0;S<I.length;S++)y[S]&&(I[S].style.width=y[S])}h.appendChild(x)}else u+=L}),T&&h.children.length>0&&s.appendChild(f);return}u+=c.offsetHeight,(u>1150||o)&&(o=!0,s.appendChild(c))});let g=document.createElement("div");g.className="pagebreak",n.parentNode?.insertBefore(g,n.nextSibling),n.parentNode?.insertBefore(s,g.nextSibling)}})}function $a(a="reports"){let e=document.getElementById(a);if(!e)return;e.querySelectorAll(".page-number-footer").forEach(n=>n.remove()),e.querySelectorAll(".report").forEach((n,i)=>{let s=document.createElement("div");s.className="page-number-footer",s.innerText=String(i+1),n.appendChild(s)})}function ya(a,e="reports"){let t=document.getElementById(e);if(!t)return;let n=Array.from(t.querySelectorAll(".report")),i=n.length;if(i===0)return;a<0&&(a=0),a>=i&&(a=i-1),d.currentActivePageIdx=a,n.forEach((l,o)=>{l.style.display=o===a?"block":"none"}),Sa(i,e==="reports"?"pageSelectorContainer":"tlPageSelectorContainer",e)}function Sa(a,e="pageSelectorContainer",t="reports"){let n=document.getElementById(e);if(!n)return;if(a<=1){n.style.display="none",n.innerHTML="";return}n.style.display="inline-flex",n.style.alignItems="center",n.style.gap="6px";let i=d.currentActivePageIdx===0?'disabled style="opacity:0.4; cursor:not-allowed;"':"",s=d.currentActivePageIdx===a-1?'disabled style="opacity:0.4; cursor:not-allowed;"':"";n.innerHTML=`
    <button type="button" class="page-nav-btn" ${i} onclick="navigatePreviewPage(${d.currentActivePageIdx-1}, '${t}')">
      <i class="fi fi-rr-angle-left"></i> Prev
    </button>

    <span style="font-size:11px; font-weight:700; color:var(--primary); padding:0 4px;">
      Hal ${d.currentActivePageIdx+1} / ${a}
    </span>

    <button type="button" class="page-nav-btn" ${s} onclick="navigatePreviewPage(${d.currentActivePageIdx+1}, '${t}')">
      Next <i class="fi fi-rr-angle-right"></i>
    </button>
  `}function Tt(a,e="reports",t=null){d.selectedViewPage=a;let n=document.getElementById(e);if(!n)return;let i=n.querySelectorAll(".report"),s=n.querySelectorAll(".pagebreak");t&&t.parentNode&&(t.parentNode.querySelectorAll(".page-nav-btn").forEach(l=>l.classList.remove("active")),t.classList.add("active")),i.forEach((l,o)=>{a==="ALL"||a-1===o?l.style.display="block":l.style.display="none"}),s.forEach(l=>{l.style.display=a==="ALL"?"block":"none"})}function ja(a){let e=(a||d.currentDoc||"LPP").toString().toUpperCase().trim();d.currentDoc=e;let t={ALL:{title:"SEMUA DOKUMEN LAPORAN",icon:"fi-rr-documents"},LPP:{title:"LEMBAR PENELITIAN PERKARA (LPP)",icon:"fi-rr-document"},LPF:{title:"LEMBAR PENELITIAN FORMAL (LPF)",icon:"fi-rr-document-signed"},SPLIT:{title:"SURAT PERINTAH PENELITIAN (SPLIT)",icon:"fi-rr-users-alt"},SPRIN_CACAH:{title:"SURAT PERINTAH PENCACAHAN",icon:"fi-rr-shield-check"},SPRIN:{title:"SURAT PERINTAH PENCACAHAN",icon:"fi-rr-shield-check"},BA:{title:"BERITA ACARA PENCACAHAN (BA CACAH)",icon:"fi-rr-box-open"},BA_CACAH:{title:"BERITA ACARA PENCACAHAN (BA CACAH)",icon:"fi-rr-box-open"},LHP:{title:"LAPORAN HASIL PENELITIAN (LHP)",icon:"fi-rr-diploma"}},n=document.getElementById("previewHeaderText"),i=document.getElementById("previewHeaderIcon"),s=t[e]||{title:`DOKUMEN ${e}`,icon:"fi-rr-document"};n&&(n.textContent=`PRATINJAU DOKUMEN: ${s.title}`),i&&(i.className=`fi ${s.icon}`)}function At(a){if(d.activeRecordIndex<0&&d.databasePerkara.length>0&&(d.activeRecordIndex=0),d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex]){A("PERINGATAN","Simpan atau pilih data perkara terlebih dahulu sebelum mengedit parameter.","warning");return}window.loadRecordToCurrentView&&window.loadRecordToCurrentView(d.databasePerkara[d.activeRecordIndex]),d.currentDoc=a;let e=document.getElementById("docFilterSelect");e&&(e.value=a);let t={LPP:"Edit Dokumen LPP",LPF:"Edit Dokumen LPF",SPLIT:"Edit Dokumen SPLIT",SPRIN_CACAH:"Edit Sprin Cacah",BA:"Edit BA Cacah",LHP:"Edit Dokumen LHP"},n=document.getElementById("editDocModalTitle");n&&(n.textContent=t[a]||"Edit Dokumen"),window.renderDynamicInputs&&window.renderDynamicInputs(a);let i=document.getElementById("editDocModal");i&&i.classList.add("active")}function Je(){let a=document.getElementById("editDocModal");a&&a.classList.remove("active")}function Lt(){Je(),window.refreshReportTableUI&&window.refreshReportTableUI(),window.updateReportLive&&window.updateReportLive(),A("PERUBAHAN TERSIMPAN",`Parameter ${d.currentDoc} berhasil diperbarui.`,"success")}function Ba(a){let e=(a||d.currentTLDoc||"BAST_PEMILIK").toString().toUpperCase().trim();d.currentTLDoc=e;let t={ALL:{title:"SEMUA DOKUMEN TINDAK LANJUT",icon:"fi-rr-documents"},BAST_PEMILIK:{title:"BAST KE PEMILIK / KUASA",icon:"fi-rr-user-check"},BA_SEGEL:{title:"BERITA ACARA BUKA SEGEL",icon:"fi-rr-unlock"},KEP_BDN:{title:"KEPUTUSAN BPP / BDN",icon:"fi-rr-diploma"},SPSA:{title:"SURAT PERINTAH SPSA",icon:"fi-rr-shield-check"},BAST_LIMPAH:{title:"BAST LIMPAH INSTANSI LAIN",icon:"fi-rr-paper-plane"}},n=document.getElementById("tlPreviewHeaderText"),i=document.getElementById("tlPreviewHeaderIcon"),s=t[e]||{title:`DOKUMEN ${e}`,icon:"fi-rr-document"};n&&(n.textContent=`PRATINJAU DOKUMEN: ${s.title}`),i&&(i.className=`fi ${s.icon}`)}function It(a){if(d.activeRecordIndex<0&&d.databasePerkara.length>0&&(d.activeRecordIndex=0),d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex]){A("PERINGATAN","Simpan atau pilih data perkara terlebih dahulu sebelum mengedit parameter tindak lanjut.","warning");return}window.loadRecordToCurrentView&&window.loadRecordToCurrentView(d.databasePerkara[d.activeRecordIndex]),d.currentTLDoc=a;let e=document.getElementById("tlDocFilterSelect");e&&(e.value=a);let t={BAST_PEMILIK:"Edit BAST Ke Pemilik / Kuasa",BA_SEGEL:"Edit Berita Acara Buka Segel",KEP_BDN:"Edit Keputusan BDN",SPSA:"Edit Surat SPSA",BAST_LIMPAH:"Edit BAST Limpah Ke Instansi Lain"},n=document.getElementById("editTLDocModalTitle");n&&(n.textContent=t[a]||"Edit Dokumen Tindak Lanjut"),window.renderTLFormSection&&window.renderTLFormSection(a);let i=document.getElementById("editTLDocModal");i&&i.classList.add("active")}function ze(){let a=document.getElementById("editTLDocModal");a&&a.classList.remove("active")}function Et(){ze(),window.refreshTLTableUI&&window.refreshTLTableUI(),window.showTLReportView&&window.showTLReportView(d.currentTLDoc),A("PERUBAHAN TERSIMPAN",`Parameter ${d.currentTLDoc} berhasil diperbarui.`,"success")}function ei(){if((typeof d.activeRecordIndex>"u"||d.activeRecordIndex<0)&&d.databasePerkara.length>0&&(d.activeRecordIndex=0),typeof d.activeRecordIndex>"u"||d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex]){A("INFORMASI","Belum ada data perkara untuk divalidasi.","warning");return}let a=d.databasePerkara[d.activeRecordIndex],e=a.NoLP_LP_1||"";["LPP","LPF","SPLIT","SPRIN_CACAH","BA","LHP"].forEach(i=>{i==="LPP"?(a.No_LPP=e.replace(/^LP/i,"LPP"),a.Tanggal_LPP=a.Tanggal_LPP||a.Tanggal_LP_LP_1):i==="LPF"?(a.No_LPF=e.replace(/^LP/i,"LPF"),a.Tanggal_LPF=a.Tanggal_LPF||a.Tanggal_LP_LP_1):i==="SPLIT"?(a.Nomor_SPLIT=e.replace(/^LP/i,"SPLIT"),a.Tanggal_SPLIT=a.Tanggal_SPLIT||a.Tanggal_LP_LP_1):i==="SPRIN_CACAH"&&!a.No_SPRIN_CACAH?(a.No_SPRIN_CACAH=e,a.Tanggal_SPRIN_CACAH=a.Tanggal_SBP||a.Tanggal_LP_LP_1):i==="BA"&&!a.Nomor_BA?(a.Nomor_BA=e,a.Tanggal_BA=a.Tanggal_SBP||a.Tanggal_LP_LP_1):i==="LHP"&&(a.No_LHP=e.replace(/^LP/i,"LHP"),a.Tanggal_LHP=a.Tanggal_LHP||a.Tanggal_LP_LP_1)}),w();let n=document.getElementById("customToastNotification");if(n){let i=document.getElementById("toastMessage");i&&(i.innerText="Sudah divalidasi dan disinkronkan!")}else{let i=document.createElement("div");i.id="customToastNotification",i.innerHTML='<i class="fi fi-rr-check-circle" style="color: #22c55e; margin-right: 8px;"></i><span id="toastMessage">Sudah divalidasi dan disinkronkan!</span>',i.style.cssText="position: fixed; bottom: 20px; right: 20px; background: #0f172a; color: #ffffff; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); display: flex; align-items: center; z-index: 9999; font-size: 14px; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; transform: translateY(20px); border-left: 4px solid #10b981;",document.body.appendChild(i),n=i}setTimeout(()=>{n.style.opacity="1",n.style.transform="translateY(0)"},10),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(20px)"},3e3),typeof window.refreshReportTableUI=="function"&&window.refreshReportTableUI()}function Nt(){if((typeof d.activeRecordIndex>"u"||d.activeRecordIndex<0)&&d.databasePerkara.length>0&&(d.activeRecordIndex=0),typeof d.activeRecordIndex>"u"||d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex]){A("INFORMASI","Belum ada data perkara/LHP yang tersedia untuk divalidasi.","warning");return}let a=d.databasePerkara[d.activeRecordIndex],e=a.Nomor_LHP||a.NoLP_LP_1||"1",t=a.Tanggal_LHP||a.Tanggal_LP_LP_1||"";a.TL_Tanggal_Surat=a.TL_Tanggal_Surat||t,a.TL_Hari_BAST=a.TL_Hari_BAST||a.Hari_SBP||"Selasa",a.TL_Tgl_Huruf_BAST=a.TL_Tgl_Huruf_BAST||je(t),a.TL_Nama_Pemilik=a.TL_Nama_Pemilik||a.Nama_Pelaku||"-",a.TL_NIK_Pemilik=a.TL_NIK_Pemilik||a.Nomor_Identitas||"-",a.TL_Alamat_Pemilik=a.TL_Alamat_Pemilik||a.Alamat_Pelaku||"-",a.KEP_Tanggal_ND=a.KEP_Tanggal_ND||t,a.KEP_Nomor_ND=a.KEP_Nomor_ND||`KEP-${e}/KPU.2064/2026`,a.SPSA_Nomor=a.SPSA_Nomor||e,a.SPSA_Tanggal=a.SPSA_Tanggal||t,a.Limpah_Tanggal=a.Limpah_Tanggal||t,w();let n=document.getElementById("tlValidatorBanner");n&&(n.style.display="flex");let i=document.getElementById("tlActiveStatusLabel");if(i){let s=a.Nomor_LHP?`LHP-${a.Nomor_LHP}`:`LP-${a.NoLP_LP_1}`;i.textContent=`TERVALIDASI: ${s} (Pelaku: ${r(a.Nama_Pelaku)})`}A("SUKSES","Data Tindak Lanjut berhasil divalidasi & disinkronkan dari LHP!","success"),typeof window.refreshTLTableUI=="function"&&window.refreshTLTableUI()}window.showToast=A;window.showToastConfirm=ra;window.changePaperSize=be;window.autoPaginateReports=Ha;window.applyPageNumbers=$a;window.navigatePreviewPage=ya;window.renderPageSelector=Sa;window.selectPreviewPage=Tt;window.updatePreviewHeaderUI=ja;window.handleEditDocFocus=At;window.closeEditDocModal=Je;window.saveAndCloseEditDocModal=Lt;window.updateTLPreviewHeaderUI=Ba;window.focusEditTLDoc=It;window.closeEditTLDocModal=ze;window.saveAndCloseEditTLDocModal=Et;window.handleSingleValidationTL=Nt;async function ye(){try{let t=await(await fetch("/api/auth/users")).json();t.success&&(d.userAccounts=t.data||[])}catch(e){console.error("Gagal memuat akun dari server:",e),d.userAccounts=[]}if(!d.userAccounts.find(e=>e&&e.email&&e.email.toLowerCase()==="admin")){let e={nama:"Admin System",email:"admin",pass:"admin",role:"Admin"};try{await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),d.userAccounts.push(e)}catch(t){console.error("Gagal menginisialisasi akun admin ke server:",t)}}}function Ge(){let a=JSON.parse(localStorage.getItem("currentUserSession")||"null");if(!a){let t=document.getElementById("authOverlay");t&&(t.style.display="flex");return}d.currentUser=a;let e=document.getElementById("authOverlay");e&&(e.style.display="none"),Fe()}function St(a){let e=document.getElementById("authTabLoginBtn"),t=document.getElementById("authTabRegisterBtn"),n=document.getElementById("loginForm"),i=document.getElementById("registerForm");a==="login"?(e&&e.classList.add("active"),t&&t.classList.remove("active"),n&&(n.style.display="block"),i&&(i.style.display="none")):(e&&e.classList.remove("active"),t&&t.classList.add("active"),n&&(n.style.display="none"),i&&(i.style.display="block"))}async function Bt(a){a.preventDefault();let e=document.getElementById("login_email"),t=document.getElementById("login_password"),n=document.getElementById("authOverlay");if(!e||!t)return;let i=e.value.trim(),s=t.value.trim();try{let o=await(await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,pass:s})})).json();o.success?(d.currentUser=o.user,localStorage.setItem("currentUserSession",JSON.stringify(o.user)),n&&(n.style.display="none"),Fe(),window.renderPerkaraTable&&window.renderPerkaraTable(),window.updateDashboardStats&&window.updateDashboardStats(),A("LOGIN BERHASIL",`Selamat datang, ${o.user.nama} (${o.user.role})`,"success")):A("LOGIN GAGAL",o.error||"Email/Username atau kata sandi tidak cocok!","danger")}catch{A("KESALAHAN SISTEM","Gagal terhubung ke server backend.","danger")}}async function wt(a){a.preventDefault();let e=document.getElementById("reg_nama"),t=document.getElementById("reg_email"),n=document.getElementById("reg_role"),i=document.getElementById("reg_password");if(!e||!t||!n||!i)return;let s=e.value.trim(),l=t.value.trim().toLowerCase(),o=n.value,u=i.value.trim();try{let c=await(await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nama:s,email:l,role:o,pass:u})})).json();if(c.success){A("REGISTRASI BERHASIL","Silakan login menggunakan akun baru Anda.","success"),St("login");let P=document.getElementById("login_email"),m=document.getElementById("login_password");P&&(P.value=l),m&&(m.value=""),await ye()}else A("REGISTRASI GAGAL",c.error||"Gagal mendaftarkan akun.","warning")}catch{A("KESALAHAN SISTEM","Gagal terhubung ke server backend.","danger")}}function Fe(){if(!d.currentUser)return;let a=d.currentUser.namaLengkap||d.currentUser.nama||"Pengguna AP3",e=d.currentUser.email||d.currentUser.username||"-",t=d.currentUser.role||"Penyidik",n=a.charAt(0).toUpperCase(),i=document.getElementById("nav_user_name"),s=document.getElementById("nav_user_role"),l=document.getElementById("sidebarAvatarText");i&&(i.textContent=a),l&&(l.textContent=n),s&&(s.textContent=t,t==="Admin"||t==="Kepala Seksi Penyidikan"?(s.style.background="rgba(56, 189, 248, 0.15)",s.style.color="#38bdf8",s.style.borderColor="rgba(56, 189, 248, 0.3)"):(s.style.background="rgba(16, 185, 129, 0.15)",s.style.color="#10b981",s.style.borderColor="rgba(16, 185, 129, 0.3)"));let o=document.getElementById("dropdownUserName"),u=document.getElementById("dropdownUserEmail"),g=document.getElementById("dropdownUserRole");o&&(o.textContent=a),u&&(u.textContent=e),g&&(g.textContent=t);let c=document.getElementById("setting_userName"),P=document.getElementById("setting_userEmail"),m=document.getElementById("setting_userRole");c&&(c.value=a),P&&(P.value=e),m&&(m.value=t);let k=document.getElementById("btnAddNewPerkara");k&&(t.includes("Penyidik")?k.style.display="none":k.style.display="inline-flex");let y=document.getElementById("tabNavUsers");y&&(t==="Admin"?(y.style.display="flex",typeof window.renderRegisteredUsersTable=="function"&&window.renderRegisteredUsersTable()):y.style.display="none"),typeof window.populateDisposisiUserDropdown=="function"&&window.populateDisposisiUserDropdown(),typeof window.checkDisposisiAccessByRole=="function"&&window.checkDisposisiAccessByRole(),typeof window.renderDisposisiTable=="function"&&window.renderDisposisiTable()}function Ve(){let a=document.getElementById("registeredUsersTableBody");a&&(a.innerHTML=d.userAccounts.map((e,t)=>{let n=d.visiblePasswordIndex===t,i=e&&e.pass?e.pass:"",s=n?`<span class="password-preview-box">${r(i)}</span>`:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",l=n?'<i class="fi fi-rr-eye-crossed"></i>':'<i class="fi fi-rr-eye"></i>';return`
      <tr>
        <td><b>${t+1}</b></td>
        <td><b>${r(e?.nama||"-")}</b></td>
        <td>${r(e?.email||"-")}</td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            ${s}
            <button type="button" class="btn secondary" style="padding:2px 6px; font-size:10px;" onclick="togglePasswordPreview(${t})">${l}</button>
          </div>
        </td>
        <td><span class="role-badge-pill">${r(e?.role||"-")}</span></td>
        <td style="text-align:center;">
          <div style="display:flex; gap:4px; justify-content:center;">
            <button type="button" class="btn danger" style="padding:2px 6px; font-size:10px;" onclick="deleteUserAccount(${t})">
              <i class="fi fi-rr-trash"></i> Hapus
            </button>
          </div>
        </td>
      </tr>
    `}).join(""))}function Kt(a){d.visiblePasswordIndex=d.visiblePasswordIndex===a?-1:a,Ve()}function Mt(a){let e=d.userAccounts[a];if(e){if(d.currentUser&&e.email&&d.currentUser.email.toLowerCase()===e.email.toLowerCase()){A("TIDAK DAPAT MENGHAPUS","Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif!","warning");return}ra("KONFIRMASI HAPUS AKUN",`Apakah Anda yakin ingin menghapus akun user "${e.nama}" (${e.email})?`,async()=>{d.userAccounts.splice(a,1);try{await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"sync_users",list:d.userAccounts})})}catch(t){console.error("Gagal memperbarui data user di server:",t)}Ve(),Dt(),A("AKUN TERHAPUS","Akun pengguna telah berhasil dihapus dari sistem.","danger")})}}function Dt(){let a=document.getElementById("val_disposisi_user");if(!a)return;let e=d.userAccounts.filter(t=>t&&t.role&&t.role.toLowerCase().includes("penyidik"));a.innerHTML='<option value="-">- Pilih Penyidik -</option>'+e.map(t=>`<option value="${r(t.nama)}">${r(t.nama)}</option>`).join("")}function ti(a){a.stopPropagation();let e=document.getElementById("userDropdownMenu");e&&e.classList.toggle("show")}function Ut(a){a.stopPropagation();let e=document.getElementById("userDropdownMenu");e&&e.classList.toggle("show")}function Rt(){let a=document.getElementById("userDropdownMenu");a&&a.classList.remove("show");let e=document.querySelectorAll(".nav-btn"),t=document.querySelectorAll(".tab-pane");e.forEach(s=>s.classList.remove("active")),t.forEach(s=>s.classList.remove("active"));let n=document.querySelector('.nav-btn[data-target="pengaturan"]');n&&n.classList.add("active");let i=document.getElementById("pengaturan");i&&i.classList.add("active")}function Ht(){let a=document.getElementById("userDropdownMenu");a&&a.classList.remove("show"),ra("KONFIRMASI LOGOUT","Apakah Anda yakin ingin keluar dari aplikasi AP3?",()=>{localStorage.removeItem("currentUserSession"),d.currentUser=null,A("LOGOUT BERHASIL","Anda telah keluar dari aplikasi.","info"),setTimeout(()=>{let e=document.getElementById("authOverlay");e&&(e.style.display="flex")},500)})}function $t(){let a=d.currentUser&&d.currentUser.role?d.currentUser.role.toLowerCase():"";if(!(a==="super admin"||a==="admin"||a.includes("kasi"))){A("AKSES DITOLAK","Hanya Admin atau Kasi yang berhak mereset seluruh database!","danger");return}ra("RESET SEMUA DATABASE","Apakah Anda yakin ingin menghapus seluruh database perkara dan disposisi secara permanen?",async()=>{try{await fetch("/api/perkara/reset",{method:"POST"})}catch(t){console.error("Gagal mereset database perkara di server:",t)}localStorage.removeItem("databasePerkara"),localStorage.removeItem("databaseDisposisi"),localStorage.removeItem("databaseDraftDisposisi"),typeof d<"u"&&d&&(d.databasePerkara=[],typeof w=="function"&&w(),d.databaseDisposisi&&(d.databaseDisposisi=[]),d.activeRecordIndex=-1),location.reload()})}function ga(){return d.currentUser?d.currentUser.role==="Admin"||d.currentUser.role==="Kepala Seksi Penyidikan"?d.databasePerkara:d.databasePerkara.filter(a=>a.disposisiPetugas&&a.disposisiPetugas.toLowerCase()===d.currentUser?.nama.toLowerCase()):d.databasePerkara}window.confirmResetAllData=$t;window.handleLoginSubmit=Bt;window.handleRegisterSubmit=wt;window.togglePasswordPreview=Kt;window.deleteUserAccount=Mt;window.toggleUserDropdown=Ut;window.handleLogout=Ht;window.openProfileSettingTab=Rt;function xa(){let a=ga(),e=document.getElementById("statLP"),t=document.getElementById("statKerugian"),n=document.getElementById("dash_cnt_lp"),i=document.getElementById("dash_cnt_sbp"),s=document.getElementById("dash_cnt_mandiri"),l=document.getElementById("dash_cnt_nhi"),o=document.getElementById("dash_cnt_limpahan");e&&(e.textContent=String(a.length)),n&&(n.textContent=`${a.filter(N=>N.NoLP_LP_1&&N.NoLP_LP_1!=="-").length} Dokumen`),i&&(i.textContent=`${a.filter(N=>N.Nomor_SBP&&N.Nomor_SBP!=="-").length} Dokumen`);let u=0,g=0,c=0,P=0,m=0,k=0,y=0,f=0,h=0;a.forEach(N=>{let M=String(N.Kerugian_Negara||"").replace(/[^0-9]/g,""),R=parseFloat(M||"0");isNaN(R)||(u+=R);let b=N.Penyelesaian_Perkara||"";/dikuasai negara|bdn/i.test(b)?g++:/spsa|denda/i.test(b)?c++:/kembalikan ke pemilik|pemilik/i.test(b)?P++:/serah terima.*instansi|limpah/i.test(b)?m++:b.trim()!==""&&b!=="-"&&k++;let H=(N.Asal_Perkara||"").toUpperCase(),B=(N.Status_Penangkapan||"").toUpperCase(),D=(N.No_SPRIN_Indak||"").toUpperCase();H.includes("LIMPAHAN")||B.includes("LIMPAHAN")?h++:H.includes("NHI")||D.includes("NHI")||B.includes("NHI")?f++:y++}),t&&(t.textContent="Rp "+u.toLocaleString("id-ID"));let T=document.getElementById("tl_bdn_cnt");T&&(T.textContent=String(g));let x=document.getElementById("tl_spsa_cnt");x&&(x.textContent=String(c));let L=document.getElementById("tl_bast_cnt");L&&(L.textContent=String(P));let I=document.getElementById("tl_limpah_cnt");I&&(I.textContent=String(m));let S=document.getElementById("tl_other_cnt");S&&(S.textContent=String(k)),s&&(s.textContent=String(y)),l&&(l.textContent=String(f)),o&&(o.textContent=String(h));let E=document.getElementById("dashboardRecentCasesBody");if(E)if(a.length===0)E.innerHTML='<tr><td colspan="5" style="text-align:center; padding:14px; color:var(--text-muted, #94a3b8);">Belum ada perkara yang terdaftar.</td></tr>';else{let N=a.slice(-3).reverse();E.innerHTML=N.map(M=>{let R="";M.No_LPP&&M.No_LPP!=="-"||M.Nomor_LHP&&M.Nomor_LHP!=="-"||M.statusAlur&&M.statusAlur.includes("DIVALIDASI")?R=`
            <span class="badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); font-size:10px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
              <i class="fi fi-rr-document-signed"></i> PENYUSUNAN LAPORAN
            </span>
          `:R=`
            <span class="badge" style="background:rgba(245, 158, 11, 0.15); color:#f59e0b; border:1px solid rgba(245, 158, 11, 0.3); font-size:10px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
              <i class="fi fi-rr-spinner"></i> MASIH PROSES
            </span>
          `;let H=String(M.NoLP_LP_1||"-").replace(/^LP-?/i,""),B=String(M.Nomor_SBP||"-").replace(/^SBP-?/i,"");return`
          <tr class="recent-row-hover" style="border-bottom:1px solid rgba(255,255,255,0.04);">
            <td style="padding:8px 6px;">
              <b>LP-${r(H)}</b> / <small style="color:var(--text-muted, #94a3b8);">SBP-${r(B)}</small>
            </td>
            <td style="padding:8px 6px;">
              <span style="font-weight:600; color:var(--text-main, #f8fafc);">${r(M.Nama_Pelaku||"-")}</span>
            </td>
            <td style="padding:8px 6px;">
              <span style="color:var(--primary, #38bdf8); font-size:11px;">${r(M.Komoditi||"-")}</span>
            </td>
            <td style="padding:8px 6px;">
              ${R}
            </td>
            <td style="padding:8px 6px; text-align:right;">
              <button type="button" class="btn secondary" style="font-size:10px; padding:3px 8px;" onclick="bukaPerkaraDariDashboard(${d.databasePerkara.indexOf(M)})">
                <i class="fi fi-rr-arrow-right"></i> Buka
              </button>
            </td>
          </tr>
        `}).join("")}}window.updateDashboardStats=xa;var at={};ca(at,{cekNotifikasiDisposisiMasuk:()=>Oa,checkDisposisiAccessByRole:()=>za,closeAlasanTolakModal:()=>Xe,closeDisposisiModal:()=>Ja,fetchDisposisiList:()=>W,generateDspUraianBarangOtomatis:()=>We,handleDspJenisKoliChange:()=>ke,handleDspJenisKoliSelectChange:()=>Ft,hapusDisposisi:()=>Wt,initDisposisiModule:()=>ii,kirimDisposisiBerkat:()=>qt,klikRiwayatDisposisi:()=>an,markAllDisposisiAsRead:()=>en,openDisposisiModal:()=>_e,populatePenyidikDropdownForDisposisi:()=>Vt,renderNotificationHistoryList:()=>Qe,responDisposisi:()=>Ka,simpanDraftDisposisi:()=>Yt,submitTolakDisposisi:()=>Xt,syncDspDokumenPemberitahuan:()=>qe,syncDspJenisPerkara:()=>Ot,terimaDisposisi:()=>Zt,toggleDspJenisDokumen:()=>Gt,toggleNotificationDropdown:()=>Qt,updateDspCodePreviews:()=>Ze});function fe(){let a=[];if(typeof d<"u"&&Array.isArray(d.databasePerkara))a=d.databasePerkara;else try{a=JSON.parse(localStorage.getItem("databasePerkara")||"[]")}catch{a=[]}let e=[];try{e=JSON.parse(localStorage.getItem("databaseDisposisi")||"[]")}catch{e=[]}return[...a,...e]}function Ca(a){if(!a)return null;let e=String(a).match(/\b(\d+)\b/);return e?parseInt(e[1],10):null}function jt(a,e,t,n,i=null,s=null){if(!a||!e)return{isValid:!0};let l=String(a).trim().toLowerCase(),o=Ca(l),u=new Date(e).getTime(),g=fe();for(let c of g){let P=c.id||c.recordId;if(i&&String(P)===String(i)||s&&String(P)===String(s)||s&&c.disposisiId&&String(c.disposisiId)===String(s))continue;let m=c[t]?String(c[t]).trim():"",k=c[n]?String(c[n]).trim():"";if(!(!m||!k)){if(m.toLowerCase()===l)return{isValid:!1,message:`Nomor "${a}" sudah digunakan pada berkas lain! Tidak boleh ada nomor ganda.`};if(o!==null){let y=Ca(m);if(y!==null){let f=new Date(k).getTime();if(o>y&&u<f)return{isValid:!1,message:`Anomali Tanggal: Nomor (${a}) lebih tinggi dari (${m}), tetapi tanggalnya (${e}) mendahului dokumen sebelumnya (${k}).`};if(o<y&&u>f)return{isValid:!1,message:`Anomali Tanggal: Nomor (${a}) lebih kecil dari (${m}), tetapi tanggalnya (${e}) melewati berkas yang bernomor lebih besar (${k}).`}}}}}return{isValid:!0}}function Ct(a={}){let{tglSprin:e,tglSbp:t,tglLp:n,tglLpp:i,tglLpf:s,tglSplit:l,tglSprinCacah:o,tglBa:u,tglLhp:g}=a,c=I=>I?new Date(I).getTime():null,P=c(e),m=c(t),k=c(n),y=c(i),f=c(s),h=c(l),T=c(o),x=c(u),L=c(g);return P&&m&&P>m?{isValid:!1,message:"Tanggal SPRIN INDAK tidak boleh melebihi Tanggal SBP!"}:m&&k&&m>k?{isValid:!1,message:"Tanggal SBP tidak boleh mendahului/melewati Tanggal LP!"}:k&&y&&k>y?{isValid:!1,message:"Tanggal Laporan Pelanggaran (LP) tidak boleh lebih baru dari LPP!"}:y&&f&&y>f?{isValid:!1,message:"Tanggal LPP tidak boleh melebihi Tanggal LPF!"}:f&&h&&f>h?{isValid:!1,message:"Tanggal LPF tidak boleh melebihi Tanggal SPLIT!"}:m&&T&&T<m?{isValid:!1,message:"Tanggal SPRIN CACAH tidak boleh mendahului Tanggal SBP!"}:T&&x&&x<T?{isValid:!1,message:"Tanggal BA CACAH tidak boleh mendahului Tanggal SPRIN CACAH!"}:x&&L&&L<x?{isValid:!1,message:"Tanggal LHP tidak boleh mendahului Tanggal BA CACAH!"}:{isValid:!0}}function Jt(a=[],e=null,t=null){for(let n of a)if(n.num&&n.date){let i=jt(n.num,n.date,n.numKey,n.dateKey,e,t);if(!i.isValid)return{isValid:!1,message:`[${n.label||n.numKey}] ${i.message}`}}return{isValid:!0,message:""}}function wa(a=[],e={},t=null,n=null){if(a&&a.length>0){let i=Jt(a,t,n);if(!i.isValid)return{isValid:!1,message:i.message}}if(e&&Object.keys(e).length>0){let i=Ct(e);if(!i.isValid)return{isValid:!1,message:i.message||"Terjadi anomali pada kronologi tanggal operasional."}}return{isValid:!0,message:""}}typeof window<"u"&&(window.extractDocSequenceNumber=Ca,window.getAllGlobalRecords=fe,window.validateGlobalDocSequence=jt,window.validateFormDocumentNumbers=Jt,window.validateOperationalChronology=Ct,window.validateMasterOperationalData=wa);function Ot(a){let e=document.getElementById("dsp_jenis_perkara");e&&(e.value=a)}function Gt(a){let e=document.getElementById("dsp_jenis_dok_manual"),t=document.getElementById("dsp_nomor_dok");if(a==="Tanpa Dokumen"){e&&(e.style.display="none",e.value=""),t&&(t.value="",t.disabled=!0);let n=document.getElementById("dsp_dokumen_pemberitahuan");n&&(n.value="Tanpa Dokumen")}else t&&(t.disabled=!1),e&&(a==="LAINNYA"?e.style.display="block":(e.style.display="none",e.value=a==="-"?"":a)),qe()}function qe(){let a=document.getElementById("dsp_jenis_dok_select"),e=a?a.value:"Tanpa Dokumen",t=document.getElementById("dsp_dokumen_pemberitahuan");if(e==="Tanpa Dokumen"){t&&(t.value="Tanpa Dokumen");return}let n=document.getElementById("dsp_jenis_dok_manual"),i=e==="LAINNYA"?n?n.value:"":e==="-"?"":e,s=document.getElementById("dsp_nomor_dok"),l=s?s.value:"",o=[];i&&i.trim()&&o.push(i.trim()),l&&l.trim()&&o.push(l.trim()),t&&(t.value=o.length>0?o.join(" "):"Tanpa Dokumen")}function ke(a){let e=document.getElementById("dsp_jenis_koli");e&&(a==="LAINNYA"?(e.style.display="block",e.value="",e.focus()):(e.style.display="none",e.value=a==="-"?"":a),We())}function Ft(a){ke(a)}function We(){let a=document.getElementById("dsp_jumlah_koli")?document.getElementById("dsp_jumlah_koli").value.trim():"",e=document.getElementById("dsp_jenis_koli_select")?document.getElementById("dsp_jenis_koli_select").value:"",t=e==="LAINNYA"?document.getElementById("dsp_jenis_koli")?document.getElementById("dsp_jenis_koli").value.trim():"":e!=="-"?e:"",n=document.getElementById("dsp_auto_barang")?document.getElementById("dsp_auto_barang").value.trim():"",i=document.getElementById("dsp_auto_akhiran_select")?document.getElementById("dsp_auto_akhiran_select").value:"",s=document.getElementById("dsp_auto_kustom_text")?document.getElementById("dsp_auto_kustom_text").value.trim():"",l=document.getElementById("dsp_auto_kustom_container");if(l&&(l.style.display=i==="manual"?"block":"none"),!a&&!t&&!n)return;let o=n.replace(/[,.\s]+$/,"").trim(),u=typeof z=="function"?z(a):a,P=[a?`${a} (${u})`:"",t,o].filter(k=>k!==""&&k!=="-").join(" ");P&&(P=P.charAt(0).toUpperCase()+P.slice(1)),o&&(i==="dll"?P+=", dll.":i==="etc"?P+=", etc.":i==="barang_lainnya"?P+=", dan barang lainnya":i==="manual"&&s&&(P+=`, ${s.replace(/^,\s*/,"")}`));let m=document.getElementById("dsp_uraian_barang");m&&(m.value=P)}function Ze(){let a=document.getElementById("dsp_no_lp")?document.getElementById("dsp_no_lp").value.trim():"",e=document.getElementById("dsp_no_sbp")?document.getElementById("dsp_no_sbp").value.trim():"",t=document.getElementById("dsp_no_sprin")?document.getElementById("dsp_no_sprin").value.trim():"",n=document.getElementById("dsp_preview_NoLP"),i=document.getElementById("dsp_preview_SBP"),s=document.getElementById("dsp_preview_SPRIN");if(n&&(n.textContent=a!==""?`LP-${a}/KPU.206/2026`:"LP-/KPU.206/2026"),i&&(i.textContent=e!==""?`SBP-${e}/MANDIRI/KPU.2/2026`:"SBP-/MANDIRI/KPU.2/2026"),s){let l=t!==""?t.length<2?String(t).padStart(2,"0"):t:"01";s.textContent=t!==""?`SPRIN-${l}/KPU.206/2026`:"SPRIN-/KPU.206/2026"}}var zt=1,ni=5;async function W(){let a=[];try{let i=await(await fetch("/api/disposisi")).json();i.success&&Array.isArray(i.data)&&(a=i.data.map(s=>s[0]?s[0]:s))}catch(n){console.error("Gagal mengambil disposisi dari server, fallback ke localStorage:",n)}if(a.length===0){let n=JSON.parse(localStorage.getItem("databaseDisposisi")||"[]");a=Array.isArray(n)?n.map(i=>i[0]?i[0]:i):[]}let e=a.filter(n=>{if(!n)return!1;let i=n.noLp&&String(n.noLp).trim()!==""&&String(n.noLp).trim()!=="-",s=n.noSbp&&String(n.noSbp).trim()!==""&&String(n.noSbp).trim()!=="-",l=n.pelaku&&String(n.pelaku).trim()!==""&&String(n.pelaku).trim()!=="-";return i||s||l}),t=new Map;return e.forEach(n=>{n&&n.id&&t.set(String(n.id),n)}),Array.from(t.values())}async function fa(a){let e=a.filter(t=>{if(!t)return!1;let n=t.noLp&&String(t.noLp).trim()!==""&&String(t.noLp).trim()!=="-",i=t.noSbp&&String(t.noSbp).trim()!==""&&String(t.noSbp).trim()!=="-",s=t.pelaku&&String(t.pelaku).trim()!==""&&String(t.pelaku).trim()!=="-";return n||i||s});localStorage.setItem("databaseDisposisi",JSON.stringify(e));try{await fetch("/api/disposisi",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}catch(t){console.error("Gagal menyimpan disposisi ke server:",t)}}async function _e(a=-1){let e=document.getElementById("disposisiModal")||document.getElementById("modalDisposisi")||document.getElementById("modalUsulDisposisi"),t=document.getElementById("disposisiModalTitle")||document.getElementById("modalDisposisiTitle"),n=document.getElementById("editingDisposisiIndex")||document.getElementById("editingDisposisiId");if(n&&(n.value=String(a)),_("dsp_jenis_identitas",va,"","- Pilih -"),_("dsp_jenis_perkara_select",Ea,"","- Pilih Jenis Perkara -"),_("dsp_jenis_dok_select",da,"Tanpa Dokumen",""),_("dsp_komoditi_select",Na,"","- Pilih Komoditi -"),_("dsp_jenis_koli_select",oa,"","- Pilih Jenis Koli -"),a<0){document.getElementById("dsp_nama_pelaku")&&(document.getElementById("dsp_nama_pelaku").value="");let s=document.getElementById("dsp_jenis_identitas");s&&(s.value="NIK");let l=document.getElementById("dsp_nomor_identitas")||document.getElementById("dsp_no_identitas");l&&(l.value="");let o=document.getElementById("dsp_jenis_perkara_select");o&&(o.value=""),document.getElementById("dsp_jenis_perkara")&&(document.getElementById("dsp_jenis_perkara").value="");let u=document.getElementById("dsp_jenis_dok_select");u&&(u.value="Tanpa Dokumen");let g=document.getElementById("dsp_jenis_dok_manual");g&&(g.style.display="none");let c=document.getElementById("dsp_nomor_dok");c&&(c.value="",c.disabled=!0),document.getElementById("dsp_dokumen_pemberitahuan")&&(document.getElementById("dsp_dokumen_pemberitahuan").value="Tanpa Dokumen"),document.getElementById("dsp_tgl_dokumen")&&(document.getElementById("dsp_tgl_dokumen").value="");let P=document.getElementById("dsp_komoditi_select")||document.getElementById("dsp_komoditi");P&&(P.value=""),document.getElementById("dsp_jumlah_koli")&&(document.getElementById("dsp_jumlah_koli").value="");let m=document.getElementById("dsp_jenis_koli_select");m&&(m.value="");let k=document.getElementById("dsp_jenis_koli");k&&(k.style.display="none"),document.getElementById("dsp_auto_barang")&&(document.getElementById("dsp_auto_barang").value=""),document.getElementById("dsp_uraian_barang")&&(document.getElementById("dsp_uraian_barang").value=""),document.getElementById("dsp_no_lp")&&(document.getElementById("dsp_no_lp").value=""),document.getElementById("dsp_tgl_lp")&&(document.getElementById("dsp_tgl_lp").value=""),document.getElementById("dsp_no_sbp")&&(document.getElementById("dsp_no_sbp").value=""),document.getElementById("dsp_tgl_sbp")&&(document.getElementById("dsp_tgl_sbp").value=""),document.getElementById("dsp_no_sprin")&&(document.getElementById("dsp_no_sprin").value=""),document.getElementById("dsp_tgl_sprin")&&(document.getElementById("dsp_tgl_sprin").value="");let y=document.getElementById("dsp_target_penyidik");y&&(y.value="-")}let i=!1;if(a>=0){let l=(await W())[a];if(l){let o=String(l.status||l.statusDisposisi||"").toUpperCase();!o.includes("DRAF")&&!o.includes("BELUM DITUNJUK")&&(i=!0),document.getElementById("dsp_nama_pelaku")&&(document.getElementById("dsp_nama_pelaku").value=l.pelaku||""),document.getElementById("dsp_jenis_identitas")&&_("dsp_jenis_identitas",va,l.jenisIdentitas||"NIK","- Pilih -");let g=document.getElementById("dsp_nomor_identitas")||document.getElementById("dsp_no_identitas");if(g&&(g.value=l.nomorIdentitas||""),document.getElementById("dsp_jenis_perkara")&&(document.getElementById("dsp_jenis_perkara").value=l.jenisPerkara||""),document.getElementById("dsp_jenis_perkara_select")&&l.jenisPerkara&&_("dsp_jenis_perkara_select",Ea,l.jenisPerkara,"- Pilih Jenis Perkara -"),(document.getElementById("dsp_komoditi_select")||document.getElementById("dsp_komoditi"))&&_("dsp_komoditi_select",Na,l.komoditi||"","- Pilih Komoditi -"),l.dokPemberitahuan&&l.dokPemberitahuan!=="Tanpa Dokumen"){let y=l.dokPemberitahuan.split(" Nomor "),f=y[0]?y[0].trim():"",h=y[1]?y[1].trim():"",T=document.getElementById("dsp_jenis_dok_select"),x=document.getElementById("dsp_jenis_dok_manual"),L=document.getElementById("dsp_nomor_dok");T&&(_("dsp_jenis_dok_select",da,f,""),T.value!==f?(T.value="Tanpa Dokumen",x&&(x.style.display="block",x.value=f)):x&&(x.style.display="none")),L&&(L.disabled=!1,L.value=h)}else{let y=document.getElementById("dsp_jenis_dok_select");y&&(y.value="Tanpa Dokumen");let f=document.getElementById("dsp_nomor_dok");f&&(f.value="",f.disabled=!0)}document.getElementById("dsp_dokumen_pemberitahuan")&&(document.getElementById("dsp_dokumen_pemberitahuan").value=l.dokPemberitahuan||"Tanpa Dokumen"),document.getElementById("dsp_tgl_dokumen")&&(document.getElementById("dsp_tgl_dokumen").value=l.tglDokPemberitahuan||""),document.getElementById("dsp_jumlah_koli")&&(document.getElementById("dsp_jumlah_koli").value=l.jumlahKoli||""),document.getElementById("dsp_jenis_koli_select")&&(_("dsp_jenis_koli_select",oa,l.jenisKoli||"","- Pilih Jenis Koli -"),ke(l.jenisKoli||"")),document.getElementById("dsp_auto_barang")&&(document.getElementById("dsp_auto_barang").value=l.autoBarang||""),document.getElementById("dsp_uraian_barang")&&(document.getElementById("dsp_uraian_barang").value=l.uraianBarang||""),document.getElementById("dsp_no_lp")&&(document.getElementById("dsp_no_lp").value=l.noLp||""),document.getElementById("dsp_tgl_lp")&&(document.getElementById("dsp_tgl_lp").value=l.tglLp||""),document.getElementById("dsp_no_sbp")&&(document.getElementById("dsp_no_sbp").value=l.noSbp||""),document.getElementById("dsp_tgl_sbp")&&(document.getElementById("dsp_tgl_sbp").value=l.tglSbp||""),document.getElementById("dsp_no_sprin")&&(document.getElementById("dsp_no_sprin").value=l.noSprin||""),document.getElementById("dsp_tgl_sprin")&&(document.getElementById("dsp_tgl_sprin").value=l.tglSprin||"");let k=document.getElementById("dsp_target_penyidik");k&&(k.value=l.targetPenyidik||"-")}}if(e&&(e.querySelectorAll("input, select, textarea").forEach(o=>{o.id!=="editingDisposisiIndex"&&(o.disabled=i)}),e.querySelectorAll('.modal-footer, .modal-actions, .form-actions, div[style*="justify-content: flex-end"]').forEach(o=>{o.querySelectorAll("button").forEach(g=>{let c=(g.textContent||"").toLowerCase();i?(c.includes("simpan")||c.includes("kirim"))&&(g.style.display="none"):!g.classList.contains("close-modal-btn")&&!g.classList.contains("btn-close")&&(g.style.display="")})}),t&&(t.textContent=i?"Detail Disposisi Berkas (Read-Only)":a<0?"Form Pengusulan & Disposisi Berkas":"Edit Draf Disposisi")),!i){let s=document.getElementById("dsp_no_sbp"),l=document.getElementById("dsp_tgl_sbp"),o=document.getElementById("dsp_no_lp"),u=document.getElementById("dsp_tgl_lp"),g=document.getElementById("dsp_no_sprin"),c=document.getElementById("dsp_tgl_sprin"),P=(m,k,y,f,h)=>{m&&!m.dataset.validationAttached&&(m.dataset.validationAttached="true",m.addEventListener("blur",()=>{let T=m.value,x=k?k.value:"";if(T){let I=wa([{num:T,date:x,numKey:f,dateKey:h,label:y}],{},a);I.isValid||(A(I.message,"error"),m.focus())}}))};P(s,l,"SBP","noSbp","tglSbp"),P(o,u,"LP","noLp","tglLp"),P(g,c,"SPRIN","noSprin","tglSprin")}Ze(),Vt(),e&&e.classList.add("active")}function Ja(){let a=document.getElementById("disposisiModal")||document.getElementById("modalDisposisi")||document.getElementById("modalUsulDisposisi");a&&a.classList.remove("active")}function Vt(){let a=document.getElementById("dsp_target_penyidik");if(!a)return;let t=(d.userAccounts||d.databaseUser||JSON.parse(localStorage.getItem("databaseUser")||"[]")).filter(n=>n.role==="Penyidik / Ketua Tim Peneliti"||n.role==="Penyidik");if(t.length>0)a.innerHTML='<option value="-">- Pilih Penyidik / Peneliti Tujuan -</option>'+t.map(n=>`<option value="${r(n.nama||n.username)}">${r(n.nama||n.username)} (${r(n.email||n.role||"Penyidik")})</option>`).join("");else{let n=document.getElementById("val_disposisi_user");n&&n.options.length>0&&(a.innerHTML=n.innerHTML)}}async function Yt(){let a=document.getElementById("dsp_nama_pelaku")?document.getElementById("dsp_nama_pelaku").value.trim():"",e=document.getElementById("dsp_no_lp")?document.getElementById("dsp_no_lp").value.trim():"",t=document.getElementById("dsp_no_sbp")?document.getElementById("dsp_no_sbp").value.trim():"",n=document.getElementById("dsp_no_sprin")?document.getElementById("dsp_no_sprin").value.trim():"";if(!t||!e||!n||!a){A("ISIAN BELUM LENGKAP","Harap isi Nomor SBP, Nomor LP, Nomor SPRIN, dan Nama Pelaku terlebih dahulu sebelum menyimpan draf!","warning");return}let i=document.getElementById("dsp_jenis_identitas"),s=i?i.value:"NIK",l=document.getElementById("dsp_nomor_identitas")||document.getElementById("dsp_no_identitas"),o=l?l.value.trim():"",u=document.getElementById("dsp_jenis_perkara_select"),g=u?u.value:"",P=(document.getElementById("dsp_jenis_perkara")?document.getElementById("dsp_jenis_perkara").value.trim():"")||(g!=="-"?g:""),m=document.getElementById("dsp_jenis_dok_select")?document.getElementById("dsp_jenis_dok_select").value:"Tanpa Dokumen",k=document.getElementById("dsp_jenis_dok_manual")?document.getElementById("dsp_jenis_dok_manual").value.trim():"",y=document.getElementById("dsp_nomor_dok")?document.getElementById("dsp_nomor_dok").value.trim():"",f=m==="Lainnya"||m==="LAINNYA"?k:m,h=f;f&&f!=="Tanpa Dokumen"&&y&&(h=`${f} Nomor ${y}`);let T=document.getElementById("dsp_komoditi_select")||document.getElementById("dsp_komoditi"),x=T?T.value:"-",L=document.getElementById("dsp_tgl_dokumen")?document.getElementById("dsp_tgl_dokumen").value:"",I=document.getElementById("dsp_jumlah_koli")?document.getElementById("dsp_jumlah_koli").value.trim():"",S=document.getElementById("dsp_jenis_koli_select")?document.getElementById("dsp_jenis_koli_select").value:"-",E=document.getElementById("dsp_auto_barang")?document.getElementById("dsp_auto_barang").value.trim():"",N=document.getElementById("dsp_uraian_barang")?document.getElementById("dsp_uraian_barang").value.trim():"",M=document.getElementById("dsp_tgl_lp")?document.getElementById("dsp_tgl_lp").value:"",R=document.getElementById("dsp_tgl_sbp")?document.getElementById("dsp_tgl_sbp").value:"",b=document.getElementById("dsp_tgl_sprin")?document.getElementById("dsp_tgl_sprin").value:"",H=document.getElementById("dsp_target_penyidik")?document.getElementById("dsp_target_penyidik").value:"-",B=document.getElementById("editingDisposisiIndex")||document.getElementById("editingDisposisiId"),D=B?parseInt(B.value):-1,U=await W();U=U.filter($=>$&&($.noLp||$.noSbp||$.pelaku));let aa=D>=0&&U[D]?U[D].id:Date.now(),C={id:aa,pelaku:a,jenisIdentitas:s,nomorIdentitas:o,jenisPerkara:P,komoditi:x,dokPemberitahuan:h,tglDokPemberitahuan:L,jumlahKoli:I,jenisKoli:S,autoBarang:E,uraianBarang:N,noLp:e,tglLp:M,noSbp:t,tglSbp:R,noSprin:n,tglSprin:b,targetPenyidik:H,pengusul:d&&d.currentUser?d.currentUser.namaLengkap||d.currentUser.nama||d.currentUser.username:"Admin",status:"DRAF",statusDisposisi:"DRAF",tanggalDisposisi:D>=0&&U[D]?U[D].tanggalDisposisi:new Date().toISOString(),notifiedForMe:!1},O=U.findIndex($=>Number($.id)===Number(aa));O!==-1?U[O]=C:U.push(C),await fa(U),ta(),Ja(),A("BERHASIL","Draf disposisi berhasil disimpan.","success")}async function qt(){let a=document.getElementById("dsp_nama_pelaku")?document.getElementById("dsp_nama_pelaku").value.trim():"",e=document.getElementById("dsp_no_lp")?document.getElementById("dsp_no_lp").value.trim():"",t=document.getElementById("dsp_no_sbp")?document.getElementById("dsp_no_sbp").value.trim():"",n=document.getElementById("dsp_no_sprin")?document.getElementById("dsp_no_sprin").value.trim():"",i=document.getElementById("dsp_target_penyidik")?document.getElementById("dsp_target_penyidik").value:"-";if(!t||!e||!n||!a||!i||i==="-"){A("BELUM LENGKAP","Nomor SBP, Nomor LP, Nomor SPRIN, Nama Pelaku, dan Penyidik Tujuan WAJIB diisi lengkap untuk mengirim disposisi!","warning");return}let s=document.getElementById("dsp_jenis_identitas"),l=s?s.value:"NIK",o=document.getElementById("dsp_nomor_identitas")||document.getElementById("dsp_no_identitas"),u=o?o.value.trim():"",g=document.getElementById("dsp_jenis_perkara_select"),c=g?g.value:"",m=(document.getElementById("dsp_jenis_perkara")?document.getElementById("dsp_jenis_perkara").value.trim():"")||(c!=="-"?c:""),k=document.getElementById("dsp_jenis_dok_select")?document.getElementById("dsp_jenis_dok_select").value:"Tanpa Dokumen",y=document.getElementById("dsp_jenis_dok_manual")?document.getElementById("dsp_jenis_dok_manual").value.trim():"",f=document.getElementById("dsp_nomor_dok")?document.getElementById("dsp_nomor_dok").value.trim():"",h=k==="Lainnya"||k==="LAINNYA"?y:k,T=h;h&&h!=="Tanpa Dokumen"&&f&&(T=`${h} Nomor ${f}`);let x=document.getElementById("dsp_komoditi_select")||document.getElementById("dsp_komoditi"),L=x?x.value:"-",I=document.getElementById("dsp_tgl_dokumen")?document.getElementById("dsp_tgl_dokumen").value:"",S=document.getElementById("dsp_jumlah_koli")?document.getElementById("dsp_jumlah_koli").value.trim():"",E=document.getElementById("dsp_jenis_koli_select")?document.getElementById("dsp_jenis_koli_select").value:"-",N=document.getElementById("dsp_auto_barang")?document.getElementById("dsp_auto_barang").value.trim():"",M=document.getElementById("dsp_uraian_barang")?document.getElementById("dsp_uraian_barang").value.trim():"",R=document.getElementById("dsp_tgl_lp")?document.getElementById("dsp_tgl_lp").value:"",b=document.getElementById("dsp_tgl_sbp")?document.getElementById("dsp_tgl_sbp").value:"",H=document.getElementById("dsp_tgl_sprin")?document.getElementById("dsp_tgl_sprin").value:"",B=document.getElementById("editingDisposisiIndex")||document.getElementById("editingDisposisiId"),D=B?parseInt(B.value):-1,U=await W();U=U.filter($=>$&&($.noLp||$.noSbp||$.pelaku));let aa=D>=0&&U[D]?U[D].id:Date.now(),C={id:aa,pelaku:a,jenisIdentitas:l,nomorIdentitas:u,jenisPerkara:m,komoditi:L,dokPemberitahuan:T,tglDokPemberitahuan:I,jumlahKoli:S,jenisKoli:E,autoBarang:N,uraianBarang:M,noLp:e,tglLp:R,noSbp:t,tglSbp:b,noSprin:n,tglSprin:H,targetPenyidik:i,pengusul:d&&d.currentUser?d.currentUser.namaLengkap||d.currentUser.nama||d.currentUser.username:"Admin",status:"DISPOSISI TERKIRIM",statusDisposisi:"DISPOSISI TERKIRIM",tanggalDisposisi:D>=0&&U[D]?U[D].tanggalDisposisi:new Date().toISOString(),notifiedForMe:!1},O=U.findIndex($=>Number($.id)===Number(aa));O!==-1?U[O]=C:U.push(C),await fa(U),ta(),Ja(),A("BERHASIL",`Berkas LP-${e} berhasil didisposisikan kepada ${i}.`,"success")}async function Wt(a){let e=await W(),t=e.findIndex(i=>String(i.id)===String(a));if(t===-1){A("GAGAL","Data disposisi tidak ditemukan.","danger");return}let n=e[t];ra("KONFIRMASI HAPUS",`Apakah Anda yakin ingin menghapus draf disposisi untuk LP-${n.noLp||"-"}?`,async()=>{e.splice(t,1),e=e.filter(s=>s&&(s.noLp||s.noSbp||s.pelaku)),await fa(e);let i=Math.ceil(e.length/ni)||1;zt>i&&(zt=i),ta(),A("TERHAPUS","Data draf disposisi berhasil dihapus.","danger")})}function Zt(a){Ka("terima",a.id||a.noLp)}async function Ka(a,e){let t=await W(),n=t.find(i=>String(i.id)===String(e)||String(i.noLp)===String(e));if(a==="terima"){if(!n){A("DATA TIDAK DITEMUKAN","Data disposisi tidak ditemukan.","danger");return}n.status="Disposisi Diterima",n.statusDisposisi="Disposisi Diterima",n.waktuRespon=new Date().toISOString(),await fa(t);let i=String(n.noLp||"").replace(/^LP-?/i,"").trim(),s=d.databasePerkara.findIndex(P=>{let m=String(P.NoLP_LP_1||"").replace(/^LP-?/i,"").trim(),k=P.disposisiId?String(P.disposisiId):"";return k&&k===String(n.id)||m&&m===i}),l="";if(n.tglSbp){let P=new Date(n.tglSbp);if(isNaN(P.getTime())&&String(n.tglSbp).includes("/")){let m=n.tglSbp.split("/");P=new Date(`${m[2]}-${m[1]}-${m[0]}`)}isNaN(P.getTime())||(l=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"][P.getDay()])}let o=n.uraianBarang||n.autoBarang||n.komoditi||"",u={disposisiId:n.id,NoLP_LP_1:n.noLp||"",Tanggal_LP_LP_1:n.tglLp||new Date().toISOString().split("T")[0],Nomor_SBP:n.noSbp||"",Tanggal_SBP:n.tglSbp||"",Hari_SBP:l||"-",No_SPRIN_Indak:n.noSprin||"",Tanggal_SPRIN_Indak:n.tglSprin||"",Nama_Pelaku:n.pelaku||"",Jenis_Identitas:n.jenisIdentitas||"KTP",Nomor_Identitas:n.nomorIdentitas||"",Jenis_Perkara:n.jenisPerkara||"",Komoditi:n.komoditi||"-",Dokumen_Pemberitahuan:n.dokPemberitahuan||"Tanpa Dokumen",Tanggal_Dokumen_Pemberitahuan:n.tglDokPemberitahuan||"",Jumlah_Koli:n.jumlahKoli||"",Jenis_Koli:n.jenisKoli||"",Nama_Barang:o,Uraian_Barang:o,Detail_Barang_LPP:o,disposisiPetugas:n.targetPenyidik||(d.currentUser?d.currentUser.namaLengkap||d.currentUser.nama:"Penyidik"),statusAlur:"DITERIMA PENYIDIK",kabid:localStorage.getItem("setting_defaultKabid")||"",nip_kabid:localStorage.getItem("setting_defaultNipKabid")||"",jabatan_kabid:"Kepala Bidang Penindakan dan Penyidikan",gol_kabid:"Pembina (IV/a)",nama_seksi:localStorage.getItem("setting_defaultKasi")||"",nip_seksi:localStorage.getItem("setting_defaultNipKasi")||"",jabatan_seksi:"Kepala Seksi Penyidikan",gol_seksi:"Penata (III/c)",ketua_tim:n.targetPenyidik||"",nip_ketua_tim:"",jabatan_ketua_tim:"Ketua Tim Peneliti",gol_ketua_tim:"Penata Muda Tk. I (III/b)",pembuat_lpp:"",nip_pembuat_lpp:"",jabatan_pembuat_lpp:"Petugas LPP",gol_pembuat_lpp:"Pengatur (II/c)",petugas_lpf:"",nip_petugas_lpf:"",jabatan_petugas_lpf:"Petugas LPF",gol_petugas_lpf:"Pengatur (II/c)",indak_1:"",nip_indak_1:"",jabatan_indak_1:"Petugas Penindakan 1",gol_indak_1:"Pengatur (II/c)",indak_2:"",nip_indak_2:"",jabatan_indak_2:"Petugas Penindakan 2",gol_indak_2:"Pengatur (II/c)",indak_lainnya:"",nip_indak_lainnya:"",jabatan_indak_lainnya:"Petugas Penindakan 3",gol_indak_lainnya:"Pengatur (II/c)"};s!==-1?(d.databasePerkara[s]={...d.databasePerkara[s],...u},d.activeRecordIndex=s):(u.id=Date.now(),d.databasePerkara.push(u),d.activeRecordIndex=d.databasePerkara.length-1),w(),typeof window.renderPerkaraTable=="function"&&window.renderPerkaraTable(),document.querySelectorAll(".nav-btn").forEach(P=>P.classList.remove("active")),document.querySelectorAll(".tab-pane").forEach(P=>P.classList.remove("active"));let g=document.querySelector('.nav-btn[data-target="data"]');g&&g.classList.add("active");let c=document.getElementById("data");c&&c.classList.add("active"),typeof window.editPerkara=="function"&&window.editPerkara(d.activeRecordIndex),A("DISPOSISI DITERIMA",`Berkas a.n ${n.pelaku} diterima. Data berhasil dipetakan otomatis ke form perkara.`,"success"),ta()}else if(a==="tolak"){let i=document.getElementById("alasanTolakModal"),s=document.getElementById("currentTolakDspData"),l=document.getElementById("inputAlasanTolak");s&&(s.value=String(e)),l&&(l.value=""),i&&i.classList.add("active"),l&&l.focus()}}function Xe(){let a=document.getElementById("alasanTolakModal");a&&a.classList.remove("active")}async function Xt(){let a=document.getElementById("currentTolakDspData")?document.getElementById("currentTolakDspData").value:"",e=document.getElementById("inputAlasanTolak")?document.getElementById("inputAlasanTolak").value.trim():"";if(!a){A("GAGAL","ID data tidak valid.","danger");return}let t=await W(),n=t.find(i=>String(i.id)===String(a)||String(i.noLp)===String(a));n?(n.status="Disposisi Ditolak: "+(e||"Tanpa alasan"),n.statusDisposisi="Disposisi Ditolak: "+(e||"Tanpa alasan"),n.waktuRespon=new Date().toISOString(),await fa(t),Xe(),ta(),A("DISPOSISI DITOLAK",`Berkas a.n ${n.pelaku} ditolak dan dikembalikan ke Admin/Kasi.`,"warning")):A("GAGAL","Data disposisi tidak ditemukan saat menyimpan alasan.","danger")}function za(){let a=document.getElementById("btnBuatDisposisiBaru")||document.querySelector(".btn-buat-disposisi");a&&(d.currentUser&&d.currentUser.role==="Penyidik / Ketua Tim Peneliti"?a.style.display="none":a.style.display="inline-flex")}async function Oa(){if(!d.currentUser||d.currentUser.role!=="Penyidik / Ketua Tim Peneliti"){let l=document.querySelector(".notification-wrapper");l&&(l.style.display="none");return}let a=await W(),e=(d.currentUser?.namaLengkap||d.currentUser?.nama||d.currentUser?.username||"").toLowerCase(),t=a.filter(l=>l.targetPenyidik&&e&&l.targetPenyidik.toLowerCase()===e),n=t.filter(l=>!l.isRead).length,i=document.getElementById("notifBadgeCount");i&&(n>0?(i.textContent=String(n),i.style.display="inline-block"):i.style.display="none");let s=t.filter(l=>!l.toastShown);s.length>0&&(A("DISPOSISI BERKAS BARU!",`Anda menerima ${s.length} berkas disposisi baru untuk ditindaklanjuti.`,"warning"),s.forEach(l=>l.toastShown=!0),await fa(a))}function Qt(){let a=document.getElementById("notificationDropdown");a&&(a.style.display==="none"||a.style.display===""?(a.style.display="block",Qe()):a.style.display="none")}async function Qe(){let a=document.getElementById("notificationListContent");if(!a||!d.currentUser)return;let e=await W(),t=(d.currentUser?.namaLengkap||d.currentUser?.nama||d.currentUser?.username||"").toLowerCase(),n=e.filter(i=>i.targetPenyidik&&t&&i.targetPenyidik.toLowerCase()===t);if(n.sort((i,s)=>new Date(s.tanggalDisposisi).getTime()-new Date(i.tanggalDisposisi).getTime()),n.length===0){a.innerHTML='<div style="padding: 16px; text-align: center; color: var(--text-muted, #94a3b8); font-size: 12px;">Belum ada riwayat disposisi.</div>';return}a.innerHTML=n.map(i=>{let s=i.tanggalDisposisi?new Date(i.tanggalDisposisi).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"",l=i.isRead?"":"background: rgba(59, 130, 246, 0.08);",o=e.findIndex(u=>u.id===i.id);return`
      <div style="padding: 10px 14px; border-bottom: 1px solid var(--border-color, #334155); ${l} cursor: pointer; transition: background 0.2s;" onclick='openDisposisiModal(${o})'>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
          <b style="font-size: 12px; color: var(--text-main, #f8fafc);">LP: ${r(i.noLp)}</b>
          <span style="font-size: 10px; color: var(--text-muted, #94a3b8);">${s}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-main, #cbd5e1); margin-bottom: 2px;">Pelaku: <b>${r(i.pelaku)}</b></div>
        <div style="font-size: 10px; color: var(--primary, #38bdf8);">Dari: ${r(i.pengusul)}</div>
      </div>
    `}).join("")}async function an(a){let e=await W(),t=e.find(s=>s.id===a.id);t&&(t.isRead=!0,await fa(e));let n=document.getElementById("notificationDropdown");n&&(n.style.display="none"),Oa();let i=e.findIndex(s=>s.id===a.id);_e(i>=0?i:-1)}async function en(){let a=await W(),e=(d.currentUser?.namaLengkap||d.currentUser?.nama||d.currentUser?.username||"").toLowerCase();a.forEach(t=>{t.targetPenyidik&&e&&t.targetPenyidik.toLowerCase()===e&&(t.isRead=!0)}),await fa(a),Oa(),Qe()}function ii(){ta(),za(),Oa()}window.openDisposisiModal=_e;window.openModalUsulDisposisi=()=>_e(-1);window.closeDisposisiModal=Ja;window.closeModalUsulDisposisi=Ja;window.simpanDraftDisposisi=Yt;window.kirimDisposisiBerkat=qt;window.hapusDisposisi=Wt;window.responDisposisi=Ka;window.terimaDisposisi=Zt;window.closeAlasanTolakModal=Xe;window.submitTolakDisposisi=Xt;window.checkDisposisiAccessByRole=za;window.cekNotifikasiDisposisiMasuk=Oa;window.toggleNotificationDropdown=Qt;window.klikRiwayatDisposisi=an;window.markAllDisposisiAsRead=en;window.syncDspJenisPerkara=Ot;window.toggleDspJenisDokumen=Gt;window.syncDspDokumenPemberitahuan=qe;window.handleDspJenisKoliChange=ke;window.handleDspJenisKoliSelectChange=Ft;window.generateDspUraianBarangOtomatis=We;window.updateDspCodePreviews=Ze;var na=1,et=5;function Ma(){let a=document.getElementById("perkaraTableBody");if(!a)return;let e=ga(),t=Math.ceil(e.length/et)||1;na>t&&(na=t),na<1&&(na=1);let n=(na-1)*et,i=e.slice(n,n+et);if(i.length===0){a.innerHTML='<tr><td colspan="8" style="text-align:center; padding:16px; color:var(--text-muted);">Belum ada data perkara tersimpan.</td></tr>',tn(t,e.length);return}let s=d.currentUser&&(d.currentUser.role==="Admin"||d.currentUser.role==="Kepala Seksi Penyidikan");a.innerHTML=i.map((l,o)=>{let u=n+o,g=e.indexOf(l),c=`<span class="badge-status badge-draft">${r(l.statusAlur||"DRAFT")}</span>`;l.statusAlur==="DIUSULKAN"&&(c='<span class="badge-status badge-proposed">DIUSULKAN</span>'),l.statusAlur&&l.statusAlur.includes("DIVALIDASI")&&(c='<span class="badge-status badge-ready">DIVALIDASI</span>');let m=l.No_LPP&&l.No_LPP!=="-"||l.No_LPF&&l.No_LPF!=="-"||l.Nomor_SPLIT&&l.Nomor_SPLIT!=="-"?`<span class="badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3); font-size:11px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; gap:4px;">
           <i class="fi fi-rr-check" style="font-size:10px;"></i> Ter-booking
         </span>`:'<span style="font-size:11px; color:var(--text-muted, #94a3b8);">-</span>',k=String(l.NoLP_LP_1||"-").replace(/^LP-?/i,""),y=String(l.Nomor_SBP||"-").replace(/^SBP-?/i,""),f=`
      <button type="button" class="btn warning" style="padding:4px 8px; font-size:10px;" onclick="editPerkara(${g})">
        <i class="fi fi-rr-edit"></i> Edit
      </button>
    `;return s&&(f+=`
        <button type="button" class="btn danger" style="padding:4px 8px; font-size:10px;" onclick="deletePerkara(${g})">
          <i class="fi fi-rr-trash"></i> Hapus
        </button>
      `),`
      <tr>
        <td><b>${u+1}</b></td>
        <td>
          <b>LP-${r(k)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${r(l.Tanggal_LP_LP_1||"-")}</small>
        </td>
        <td>
          <b>SBP-${r(y)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${r(l.Tanggal_SBP||"-")}</small>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:2px;">
            <span style="font-weight:600; font-size:12px; color:var(--text-main, #f8fafc);">${r(l.Nama_Pelaku||"-")}</span>
            <small style="color:var(--text-muted, #94a3b8); font-size:11px;">
              <i class="fi fi-rr-document" style="font-size:10px; margin-right:3px;"></i>${r(l.Jenis_Perkara||l.Dokumen_Pemberitahuan||"Kepabeanan & Cukai")}
            </small>
          </div>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
            <span class="badge" style="background:rgba(14, 165, 233, 0.15); color:#38bdf8; border:1px solid rgba(56, 189, 248, 0.3); font-size:11px; padding:2px 7px; border-radius:4px; white-space:normal; line-height:1.3; text-align:left;">
              ${r(l.Komoditi||"-")}
            </span>
            <small style="color:var(--text-muted, #94a3b8); font-size:11px; line-height:1.35; word-break:break-word;">
              <i class="fi fi-rr-box-alt" style="font-size:10px; margin-right:3px;"></i>${r(l.Uraian_Barang||l.Detail_Barang_LPP||"-")}
            </small>
          </div>
        </td>
        <td>
          ${c}<br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">
            PJ: ${r(l.disposisiPetugas||l.Petugas_Disposisi||"-")}
          </small>
        </td>
        <td>
          ${m}
        </td>
        <td style="text-align:right;">
          <div style="display:flex; gap:4px; justify-content:flex-end; flex-wrap:wrap;">
            ${f}
          </div>
        </td>
      </tr>
    `}).join(""),tn(t,e.length)}function tn(a,e=0){let t=document.getElementById("perkaraPaginationContainer");if(!t){let i=document.querySelector("#data .panel-body, #data .data-table-container, #data");if(i){let s=document.createElement("div");s.id="perkaraPaginationContainer",s.style.cssText="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding: 4px 8px; font-size: 12px;",i.appendChild(s),t=s}else return}let n=a>0?a:1;na>n&&(na=n),t.innerHTML=`
    <span style="color: var(--text-muted);">Halaman ${na} dari ${n} <b style="margin-left: 8px; color: var(--text-main);">Total: ${e} Data</b></span>
    <div style="display: flex; gap: 4px;">
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${na===1?"disabled":""} onclick="window.changePerkaraPage(-1)">Sebelumnya</button>
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${na>=n?"disabled":""} onclick="window.changePerkaraPage(1)">Selanjutnya</button>
    </div>
  `}function li(a){na+=a,Ma()}function ri(){let a=ga();if(!a||a.length===0){A("DATA KOSONG","Tidak ada data perkara untuk diekspor.","warning");return}let t=[["No","No LP","Tanggal LP","No SBP","Tanggal SBP","Nama Pelaku","Identitas","Komoditi","Uraian Barang","Kerugian Negara","Status Workflow","Disposisi Peneliti"].join(";")];a.forEach((o,u)=>{let g=[u+1,`"LP-${o.NoLP_LP_1||"-"}"`,`"${o.Tanggal_LP_LP_1||"-"}"`,`"${o.Nomor_SBP||"-"}"`,`"${o.Tanggal_SBP||"-"}"`,`"${(o.Nama_Pelaku||"-").replace(/"/g,'""')}"`,`"${(o.Nomor_Identitas||"-").replace(/"/g,'""')}"`,`"${(o.Komoditi||"-").replace(/"/g,'""')}"`,`"${(o.Uraian_Barang||"-").replace(/"/g,'""')}"`,`"${(o.Kerugian_Negara||"Rp 0").replace(/"/g,'""')}"`,`"${o.statusAlur||"DRAFT"}"`,`"${(o.disposisiPetugas||"-").replace(/"/g,'""')}"`];t.push(g.join(";"))});let n="\uFEFF"+t.join(`\r
`),i=new Blob([n],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(i),l=document.createElement("a");l.setAttribute("href",s),l.setAttribute("download",`Data_Perkara_AP3_${new Date().toISOString().slice(0,10)}.csv`),document.body.appendChild(l),l.click(),document.body.removeChild(l),A("EKSPOR BERHASIL","File Excel (.csv) berhasil diunduh.","success")}function si(){let a=ga();if(!a||a.length===0){A("DATA KOSONG","Tidak ada data perkara untuk dicetak ke PDF.","warning");return}let e=a.map((n,i)=>`
    <tr>
      <td style="text-align:center; padding:6px; border:1px solid #333;">${i+1}</td>
      <td style="padding:6px; border:1px solid #333; font-weight:bold;">LP-${r(n.NoLP_LP_1||"-")}</td>
      <td style="padding:6px; border:1px solid #333;">${r(n.Tanggal_LP_LP_1||"-")}</td>
      <td style="padding:6px; border:1px solid #333;">SBP-${r(n.Nomor_SBP||"-")}</td>
      <td style="padding:6px; border:1px solid #333;">${r(n.Nama_Pelaku||"-")}</td>
      <td style="padding:6px; border:1px solid #333;">${r(n.Komoditi||"-")}</td>
      <td style="padding:6px; border:1px solid #333;">${r(n.Kerugian_Negara||"-")}</td>
      <td style="padding:6px; border:1px solid #333;">${r(n.statusAlur||"DRAFT")}</td>
      <td style="padding:6px; border:1px solid #333;">${r(n.disposisiPetugas||"-")}</td>
    </tr>
  `).join(""),t=window.open("","_blank");t&&(t.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Laporan Data Perkara AP3</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 10pt; margin: 20px; color: #000; }
        h2 { text-align: center; margin-bottom: 4px; text-transform: uppercase; }
        p { text-align: center; font-size: 9pt; margin-top: 0; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 9pt; }
        th { background: #f0f0f0; border: 1px solid #333; padding: 6px; text-align: left; }
      </style>
    </head>
    <body>
      <h2>Daftar Data Perkara AP3</h2>
      <p>Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}</p>
      <table>
        <thead>
          <tr>
            <th style="width:30px; text-align:center;">No</th>
            <th>No. LP</th>
            <th>Tgl LP</th>
            <th>No. SBP</th>
            <th>Nama Pelaku</th>
            <th>Komoditi</th>
            <th>Kerugian Negara</th>
            <th>Status</th>
            <th>Disposisi</th>
          </tr>
        </thead>
        <tbody>
          ${e}
        </tbody>
      </table>
    </body>
    </html>
  `),t.document.close(),t.focus(),setTimeout(()=>{t.print()},300))}var Z=1,tt=5;async function ta(){let a=document.getElementById("disposisiTableBody");if(!a)return;let e=await W(),t=e,n=d.currentUser&&(d.currentUser.role==="Penyidik / Ketua Tim Peneliti"||d.currentUser.role==="Penyidik");if(n){let o=(d.currentUser?.namaLengkap||d.currentUser?.nama||d.currentUser?.username||"").toLowerCase();t=e.filter(u=>u.targetPenyidik&&o&&u.targetPenyidik.trim().toLowerCase()===o)}let i=Math.ceil(t.length/tt)||1;Z>i&&(Z=i),Z<1&&(Z=1);let s=(Z-1)*tt,l=t.slice(s,s+tt);if(l.length===0){a.innerHTML='<tr><td colspan="9" style="text-align:center; padding:20px; color:var(--text-muted, #94a3b8);">Belum ada data disposisi berkas.</td></tr>',nn(i,t.length);return}a.innerHTML=l.map((o,u)=>{let g=e.findIndex(L=>L.id===o.id),c=s+u,P="",m=String(o.status||o.statusDisposisi||"DRAF"),k=m.toUpperCase()==="DRAF"||m.toUpperCase().includes("BELUM DITUNJUK")||m.toLowerCase().includes("ditolak"),y="",f="badge-warning";m.includes("Ditolak")?(y="DITOLAK",f="badge-danger"):m.toLowerCase().includes("diterima")||m.toLowerCase().includes("ditindaklanjuti")?(y="DISPOSISI DITERIMA",f="badge-success"):m.toLowerCase().includes("terkirim")||m.toLowerCase().includes("didisposisikan")?n?(y="DISPOSISI MASUK",f="badge-warning"):(y="DISPOSISI TERKIRIM",f="badge-proposed"):(y="DRAF",f="badge-draft");let h=o.tanggalDisposisi?new Date(o.tanggalDisposisi).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}):"-";n?!m.toLowerCase().includes("diterima")&&!m.toLowerCase().includes("ditindaklanjuti")&&!m.toLowerCase().includes("ditolak")?P=`
          <div style="display:flex; gap:4px; justify-content:flex-end;">
            <button type="button" class="btn primary btn-terima-dsp" onclick="responDisposisi('terima', '${o.id}')" style="padding:4px 8px; font-size:10px;">
              <i class="fi fi-rr-check"></i> Terima
            </button>
            <button type="button" class="btn danger btn-tolak-dsp" onclick="responDisposisi('tolak', '${o.id}')" style="padding:4px 8px; font-size:10px;">
              <i class="fi fi-rr-cross"></i> Tolak
            </button>
          </div>
        `:P=`<button type="button" class="btn secondary" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${g})'><i class="fi fi-rr-eye"></i> Detail</button>`:k?P=`
          <div style="display:flex; gap:4px; justify-content:flex-end;">
            <button type="button" class="btn warning" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${g})'>
              <i class="fi fi-rr-edit"></i> Edit
            </button>
            <button type="button" class="btn danger" style="padding:4px 8px; font-size:10px;" onclick='hapusDisposisi("${o.id}")'>
              <i class="fi fi-rr-trash"></i> Hapus
            </button>
          </div>
        `:P=`
          <button type="button" class="btn secondary" style="padding:4px 8px; font-size:10px;" onclick='openDisposisiModal(${g})'>
            <i class="fi fi-rr-eye"></i> Detail
          </button>
        `;let T=String(o.noSbp||"").replace(/^SBP-?/i,""),x=String(o.noLp||"").replace(/^LP-?/i,"");return`
      <tr>
        <td><b>${c+1}</b></td>
        <td>
          <b>SBP-${r(T)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${r(o.tglSbp||"-")}</small>
        </td>
        <td>
          <b>LP-${r(x)}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${r(o.tglLp||"-")}</small>
        </td>
        <td>
          <span style="font-weight:600; font-size:12px; color:var(--text-main, #f8fafc);">${r(o.pelaku||"-")}</span>
        </td>
        <td>
          <span style="font-size:11px; color:var(--text-main, #cbd5e1); font-weight:500;">
            <i class="fi fi-rr-document" style="font-size:10px; margin-right:3px;"></i>${r(o.jenisPerkara||o.dokPemberitahuan||"Kepabeanan & Cukai")}
          </span>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">
            <span class="badge" style="background:rgba(14, 165, 233, 0.15); color:#38bdf8; border:1px solid rgba(56, 189, 248, 0.3); font-size:11px; padding:2px 7px; border-radius:4px; white-space:normal; line-height:1.3; text-align:left;">
              ${r(o.komoditi||"-")}
            </span>
            <small style="color:var(--text-muted, #94a3b8); font-size:11px; line-height:1.35; word-break:break-word;">
              <i class="fi fi-rr-box-alt" style="font-size:10px; margin-right:3px;"></i>${r(o.uraianBarang||"-")}
            </small>
          </div>
        </td>
        <td>
          <span class="badge-status ${f}">${r(y)}</span><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Tgl: ${h}</small>
        </td>
        <td>
          <b>${r(o.targetPenyidik||"-")}</b><br>
          <small style="color:var(--text-muted, #94a3b8); font-size:10px;">Oleh: ${r(o.pengusul||"-")}</small>
        </td>
        <td style="text-align:right;">${P}</td>
      </tr>
    `}).join(""),nn(i,t.length)}function nn(a,e=0){let t=document.getElementById("disposisiPaginationContainer")||document.getElementById("perkaraPageInfo")?.parentElement;if(!t){let i=document.querySelector("#disposisi .panel-body, #disposisi .data-table-container, #disposisi");if(i){let s=document.createElement("div");s.id="disposisiPaginationContainer",s.style.cssText="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding: 4px 8px; font-size: 12px;",i.appendChild(s),t=s}else return}let n=a>0?a:1;Z>n&&(Z=n),Z<1&&(Z=1),t.innerHTML=`
    <span style="color: var(--text-muted);">Halaman ${Z} dari ${n} <b style="margin-left: 8px; color: var(--text-main);">Total: ${e} Data</b></span>
    <div style="display: flex; gap: 4px;">
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${Z===1?"disabled":""} onclick="window.changeDisposisiPage(-1)">Sebelumnya</button>
      <button type="button" class="btn secondary" style="padding: 4px 10px; font-size: 11px;" ${Z>=n?"disabled":""} onclick="window.changeDisposisiPage(1)">Selanjutnya</button>
    </div>
  `}function oi(a){Z+=a,ta()}window.changeDisposisiPage=oi;window.renderDisposisiTable=ta;window.changePerkaraPage=li;window.exportDataToExcel=ri;window.exportDataToPDF=si;var yt={};ca(yt,{addCustomKantor:()=>Sn,addNewPerkaraModal:()=>Mn,autoGenerateAndAddMasterPasal:()=>pt,closeModal:()=>ct,confirmAndSubmitPerkara:()=>Pt,deletePerkara:()=>Un,editPerkara:()=>Dn,executePerkaraSubmission:()=>Ne,generateKesimpulanOtomatis:()=>dt,generateKronologisOtomatis:()=>Pn,generateUraianBarangOtomatis:()=>we,handleJenisDokPelengkapChange:()=>vn,handleJenisKoliSelectChange:()=>bn,initPerkaraDropdownsFromMaster:()=>Be,loadData:()=>bt,loadRecordToCurrentView:()=>Kn,populateAgeDropdown:()=>ot,renderCustomKomoditiOptions:()=>wn,renderKantorDropdown:()=>mt,renderPasalCheckboxes:()=>Bn,saveData:()=>ci,setPratinjauNomor:()=>Ia,submitPerkaraForm:()=>Rn,syncDokumenPelengkap:()=>ut,syncDokumenPemberitahuan:()=>gt,syncIdentitasValue:()=>hn,syncJenisPelanggaran:()=>Tn,syncJenisPenindakan:()=>An,syncJenisPerkara:()=>Ln,syncKantor:()=>Nn,syncKomoditi:()=>En,syncKondisiBarang:()=>de,syncModusOperandi:()=>In,syncPasalPelanggaran:()=>Ee,syncStatusPenangkapan:()=>xn,toggleAsalPerkaraManual:()=>yn,toggleJenisDokumen:()=>_n,togglePekerjaanManual:()=>fn,toggleUkuranKontainerManual:()=>kn,updateHariSBP:()=>ka});var st={};ca(st,{addItem:()=>sn,addSplitPegawai:()=>dn,addSprinPegawai:()=>gn,delItem:()=>on,delSplitPegawai:()=>pn,delSprinPegawai:()=>un,refreshReportTableUI:()=>La,refreshTLTableUI:()=>mn,renderDynamicInputs:()=>rt,renderItems:()=>Ae,renderSplitPegawaiList:()=>Le,renderSprinPegawaiList:()=>Ie,renderTLFormSection:()=>Ua,saveDynamicVal:()=>le,saveDynamicValTL:()=>re,showReportView:()=>Te,showTLReportView:()=>ma,switchDocTab:()=>se,switchTLDocTab:()=>oe,syncUraianKombinasiLHP:()=>rn,updateDocumentStatuses:()=>ln,updateReportLive:()=>Y,updateTLDocumentStatuses:()=>cn});function ua(a,e,t="",n=3){let i=fe(),s=0;i.forEach(c=>{let P=c[e];if(P&&String(P).toUpperCase().includes(a.toUpperCase())){let m=Ca(P);m!==null&&m>s&&(s=m)}});let l=`last_seq_${e}`,o=parseInt(localStorage.getItem(l)||"0",10);o>s&&(s=o);let u=s+1;localStorage.setItem(l,String(u));let g=String(u).padStart(n,"0");return`${a}${g}${t}`}function ve(a){let{jumlah:e,satuan:t,namaBarang:n,akhiranTipe:i="",kustomAkhiran:s="",pakaiTerbilang:l=!0}=a,o=String(e||"").trim(),u=(t||"").trim(),g=(n||"").replace(/[,.\s]+$/,"").trim();if(!o&&!u&&!g)return"";let c=o;if(o&&l){let k=z(o);c=`${o} (${k})`}let m=[c,u,g].filter(k=>k!==""&&k!=="-").join(" ");return m&&(m=m.charAt(0).toUpperCase()+m.slice(1)),g&&(i==="dll"?m+=", dll.":i==="etc"?m+=", etc.":i==="barang_lainnya"?m+=", dan barang lainnya":i==="manual"&&s.trim()&&(m+=`, ${s.trim().replace(/^,\s*/,"")}`)),m}function he(a){let{jumlahKemasan:e="1",jenisKemasan:t,nomorKontainer:n="",ukuranKontainer:i=""}=a,s=(t||"").toUpperCase();if(s.includes("FCL")||s.includes("PETI KEMAS")){let o=n.trim(),u=i.trim();return o&&u?`${o} / ${u}`:o?`${o}`:`${e} Peti Kemas (FCL)`}let l=String(e||"").trim();return l?`${l} ${t}`.trim():t||"-"}function di(a){let{hari:e,tanggalRaw:t,jamKejadian:n="",lokasi:i,pelaku:s,modusOperandi:l,kantor:o="Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam"}=a,u=v(t),g=(n||"").trim(),c="";g&&g!=="-"&&(c=`sekira pukul ${g.replace(":",".").replace(/wib/gi,"").trim()} WIB `);let P=ha(e||"-"),m=ha(i||"-"),k=ha(o),y=ha(s||"-"),f=la(l).replace(/[;:]+$/,"").trim();return f.toLowerCase().startsWith("yang ")&&(f=f.slice(5).trim()),f=f.replace(/\bTANPA\/SALAH\b/gi,"tanpa/salah").replace(/\bDAN\/ATAU\b/gi,"dan/atau"),`Pada hari ${P}, tanggal ${u} ${c}di ${m} telah dilakukan penindakan oleh Petugas ${k} terhadap ${y} yang ${f}.`}function pi(a,e){let t=(a||"").trim(),n=(e||"").trim(),i=la(n);return t&&t!=="-"||n&&n!=="-"?`Diduga melanggar ${t||"-"} karena ${i}.`:"-"}function xe(a,e,t){let n=(a||"").trim(),i=(e||"").trim(),s=t?j(t):"-";return!n||n.toLowerCase().includes("tanpa dokumen")||n==="-"?"Tanpa Dokumen Pemberitahuan Pabean":`Eks. ${n} nomor ${i||"-"} tanggal ${s}`}typeof window<"u"&&(window.generateNextBookingNumber=ua,window.generateUraianBarangTeks=ve,window.generateKemasanTeks=he,window.generateKronologisTeks=di,window.generateKesimpulanTeks=pi,window.generateTeksDokumenEksPabean=xe);var it={};ca(it,{BA:()=>Xa,LHP:()=>Qa,LPF:()=>qa,LPP:()=>Ya,SPLIT:()=>Wa,SPRIN_CACAH:()=>Za});function Ta(a){let e=["lpp","lpf","split"],t=(a||"").toLowerCase();return e.includes(t)?`
      <div class="office-left" style="font-family: Arial, Helvetica, sans-serif !important; font-weight: bold; font-size: 10pt; line-height: 1.3; margin-bottom: 14px;">
        KEMENTERIAN KEUANGAN REPUBLIK INDONESIA<br>
        DIREKTORAT JENDERAL BEA DAN CUKAI<br>
        KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
      </div>
    `:`
    <div class="surat-kop" style="width: 100% !important; box-sizing: border-box !important; margin: 0 0 14px 0 !important; padding: 0 !important; font-family: Arial, Helvetica, sans-serif !important;">
      <table style="width: 100% !important; border-collapse: collapse !important; border: none !important; table-layout: fixed !important; margin: 0 !important;">
        <colgroup>
          <col style="width: calc(2.3cm + 12px) !important;">
          <col style="width: calc(100% - (2.3cm + 12px)) !important;">
        </colgroup>
        <tr>
          <td style="width: calc(2.3cm + 12px) !important; vertical-align: top !important; text-align: right !important; padding: 0 3px 0 12px !important; border: none !important; box-sizing: border-box !important;">
            <img src="./assets/img/kemenkeu-logo.png" alt="Logo Kemenkeu" style="width: 2.3cm !important; height: 2.2cm !important; max-width: 2.3cm !important; max-height: 2.2cm !important; filter: grayscale(100%) contrast(150%) !important; mix-blend-mode: multiply !important; display: block !important; margin: 0 !important; margin-left: auto !important; margin-top: 1px !important;" />
          </td>

          <td style="vertical-align: top !important; text-align: center !important; padding: 0 0 0 6px !important; border: none !important;">
            <div style="font-size: 13pt !important; font-weight: bold !important; line-height: 1 !important; color: #000000 !important; text-transform: uppercase !important; margin: 1px 0 3px 0 !important;">
              KEMENTERIAN KEUANGAN REPUBLIK INDONESIA
            </div>

            <div style="font-size: 11pt !important; font-weight: bold !important; line-height: 1.15 !important; color: #000000 !important; text-transform: uppercase !important; margin: 0 0 1px 0 !important;">
              DIREKTORAT JENDERAL BEA DAN CUKAI
            </div>
            <div style="font-size: 11pt !important; font-weight: bold !important; line-height: 1.15 !important; color: #000000 !important; text-transform: uppercase !important; margin: 0 0 4px 0 !important;">
              KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
            </div>

            <div style="font-size: 7pt !important; line-height: 1.25 !important; color: #000000 !important; margin: 0 !important; text-transform: none !important; word-wrap: break-word !important; overflow-wrap: break-word !important; white-space: normal !important; text-align: center !important;">
              Jalan Kuda Laut, Batu Ampar, Batam, Kepulauan Riau 29432; TELEPON (0778) 458818, 458263; FAKSIMILE (0778)<br>
              458149; LAMAN www.bcbatam.beacukai.go.id; PUSAT KONTAK LAYANAN 1500225; SUREL bckpubatam@customs.go.id,<br>
              kpubc.batam@kemenkeu.go.id
            </div>
          </td>
        </tr>
      </table>

      <hr style="border: none !important; border-top: 1.5pt solid #000000 !important; margin: 4px 0 0 0 !important; padding: 0 !important; width: 100% !important;" />
    </div>
  `}function G(){return'<div class="tte-badge" style="font-size:8.5pt; color:#9ca3af !important; margin:3px 0 2px 0; font-style:normal; font-weight:normal; text-align:left; letter-spacing:0.01em;">Ditandatangani secara elektronik</div>'}function nt(a){return`<table class="rtable" style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif;">${a.map(e=>e.length===3?`<tr>
        <td style="width:4%; vertical-align:top;">${e[0]}</td>
        <td style="width:28%; vertical-align:top;">${e[1]}</td>
        <td style="width:3%; text-align:center; vertical-align:top;">${e[1]?":":""}</td>
        <td style="text-align:justify; vertical-align:top;">${e[2]||"-"}</td>
      </tr>`:`<tr>
        <td style="width:32%; vertical-align:top;">${e[0]}</td>
        <td style="width:3%; text-align:center; vertical-align:top;">:</td>
        <td style="text-align:justify; vertical-align:top;">${e[1]||"-"}</td>
      </tr>`).join("")}</table>`}function K(a,e){let t="-",n=d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]?d.databasePerkara[d.activeRecordIndex]:{};if(a==="GET_ELEMENT"){let l=document.getElementById(e||"");return l?l.value.trim():""}let i=(a||"").toUpperCase(),s=(...l)=>{for(let o of l)if(o&&o!=="-"&&String(o).trim()!=="")return String(o).trim();return""};if(i==="SPRIN_INDAK"){let l=s(e,p("No_SPRIN_Indak"),n.No_SPRIN_Indak),o=s(p("Tanggal_SPRIN_Indak"),n.Tanggal_SPRIN_Indak),u=o?j(o):"";if(l){let c=`SPRIN-${l.length<2?l.padStart(2,"0"):l}/KPU.206/2026`;t=u?`${c} tanggal ${u}`:c}}else if(i==="SBP"){let l=s(e,p("Nomor_SBP"),n.Nomor_SBP);if(l){let u=s(p("Status_Penangkapan"),n.Status_Penangkapan).toUpperCase().includes("LIMPAHAN")?"LIMPAH":"MANDIRI";t=`SBP-${l}/${u}/KPU.2/2026`}}else if(i==="LP"){let l=s(e,p("NoLP_LP_1"),p("No_LP"),n.NoLP_LP_1,n.No_LP);l&&(t=`LP-${l.replace(/^LP[-\s]*/i,"").trim()}/KPU.206/2026`)}else if(i==="LPP"){let l=s(e,p("No_LPP"),n.No_LPP);l&&(t=`LPP-${l.replace(/^LPP[-\s]*/i,"").trim()}/KPU.206/2026`)}else if(i==="LPF"){let l=s(e,p("No_LPF"),n.No_LPF);l&&(t=`LPF-${l.replace(/^LPF[-\s]*/i,"").trim()}/KPU.206/2026`)}else if(i==="SPLIT"){let l=s(e,p("Nomor_SPLIT"),n.Nomor_SPLIT);l&&(t=`SPLIT-${l.replace(/^(SPLIT|SPLI)[-\s]*/i,"").trim()}/KPU.206/2026`)}else if(i==="SPRIN_CACAH"||i==="PRIN_CACAH"){let l=s(e,p("No_SPRIN_CACAH"),n.No_SPRIN_CACAH);l&&(t=`PRIN-${l.replace(/^(PRIN)[-\s]*/i,"").trim()}/KPU.206/CACAH/2026`)}else if(i==="BA"||i==="BA_CACAH"){let l=s(e,p("Nomor_BA"),n.Nomor_BA);l&&(t=`BA-${l.replace(/^(BA)[-\s]*/i,"").trim()}/KPU.206/CACAH/2026`)}else if(i==="LHP"){let l=s(e,p("Nomor_LHP"),n.Nomor_LHP);l&&(t=`LHP-${l.replace(/^(LHP)[-\s]*/i,"").trim()}/KPU.206/2026`)}return t}function Aa(a,e,t=!1,n=""){let i=n;if(!i){let o=a.toUpperCase();o.includes("LPP")?i="LPP":o.includes("LPF")?i="LPF":o.includes("SPLIT")?i="SPLIT":o.includes("SURAT PERINTAH PENCACAHAN")?i="SPRIN_CACAH":o.includes("PENCACAHAN")&&!o.includes("BA CACAH")?i="BA_CACAH":o.includes("LHP")&&(i="LHP")}let s=["LPP","LPF","SPLIT"],l="";return s.includes((i||"").toUpperCase())?l=`<div class="office-left" style="font-family: Arial, Helvetica, sans-serif !important; font-weight: bold; font-size: 10pt; line-height: 1.3; margin-bottom: 15px;">
      KEMENTERIAN KEUANGAN REPUBLIK INDONESIA<br>
      DIREKTORAT JENDERAL BEA DAN CUKAI<br>
      KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM
    </div>`:l=Ta(i),`<div class="report" style="font-family: Arial, Helvetica, sans-serif !important; font-size: 10pt; color: #000 !important; line-height: 1.3;">
    ${l}
    <div class="title-center" style="font-family: Arial, Helvetica, sans-serif; text-align:center; font-weight:bold; font-size:11.5pt; margin:14px 0 4px 0;">${a}</div>
    <div class="nomor-center" style="font-family: Arial, Helvetica, sans-serif; text-align:center; margin-bottom:16px;">Nomor : ${e}</div>`}function F(a){if(d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex])return"-";let e=d.databasePerkara[d.activeRecordIndex],t=e.Nomor_LHP||e.NoLP_LP_1||"338";switch(a){case"BAST_PEMILIK":return`BAST-${e.TL_BAST_Num||t}/KPU.2064/2026`;case"BAST_LIMPAH":return`BAST-${e.TL_Limpah_Num||t}/LIMPAH/KPU.2064/2026`;case"BA_SEGEL":return`BA-${e.TL_Segel_Num||t}/BUKASEGEL/KPU.2064/2026`;case"SPSA":return`SPSA-${e.TL_SPSA_Num||t}/KPU.2/2026`;case"KEP_BDN":return`KEP-${e.TL_KEP_Num||t}/KPU.2/2026`;default:return"-"}}function gi(a){return`
    <div style="page-break-inside: avoid !important; margin-top:20px; font-family:'Bookman Old Style', Arial, serif; font-size:10pt;">
      <table style="width:100%; border-collapse:collapse; border:none !important;">
        <tr>
          <td style="border:none !important; width:55%;"></td>
          <td style="border:none !important; width:45%; vertical-align:top; text-align:left;">
            <div>${a.tanggal?`${a.kota||"Batam"}, ${a.tanggal}`:"&nbsp;"}</div>
            <div style="margin-top:2px; font-weight:bold;">${a.jabatan}</div>
            <div class="signature" style="height:45px;"></div>
            ${G()}
            <div style="font-weight:bold; text-decoration:underline;">${a.nama}</div>
            ${a.pangkatGol?`<div>${a.pangkatGol}</div>`:""}
            <div>NIP ${a.nip}</div>
          </td>
        </tr>
      </table>
    </div>
  `}function Da(a,e){return`
    <div style="page-break-inside: avoid !important; margin-top:16px; font-family:Arial, sans-serif; font-size:10pt;">
      <div style="text-align:right; margin-bottom:8px;">Batam, ${e||"28 September 2026"}</div>
      ${a}
    </div>
  </div>`}var Ga=a=>String.fromCharCode(97+a)+".";function Fa(a,e){return`
    <tr>
      <td colspan="4" style="border:none !important; font-weight:bold; padding:6px 0 2px 0; font-size:11pt;">${a}</td>
    </tr>
    ${e}
  `}function Va(){return`
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">b.</td>
      <td style="border:none !important; padding:1px 24px 1px 4px; vertical-align:top; font-size:11pt; color:#555;">\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026\u2026</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">-</td>
    </tr>
  `}typeof window<"u"&&(window.getDocNum=K,window.getTLNumFormat=F,window.renderTtdPejabat=gi,window.closeTLReportTag=Da,window.generateKopSurat=Ta,window.tteBadge=G,window.buildTableKv=nt);function Ya(){let a=v("Tanggal_LPP")!=="-"?v("Tanggal_LPP"):v("Tanggal_LP_LP_1"),e=document.getElementById("Jam_Kejadian")?.value?.trim()||"",t=e?e.replace(":",".")+" WIB":"-",n=p("Umur_Pelaku"),i=n!=="-"&&n!==""?n+" tahun":"-",s=v("Tanggal_Dokumen_Pemberitahuan"),l=p("Dokumen_Pemberitahuan"),o="Tanpa Dokumen";if(!l.toLowerCase().includes("tanpa dokumen")&&l&&l!=="-"){let u=document.getElementById("Jenis_Dok_Pemberitahuan_Select")?.value||"",g=u==="LAINNYA"?document.getElementById("Jenis_Dok_Pemberitahuan_Manual")?.value?.trim()||"":u!=="-"?u:"",c=document.getElementById("Nomor_Dok_Pemberitahuan")?.value?.trim()||"",P=(g?g+" ":"")+(c||l);P=P.trim().replace(/^nomor\s+/i,"").replace(/^no\.?\s+/i,"");let m=P.match(/^(BC\s*\d+(?:\.\d+)?|[A-Z]{2,10})\s*(?:nomor\s+|no\.?\s+)?(.*)$/i),k="";if(m&&m[2].trim()){let y=m[1].trim(),f=m[2].trim();k=`${r(y)} nomor ${r(f)}`}else P.toLowerCase().includes("nomor")?k=r(P):k=`nomor ${r(P)}`;s&&s!=="-"&&(k+=` tanggal ${s}`),o=k}return Aa("LEMBAR PENERIMAAN PERKARA (LPP)",K("lpp"),!1)+`
  <!-- HEADER ATAS -->
  <table class="rtable" style="width:100%; border-collapse:collapse; margin-bottom:12px; font-family:Arial, sans-serif; font-size:10pt; line-height:1.35; table-layout:fixed;">
    <colgroup>
      <col style="width:115px;">
      <col style="width:15px;">
      <col style="width:auto;">
      <col style="width:60px;">
      <col style="width:15px;">
      <col style="width:150px;">
    </colgroup>
    <tr>
      <td style="vertical-align:top;">LP/ Surat Nomor</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top;">${K("lpp")}</td>
      <td style="vertical-align:top;">Tanggal</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top; white-space:nowrap;">${a}</td>
    </tr>
    <tr>
      <td style="vertical-align:top;">SBP Nomor</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top;">${K("sbp")}</td>
      <td style="vertical-align:top;">Tanggal</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top; white-space:nowrap;">${v("Tanggal_SBP")}</td>
    </tr>
  </table>

  <!-- TABEL UTAMA BADAN LPP -->
  <table class="rtable" style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif; font-size:10pt; line-height:1.35; table-layout:fixed;">
    <colgroup>
      <col style="width:24px;">
      <col style="width:20px;">
      <col style="width:145px;">
      <col style="width:15px;">
      <col style="width:auto;">
    </colgroup>
    
    <tr>
      <td style="width:24px; vertical-align:top; padding-top:4px;"><b>A.</b></td>
      <td style="width:165px; vertical-align:top; padding-top:4px;" colspan="2"><b>Asal Perkara</b></td>
      <td style="width:15px; text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="vertical-align:top; padding-top:4px; text-align:justify;">${r(p("Asal_Perkara"))}</td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>B.</b></td>
      <td style="vertical-align:top; padding-top:4px;" colspan="2"><b>Jenis Penindakan</b></td>
      <td style="text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="vertical-align:top; padding-top:4px; text-align:justify;">${r(p("Jenis_Penindakan"))}</td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>C.</b></td>
      <td style="vertical-align:top; padding-top:4px;" colspan="2"><b>Jenis Perkara</b></td>
      <td style="text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="vertical-align:top; padding-top:4px; text-align:justify;">${r(p("Jenis_Perkara"))}</td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>D.</b></td>
      <td style="vertical-align:top; padding-top:4px;" colspan="2"><b>Status Penangkapan</b></td>
      <td style="text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="vertical-align:top; padding-top:4px; text-align:justify;">${r(p("Status_Penangkapan"))}</td>
    </tr>

    <tr>
      <td style="vertical-align:top; padding-top:6px;"><b>E.</b></td>
      <td colspan="4" style="vertical-align:top; padding-top:6px;"><b>Uraian Pelanggaran</b></td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">1.</td>
      <td style="vertical-align:top;">Jenis Pelanggaran/Pasal</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jenis_Pelanggaran"))} / ${r(p("Pasal_Pelanggaran"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">2.</td>
      <td style="vertical-align:top;">Modus Operandi</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Modus_Operandi"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">3.</td>
      <td colspan="3" style="vertical-align:top;">Lokasi</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">a. Tempat</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Lokasi_Penindakan"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">b. Tanggal dan waktu</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${v("Tanggal_SBP")} / ${t}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">4.</td>
      <td colspan="3" style="vertical-align:top;">Pelaku Pelanggaran</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">a. Nama</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Nama_Pelaku"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">b. Umur</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${i}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">c. Jenis Kelamin</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jenis_Kelamin_Pelaku"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">d. Alamat</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Alamat_Pelaku"))}</td>
    </tr>

    <tr>
      <td style="vertical-align:top; padding-top:6px;"><b>F.</b></td>
      <td colspan="4" style="vertical-align:top; padding-top:6px;"><b>Barang Hasil Penindakan</b></td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">1.</td>
      <td style="vertical-align:top;">Komoditi</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Komoditi"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">2.</td>
      <td style="vertical-align:top;">Jumlah Koli / Jenis Koli</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${p("Jumlah_Koli")} / ${r(p("Jenis_Koli"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">3.</td>
      <td style="vertical-align:top;">Pengangkut / Nopol-voy-flight</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Pengangkut"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">4.</td>
      <td style="vertical-align:top;">No Container / Ukuran</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("No_Kontainer"))} / ${r(p("Ukuran_Kontainer"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">5.</td>
      <td style="vertical-align:top;">Detail Uraian Barang</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Detail_Barang_LPP")!=="-"?p("Detail_Barang_LPP"):p("Uraian_Barang"))}</td>
    </tr>

    <tr>
      <td style="vertical-align:top; padding-top:6px;"><b>G.</b></td>
      <td style="vertical-align:top; padding-top:6px;" colspan="2"><b>Dokumen Barang</b></td>
      <td style="text-align:center; vertical-align:top; padding-top:6px;">:</td>
      <td style="text-align:justify; vertical-align:top; padding-top:6px;">${o}</td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>H.</b></td>
      <td style="vertical-align:top; padding-top:4px;" colspan="2"><b>Catatan Atasan Pembuat LPP</b></td>
      <td style="text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="text-align:justify; vertical-align:top; padding-top:4px;">${r(p("Catatan_LPP")||"-")}</td>
    </tr>
  </table>

  <!-- BLOK TANDA TANGAN LPP -->
  <div style="page-break-inside: avoid !important; margin-top:20px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="display:flex; justify-content:flex-end;">
      <div style="width:40%; text-align:left;">Batam, ${a}</div>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:8px;">
      <div style="width:42%; text-align:left;">
        ${r(p("form_jabatan_seksi")!=="-"?p("form_jabatan_seksi"):"Kepala Seksi Penyidikan")},
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_nama_seksi"))}</b><br>NIP. ${r(p("form_nip_seksi"))}
      </div>
      <div style="width:40%; text-align:left;">
        Yang membuat LPP,<br>Pelaksana
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_pembuat_lpp"))}</b><br>NIP. ${r(p("form_nip_pembuat_lpp"))}
      </div>
    </div>
    <div style="display:flex; justify-content:center; margin-top:16px;">
      <div style="width:45%; text-align:left;">
        Mengetahui,<br>Kepala Bidang Penindakan dan Penyidikan
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_kabid"))}</b><br>NIP. ${r(p("form_nip_kabid"))}
      </div>
    </div>
  </div></div>`}function qa(){let a=v("Tanggal_LPF")!=="-"?v("Tanggal_LPF"):v("Tanggal_LP_LP_1"),e=document.getElementById("Jam_Kejadian")?.value?.trim()||"",t=e?e.replace(":","."):"-",n=p("Umur_Pelaku"),i=n!=="-"&&n!==""?n+" tahun":"-",s=v("Tanggal_Dokumen_Pemberitahuan"),l=p("Dokumen_Pemberitahuan"),o=document.getElementById("Jenis_Dok_Pemberitahuan_Select")?.value||"",u=document.getElementById("Jenis_Dok_Pemberitahuan_Manual")?.value?.trim()||"",g=document.getElementById("Nomor_Dok_Pemberitahuan")?.value?.trim()||"",c="-",P="-";if(l.toLowerCase().includes("tanpa dokumen")||o==="Tanpa Dokumen"||!l||l==="-")c="Tanpa Dokumen",P="-";else if(c=o==="LAINNYA"?u||"Lainnya":o!=="-"?o:"BC 2.0",g)P=r(g);else{let m=l.replace(/^(BC\s*\d+(?:\.\d+)?|[A-Z]{2,10})/i,"").replace(/^nomor\s+/i,"").replace(/^no\.?\s+/i,"").trim();P=r(m||"-")}return Aa("LEMBAR PENELITIAN FORMAL (LPF)",K("lpf"),!1)+`
  <table class="rtable" style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif; font-size:10pt; line-height:1.35; table-layout:fixed;">
    <colgroup>
      <col style="width:24px;">
      <col style="width:20px;">
      <col style="width:145px;">
      <col style="width:15px;">
      <col style="width:auto;">
    </colgroup>
    
    <tr>
      <td style="vertical-align:top;"><b>A.</b></td>
      <td colspan="4" style="vertical-align:top;"><b>Uraian Pelanggaran</b></td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">1.</td>
      <td style="vertical-align:top;">Jenis Pelanggaran / Pasal</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jenis_Pelanggaran"))} / ${r(p("Pasal_Pelanggaran"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">2.</td>
      <td style="vertical-align:top;">Tempat (Locus)</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Lokasi_Penindakan"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">3.</td>
      <td style="vertical-align:top;">Waktu (Tempus)</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${v("Tanggal_SBP")} / ${t} WIB</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">4.</td>
      <td colspan="3" style="vertical-align:top;">Pelaku</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Nama</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Nama_Pelaku"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Jenis Kelamin</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jenis_Kelamin_Pelaku"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Umur</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${i}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Alamat</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Alamat_Pelaku"))}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">5.</td>
      <td style="vertical-align:top;">Status Penangkapan</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Status_Penangkapan"))}</td>
    </tr>

    <tr>
      <td style="vertical-align:top; padding-top:6px;"><b>B.</b></td>
      <td colspan="4" style="vertical-align:top; padding-top:6px;"><b>Kelengkapan Dokumen Penindakan</b></td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">1.</td>
      <td style="vertical-align:top;">No. Surat Perintah/Tugas</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${K("sprin_indak")}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">2.</td>
      <td style="vertical-align:top;">No. SBP</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${K("sbp")} tanggal ${v("Tanggal_SBP")}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">3.</td>
      <td style="vertical-align:top;">No. LP/LK/Lap. Polisi</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${K("lpp")} tanggal ${v("Tanggal_LP_LP_1")}</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">4.</td>
      <td style="vertical-align:top;">BAP Saksi atas nama</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">5.</td>
      <td style="vertical-align:top;">BAP Tersangka atas nama</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">6.</td>
      <td style="vertical-align:top;">Resume Perkara</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">7.</td>
      <td style="vertical-align:top;">Dokumen Lain</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">LPTP<br>LPHP</td>
    </tr>

    <tr>
      <td style="vertical-align:top; padding-top:6px;"><b>C.</b></td>
      <td colspan="4" style="vertical-align:top; padding-top:6px;"><b>Barang Hasil Penindakan</b></td>
    </tr>
    <tr>
      <td></td>
      <td style="vertical-align:top;">1.</td>
      <td style="vertical-align:top;">Komoditi</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Komoditi"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Uraian Barang</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Uraian_Barang"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Merek</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Merek"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Kondisi</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Kondisi"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Tipe</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Tipe"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Spesifikasi Lain</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Spesifikasi_Lain"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Jumlah Koli</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jumlah_Koli"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Jenis Koli</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jenis_Koli"))}</td>
    </tr>
    
    <tr>
      <td></td>
      <td style="vertical-align:top;">2.</td>
      <td style="vertical-align:top;">Dokumen Pab/Cukai Asal</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(c)}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Kantor Pendaftaran</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Kantor"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Nomor</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${P}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Tanggal</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${s}</td>
    </tr>

    <tr>
      <td></td>
      <td style="vertical-align:top;">3.</td>
      <td style="vertical-align:top;">Pengangkut</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Pengangkut"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">No. Voyage/ No. Polisi</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Kontainer No</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("No_Kontainer"))}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td style="vertical-align:top;">Ukuran</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Ukuran_Kontainer"))}</td>
    </tr>

    <tr>
      <td style="width:25px; vertical-align:top; padding-top:6px;"><b>D.</b></td>
      <td style="width:20px;"></td>
      <td style="width:145px; vertical-align:top; padding-top:6px;"><b>Kesimpulan</b></td>
      <td style="width:15px; text-align:center; vertical-align:top; padding-top:6px;">:</td>
      <td style="vertical-align:top; padding-top:6px; text-align:justify;">${r(p("Jenis_Pelanggaran_Pasal"))}</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top; padding-top:4px;"><b>E.</b></td>
      <td style="width:20px;"></td>
      <td style="width:145px; vertical-align:top; padding-top:4px;"><b>Usulan</b></td>
      <td style="width:15px; text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="vertical-align:top; padding-top:4px; text-align:justify;">Perlu dilakukan penelitian atas dugaan pelanggaran administrasi</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top; padding-top:4px;"><b>F.</b></td>
      <td style="width:20px;"></td>
      <td style="width:145px; vertical-align:top; padding-top:4px;"><b>Catatan/Disposisi Atasan</b></td>
      <td style="width:15px; text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="vertical-align:top; padding-top:4px; text-align:justify;">${r(p("Catatan_LPF")||"-")}</td>
    </tr>
  </table>

  <!-- BLOK TANDA TANGAN LPF -->
  <div style="page-break-inside: avoid !important; margin-top:20px; font-family:Arial, sans-serif;">
    <div style="display:flex; justify-content:flex-end;">
      <div style="width:40%; text-align:left;">Batam, ${a}</div>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:8px;">
      <div style="width:42%; text-align:left;">
        ${r(p("form_jabatan_seksi")!=="-"?p("form_jabatan_seksi"):"Kepala Seksi Penyidikan")},
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_nama_seksi"))}</b><br>NIP. ${r(p("form_nip_seksi"))}
      </div>
      <div style="width:40%; text-align:left;">
        Tim Peneliti,
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_petugas_lpf"))}</b><br>NIP. ${r(p("form_nip_petugas_lpf"))}
      </div>
    </div>
    <div style="display:flex; justify-content:center; margin-top:16px;">
      <div style="width:45%; text-align:left;">
        Mengetahui,<br>Kepala Bidang Penindakan dan Penyidikan
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_kabid"))}</b><br>NIP. ${r(p("form_nip_kabid"))}
      </div>
    </div>
  </div></div>`}function Wa(){let a=v("Tanggal_SPLIT")!=="-"?v("Tanggal_SPLIT"):v("Tanggal_LP_LP_1"),e=p("Hari_SBP"),t=v("Tanggal_SBP"),n=document.getElementById("Jam_Kejadian")?.value?.trim()||"",i=n?n.replace(":",".")+" WIB":"-",s=p("Lokasi_Penindakan"),l=p("Modus_Operandi"),o=la(l),u=`Pada hari ${e}, tanggal ${t} sekitar pukul ${i} di ${s} yang dilakukan penindakan oleh Petugas Bea Cukai Batam yang ${o}`,c=[{nama:p("form_ketua_tim"),nip:p("form_nip_ketua_tim"),pkt:p("form_gol_ketua_tim"),jab:p("form_jabatan_ketua_tim")||"Ketua Tim Peneliti"},{nama:p("form_pembuat_lpp"),nip:p("form_nip_pembuat_lpp"),pkt:p("form_gol_pembuat_lpp"),jab:p("form_jabatan_pembuat_lpp")||"Anggota Tim Peneliti"},{nama:p("form_petugas_lpf"),nip:p("form_nip_petugas_lpf"),pkt:p("form_gol_petugas_lpf"),jab:p("form_jabatan_petugas_lpf")||"Anggota Tim Peneliti"},{nama:p("form_indak_1"),nip:p("form_nip_indak_1"),pkt:p("form_gol_indak_1"),jab:p("form_jabatan_indak_1")||"Anggota Tim Peneliti"}].map((P,m)=>`
    <table style="width:100%; border:none; margin-bottom:3px; border-collapse:collapse; font-size:10pt;">
      <tr><td style="width:25px; vertical-align:top;">${m+1}.</td><td style="width:110px; vertical-align:top;">Nama</td><td style="width:15px; text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;"><b>${r(P.nama)}</b></td></tr>
      <tr><td></td><td style="vertical-align:top;">NIP</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(P.nip)}</td></tr>
      <tr><td></td><td style="vertical-align:top;">Pangkat / Gol.</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(P.pkt)}</td></tr>
      <tr><td></td><td style="vertical-align:top;">Jabatan</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(P.jab)}</td></tr>
    </table>
  `).join("");return Aa("SURAT PERINTAH PENELITIAN (SPLIT)",K("split"),!1)+`
  <table class="rtable" style="width:100%; border-collapse:collapse; font-size:10pt; line-height:1.3;">
    <tr>
      <td style="width:110px; vertical-align:top;"><b>Dasar</b></td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top; padding:0;">
        <table style="width:100%; border-collapse:collapse; font-size:10pt;">
          <tr><td style="width:20px; vertical-align:top;">1.</td><td style="text-align:justify; vertical-align:top;">Undang-undang nomor 10 tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-undang nomor 17 tahun 2006 dan/atau Undang-undang nomor 11 tahun 1995 tentang Cukai sebagaimana telah diubah dengan Undang-undang nomor 39 tahun 2007;</td></tr>
          <tr><td style="vertical-align:top;">2.</td><td style="text-align:justify; vertical-align:top;">Peraturan Pemerintah nomor 41 tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas;</td></tr>
          <tr><td style="vertical-align:top;">3.</td><td style="text-align:justify; vertical-align:top;">Peraturan Menteri Keuangan nomor 183/PMK.01/2020 tentang perubahan atas Peraturan Menteri Keuangan nomor 188/PMK.01/2016 tentang Organisasi dan Tata Kerja Instansi Vertikal Direktorat Jenderal Bea dan Cukai;</td></tr>
          <tr><td style="vertical-align:top;">4.</td><td style="text-align:justify; vertical-align:top;">Laporan Pelanggaran Nomor ${K("lpp")} tanggal ${v("Tanggal_LP_LP_1")}.</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>Pertimbangan</b></td>
      <td style="text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="text-align:justify; vertical-align:top; padding-top:4px;">
        <table style="width:100%; border-collapse:collapse; font-size:10pt;">
          <tr><td style="width:20px; vertical-align:top;">a.</td><td style="text-align:justify; vertical-align:top;">Bahwa dengan adanya Laporan Pelanggaran Kepabeanan, maka dipandang perlu untuk mengumpulkan bahan keterangan dan menemukan bukti permulaan yang cukup akan adanya tindak pelanggaran di bidang kepabeanan dan/atau cukai;</td></tr>
          <tr><td style="vertical-align:top;">b.</td><td style="text-align:justify; vertical-align:top;">Bahwa untuk maksud tersebut perlu dikeluarkan Surat Perintah Penelitian.</td></tr>
        </table>
      </td>
    </tr>
  </table>
  
  <div style="text-align:center; margin:10px 0 6px; letter-spacing:0.1em; font-weight:bold; font-size:11pt;">D I P E R I N T A H K A N</div>
  
  <table class="rtable" style="width:100%; border-collapse:collapse; font-size:10pt; line-height:1.3;">
    <tr>
      <td style="width:110px; vertical-align:top;"><b>Kepada</b></td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top; padding:0;">
        ${c}
      </td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>Untuk</b></td>
      <td style="width:15px; text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="text-align:justify; vertical-align:top; padding-top:4px;">
        <table style="width:100%; border-collapse:collapse; font-size:10pt;">
          <tr><td style="width:20px; vertical-align:top;">1.</td><td style="text-align:justify; vertical-align:top;">Melakukan tugas penelitian berupa mencari, mengumpulkan bahan keterangan, dan menemukan bukti permulaan yang cukup atas perkara ${u} yang diduga dilakukan oleh:</td></tr>
          <tr><td></td><td style="padding:2px 0;">
            <table style="width:100%; border:none; border-collapse:collapse; font-size:10pt;">
              <tr><td style="width:110px; vertical-align:top;">Nama</td><td style="width:15px; text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;"><b>${r(p("Nama_Pelaku"))}</b></td></tr>
              <tr><td style="vertical-align:top;">Pekerjaan</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(p("Pekerjaan"))}</td></tr>
              <tr><td style="vertical-align:top;">Tempat/Tgl Lahir</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(p("TTL"))}</td></tr>
              <tr><td style="vertical-align:top;">Alamat</td><td style="text-align:center; vertical-align:top;">:</td><td style="text-align:justify; vertical-align:top;">${r(p("Alamat_Pelaku"))}</td></tr>
            </table>
          </td></tr>
          <tr><td style="vertical-align:top;">2.</td><td style="text-align:justify; vertical-align:top;">Setelah melaksanakan Surat Perintah ini agar melaporkan kepada yang memberi perintah.</td></tr>
        </table>
      </td>
    </tr>
  </table>
  <p style="margin-top:8px; margin-bottom:0; text-align:justify; font-size:10pt;">Demikian surat perintah ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.</p>
  
  <div style="page-break-inside: avoid !important; display:flex; justify-content:flex-end; margin-top:14px;">
    <div style="width:45%; text-align:left; font-size:10pt;">
      Dikeluarkan di : Batam<br>
      Pada tanggal : ${a}<br><br>
      <div style="text-align:left;">
        Kepala Bidang Penindakan dan Penyidikan
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_kabid"))}</b><br>NIP. ${r(p("form_nip_kabid"))}
      </div>
    </div>
  </div></div>`}function Za(){let a=v("Tanggal_Sprin_Cacah")!=="-"?v("Tanggal_Sprin_Cacah"):v("Tanggal_SBP"),e=JSON.parse(localStorage.getItem("sprinPegawaiList")||"[]");e.length===0&&(e=[{nama:p("form_ketua_tim"),nip:p("form_nip_ketua_tim"),pangkat:p("form_gol_ketua_tim"),jabatan:p("form_jabatan_ketua_tim")||"Ketua Tim Peneliti"},{nama:p("form_pembuat_lpp"),nip:p("form_nip_pembuat_lpp"),pangkat:p("form_gol_pembuat_lpp"),jabatan:p("form_jabatan_pembuat_lpp")||"Petugas LPP"},{nama:p("form_petugas_lpf"),nip:p("form_nip_petugas_lpf"),pangkat:p("form_gol_petugas_lpf"),jabatan:p("form_jabatan_petugas_lpf")||"Petugas LPF"},{nama:p("form_indak_1"),nip:p("form_nip_indak_1"),pangkat:p("form_gol_indak_1"),jabatan:p("form_jabatan_indak_1")||"Petugas Penindakan 1"}]);let t=e.map((n,i)=>`
    <table style="width:100%; border:none; margin-bottom:3px; border-collapse:collapse; font-size:10pt;">
      <tr><td style="width:25px; vertical-align:top;">${i+1}.</td><td style="width:110px; vertical-align:top;">Nama</td><td style="width:15px; text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;"><b>${r(n.nama)}</b></td></tr>
      <tr><td></td><td style="vertical-align:top;">NIP</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(n.nip)}</td></tr>
      <tr><td></td><td style="vertical-align:top;">Pangkat / Gol.</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(n.pangkat||n.pkt||"-")}</td></tr>
      <tr><td></td><td style="vertical-align:top;">Jabatan</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${r(n.jabatan||n.jab||"-")}</td></tr>
    </table>
  `).join("");return Aa("SURAT PERINTAH PENCACAHAN BARANG HASIL PENINDAKAN",K("sprin_cacah"),!1)+`
  <table class="rtable" style="width:100%; border-collapse:collapse; font-size:10pt; line-height:1.3;">
    <tr>
      <td style="width:110px; vertical-align:top;"><b>Dasar</b></td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top; padding:0;">
        <table style="width:100%; border-collapse:collapse; font-size:10pt;">
          <tr><td style="width:20px; vertical-align:top;">1.</td><td style="text-align:justify; vertical-align:top;">Undang-undang nomor 10 tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-undang nomor 17 tahun 2006 dan/atau Undang-undang nomor 11 tahun 1995 tentang Cukai sebagaimana telah diubah dengan Undang-undang nomor 39 tahun 2007;</td></tr>
          <tr><td style="vertical-align:top;">2.</td><td style="text-align:justify; vertical-align:top;">Peraturan Pemerintah nomor 41 Tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas;</td></tr>
          <tr><td style="vertical-align:top;">3.</td><td style="text-align:justify; vertical-align:top;">Pasal 95 ayat 1 Peraturan Direktur Jenderal Bea dan Cukai Nomor P-8/BC/2025 tentang Tata Laksana Pengawasan di Bidang Kepabeanan dan Cukai;</td></tr>
          <tr><td style="vertical-align:top;">4.</td><td style="text-align:justify; vertical-align:top;">Laporan Pelanggaran nomor ${K("lpp")} tanggal ${v("Tanggal_LP_LP_1")}.</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>Pertimbangan</b></td>
      <td style="text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="text-align:justify; vertical-align:top; padding-top:4px;">Dalam rangka penelitian dan penyelidikan, perlu untuk melakukan tindakan pencacahan barang hasil penindakan.</td>
    </tr>
  </table>

  <div style="text-align:center; margin:10px 0 6px; letter-spacing:0.1em; font-weight:bold; font-size:11pt;">D I P E R I N T A H K A N</div>

  <table class="rtable" style="width:100%; border-collapse:collapse; font-size:10pt; line-height:1.3;">
    <tr>
      <td style="width:110px; vertical-align:top;"><b>Kepada</b></td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top; padding:0;">
        ${t}
      </td>
    </tr>
    <tr>
      <td style="vertical-align:top; padding-top:4px;"><b>Untuk</b></td>
      <td style="width:15px; text-align:center; vertical-align:top; padding-top:4px;">:</td>
      <td style="text-align:justify; vertical-align:top; padding-top:4px;">
        <table style="width:100%; border-collapse:collapse; font-size:10pt;">
          <tr><td style="width:20px; vertical-align:top;">1.</td><td style="text-align:justify; vertical-align:top;">Melakukan pencacahan atas Laporan Pelanggaran nomor ${K("lpp")} tanggal ${v("Tanggal_LP_LP_1")};</td></tr>
          <tr><td style="vertical-align:top;">2.</td><td style="text-align:justify; vertical-align:top;">Setelah melaksanakan Surat Perintah ini agar melaporkan kepada yang memberi perintah;</td></tr>
          <tr><td style="vertical-align:top;">3.</td><td style="text-align:justify; vertical-align:top;">Surat Perintah ini berlaku dari tanggal ${v("Tanggal_LP_LP_1")} sampai dengan selesai.</td></tr>
        </table>
      </td>
    </tr>
  </table>
  <p style="margin-top:8px; margin-bottom:0; text-align:justify; font-size:10pt;">Demikian surat perintah ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.</p>
  
  <div style="page-break-inside: avoid !important; display:flex; justify-content:flex-end; margin-top:14px;">
    <div style="width:45%; text-align:left; font-size:10pt;">
      Dikeluarkan di : Batam<br>
      Pada tanggal : ${a}<br><br>
      <div style="text-align:left;">
        Kepala Bidang Penindakan dan Penyidikan
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_kabid"))}</b><br>NIP. ${r(p("form_nip_kabid"))}
      </div>
    </div>
  </div></div>`}function Xa(){let a=d.selectedPaperSize==="A4"?"report landscape paper-a4":"report landscape",e=JSON.parse(localStorage.getItem("cacahItems")||"[]"),t=p("Tanggal_BA")||p("Tanggal_SBP")||"",n=ea(t),i=(p("Hari_Cacah")||n.hari||"-").toLowerCase(),s=(p("TeksTanggal")||n.teksLengkap||"-").toLowerCase(),l=v("Tanggal_Sprin_Cacah")!=="-"?v("Tanggal_Sprin_Cacah"):v("Tanggal_SBP"),o=K("sprin_cacah"),u=K("sbp"),g=r(p("Lokasi_Penindakan")),c=v("Tanggal_BA")!=="-"?v("Tanggal_BA"):v("Tanggal_SBP"),P=K("ba"),m=JSON.parse(localStorage.getItem("sprinPegawaiList")||"[]"),k,y,f,h,T,x;m.length>=6?(k={nama:m[0].nama,nip:m[0].nip,pkt:m[0].pangkat||m[0].pkt,jab:m[0].jabatan||m[0].jab},y={nama:m[1].nama,nip:m[1].nip,pkt:m[1].pangkat||m[1].pkt,jab:m[1].jabatan||m[1].jab},f={nama:m[2].nama,nip:m[2].nip,pkt:m[2].pangkat||m[2].pkt,jab:m[2].jabatan||m[2].jab},h={nama:m[3].nama,nip:m[3].nip,pkt:m[3].pangkat||m[3].pkt,jab:m[3].jabatan||m[3].jab},T={nama:m[4].nama,nip:m[4].nip,pkt:m[4].pangkat||m[4].pkt,jab:m[4].jabatan||m[4].jab},x={nama:m[5].nama,nip:m[5].nip,pkt:m[5].pangkat||m[5].pkt,jab:m[5].jabatan||m[5].jab}):(k={nama:p("form_ketua_tim"),nip:p("form_nip_ketua_tim"),pkt:p("form_gol_ketua_tim"),jab:p("form_jabatan_ketua_tim")||"Ketua Tim Peneliti"},y={nama:p("form_pembuat_lpp"),nip:p("form_nip_pembuat_lpp"),pkt:p("form_gol_pembuat_lpp"),jab:p("form_jabatan_pembuat_lpp")||"Petugas LPP"},f={nama:p("form_petugas_lpf"),nip:p("form_nip_petugas_lpf"),pkt:p("form_gol_petugas_lpf"),jab:p("form_jabatan_petugas_lpf")||"Petugas LPF"},h={nama:p("form_indak_1"),nip:p("form_nip_indak_1"),pkt:p("form_gol_indak_1"),jab:p("form_jabatan_indak_1")||"Petugas Penindakan 1"},T={nama:p("form_indak_2"),nip:p("form_nip_indak_2"),pkt:p("form_gol_indak_2"),jab:p("form_jabatan_indak_2")||"Petugas Penindakan 2"},x={nama:p("form_indak_lainnya"),nip:p("form_nip_indak_lainnya"),pkt:p("form_gol_indak_lainnya"),jab:p("form_jabatan_indak_lainnya")||"Petugas Penindakan 3"});let L=[k,y,f],I=[h,T,x],S=[k,y,f,h,T,x],E=(b,H=1)=>b.map((B,D)=>`
    <table style="width:100%; border-collapse:collapse; margin-bottom:4px; font-family:Arial, sans-serif; font-size:11pt;">
      <tr>
        <td style="width:5%; text-align:right; padding-right:12px; vertical-align:top;">${H+D}.</td>
        <td style="width:16%; vertical-align:top;">Nama</td>
        <td style="width:3%; text-align:center; vertical-align:top;">:</td>
        <td style="vertical-align:top;"><b>${r(B.nama)}</b></td>
      </tr>
      <tr>
        <td></td>
        <td style="vertical-align:top;">NIP</td>
        <td style="text-align:center; vertical-align:top;">:</td>
        <td style="vertical-align:top;">${r(B.nip)}</td>
      </tr>
      <tr>
        <td></td>
        <td style="vertical-align:top;">Pangkat</td>
        <td style="text-align:center; vertical-align:top;">:</td>
        <td style="vertical-align:top;">${r(B.pkt)}</td>
      </tr>
      <tr>
        <td></td>
        <td style="vertical-align:top;">Jabatan</td>
        <td style="text-align:center; vertical-align:top;">:</td>
        <td style="vertical-align:top;">${r(B.jab)}</td>
      </tr>
    </table>
  `).join(""),N=()=>`
    <div style="page-break-inside: avoid !important; margin-top:20px; font-family:Arial, sans-serif;">
      <div style="text-align:left; margin-bottom:12px; font-weight:normal;">
        Yang Melakukan Pencacahan,
      </div>
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:15px; text-align:left;">
        ${S.map(b=>`
          <div>
            <div style="font-size:9.5pt;">${r(b.jab)},</div>
            <div class="signature"></div>
            ${G()}
            <b>${r(b.nama)}</b><br>NIP.${r(b.nip)}
          </div>
        `).join("")}
      </div>
    </div>
  `,M=Aa("BERITA ACARA PENCACAHAN",P,!0)+V(`Pada hari ini ${i} tanggal ${s} di Tempat Penimbunan Pabean Kantor Pelayanan Utama Bea Cukai Tipe B Batam, berdasarkan Surat Perintah Pencacahan Barang Hasil Penindakan (SPPBHP) Kepala Bidang Penindakan dan Penyidikan nomor ${o} tanggal ${l}, kami:`,"---------")+E(L,1)+V("bersama-sama dengan:")+E(I,4)+V(`telah melakukan pencacahan terhadap Barang Hasil Penindakan yang berasal dari penindakan di ${g} sesuai dengan Surat Bukti Penindakan Nomor ${u}, dengan hasil pencacahan sebagaimana terlampir.`)+V("Atas Barang Hasil Penindakan tersebut di atas kemudian dilakukan penyimpanan di Tempat Penimbunan Pabean Kantor Pelayanan Utama Bea Cukai Tipe B Batam.")+V("Demikian Berita Acara ini dibuat dengan sebenarnya dan ditandatangani pada tempat dan waktu tersebut di atas.")+N()+"</div>",R=`
    <div class="pagebreak"></div>
    <div class="${a}">
      <div style="display:flex; justify-content:flex-end; margin-bottom:12px;">
        <div style="width:30%; text-align:justify;">
          <div style="margin-bottom:4px; font-size:10.5pt; font-weight:bold;">Lampiran Berita Acara Pencacahan</div>
          <table style="border:none; width:100%; border-collapse:collapse; font-size:9.5pt;">
            <tr><td style="width:25%; vertical-align:top;">Nomor</td><td style="width:4%; text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${P}</td></tr>
            <tr><td style="vertical-align:top;">Tanggal</td><td style="text-align:center; vertical-align:top;">:</td><td style="vertical-align:top;">${c}</td></tr>
          </table>
        </div>
      </div>
      
      <table class="rtable" style="font-size:9pt; width:100%; border-collapse:collapse; border:1px solid #000; text-align:center;">
        <thead>
          <tr>
            <th rowspan="3" style="text-align:center; width:4%; border:1px solid #000; padding:6px; vertical-align:middle;">No.</th>
            <th rowspan="3" style="text-align:center; width:12%; border:1px solid #000; padding:6px; vertical-align:middle;">Kode Komoditi</th>
            <th rowspan="3" style="text-align:center; width:20%; border:1px solid #000; padding:6px; vertical-align:middle;">Jenis / Uraian Barang</th>
            <th colspan="6" style="text-align:center; border:1px solid #000; padding:5px;">Data Fisik & Pabean</th>
            <th rowspan="3" style="text-align:center; width:18%; border:1px solid #000; padding:6px; vertical-align:middle;">Keterangan</th>
          </tr>
          <tr>
            <th colspan="2" style="text-align:center; border:1px solid #000; padding:4px;">Ciri Khusus</th>
            <th rowspan="2" style="text-align:center; width:8%; border:1px solid #000; padding:4px; vertical-align:middle;">Jumlah</th>
            <th rowspan="2" style="text-align:center; width:7%; border:1px solid #000; padding:4px; vertical-align:middle;">Satuan</th>
            <th rowspan="2" style="text-align:center; width:8%; border:1px solid #000; padding:4px; vertical-align:middle;">Neg. Asal</th>
            <th rowspan="2" style="text-align:center; width:9%; border:1px solid #000; padding:4px; vertical-align:middle;">Kondisi</th>
          </tr>
          <tr>
            <th style="text-align:center; border:1px solid #000; font-size:8pt; padding:3px; width:7%;">Merk</th>
            <th style="text-align:center; border:1px solid #000; font-size:8pt; padding:3px; width:7%;">Tipe</th>
          </tr>
        </thead>
        <tbody>
          ${e.length===0?`
            <tr>
              <td colspan="10" style="text-align:center; border:1px solid #000; padding:24px 14px; background:#fafafa;">
                <div style="font-weight:bold; color:#b45309; font-size:10pt; margin-bottom:4px; display:flex; align-items:center; justify-content:center; gap:6px;">
                  <i class="fi fi-rr-exclamation"></i> Data Rincian Barang Hasil Pencacahan Belum Diisi
                </div>
                <div style="font-size:8.5pt; color:#64748b;">Silakan pilih filter dokumen <b>BA Cacah</b> di atas, lalu klik tombol <b>+ Tambah Barang Cacah</b> untuk memasukkan uraian barang agar muncul di baris tabel ini.</div>
              </td>
            </tr>`:e.map((b,H)=>`<tr>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${H+1}</td>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.komoditi||p("Komoditi"))}</td>
              <td style="text-align:left; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.uraian)}</td>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.merek||(p("Merek")!=="-"?p("Merek"):"-"))}</td>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.tipe||(p("Tipe")!=="-"?p("Tipe"):"-"))}</td>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.jumlah)}</td>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${r(p("Jenis_Koli"))}</td>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.asal||"-")}</td>
              <td style="text-align:center; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.kondisi)}</td>
              <td style="text-align:left; border:1px solid #000; vertical-align:top; padding:6px;">${r(b.keterangan||"-")}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;return M+R}function Qa(){let a=v("Tanggal_LHP")!=="-"?v("Tanggal_LHP"):v("Tanggal_LP_LP_1"),e=document.getElementById("Jam_Kejadian")?.value?.trim()||"",t=e?e.replace(":",".")+" WIB":"-",n=v("Tanggal_Dokumen_Pemberitahuan"),i=p("Dokumen_Pemberitahuan"),s=document.getElementById("Jenis_Dok_Pemberitahuan_Select")?.value||"",l=s==="LAINNYA"?document.getElementById("Jenis_Dok_Pemberitahuan_Manual")?.value?.trim()||"":s!=="-"?s:"",o=document.getElementById("Nomor_Dok_Pemberitahuan")?.value?.trim()||"",u="-",g="-";if(i.toLowerCase().includes("tanpa dokumen")||s==="Tanpa Dokumen"||!i||i==="-")u="Tanpa Dokumen",g="-";else{let E=(l?l+" ":"")+(o||i);E=E.trim().replace(/^nomor\s+/i,"").replace(/^no\.?\s+/i,"");let N=E.match(/^(BC\s*\d+(?:\.\d+)?|[A-Z]{2,10})\s*(?:nomor\s+|no\.?\s+)?(.*)$/i),M="";N?(u=r(N[1].trim()),M=N[2].trim()):(u=r(l||"BC 2.0"),M=E),M=M.replace(/^nomor\s+/i,"").replace(/^no\.?\s+/i,"").trim();let R=[];M&&R.push(r(M)),n&&n!=="-"&&R.push(`tanggal ${n}`),g=R.length>0?R.join(" "):"-"}let c=d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]?d.databasePerkara[d.activeRecordIndex]:{},P=document.getElementById("Jenis_Dok_Pelengkap_Select")?.value||c.Jenis_Dok_Pelengkap_Select||"-",m=document.getElementById("Jenis_Dok_Pelengkap_Manual")?.value?.trim()||c.Jenis_Dok_Pelengkap_Manual||"",k=document.getElementById("Nomor_Dok_Pelengkap")?.value?.trim()||c.Nomor_Dok_Pelengkap||"",y=document.getElementById("Tanggal_Dok_Pelengkap")?.value||c.Tanggal_Dok_Pelengkap||"",f=y?j(y):"",h="-",T="-";if(P!=="-"&&P!==""){h=P==="LAINNYA"?m||"Lainnya":P;let E=[];k&&E.push(r(k)),f&&f!=="-"&&E.push(`tanggal ${f}`),T=E.length>0?E.join(" "):"-"}let x=p("Modus_Operandi"),L=la(x),I=L.endsWith(";")?L.slice(0,-1):L,S=v("Tanggal_SPLIT")!=="-"?v("Tanggal_SPLIT"):v("Tanggal_LP_LP_1");return Aa("LEMBAR HASIL PENELITIAN (LHP)",K("lhp"),!1)+`
  <!-- HEADER ATAS -->
  <table class="rtable" style="margin-bottom:12px; width:100%; border-collapse:collapse; font-family:Arial, sans-serif; font-size:10pt; line-height:1.35; table-layout:fixed;">
    <colgroup>
      <col style="width:105px;">
      <col style="width:15px;">
      <col style="width:auto;">
      <col style="width:65px;">
      <col style="width:15px;">
      <col style="width:160px;">
    </colgroup>
    <tr>
      <td style="vertical-align:top; white-space:nowrap;">Nomor LP/LP-1</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top;">${K("lpp")}</td>
      <td style="vertical-align:top; white-space:nowrap;">Tgl LP</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top; white-space:nowrap;">${v("Tanggal_LP_LP_1")}</td>
    </tr>
    <tr>
      <td style="vertical-align:top; white-space:nowrap;">Nomor SPLIT</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top;">${K("split")}</td>
      <td style="vertical-align:top; white-space:nowrap;">Tgl SPLIT</td>
      <td style="text-align:center; vertical-align:top;">:</td>
      <td style="vertical-align:top; white-space:nowrap;">${S}</td>
    </tr>
  </table>
  
  <!-- TABEL UTAMA BADAN LHP -->
  <table class="rtable" style="width:100%; border-collapse:collapse; font-family:Arial, sans-serif; font-size:10pt; line-height:1.35; table-layout:fixed;">
    <colgroup>
      <col style="width:25px;">
      <col style="width:170px;">
      <col style="width:15px;">
      <col style="width:auto;">
    </colgroup>

    <tr>
      <td colspan="4" style="vertical-align:top; padding-bottom:4px;"><b>A. URAIAN PELANGGARAN</b></td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Jenis Pelanggaran</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jenis_Pelanggaran"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Locus</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Lokasi_Penindakan"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td colspan="3" style="vertical-align:top; padding-top:2px;">Tempus</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:12px;">a. Hari/Tanggal</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Hari_SBP"))} / ${v("Tanggal_SBP")}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:12px;">b. Waktu</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${t}</td>
    </tr>
    
    <tr>
      <td colspan="4" style="vertical-align:top; padding-top:8px; padding-bottom:2px;"><b>PELAKU PELANGGARAN</b></td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">a.</td>
      <td colspan="3" style="vertical-align:top;">Pelanggaran Administrasi</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Nama Pelanggar</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Nama_Pelaku"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Tempat/Tanggal Lahir</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("TTL"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">NIK/No.Passport</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Nomor_Identitas"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">NPWP</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Nomor_Identitas"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Nomor Telepon</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Nomor_Telepon"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Nomor Rekening</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Nomor_Rekening"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Jenis Kelamin</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Jenis_Kelamin_Pelaku"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Alamat</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Alamat_Pelaku"))}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top;">Pengulangan Pelanggaran</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Pengulangan_Pelanggaran"))}</td>
    </tr>

    <tr>
      <td style="width:25px; vertical-align:top; padding-top:4px;">b.</td>
      <td colspan="3" style="vertical-align:top; padding-top:4px;">Pelanggaran Pidana Dengan Pelaku Tidak Dikenal</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td colspan="3" style="vertical-align:top;">Saksi-saksi</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:12px;">a) Nama</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:12px;">NIK/No. Passport</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:12px;">Nomor Telepon</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:12px;">Jenis Kelamin</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:12px;">Alamat</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>

    <tr>
      <td colspan="4" style="vertical-align:top; padding-top:8px; padding-bottom:2px;"><b>URAIAN BARANG</b></td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">a.</td>
      <td style="width:170px; vertical-align:top;">Komoditas</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Komoditi"))}</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">b.</td>
      <td style="width:170px; vertical-align:top;">Uraian Barang</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Uraian_Barang"))}</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">c.</td>
      <td style="width:170px; vertical-align:top;">Merk/type</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Merek"))}</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">d.</td>
      <td style="width:170px; vertical-align:top;">Kondisi</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Kondisi"))}</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">e.</td>
      <td style="width:170px; vertical-align:top;">Kemasan</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>

    <tr>
      <td colspan="4" style="vertical-align:top; padding-top:8px; padding-bottom:2px;"><b>SARANA PENGANGKUT</b></td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">a.</td>
      <td style="width:170px; vertical-align:top;">Pengangkut</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">b.</td>
      <td style="width:170px; vertical-align:top;">Jenis Sarana Pengangkut</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">c.</td>
      <td style="width:170px; vertical-align:top;">Nomor Polisi/Nomor Voyage</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">d.</td>
      <td style="width:170px; vertical-align:top;">Bukti Kepemilikan</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">e.</td>
      <td style="width:170px; vertical-align:top;">Nomor Kontainer</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("No_Kontainer"))} / ${r(p("Ukuran_Kontainer"))}</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">f.</td>
      <td style="width:170px; vertical-align:top;">Surat Jalan</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>

    <tr>
      <td colspan="4" style="vertical-align:top; padding-top:8px; padding-bottom:2px;"><b>DOKUMEN-DOKUMEN</b></td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">a.</td>
      <td style="width:170px; vertical-align:top;">\u2022 Dokumen Pabean/Cukai</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${u}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:10px;">\u2022 Nomor/Tanggal</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${g}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:10px;">\u2022 Masa Berlaku</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">b.</td>
      <td style="width:170px; vertical-align:top;">\u2022 Dokumen pelengkap</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(h)}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:10px;">\u2022 Nomor/Tanggal</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${T}</td>
    </tr>
    <tr>
      <td style="width:25px;"></td>
      <td style="width:170px; vertical-align:top; padding-left:10px;">\u2022 Masa Berlaku</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">-</td>
    </tr>
    <tr>
      <td style="width:25px; vertical-align:top;">c.</td>
      <td style="width:170px; vertical-align:top;">Kantor Pendaftaran</td>
      <td style="width:15px; text-align:center; vertical-align:top;">:</td>
      <td style="text-align:justify; vertical-align:top;">${r(p("Kantor"))}</td>
    </tr>
  </table>

  <!-- BAGIAN B s.d. G -->
  <div style="page-break-inside: avoid !important; margin-top:10px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="margin-bottom:3px; font-weight:bold;"><b>B. MODUS PELANGGARAN</b></div>
    <div style="border:1px solid #000; padding:6px 8px; text-align:justify; line-height:1.35;">
      Pada hari ${p("Hari_SBP")}, tanggal ${v("Tanggal_SBP")} sekitar pukul ${t} di ${r(p("Lokasi_Penindakan"))} Petugas ${r(p("Kantor"))} telah melakukan Penindakan Terhadap ${r(p("Nama_Pelaku"))} yang diduga ${I} sesuai dengan Surat Bukti Penindakan nomor ${K("sbp")} tanggal ${v("Tanggal_SBP")}, hal tersebut Diduga Melanggar Ketentuan ${r(p("Pasal_Pelanggaran"))}.
    </div>
  </div>

  <div style="page-break-inside: avoid !important; margin-top:10px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="margin-bottom:3px; font-weight:bold;"><b>C. PEMENUHAN UNSUR PASAL</b></div>
    <div style="border:1px solid #000; padding:6px 8px; text-align:justify; line-height:1.35;">
      ${r(p("Pasal_Pelanggaran"))!=="-"?r(p("Pasal_Pelanggaran")):r(p("Jenis_Pelanggaran_Pasal"))}
    </div>
  </div>

  <div style="page-break-inside: avoid !important; margin-top:10px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="margin-bottom:3px; font-weight:bold;"><b>D. KESIMPULAN</b></div>
    <div style="border:1px solid #000; padding:6px 8px; text-align:justify; line-height:1.35;">
      ${r(p("Jenis_Pelanggaran_Pasal"))}
    </div>
  </div>

  <div style="page-break-inside: avoid !important; margin-top:10px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="margin-bottom:3px; font-weight:bold;"><b>E. ALTERNATIF PENYELESAIAN PERKARA</b></div>
    <div style="border:1px solid #000; padding:6px 8px; text-align:justify; line-height:1.35;">
      ${r(p("Penyelesaian_Perkara"))}
    </div>
  </div>

  <div style="page-break-inside: avoid !important; margin-top:10px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="margin-bottom:3px; font-weight:bold;"><b>F. INFORMASI LAINNYA</b></div>
    <div style="border:1px solid #000; padding:6px 8px; text-align:justify; line-height:1.35;">
      -
    </div>
  </div>

  <div style="page-break-inside: avoid !important; margin-top:10px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="margin-bottom:3px; font-weight:bold;"><b>G. CATATAN ATASAN</b></div>
    <div style="border:1px solid #000; padding:6px 8px; text-align:justify; line-height:1.35;">
      -
    </div>
  </div>

  <p style="margin-top:16px; margin-bottom:0; text-align:justify; font-family:Arial, sans-serif; font-size:10pt;">Demikian lembar hasil penelitian ini dibuat dengan kekuatan sumpah jabatan.</p>
  
  <!-- BLOK TANDA TANGAN LHP -->
  <div style="page-break-inside: avoid !important; margin-top:20px; font-family:Arial, sans-serif; font-size:10pt;">
    <div style="display:flex; justify-content:flex-end;">
      <div style="width:40%; text-align:left;">
        Batam, ${a}
      </div>
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:8px;">
      <div style="width:42%; text-align:left;">
        ${r(p("form_jabatan_seksi")!=="-"?p("form_jabatan_seksi"):"Kepala Seksi Penyidikan")},
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_nama_seksi"))}</b><br>NIP. ${r(p("form_nip_seksi"))}
      </div>
      <div style="width:40%; text-align:left;">
        Ketua Tim Peneliti,
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_ketua_tim"))}</b><br>NIP. ${r(p("form_nip_ketua_tim"))}
      </div>
    </div>
    <div style="display:flex; justify-content:center; margin-top:16px;">
      <div style="width:45%; text-align:left;">
        Mengetahui,<br>Kepala Bidang Penindakan dan Penyidikan
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${r(p("form_kabid"))}</b><br>NIP. ${r(p("form_nip_kabid"))}
      </div>
    </div>
  </div></div>`}typeof window<"u"&&(window.LPP=Ya,window.LPF=qa,window.SPLIT=Wa,window.SPRIN_CACAH=Za,window.BA=Xa,window.LHP=Qa);var lt={};ca(lt,{BAST_LIMPAH:()=>ie,BAST_PEMILIK:()=>ae,BA_SEGEL:()=>ee,KEP_BDN:()=>te,SPSA:()=>ne,closeTLReportTag:()=>Da,getTLNumFormat:()=>F});function ae(){if(d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex])return'<div class="report"><p>Data belum dipilih.</p></div>';let a=d.databasePerkara[d.activeRecordIndex],e=F("BAST_PEMILIK"),t=a.TL_Tanggal_Surat||a.Tanggal_LHP||a.Tanggal_LP_LP_1||"",n=ea(t),i=r(a.TL_Hari_BAST||n.hari||"Kamis"),s=r(a.TL_Tgl_Huruf_BAST||n.teksLengkap||"-"),l=t?j(t):"17 September 2026",o=a.TL_BAST_SarkutList||[{jenis:a.TL_Nama_Sarkut||a.Pengangkut||"-",nopol:a.TL_No_Reg_Sarkut||"-"}],u=o.map((q,sa)=>`
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${Ga(sa)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jenis Sarana Pengangkut</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${r(q.jenis||"-")}</td>
    </tr>
    <tr>
      <td style="border:none !important; padding:1px 0; vertical-align:top; font-size:11pt;"></td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">No. Reg/No. Polisi</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${r(q.nopol||"-")}</td>
    </tr>
  `).join("");o.length===1&&(u+=Va());let g=a.Jumlah_Koli||"12",c=z(g)||"dua belas",P=a.Jenis_Koli||"koli",m=(a.Komoditi||a.Uraian_Barang||"Sepatu").replace(/^(\d+\s*\([^)]*\)\s*[a-zA-Z]+\s*)+/i,"").trim()||"Sepatu",k=a.No_Kontainer&&a.No_Kontainer!=="-"?`${a.No_Kontainer} / ${a.Ukuran_Kontainer||""}`:`${g} ${P}`,y=`${g} (${c}) ${P} ${m}`,f=a.TL_BAST_BarangList;(!f||f.length===0)&&(f=[{kemasan:k,uraian:y}],a.TL_BAST_BarangList=f);let h=f.map((q,sa)=>`
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${Ga(sa)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jml/No. Peti Kemas/Kemasan</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${r(q.kemasan||"-")}</td>
    </tr>
    <tr>
      <td style="border:none !important; padding:1px 0; vertical-align:top; font-size:11pt;"></td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jumlah/Jenis Barang</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${r(q.uraian||"-")}</td>
    </tr>
  `).join("");f.length===1&&(h+=Va());let T="-";if(a.TL_Dokumen_Bast)T=a.TL_Dokumen_Bast;else{let q=a.Dokumen_Pemberitahuan||"BC 2.0",sa=a.Nomor_Dok_Pemberitahuan||"12345",Hn=a.Tanggal_Dokumen_Pemberitahuan?j(a.Tanggal_Dokumen_Pemberitahuan):"01 September 2026";T=`Eks. ${q} nomor ${sa} tanggal ${Hn}`}let x=a.TL_BAST_DokumenList||[{uraian:T}],L=x.map((q,sa)=>`
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${Ga(sa)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Jenis/No. dan Tgl. Dokumen</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${r(q.uraian||"-")}</td>
    </tr>
  `).join("");x.length===1&&(L+=Va());let I=a.TL_BAST_OrangList||[{nama:"-",identitas:"-"}],S=I.map((q,sa)=>`
    <tr>
      <td style="border:none !important; padding:1px 0 1px 18px; vertical-align:top; font-size:11pt;">${Ga(sa)}</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">Nama</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${r(q.nama||"-")}</td>
    </tr>
    <tr>
      <td style="border:none !important; padding:1px 0; vertical-align:top; font-size:11pt;"></td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">No. Identitas</td>
      <td style="border:none !important; padding:1px 0; text-align:center; vertical-align:top; font-size:11pt;">:</td>
      <td style="border:none !important; padding:1px 4px; vertical-align:top; font-size:11pt;">${r(q.identitas||"-")}</td>
    </tr>
  `).join("");I.length===1&&(S+=Va());let E=(a.TL_Nama_Pemilik||a.Nama_Pemilik||a.Nama_Perusahaan||a.Nama_Pelaku||"-").trim(),N=E.replace(/\.+$/,""),M=(a.TL_NIK_Pemilik||a.Nomor_Identitas||"-").trim(),R=(a.TL_Alamat_Pemilik||a.Alamat_Pemilik||a.Alamat_Pelaku||"-").trim(),b=(a.TL_Atas_Nama_Pt||E).trim(),H=b!=="-"&&!b.endsWith(".")?b+".":b,B=(a.TL_Rangka_Penyerahan||"Pengeluaran barang sebagian atas barang yang tidak terkena larangan dan/atau pembatasan").trim(),D=B!=="-"&&!B.endsWith(".")?B+".":B,U=a.TL_Petugas_Bast_1&&a.TL_Petugas_Bast_1!=="Petugas BAST 1"?r(a.TL_Petugas_Bast_1):a.ketua_tim||"-",aa=a.TL_NIP_Bast_1||a.nip_ketua_tim||"-",C=a.TL_Petugas_Bast_2&&a.TL_Petugas_Bast_2!=="Petugas BAST 2"?r(a.TL_Petugas_Bast_2):"-",O=a.TL_NIP_Bast_2||"-",$=(a.TL_Saksi_Penerima||"").trim()||"---------------------------";return`
  <div class="report" style="font-family:Arial, Helvetica, sans-serif !important; font-size:11pt !important; line-height:1.35; color:#000 !important; width:100%; box-sizing:border-box;">
    ${Ta("BAST")}

    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:14px 0 2px 0;">BERITA ACARA SERAH TERIMA</div>
    <div style="text-align:center; font-size:11pt; margin-bottom:14px;">Nomor : ${e}</div>

    ${V(`Pada hari ini, ${i} tanggal${s}. Kami yang bertanda tangan di bawah ini bertindak untuk/atas nama Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam, telah menyerahkan:`,"----------")}

    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-bottom:10px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:36px;">
        <col style="width:235px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 289px);">
      </colgroup>
      ${Fa("1. Sarana Pengangkut",u)}
      ${Fa("2. Barang",h)}
      ${Fa("3. Dokumen",L)}
      ${Fa("4. Orang",S)}
    </table>

    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-top:8px; margin-bottom:8px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:271px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 289px);">
      </colgroup>
      <tr>
        <td style="border:none !important; font-weight:bold; padding:2px 0; font-size:11pt;">Diserahkan kepada</td>
        <td style="border:none !important; padding:2px 0; text-align:center; vertical-align:top; font-size:11pt; font-weight:bold;">:</td>
        <td style="border:none !important; padding:2px 4px;"></td>
      </tr>
      ${pa("Nama",E,"271px")}
      ${pa("No. Identitas",M,"271px")}
      ${pa("Alamat",R,"271px")}
    </table>

    ${V(`Menerima penyerahan untuk/atas nama: ${H}`)}
    ${V(`Penyerahan dilaksanakan dalam rangka: ${D}`)}
    ${V("Demikian Berita Acara ini dibuat dengan sebenarnya.")}

    <div style="page-break-inside:avoid !important; margin-top:16px; font-family:Arial, Helvetica, sans-serif; font-size:11pt;">
      <table style="width:100% !important; border-collapse:collapse !important; border:none !important; table-layout:fixed; font-size:11pt;">
        <colgroup>
          <col style="width:52%;">
          <col style="width:48%;">
        </colgroup>
        <tr>
          <td style="border:none !important; padding:0; vertical-align:top;"></td>
          <td style="border:none !important; padding:0 0 10px 0; vertical-align:top; text-align:left;">
            <div style="width:85%; margin-left:auto;">Batam, ${l}</div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:0 10px 0 0; vertical-align:top;">
            Yang menerima,
            <div style="height:55px;"></div>
            <b>${N}</b>
          </td>
          <td style="border:none !important; padding:0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              Yang menyerahkan,
              <div style="height:55px;"></div>
              <b>${U}</b><br>
              NIP. ${aa}
            </div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:20px 10px 0 0; vertical-align:top;">
            <div style="height:55px;"></div>
            <b>${$}</b>
          </td>
          <td style="border:none !important; padding:20px 0 0 0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              <div style="height:20px;"></div>
              <div style="height:55px;"></div>
              <b>${C}</b><br>
              NIP. ${O}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>`}function ee(){if(d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex])return'<div class="report"><p>Data belum dipilih.</p></div>';let a=d.databasePerkara[d.activeRecordIndex],e=F("BA_SEGEL"),t=a.TL_Tanggal_Surat||a.Tanggal_LHP||a.Tanggal_LP_LP_1||"",n=ea(t),i=r(a.TL_Segel_Hari||n.hari||""),s=r(a.TL_Segel_Tgl_Huruf||n.teksLengkap||""),l=t?j(t):"",o=r(a.TL_Segel_No_SPLI||a.Nomor_SPLIT||"-"),u=a.TL_Segel_Tgl_SPLI||a.Tanggal_SPLIT||"",g=u?j(u):"-",c=r(a.TL_Segel_Nama_Sarkut||"-"),P=r(a.TL_Segel_Reg_Sarkut||"-"),m=r(a.TL_Segel_Bendera||"-"),k=r(a.TL_Segel_Nahkoda||"-"),y=r(a.TL_Segel_Nik_Nahkoda||"-"),f=r(a.TL_Segel_Jml_Barang||"-"),h=r(a.TL_Segel_Jenis_Barang||"-"),T=r(a.TL_Segel_Dok_Barang||"-"),x=r(a.TL_Segel_Pemilik_Barang||"-"),L=r(a.TL_Segel_NPWP_Barang||"-"),I=r(a.TL_Segel_Alamat_Bangunan||"-"),S=r(a.TL_Segel_Reg_Bangunan||"-"),E=r(a.TL_Segel_Nama_Pemilik_Tempat||"-"),N=r(a.TL_Segel_Nik_Pemilik_Tempat||"-"),R=r(a.TL_Nama_Pemilik||a.Nama_Pelaku||"")||"-",b=r(a.TL_Alamat_Pemilik||"-")||"-",H=r(a.TL_Segel_Pekerjaan||"-")||"-",B=r(a.TL_NIK_Pemilik||"-")||"-",D=r(a.TL_Segel_P1||a.ketua_tim||"-"),U=r(a.TL_Segel_P2||"-"),aa=r(a.TL_NIP_Segel_1||a.nip_ketua_tim||"-"),C=r(a.TL_NIP_Segel_2||"-"),O=`
    <div style="page-break-inside:avoid !important; margin-top:16px; font-family:Arial, Helvetica, sans-serif; font-size:11pt;">
      <table style="width:100% !important; border-collapse:collapse !important; border:none !important; table-layout:fixed; font-size:11pt;">
        <colgroup>
          <col style="width:52%;">
          <col style="width:48%;">
        </colgroup>
        <tr>
          <td style="border:none !important; padding:0; vertical-align:top;"></td>
          <td style="border:none !important; padding:0 0 10px 0; vertical-align:top; text-align:left;">
            <div style="width:85%; margin-left:auto;">Batam, ${l}</div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:0 10px 0 0; vertical-align:top;">
            Yang menerima,
            <div style="height:35px;"></div>
            <b>${R}</b>
          </td>
          <td style="border:none !important; padding:0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              Yang menyerahkan,
              <div style="height:35px;"></div>
              ${G()}
              <b>${D}</b><br>
              NIP. ${aa}
            </div>
          </td>
        </tr>
        <tr>
          <td style="border:none !important; padding:35px 10px 0 0; vertical-align:top;">
            <b>----------------------------------------</b>
          </td>
          <td style="border:none !important; padding:20px 0 0 0; vertical-align:top;">
            <div style="width:85%; margin-left:auto;">
              <div style="height:25px;"></div>
              <div style="height:35px;"></div>
              ${G()}
              <b>${U}</b><br>
              NIP. ${C}
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;return`
  <div class="report" style="font-family:Arial, sans-serif; font-size:11pt; line-height:1.35;">
    ${Ta("BA_SEGEL")}
    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:16px 0 3px 0;">BERITA ACARA PEMBUKAAN SEGEL</div>
    <div style="text-align:center; margin-bottom:12px; font-size:11pt;">Nomor : ${e}</div>
    
    ${V(`Pada hari ini, ${i} tanggal${s}. Berdasarkan Surat Perintah Penelitian Kepala Bidang Penindakan dan Penyidikan KPU BC Tipe B Batam Nomor ${o} tanggal${g}. Kami yang bertanda tangan di bawah ini telah melakukan pembukaan segel atas:`,"----------")}
    
    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-bottom:10px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:24px;">
        <col style="width:245px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 287px);">
      </colgroup>

      <tr>
        <td style="border:none !important; font-weight:bold; vertical-align:top; padding:6px 0 2px 0;">a.</td>
        <td colspan="3" style="border:none !important; font-weight:bold; padding:6px 0 2px 0;">Sarana Pengangkut</td>
      </tr>
      <tr><td></td><td style="padding:1px 4px;">Nama dan Jenis Sarkut</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${c}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">No. Register</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${P}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Bendera</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${m}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Nahkoda/Pilot/Pengemudi*</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${k}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Nomor Identitas</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${y}</td></tr>

      <tr>
        <td style="border:none !important; font-weight:bold; vertical-align:top; padding:8px 0 2px 0;">b.</td>
        <td colspan="3" style="border:none !important; font-weight:bold; padding:8px 0 2px 0;">Barang</td>
      </tr>
      <tr><td></td><td style="padding:1px 4px;">Jumlah/Jenis/Nomor Peti Kemas/Kemasan</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${f}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Jumlah/Jenis Barang</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${h}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Jenis/Nomor dan Tgl Dokumen</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${T}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Pemilik/Importir/Eksportir/Kuasa*</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${x}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Nomor Identitas (NPWP)</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${L}</td></tr>

      <tr>
        <td style="border:none !important; font-weight:bold; vertical-align:top; padding:8px 0 2px 0;">c.</td>
        <td colspan="3" style="border:none !important; font-weight:bold; padding:8px 0 2px 0;">Bangunan atau Tempat</td>
      </tr>
      <tr><td></td><td style="padding:1px 4px;">Alamat Bangunan/Tempat</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${I}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">No. Reg Bangunan/NPPBKC/NPWP</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${S}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Nama Pemilik/Yang Menguasai*</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${E}</td></tr>
      <tr><td></td><td style="padding:1px 4px;">Nomor Identitas</td><td style="text-align:center;">:</td><td style="padding:1px 4px;">${N}</td></tr>
    </table>

    ${V(`Berupa segel/tanda pengaman Kertas sebanyak 1 (satu) segel Nomor ${e} tanggal${l}.`,"----------")}
    
    <p style="margin-bottom:4px; text-align:justify;"><b>Pembukaan segel disaksikan oleh pengangkut/pemilik/atau kuasanya/ketua lingkungan/dll*:</b></p>
    
    <table style="width:100% !important; border-collapse:collapse !important; border:none !important; margin-bottom:10px; font-size:11pt !important; table-layout:fixed;">
      <colgroup>
        <col style="width:235px;">
        <col style="width:18px;">
        <col style="width:calc(100% - 253px);">
      </colgroup>
      ${pa("Nama",R,"235px")}
      ${pa("Alamat",b,"235px")}
      ${pa("Pekerjaan",H,"235px")}
      ${pa("Identitas (KTP/SIM/Paspor*)",B,"235px")}
    </table>

    ${V("Demikian Berita Acara ini dibuat dengan sebenarnya.","----------")}
    ${Da(O,l)}
  </div>`}function te(){if(d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex])return'<div class="report"><p>Data belum dipilih.</p></div>';let a=d.databasePerkara[d.activeRecordIndex],e=F("KEP_BDN"),t=a.Nomor_SBP?`SBP-${a.Nomor_SBP}/MANDIRI/PATLA/KPU.2/2026`:"(NOMOR SBP)",n=a.Tanggal_SBP?j(a.Tanggal_SBP):"(TANGGAL SBP)",i=a.NoLP_LP_1?`LP-${a.NoLP_LP_1}/PATLA/KPU.206/2026`:"(NOMOR LP)",s=a.Tanggal_LP_LP_1?j(a.Tanggal_LP_LP_1):"(TANGGAL LP)",l=r(a.Lokasi_Penindakan||"(LOKASI PENINDAKAN)"),o=r(a.Nama_Pelaku||"(NAMA PELAKU)"),u=r(a.Modus_Operandi||"melakukan pelanggaran"),g=a.KEP_Tanggal_ND?j(a.KEP_Tanggal_ND):"28 September 2026",c=r(a.kabid||p("form_kabid")||"ZAKY FIRMANSYAH"),P=a.KEP_List_Barang||[],m=P.length>0?P.map((h,T)=>`
    <tr>
      <td style="border:1px solid #000; padding:6px; text-align:center; font-family:'Bookman Old Style', serif; font-size:12pt;">${T+1}.</td>
      <td style="border:1px solid #000; padding:6px; text-align:center; font-family:'Bookman Old Style', serif; font-size:12pt;">${r(h.jumlah||"")}</td>
      <td style="border:1px solid #000; padding:6px; text-align:left; font-family:'Bookman Old Style', serif; font-size:12pt;">${r(h.uraian||"")}</td>
      <td style="border:1px solid #000; padding:6px; text-align:center; font-family:'Bookman Old Style', serif; font-size:12pt;">${r(h.kondisi||"")}</td>
      <td style="border:1px solid #000; padding:6px; text-align:center; font-family:'Bookman Old Style', serif; font-size:12pt;">${r(h.asal||"")}</td>
      <td style="border:1px solid #000; padding:6px; text-align:center; font-family:'Bookman Old Style', serif; font-size:12pt;">${r(h.ket||"")}</td>
    </tr>
  `).join(""):`
    <tr>
      <td colspan="6" style="border:1px solid #000; padding:12px; text-align:center; font-family:'Bookman Old Style', serif; font-size:12pt; font-style:italic; color:#555;">(Belum ada daftar barang)</td>
    </tr>
  `,k=`
    <div style="page-break-inside: avoid !important; margin-top:20px; font-family:'Bookman Old Style', serif; font-size:12pt;">
      <table style="width:100%; border-collapse:collapse; border:none !important; font-family:'Bookman Old Style', serif; font-size:12pt;">
        <tr>
          <td style="border:none !important; width:55%;"></td>
          <td style="border:none !important; width:45%; vertical-align:top; text-align:left;">
            Ditetapkan di Batam<br>
            pada tanggal ${g}
            <div style="margin-top:6px;">
              KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM,
            </div>
            <div class="signature" style="height:45px;"></div>
            ${G()}
            <div style="text-decoration:underline;">${c}</div>
          </td>
        </tr>
      </table>
    </div>
  `,y=`
  <div class="report" style="font-family:'Bookman Old Style', serif; font-size:12pt; line-height:1.35; margin:0; padding:0;">
    <table style="width:100%; border-collapse:collapse; border:none !important; font-family:'Bookman Old Style', serif; font-size:12pt; text-align:center; line-height:1.3; margin-bottom:12px;">
      <tr><td style="border:none !important; padding:2px 0;">KEPUTUSAN KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM</td></tr>
      <tr><td style="border:none !important; padding:12px 0 2px 0;">NOMOR ${a.KEP_Nomor_ND||e}</td></tr>
      <tr><td style="border:none !important; padding:12px 0 2px 0;">TENTANG</td></tr>
      <tr><td style="border:none !important; padding:6px 0;">PENETAPAN BARANG IMPOR SEBAGAI BARANG YANG DIKUASAI NEGARA ATAS ${t} tanggal ${n}</td></tr>
      <tr><td style="border:none !important; padding:16px 0 2px 0;">KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM,</td></tr>
    </table>
    
    <table style="width:100%; border-collapse:collapse; border:none !important; font-size:12pt; font-family:'Bookman Old Style', serif; line-height:1.35; margin-bottom:10px;">
      <tr>
        <td style="width:120px; border:none !important; vertical-align:top; padding:2px 0;">Menimbang</td>
        <td style="width:15px; border:none !important; vertical-align:top; padding:2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:2px 0;">
          <table style="width:100%; border-collapse:collapse; border:none !important; font-size:12pt; font-family:'Bookman Old Style', serif;">
            <tr>
              <td style="width:25px; border:none !important; vertical-align:top; padding:0;">a.</td>
              <td style="width:15px; border:none !important; vertical-align:top; padding:0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:0;">bahwa pada Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam terdapat barang hasil penegahan oleh Pejabat Bea dan Cukai di ${l} atas modus operandi yang dilakukan oleh ${o} (${u}) sesuai dengan Surat Bukti Penindakan nomor ${t} tanggal ${n} dan Laporan Pelanggaran nomor ${i} tanggal ${s};</td>
            </tr>
            <tr>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0;">b.</td>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:4px 0 0 0;">bahwa berdasarkan ketentuan Pasal 68 ayat (1) huruf a dan b Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-undang Nomor 17 Tahun 2006 tentang Perubahan atas Undang-undang Nomor 10 Tahun 1995, Barang yang dilarang atau dibatasai sebagaimana dimaksud dalam Pasal 53 ayat (4) dan Barang dan/atau sarana pengangkut yang ditegah oleh Pejabat Bea dan Cukai sebagaimana dimaksud dalam Pasal 77 ayat (1);</td>
            </tr>
            <tr>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0;">c.</td>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:4px 0 0 0;">bahwa berdasarkan ketentuan Pasal 71 ayat (2) Peraturan Pemerintah Republik Indonesia Nomor 41 Tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas, Barang yang dilarang atau dibatasi untuk: a. Dimasukkan ke KPBPB dari Luar Daerah Pabean; atau b. Dikeluarkan dari KPBPB ke Luar Daerah Pabean atau tempat lain dalam Daerah Pabean\u201D, yang tidak diberitahukan atau diberitahukan secara tidak benar ditetapkan sebagai barang yang dikuasai negara, kecuali terhadap barang dimaksud ditetapkan lain berdasarkan ketentuan perundang-undangan;</td>
            </tr>
            <tr>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0;">d.</td>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:4px 0 0 0;">bahwa berdasarkan pertimbangan sebagaimana dimaksud diatas, dipandang perlu untuk menetapkan barang dimaksud sebagai Barang yang Dikuasi Negara.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table style="width:100%; border-collapse:collapse; border:none !important; font-size:12pt; font-family:'Bookman Old Style', serif; line-height:1.35; margin-bottom:10px;">
      <tr>
        <td style="width:120px; border:none !important; vertical-align:top; padding:2px 0;">Mengingat</td>
        <td style="width:15px; border:none !important; vertical-align:top; padding:2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:2px 0;">
          <table style="width:100%; border-collapse:collapse; border:none !important; font-size:12pt; font-family:'Bookman Old Style', serif;">
            <tr>
              <td style="width:25px; border:none !important; vertical-align:top; padding:0;">1.</td>
              <td style="width:15px; border:none !important; vertical-align:top; padding:0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:0;">Undang-undang nomor 10 tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-undang nomor 17 tahun 2006;</td>
            </tr>
            <tr>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0;">2.</td>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:4px 0 0 0;">Peraturan Pemerintah nomor 41 tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas dan Pelabuhan Bebas;</td>
            </tr>
            <tr>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0;">3.</td>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:4px 0 0 0;">Peraturan Menteri Keuangan Republik Indonesia Nomor 178/PMK.04/2019 Tentang Penyelesaian Terhadap Barang Yang Dinyatakan Tidak Dikuasai, Barang Yang Dikuasai Negara, Dan Barang Yang Menjadi Milik Negara;</td>
            </tr>
            <tr>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0;">4.</td>
              <td style="border:none !important; vertical-align:top; padding:4px 0 0 0; text-align:center;">:</td>
              <td style="border:none !important; text-align:justify; vertical-align:top; padding:4px 0 0 0;">Peraturan Direktur Jenderal Bea dan Cukai nomor PER-8/BC/2024 tentang Tata Laksana Pengawasan Di Bidang Kepabeanan dan Cukai.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="text-align:center; font-family:'Bookman Old Style', serif; font-size:12pt; margin:12px 0;">MEMUTUSKAN:</div>
    
    <table style="width:100%; border-collapse:collapse; border:none !important; font-size:12pt; font-family:'Bookman Old Style', serif; line-height:1.35; margin-bottom:10px;">
      <tr>
        <td style="width:120px; border:none !important; vertical-align:top; padding:2px 0;">Menetapkan</td>
        <td style="width:15px; border:none !important; vertical-align:top; padding:2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:2px 0;">KEPUTUSAN KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM TENTANG PENETAPAN BARANG IMPOR SEBAGAI BARANG YANG DIKUASAI NEGARA ATAS ${t} tanggal ${n}.</td>
      </tr>
      <tr>
        <td style="border:none !important; vertical-align:top; padding:2px 0;">KESATU</td>
        <td style="border:none !important; vertical-align:top; padding:2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:2px 0;">Barang-barang sebagaimana terlampir pada Keputusan Kepala Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam ini merupakan hasil penegahan oleh Pejabat Bea dan Cukai di ${l} atas modus operandi yang dilakukan oleh ${o} sesuai dengan Surat Bukti Penindakan nomor ${t} tanggal ${n} dan Laporan Pelanggaran nomor ${i} tanggal ${s}.</td>
      </tr>
      <tr>
        <td style="border:none !important; vertical-align:top; padding:2px 0;">KEDUA</td>
        <td style="border:none !important; vertical-align:top; padding:2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:2px 0;">Sesuai dengan ketentuan Pasal 68 ayat (1) huruf a dan b Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006 tentang Perubahan atas Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan, barang-barang sebagaimana dimaksud dalam Diktum KESATU ditetapkan sebagai Barang yang Dikuasai Negara.</td>
      </tr>
      <tr>
        <td style="border:none !important; vertical-align:top; padding:2px 0;">KETIGA</td>
        <td style="border:none !important; vertical-align:top; padding:2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:2px 0;">Barang yang Dikuasai Negara sebagaimana dimaksud dalam Diktum KESATU disimpan di Gudang Penindakan dan Penyidikan Batu Ampar dan/atau Tanjung Uncang di bawah pengawasan Kantor Pelayanan Utama Bea Dan Cukai TIPE B BATAM.</td>
      </tr>
      <tr>
        <td style="border:none !important; vertical-align:top; padding:2px 0;">KEEMPAT</td>
        <td style="border:none !important; vertical-align:top; padding:2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:2px 0;">Keputusan ini mulai berlaku pada tanggal ditetapkan, dengan ketentuan apabila dikemudian hari terdapat kekeliruan akan diadakan pembetulan seperlunya.</td>
      </tr>
      <tr>
        <td style="border:none !important; vertical-align:top; padding:12px 0 2px 0;">Salinan</td>
        <td style="border:none !important; vertical-align:top; padding:12px 0 2px 0; text-align:center;">:</td>
        <td style="border:none !important; text-align:justify; vertical-align:top; padding:12px 0 2px 0;">
          Keputusan Kepala Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam ini disampaikan kepada:<br>
          1. Menteri Keuangan;<br>
          2. Direktur Jenderal Bea dan Cukai;<br>
          3. Inspektorat Jenderal;<br>
          4. Direktur Teknis Kepabeanan, Direktorat Jenderal Bea dan Cukai;<br>
          5. Direktur Penindakan dan Penyidikan;<br>
          6. Pemilik/Kuasa a.n ${o}
        </td>
      </tr>
    </table>

    ${k}
  </div>`,f=`
  <div class="report" style="font-family:'Bookman Old Style', serif; font-size:12pt; line-height:1.35;">
    <div style="font-size:12pt; text-align:left; line-height:1.3;">
      LAMPIRAN<br>
      KEPUTUSAN KEPALA KANTOR PELAYANAN UTAMA BEA DAN CUKAI TIPE B BATAM<br>
      NOMOR : ${a.KEP_Nomor_ND||e}<br>
      TENTANG PENETAPAN BARANG IMPOR SEBAGAI BARANG YANG DIKUASAI NEGARA ATAS ${t} TANGGAL ${n}
    </div>
    <div style="margin-top:16px; text-align:center; font-size:12pt;">DAFTAR BARANG YANG DIKUASAI NEGARA</div>
    <table class="rtable" style="width:100%; border-collapse:collapse; margin-top:12px; border:1px solid #000; font-size:12pt; font-family:'Bookman Old Style', serif;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="border:1px solid #000; padding:6px; text-align:center; width:5%;">No</th>
          <th style="border:1px solid #000; padding:6px; text-align:center; width:25%;">Jumlah Barang</th>
          <th style="border:1px solid #000; padding:6px; text-align:left; width:30%;">Uraian Barang</th>
          <th style="border:1px solid #000; padding:6px; text-align:center; width:13%;">Kondisi</th>
          <th style="border:1px solid #000; padding:6px; text-align:center; width:17%;">Negara Asal</th>
          <th style="border:1px solid #000; padding:6px; text-align:center; width:10%;">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        ${m}
      </tbody>
    </table>
    ${k}
  </div>`;return`${y}<div class="pagebreak" style="page-break-before: always; break-before: page; margin-top: 30px;"></div>${f}`}function ne(){if(d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex])return'<div class="report"><p>Data belum dipilih.</p></div>';let a=d.databasePerkara[d.activeRecordIndex],e=r(a.kabid||p("form_kabid")||"Zaky Firmansyah"),t=`
    <div style="page-break-inside: avoid !important; display:flex; justify-content:flex-end; margin-top:16px;">
      <div style="text-align:left; width:45%; font-size:10pt;">
        Kepala Kantor,
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${e}</b>
      </div>
    </div>
  `;return`
  <div class="report" style="font-family:Arial, sans-serif; font-size:10pt; line-height:1.35;">
    ${Ta("SPSA")}
    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:16px 0 8px 0;">SURAT PENETAPAN SANKSI ADMINISTRASI (SPSA)</div>
    <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:10pt;">
      <tr><td style="width:80px;">Nomor</td><td style="width:15px; text-align:center;">:</td><td>SPSA-${r(a.SPSA_Nomor||"01")}</td></tr>
      <tr><td>Tanggal</td><td style="text-align:center;">:</td><td>${r(a.SPSA_Tanggal||"09 September 2026")}</td></tr>
    </table>
    
    <div style="margin-bottom:10px; font-size:10pt; line-height:1.3;">
      <b>Kepada Yth.</b><br>
      <table style="width:100%; border-collapse:collapse; font-size:10pt; margin-top:4px;">
        <tr><td style="width:80px; vertical-align:top;">Nama</td><td style="width:15px; text-align:center; vertical-align:top;">:</td><td>${r(a.TL_Nama_Pemilik||a.Nama_Pelaku||"-")}</td></tr>
        <tr><td style="vertical-align:top;">No KTP</td><td style="text-align:center; vertical-align:top;">:</td><td>${r(a.TL_NIK_Pemilik||a.Nomor_Identitas||"-")}</td></tr>
        <tr><td style="vertical-align:top;">Alamat</td><td style="text-align:center; vertical-align:top;">:</td><td>${r(a.TL_Alamat_Pemilik||a.Alamat_Pelaku||"-")}</td></tr>
      </table>
    </div>
    
    <p style="text-align:justify; margin-bottom:8px; text-indent:40px;">Berdasarkan ketentuan pada pasal pelanggaran spsa (${r(a.SPSA_Pasal_Pelanggaran||"9A ayat (1) Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006 dan pasal 34 ayat (5) Peraturan Pemerintah nomor 41 tahun 2021 tentang Penyelenggaraan Kawasan Perdagangan Bebas")}), dengan ini ditetapkan sanksi administrasi berupa denda sebesar <b>${r(a.SPSA_Denda||"Rp 10.000.000,- (sepuluh juta rupiah)")}</b> dengan alasan penetapan (${r(a.SPSA_Alasan||"tidak menyerahkan pemberitahuan pabean atas barang yang diangkutnya sebelum keberangkatan sarana pengangkut")}) sebagaimana dimaksud pada pasal dasar denda (${r(a.SPSA_Pasal_Denda||"9A ayat (3) Undang-Undang Nomor 10 Tahun 1995 tentang Kepabeanan sebagaimana telah diubah dengan Undang-Undang Nomor 17 Tahun 2006")}).</p>
    
    <p style="text-align:justify; margin-bottom:8px; text-indent:40px;">Saudara wajib melunasi sanksi administrasi berupa denda tersebut paling lambat tanggal ${r(a.SPSA_Jatuh_Tempo||"18 Januari 2026")} dan bukti pelunasan agar disampaikan kepada Kepala Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam.</p>
    <p style="text-align:justify; margin-bottom:8px; text-indent:40px;">Apabila tagihan tidak dilunasi atau tidak diajukan keberatan sampai dengan tanggal ${r(a.SPSA_Jatuh_Tempo||"18 Januari 2026")}, dikenakan bunga yang terutang sebesar 2% (dua persen) setiap bulan untuk paling lama 24 (dua puluh empat) bulan dari jumlah yang terutang, bagian bulan dihitung satu bulan penuh.</p>
    <p style="text-align:justify; margin-bottom:8px; text-indent:40px;">Keberatan atas penetapan ini hanya dapat diajukan secara tertulis kepada Direktur Jenderal Bea dan Cukai melalui Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam sesuai dengan ketentuan tentang keberatan, paling lambat pada tanggal ${r(a.SPSA_Jatuh_Tempo||"18 Januari 2026")}.</p>
    
    ${Da(t,r(a.SPSA_Tanggal||"09 September 2026"))}
    <div style="font-size:8.5pt; margin-top:12px; line-height:1.2;">
      SPSA ini dibuat rangkap 2 (dua):<br>
      - Rangkap ke-1 untuk ${r(a.TL_Nama_Pemilik||a.Nama_Pelaku||"-")}<br>
      - Rangkap ke-2 untuk Kepala KPU Bea dan Cukai Tipe B Batam
    </div>
  </div>`}function ie(){if(d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex])return'<div class="report"><p>Data belum dipilih.</p></div>';let a=d.databasePerkara[d.activeRecordIndex],e=F("BAST_LIMPAH"),t=r(a.Limpah_Hari||"Kamis"),n=r(a.Limpah_Tgl_Huruf||"dua belas Desember tahun dua ribu dua puluh enam"),i=r(a.Limpah_Tanggal||"12 Desember 2026"),s=r(a.Limpah_Sarkut||a.Pengangkut||"-"),l=r(a.Limpah_Barang||a.Uraian_Barang||"\xB11250 batang balok kayu"),o=r(a.Limpah_Dokumen||"Dokumen Kapal, KTP, dan dokumen lainnya"),u=r(a.TL_Nama_Pemilik||a.Nama_Pelaku||"RAJA DOLI SIREGAR"),g=r(a.TL_NIK_Pemilik||a.Nomor_Identitas||"2102081511890006"),c=r(a.Instansi_Penerima||"Dinas Lingkungan Hidup dan Kehutanan (DLHK) Provinsi Kepri"),P=r(a.Limpah_Pejabat_Penerima||"Pejabat Instansi"),m=r(a.Limpah_Jabatan_Penerima||"Kepala Dinas / Pejabat Yang Berwenang"),k=r(a.Limpah_NIP_Penerima||"-"),y=r(a.Limpah_Petugas_1||a.ketua_tim||"Petugas Pelimpah 1"),f=r(a.Limpah_NIP_1||a.nip_ketua_tim||"-"),h=r(a.Limpah_Pangkat_1||a.gol_ketua_tim||"-"),T=r(a.Limpah_Jabatan_1||a.jabatan_ketua_tim||"Pemeriksa Bea dan Cukai"),x=`
    <div class="sign" style="display:flex; justify-content:space-between; margin-top:20px; page-break-inside: avoid !important;">
      <div style="width:45%; text-align:left; font-size:10pt;">
        <b>PIHAK KEDUA,</b><br>
        Mewakili ${c}
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${P}</b><br>
        NIP. ${k}
      </div>
      <div style="width:45%; text-align:left; font-size:10pt;">
        <b>PIHAK PERTAMA,</b><br>
        Petugas Pelimpah KPU BC Tipe B Batam
        <div class="signature" style="height:55px;"></div>
        ${G()}
        <b>${y}</b><br>
        NIP. ${f}
      </div>
    </div>
  `;return`
  <div class="report" style="font-family:Arial, sans-serif; font-size:10pt; line-height:1.35;">
    ${Ta("BAST_LIMPAH")}
    <div style="text-align:center; font-weight:bold; font-size:11pt; margin:16px 0 3px 0;">BERITA ACARA SERAH TERIMA</div>
    <div style="text-align:center; margin-bottom:14px; font-size:10pt;">Nomor : ${e}</div>
    
    <p style="text-align:justify; margin-bottom:8px; text-indent:30px;">
      Pada hari ini ${t} tanggal ${n}, kami yang bertanda tangan di bawah ini masing-masing:
    </p>

    <table style="width:100%; border-collapse:collapse; margin-bottom:8px; font-size:10pt;">
      <tr>
        <td style="width:25px; vertical-align:top; text-align:center;">1.</td>
        <td style="width:90px; vertical-align:top;">Nama</td>
        <td style="width:15px; vertical-align:top; text-align:center;">:</td>
        <td style="vertical-align:top;"><b>${y}</b></td>
      </tr>
      <tr><td></td><td style="vertical-align:top;">NIP</td><td style="text-align:center;">:</td><td>${f}</td></tr>
      <tr><td></td><td style="vertical-align:top;">Pangkat/Gol</td><td style="text-align:center;">:</td><td>${h}</td></tr>
      <tr><td></td><td style="vertical-align:top;">Jabatan</td><td style="text-align:center;">:</td><td>${T} pada Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam, bertindak untuk dan atas nama jabatan selanjutnya disebut sebagai <b>PIHAK PERTAMA</b>.</td></tr>
    </table>

    <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:10pt;">
      <tr>
        <td style="width:25px; vertical-align:top; text-align:center;">2.</td>
        <td style="width:90px; vertical-align:top;">Nama</td>
        <td style="width:15px; vertical-align:top; text-align:center;">:</td>
        <td style="vertical-align:top;"><b>${P}</b></td>
      </tr>
      <tr><td></td><td style="vertical-align:top;">NIP</td><td style="text-align:center;">:</td><td>${k}</td></tr>
      <tr><td></td><td style="vertical-align:top;">Jabatan</td><td style="text-align:center;">:</td><td>${m} pada ${c}, bertindak untuk dan atas nama instansi selanjutnya disebut sebagai <b>PIHAK KEDUA</b>.</td></tr>
    </table>

    <p style="text-align:justify; margin-bottom:10px; text-indent:30px;">
      PIHAK PERTAMA telah menyerahkan dan PIHAK KEDUA telah menerima penanganan perkara penindakan beserta barang bukti dan/atau dokumen terkait, dengan rincian sebagai berikut:
    </p>
    
    ${nt([["Sarana Pengangkut","Jenis Sarana Pengangkut",s],["Barang Bukti","Jml / Uraian / Jenis Barang",l],["Dokumen","Jenis / No. dan Tgl. Dokumen",o],["Pihak Terkait / Orang","Nama & No. Identitas",`${u} (No. Identitas: ${g})`],["Instansi Penerima","Lembaga / Instansi",c],["Maksud Penyerahan","Rangka Kegiatan","Pelimpahan penanganan perkara penindakan oleh KPU Bea dan Cukai Tipe B Batam agar dapat ditindaklanjuti secara hukum oleh instansi berwenang."]])}

    <p style="text-align:justify; margin-top:12px; margin-bottom:8px; text-indent:30px;">
      Demikian Berita Acara Serah Terima ini dibuat dengan sebenarnya dan ditandatangani oleh kedua belah pihak untuk dipergunakan sebagaimana mestinya.
    </p>

    ${Da(x,i)}
  </div>`}typeof window<"u"&&(window.BAST_PEMILIK=ae,window.BA_SEGEL=ee,window.KEP_BDN=te,window.SPSA=ne,window.BAST_LIMPAH=ie);function le(a,e){let t=document.getElementById(a);t&&(t.value=e),d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]&&(d.databasePerkara[d.activeRecordIndex][a]=e,w()),Y()}function La(){let a=document.getElementById("table_num_LPP");a&&(a.textContent=K("LPP"));let e=document.getElementById("table_num_LPF");e&&(e.textContent=K("LPF"));let t=document.getElementById("table_num_SPLIT");t&&(t.textContent=K("SPLIT"));let n=document.getElementById("table_num_SPRIN_CACAH");n&&(n.textContent=K("SPRIN_CACAH"));let i=document.getElementById("table_num_BA");i&&(i.textContent=K("BA_CACAH"));let s=document.getElementById("table_num_LHP");s&&(s.textContent=K("LHP"));let l=document.getElementById("table_date_LPP");l&&(l.textContent=v("Tanggal_LPP")!=="-"?v("Tanggal_LPP"):v("Tanggal_LP_LP_1"));let o=document.getElementById("table_date_LPF");o&&(o.textContent=v("Tanggal_LPF")!=="-"?v("Tanggal_LPF"):v("Tanggal_LP_LP_1"));let u=document.getElementById("table_date_SPLIT");u&&(u.textContent=v("Tanggal_SPLIT")!=="-"?v("Tanggal_SPLIT"):v("Tanggal_LP_LP_1"));let g=document.getElementById("table_date_SPRIN_CACAH");g&&(g.textContent=v("Tanggal_Sprin_Cacah")!=="-"?v("Tanggal_Sprin_Cacah"):v("Tanggal_SBP"));let c=document.getElementById("table_date_BA");c&&(c.textContent=v("Tanggal_BA")!=="-"?v("Tanggal_BA"):v("Tanggal_SBP"));let P=document.getElementById("table_date_LHP");P&&(P.textContent=v("Tanggal_LHP")!=="-"?v("Tanggal_LHP"):v("Tanggal_LP_LP_1")),ln()}function ln(){[{type:"LPP",num:K("No_LPP"),date:p("Tanggal_LPP"),extra:p("Catatan_LPP")},{type:"LPF",num:K("No_LPF"),date:p("Tanggal_LPF"),extra:p("Catatan_LPF")},{type:"SPLIT",num:K("Nomor_SPLIT"),date:p("Tanggal_SPLIT"),extra:p("Dasar_SPLIT")},{type:"SPRIN_CACAH",num:K("No_SPRIN_CACAH"),date:p("Tanggal_Sprin_Cacah"),extra:p("Komoditi")},{type:"BA",num:K("Nomor_BA"),date:p("Tanggal_BA"),extra:p("Hari_Cacah")},{type:"LHP",num:K("Nomor_LHP"),date:p("Tanggal_LHP"),extra:p("Jenis_Pelanggaran_Pasal")}].forEach(e=>{let t=document.getElementById(`badge_status_${e.type}`);if(!t)return;e.num&&e.num!=="-"&&e.date&&e.date!=="-"&&e.extra&&e.extra!=="-"?(t.className="badge-status badge-ready",t.textContent="SIAP CETAK"):(t.className="badge-status badge-warning",t.textContent="BELUM LENGKAP")})}function se(a){d.currentDoc=a;let e=document.getElementById("docFilterSelect");e&&(e.value=a);let t=document.getElementById("tl_reports");t&&(t.innerHTML=""),rt(a),Te(a),La()}function Y(){let a=document.getElementById("docFilterSelect"),e=a?a.value:d.currentDoc||"LPP";La(),Te(e)}function Te(a){let e=document.getElementById("reports");if(e){if(typeof ja=="function"&&ja(a),d.activeRecordIndex<0){e.innerHTML='<div class="report"><p>Data Perkara belum divalidasi. Klik "Validasi Data Perkara" untuk mulai mencetak.</p></div>',Sa(0,"pageSelectorContainer","reports");return}if(a==="ALL"){let t=[{fn:Ya,type:"LPP"},{fn:qa,type:"LPF"},{fn:Wa,type:"SPLIT"},{fn:Za,type:"SPRIN_CACAH"},{fn:Xa,type:"BA"},{fn:Qa,type:"LHP"}];e.innerHTML=t.map(n=>n.fn()).join('<div class="pagebreak"></div>')}else{let t={LPP:Ya,LPF:qa,SPLIT:Wa,SPRIN_CACAH:Za,BA:Xa,LHP:Qa}[a];t&&(e.innerHTML=t())}Ha("reports"),$a("reports"),ya(0,"reports")}}function rt(a){let e=document.getElementById("modalDynamicInputBody");if(!e)return;let t=d.databasePerkara.map((l,o)=>`<option value="${o}" ${o===d.activeRecordIndex?"selected":""}>LP-${r(l.NoLP_LP_1||"-")} / SBP-${r(l.Nomor_SBP||"-")} (${r(l.Nama_Pelaku||"Tanpa Nama")})</option>`).join(""),n=`
    <div style="background:#1e293b; border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:14px;">
      <label style="color:var(--primary); margin-bottom:4px; font-weight:700;"><i class="fi fi-rr-folder"></i> Pilih Perkara Aktif (LP & SBP)</label>
      <select id="modalRecordSelector" onchange="store.activeRecordIndex = parseInt(this.value); renderDynamicInputs('${a}'); refreshReportTableUI(); updateReportLive();" style="width:100%; padding:8px; background:#0f172a; color:#fff; border:1px solid var(--border-color); border-radius:4px; font-size:12px; font-weight:600; cursor:pointer;">
        <option value="-1">- Pilih Perkara Aktif -</option>
        ${t}
      </select>
    </div>
  `;if(d.activeRecordIndex<0){e.innerHTML=n+'<p class="small" style="color:#ef4444; text-align:center; padding:10px;">Silakan pilih data perkara terlebih dahulu dari dropdown di atas.</p>';return}let i=`
    <div style="background:#eff6ff; border-left:3px solid #3b82f6; padding:8px 12px; border-radius:4px; margin-bottom:12px; font-size:12px; color:#1e40af; line-height:1.4;">
      <i class="fi fi-rr-info" style="margin-right:4px;"></i> 
      Nomor & tanggal terisi otomatis dari data perkara. Anda tetap dapat mengubahnya secara fleksibel jika diperlukan.
    </div>
  `,s=d.databasePerkara[d.activeRecordIndex];if(a==="LPP"){(!s.No_LPP||s.No_LPP==="-"||s.No_LPP==="")&&(s.No_LPP=ua("","No_LPP","",3),w());let l=p("Catatan_LPP"),o=p("Detail_Barang_LPP")!=="-"?p("Detail_Barang_LPP"):p("Uraian_Barang");(!l||l==="-"||l==="")&&(l="Laporan penerimaan perkara diterima, segera lanjutkan dengan penelitian formal dan pengumpulan bahan keterangan lebih lanjut."),(!o||o==="")&&(o="-"),e.innerHTML=n+i+`
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LPP (Cukup Angka)</label>
          <input id="input_No_LPP" value="${r(s.No_LPP)}" oninput="saveDynamicVal('No_LPP', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LPP</label>
          <input type="date" id="input_Tgl_LPP" value="${s.Tanggal_LPP&&s.Tanggal_LPP!=="-"?s.Tanggal_LPP:document.getElementById("Tanggal_LP_LP_1")?.value||""}" onchange="saveDynamicVal('Tanggal_LPP', this.value); refreshReportTableUI();">
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <label>Catatan Atasan Pembuat LPP</label>
        <textarea id="Catatan_LPP" oninput="saveDynamicVal('Catatan_LPP', this.value)">${r(l)}</textarea>
      </div>
      <div>
        <label>Detail Uraian Barang LPP</label>
        <textarea id="Detail_Barang_LPP" oninput="saveDynamicVal('Detail_Barang_LPP', this.value)">${r(o)}</textarea>
      </div>
    `}else if(a==="LPF"){(!s.No_LPF||s.No_LPF==="-"||s.No_LPF==="")&&(s.No_LPF=ua("","No_LPF","",3),w());let l=p("Catatan_LPF");(!l||l==="-"||l==="")&&(l="Setuju dengan usulan tim peneliti, segera tindak lanjuti proses penyusunan administrasi penanganan perkara sesuai ketentuan yang berlaku."),e.innerHTML=n+i+`
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LPF (Cukup Angka)</label>
          <input id="input_No_LPF" value="${r(s.No_LPF)}" oninput="saveDynamicVal('No_LPF', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LPF</label>
          <input type="date" id="input_Tgl_LPF" value="${s.Tanggal_LPF&&s.Tanggal_LPF!=="-"?s.Tanggal_LPF:document.getElementById("Tanggal_LP_LP_1")?.value||""}" onchange="saveDynamicVal('Tanggal_LPF', this.value); refreshReportTableUI();">
        </div>
      </div>
      <div>
        <label>Catatan / Disposisi Atasan LPF</label>
        <textarea id="Catatan_LPF" oninput="saveDynamicVal('Catatan_LPF', this.value)">${r(l)}</textarea>
      </div>
    `}else if(a==="SPLIT"){(!s.Nomor_SPLIT||s.Nomor_SPLIT==="-"||s.Nomor_SPLIT==="")&&(s.Nomor_SPLIT=ua("","Nomor_SPLIT","",3),w());let l=p("Dasar_SPLIT");(!l||l==="")&&(l="-"),e.innerHTML=n+i+`
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor SPLIT (Cukup Angka)</label>
          <input id="input_Nomor_SPLIT" value="${r(s.Nomor_SPLIT)}" oninput="saveDynamicVal('Nomor_SPLIT', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal SPLIT</label>
          <input type="date" id="input_Tgl_SPLIT" value="${s.Tanggal_SPLIT&&s.Tanggal_SPLIT!=="-"?s.Tanggal_SPLIT:document.getElementById("Tanggal_LP_LP_1")?.value||""}" onchange="saveDynamicVal('Tanggal_SPLIT', this.value); refreshReportTableUI();">
        </div>
      </div>
      <div>
        <label>Dasar Tambahan / Catatan SPLIT</label>
        <textarea id="Dasar_SPLIT" oninput="saveDynamicVal('Dasar_SPLIT', this.value)">${r(l)}</textarea>
      </div>
      <h4 style="font-size:11px; margin-top:14px; color:var(--primary);">Daftar Pegawai Khusus Dokumen SPLIT:</h4>
      <div id="splitPegawaiContainer"></div>
      <button type="button" class="btn primary" onclick="addSplitPegawai()" style="margin-top:8px;">
        <i class="fi fi-rr-plus"></i> Tambah Pegawai Ke SPLIT
      </button>
    `,Le()}else if(a==="SPRIN_CACAH"){let l=s.No_SPRIN_CACAH||"",o=s.Tanggal_Sprin_Cacah&&s.Tanggal_Sprin_Cacah!=="-"?s.Tanggal_Sprin_Cacah:document.getElementById("Tanggal_SBP")?.value||"";e.innerHTML=n+`
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor SPRIN CACAH (Cukup Angka)</label>
          <input id="input_No_SPRIN" value="${r(l)}" oninput="saveDynamicVal('No_SPRIN_CACAH', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal SPRIN CACAH</label>
          <input type="date" id="input_Tgl_SPRIN" value="${o}" onchange="saveDynamicVal('Tanggal_Sprin_Cacah', this.value); refreshReportTableUI();">
        </div>
      </div>
      <p class="small" style="margin-top:0;">Daftar petugas pelaksana pencacahan barang hasil penindakan:</p>
      <div id="sprinPegawaiContainer"></div>
      <button type="button" class="btn primary" onclick="addSprinPegawai()" style="margin-top:8px;">
        <i class="fi fi-rr-plus"></i> Tambah Pegawai Ke SPRIN CACAH
      </button>
    `,Ie()}else if(a==="BA"){let l=s.Nomor_BA||"",o=s.Tanggal_BA&&s.Tanggal_BA!=="-"?s.Tanggal_BA:document.getElementById("Tanggal_SBP")?.value||"",u=s.Hari_Cacah||"",g=s.TeksTanggal||"";if(o&&(!u||!g)){let P=ea(o);u=u||P.hari.toLowerCase(),g=g||P.teksLengkap.toLowerCase(),s.Hari_Cacah=u,s.TeksTanggal=g,w()}let c=s.cacahItems||[];e.innerHTML=n+`
      <div class="grid3" style="margin-bottom:10px;">
        <div>
          <label>Nomor BA (Cukup Angka)</label>
          <input id="input_Nomor_BA" value="${r(l)}" oninput="saveDynamicVal('Nomor_BA', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal BA Cacah</label>
          <input type="date" id="input_Tgl_BA" value="${o}" onchange="saveDynamicVal('Tanggal_BA', this.value); if(this.value){ const r = autoGenerateTeksTanggalBA(this.value); saveDynamicVal('Hari_Cacah', r.hari.toLowerCase()); saveDynamicVal('TeksTanggal', r.teksLengkap.toLowerCase()); (document.getElementById('Hari_Cacah') as HTMLInputElement).value = r.hari.toLowerCase(); (document.getElementById('TeksTanggal') as HTMLInputElement).value = r.teksLengkap.toLowerCase(); } refreshReportTableUI();">
        </div>
        <div>
          <label>Hari Cacah (Huruf Kecil)</label>
          <input id="Hari_Cacah" class="lowercase-input" value="${r(u)}" oninput="saveDynamicVal('Hari_Cacah', this.value.toLowerCase());">
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <label>Teks Tanggal Lengkap (Huruf Kecil)</label>
        <input id="TeksTanggal" class="lowercase-input" value="${r(g)}" oninput="saveDynamicVal('TeksTanggal', this.value.toLowerCase());">
      </div>
      <h4>Isian Tambahan Barang Hasil Pencacahan (BA)</h4>
      <div id="items"></div>
      <button type="button" class="btn secondary" onclick="addItem()" style="margin-top:6px;">
        <i class="fi fi-rr-plus"></i> Tambah Barang Cacah
      </button>
    `,Ae(c)}else if(a==="LHP"){let l=s.Nomor_LHP||"",o=s.Tanggal_LHP&&s.Tanggal_LHP!=="-"?s.Tanggal_LHP:document.getElementById("Tanggal_LP_LP_1")?.value||"",u=s.Penyelesaian_Perkara||s.Alternatif_Penyelesaian_Perkara||"",g=c=>u.toLowerCase().includes(c.toLowerCase())?"checked":"";e.innerHTML=n+`
      <div class="grid" style="margin-bottom:10px;">
        <div>
          <label>Nomor LHP (Cukup Angka)</label>
          <input id="input_Nomor_LHP" value="${r(l)}" oninput="saveDynamicVal('Nomor_LHP', this.value); refreshReportTableUI();">
        </div>
        <div>
          <label>Tanggal LHP</label>
          <input type="date" id="input_Tgl_LHP" value="${o}" onchange="saveDynamicVal('Tanggal_LHP', this.value); refreshReportTableUI();">
        </div>
      </div>

      <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.15); border:1px solid var(--border-color, #334155); border-radius:6px;">
          <label style="font-weight:600; font-size:11px; margin-bottom:8px; display:block; text-align:left; text-transform:none; letter-spacing:normal;">Alternatif Penyelesaian Perkara (Centang Pilihan):</label>

          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 6px 12px; margin-bottom:10px;">
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="bdn" ${g("bdn")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Penetapan BDN</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="spsa" ${g("spsa")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Sanksi Denda (SPSA)</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="kembali" ${g("kembali")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Barang Dikembalikan</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="reekspor" ${g("reekspor")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Re-Ekspor</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="keluar_sebagian" ${g("keluar_sebagian")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pengeluaran Barang Sebagian</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="ur" ${g("ur")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Ultimum Remedium (Pasal 40B)</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="musnah" ${g("musnah")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pemusnahan (BMN)</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="sidik" ${g("sidik")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Naik Penyidikan</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="pelimpahan" ${g("pelimpahan")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pelimpahan / Serah Terima</span>
            </label>

            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="batal_dok" ${g("batal_dok")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Pembatalan Dokumen</span>
            </label>
            <label style="display:inline-flex; align-items:center; gap:6px; font-size:11px; cursor:pointer; margin:0; width:auto; text-align:left; font-weight:normal; text-transform:none;">
              <input type="checkbox" class="chk-lhp-opsi" value="henti" ${g("henti")} onchange="syncUraianKombinasiLHP()" style="width:14px; height:14px; margin:0; flex-shrink:0;">
              <span>Tidak Ditemukan Pelanggaran</span>
            </label>
          </div>

          <textarea id="input_Penyelesaian_Perkara" rows="5" class="form-control" style="width:100%; font-size:12px; line-height:1.5; resize:vertical;" placeholder="Uraian otomatis akan terbentuk di sini berdasarkan opsi yang dicentang..." oninput="saveDynamicVal('Penyelesaian_Perkara', this.value); saveDynamicVal('Alternatif_Penyelesaian_Perkara', this.value);">${r(u)}</textarea>
      </div>
    `}}function rn(){let a={};document.querySelectorAll(".chk-lhp-opsi:checked").forEach(i=>{a[i.value]=!0});let e=[];a.bdn&&a.spsa&&!a.kembali?(e.push("Terhadap barang hasil penindakan yang melanggar ketentuan ditetapkan sebagai Barang yang Dikuasai Negara (BDN) untuk diproses menjadi Barang Milik Negara (BMN)."),e.push("Terhadap pihak yang bertanggung jawab dikenakan sanksi administrasi berupa denda dengan menerbitkan Surat Penetapan Sanksi Administrasi (SPSA).")):a.bdn&&a.kembali?(e.push("Terhadap barang bukti hasil penindakan yang terbukti melanggar ketentuan perundang-undangan ditetapkan sebagai Barang yang Dikuasai Negara (BDN) untuk selanjutnya diusulkan menjadi Barang Milik Negara (BMN)."),e.push("Terhadap barang dan/atau sarana pengangkut yang telah diteliti dan tidak terbukti melanggar ketentuan peraturan perundang-undangan dikembalikan kepada pemilik yang sah."),a.spsa&&e.push("Terhadap pelanggaran administratif yang timbul dikenakan sanksi administrasi berupa denda (SPSA).")):a.spsa&&a.kembali&&!a.bdn?(e.push("Terhadap pihak yang bertanggung jawab dikenakan sanksi administrasi berupa denda dengan menerbitkan Surat Penetapan Sanksi Administrasi (SPSA) dan penagihan pungutan negara."),e.push("Terhadap barang hasil penindakan dapat disetujui pengeluarannya / dikembalikan kepada pemilik setelah seluruh kewajiban pungutan negara dan sanksi denda (SPSA) dilunasi.")):a.ur||a.ur&&a.musnah?(e.push("Memberikan rekomendasi penyelesaian perkara melalui asas Ultimum Remedium (Pasal 40B UU Cukai jo. UU HPP) dengan mewajibkan pembayaran sanksi denda sebesar 4 (empat) kali nilai cukai."),e.push("Terhadap Barang Kena Cukai (BKC) hasil penindakan dirampas untuk negara, ditetapkan sebagai Barang Milik Negara (BMN), dan selanjutnya diusulkan untuk dilakukan pemusnahan."),a.sidik&&e.push("Apabila sanksi denda tidak diselesaikan dalam jangka waktu yang ditentukan, proses perkara segera ditingkatkan ke tahap Penyidikan.")):a.reekspor&&a.keluar_sebagian?(e.push("Terhadap barang impor yang terkena ketentuan larangan dan pembatasan (lartas) direkomendasikan untuk diekspor kembali (re-ekspor) ke negara asal dalam batas waktu yang ditentukan."),e.push("Terhadap barang impor yang telah memenuhi dokumen perizinan disetujui untuk dilakukan pengeluaran barang sebagian (parsial release)."),a.bdn&&e.push("Apabila barang yang dire-ekspor tidak dikeluarkan dalam batas waktu yang ditetapkan, maka diproses penetapannya menjadi Barang yang Dikuasai Negara (BDN).")):(a.bdn&&e.push("Terhadap seluruh barang hasil penindakan ditetapkan sebagai Barang yang Dikuasai Negara (BDN) untuk diproses pengadministrasiannya menjadi BMN."),a.spsa&&e.push("Dikenakan sanksi administrasi berupa denda sesuai ketentuan dengan menerbitkan Surat Penetapan Sanksi Administrasi (SPSA)."),a.kembali&&e.push("Terhadap barang hasil penindakan yang telah memenuhi ketentuan peraturan perundang-undangan dikembalikan kepada pemilik yang sah."),a.reekspor&&e.push("Terhadap barang impor yang tidak memenuhi ketentuan perizinan direkomendasikan untuk diekspor kembali (re-ekspor) ke negara asal."),a.keluar_sebagian&&e.push("Terhadap barang impor yang telah memenuhi persyaratan disetujui untuk dilakukan pengeluaran barang sebagian."),a.musnah&&e.push("Terhadap barang hasil penindakan yang tidak laik atau dilarang diusulkan untuk dilakukan pemusnahan sesuai prosedur yang berlaku."),a.sidik&&e.push("Telah terpenuhi bukti permulaan yang cukup sehingga penanganan perkara direkomendasikan untuk Ditingkatkan ke Tahap Penyidikan (menerbitkan SPRIN-DIK dan SPDP)."),a.pelimpahan&&e.push("Melakukan serah terima berkas perkara beserta barang bukti kepada instansi yang berwenang."),a.batal_dok&&e.push("Dilakukan pembatalan terhadap dokumen pemberitahuan pabean sesuai tata laksana kepabeanan yang berlaku."),a.henti&&e.push("Proses penelitian dihentikan karena tidak ditemukan bukti permulaan yang cukup adanya pelanggaran peraturan perundang-undangan."));let t=e.map((i,s)=>`${s+1}. ${i}`).join(`

`),n=document.getElementById("input_Penyelesaian_Perkara");n&&(n.value=t,n.dispatchEvent(new Event("input",{bubbles:!0})),typeof le=="function"&&(le("Penyelesaian_Perkara",t),le("Alternatif_Penyelesaian_Perkara",t)))}function Ae(a){let e=document.getElementById("items");e&&(e.innerHTML=a.map((t,n)=>`
    <div class="item">
      <div class="grid5">
        <div><label>Komoditi</label><input value="${r(t.komoditi||"")}" data-i="${n}" data-k="komoditi"></div>
        <div><label>Uraian Barang</label><input value="${r(t.uraian||"")}" data-i="${n}" data-k="uraian"></div>
        <div><label>Jumlah</label><input value="${r(t.jumlah||"")}" data-i="${n}" data-k="jumlah"></div>
        <div><label>Kondisi</label><input value="${r(t.kondisi||"")}" data-i="${n}" data-k="kondisi"></div>
        <div><label>Keterangan</label><input value="${r(t.keterangan||"")}" data-i="${n}" data-k="keterangan"></div>
      </div>
      <button type="button" class="btn danger" onclick="delItem(${n})" style="margin-top:6px;">
        <i class="fi fi-rr-trash"></i> Hapus Barang
      </button>
    </div>
  `).join(""),e.querySelectorAll("input[data-i]").forEach(t=>{t.oninput=()=>{if(d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]){let n=d.databasePerkara[d.activeRecordIndex];n.cacahItems||(n.cacahItems=[]),n.cacahItems[t.dataset.i][t.dataset.k]=t.value,w(),Y()}}}))}function sn(){if(d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]){let a=d.databasePerkara[d.activeRecordIndex];a.cacahItems||(a.cacahItems=[]),a.cacahItems.push({komoditi:"",uraian:"",jumlah:"",kondisi:"",keterangan:"",asal:"-"}),w(),Ae(a.cacahItems),Y()}}function on(a){if(d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]){let e=d.databasePerkara[d.activeRecordIndex];e.cacahItems||(e.cacahItems=[]),e.cacahItems.splice(a,1),w(),Ae(e.cacahItems),Y()}}function dn(){if(d.activeRecordIndex<0)return;let a=d.databasePerkara[d.activeRecordIndex];(!a.splitPegawaiList||a.splitPegawaiList.length===0)&&(a.splitPegawaiList=[{nama:p("form_nama_seksi"),nip:p("form_nip_seksi"),jabatan:p("form_jabatan_seksi")||"Kepala Seksi Penyidikan"},{nama:p("form_ketua_tim"),nip:p("form_nip_ketua_tim"),jabatan:p("form_jabatan_ketua_tim")||"Ketua Tim Peneliti"},{nama:p("form_petugas_lpf"),nip:p("form_nip_petugas_lpf"),jabatan:p("form_jabatan_petugas_lpf")||"Petugas LPF"},{nama:p("form_pembuat_lpp"),nip:p("form_nip_pembuat_lpp"),jabatan:p("form_jabatan_pembuat_lpp")||"Petugas LPP"}]),a.splitPegawaiList.push({nama:"",nip:"",jabatan:"Anggota Tim Peneliti"}),w(),Le(),Y()}function Le(){let a=document.getElementById("splitPegawaiContainer");if(!a||d.activeRecordIndex<0)return;let e=d.databasePerkara[d.activeRecordIndex];(!e.splitPegawaiList||e.splitPegawaiList.length===0)&&(e.splitPegawaiList=[{nama:p("form_nama_seksi"),nip:p("form_nip_seksi"),jabatan:p("form_jabatan_seksi")||"Kepala Seksi Penyidikan"},{nama:p("form_ketua_tim"),nip:p("form_nip_ketua_tim"),jabatan:p("form_jabatan_ketua_tim")||"Ketua Tim Peneliti"},{nama:p("form_petugas_lpf"),nip:p("form_nip_petugas_lpf"),jabatan:p("form_jabatan_petugas_lpf")||"Petugas LPF"},{nama:p("form_pembuat_lpp"),nip:p("form_nip_pembuat_lpp"),jabatan:p("form_jabatan_pembuat_lpp")||"Petugas LPP"}]);let t=e.splitPegawaiList,n=Array.from(new Set([...Pa,...ba]));a.innerHTML=t.map((i,s)=>`
    <div class="item">
      <div class="grid3">
        <div><label>Nama Pegawai #${s+1}</label><input value="${r(i.nama||"")}" data-pi="${s}" data-pk="nama"></div>
        <div><label>NIP Pegawai #${s+1}</label><input value="${r(i.nip||"")}" data-pi="${s}" data-pk="nip"></div>
        <div>
          <label>Jabatan Pegawai #${s+1}</label>
          <select data-pi="${s}" data-pk="jabatan" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
            ${ia(n,i.jabatan||"Anggota Tim Peneliti","- Pilih Jabatan -")}
          </select>
        </div>
      </div>
      <button type="button" class="btn danger" onclick="delSplitPegawai(${s})" style="margin-top:8px;">
        <i class="fi fi-rr-trash"></i> HAPUS PEGAWAI
      </button>
    </div>
  `).join(""),a.querySelectorAll("input[data-pi], select[data-pi]").forEach(i=>{i.onchange=i.oninput=()=>{if(d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]){let s=d.databasePerkara[d.activeRecordIndex];s.splitPegawaiList||(s.splitPegawaiList=[]),s.splitPegawaiList[i.dataset.pi][i.dataset.pk]=i.value,w(),Y()}}})}function pn(a){if(d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]){let e=d.databasePerkara[d.activeRecordIndex];e.splitPegawaiList&&(e.splitPegawaiList.splice(a,1),w(),Le(),Y())}}function gn(){if(d.activeRecordIndex<0)return;let a=d.databasePerkara[d.activeRecordIndex];(!a.sprinPegawaiList||a.sprinPegawaiList.length===0)&&(a.sprinPegawaiList=[{nama:p("form_ketua_tim"),nip:p("form_nip_ketua_tim"),pangkat:p("form_gol_ketua_tim"),jabatan:p("form_jabatan_ketua_tim")||"Ketua Tim Peneliti"},{nama:p("form_pembuat_lpp"),nip:p("form_nip_pembuat_lpp"),pangkat:p("form_gol_pembuat_lpp"),jabatan:p("form_jabatan_pembuat_lpp")||"Petugas LPP"},{nama:p("form_petugas_lpf"),nip:p("form_nip_petugas_lpf"),pangkat:p("form_gol_petugas_lpf"),jabatan:p("form_jabatan_petugas_lpf")||"Petugas LPF"},{nama:p("form_indak_1"),nip:p("form_nip_indak_1"),pangkat:p("form_gol_indak_1"),jabatan:p("form_jabatan_indak_1")||"Petugas Penindakan 1"},{nama:p("form_indak_2"),nip:p("form_nip_indak_2"),pangkat:p("form_gol_indak_2"),jabatan:p("form_jabatan_indak_2")||"Petugas Penindakan 2"},{nama:p("form_indak_lainnya"),nip:p("form_nip_indak_lainnya"),pangkat:p("form_gol_indak_lainnya"),jabatan:p("form_jabatan_indak_lainnya")||"Petugas Penindakan 3"}]),a.sprinPegawaiList.push({nama:"",nip:"",pangkat:"",jabatan:"Petugas Pencacah"}),w(),Ie(),Y()}function Ie(){let a=document.getElementById("sprinPegawaiContainer");if(!a||d.activeRecordIndex<0)return;let e=d.databasePerkara[d.activeRecordIndex];(!e.sprinPegawaiList||e.sprinPegawaiList.length===0)&&(e.sprinPegawaiList=[{nama:p("form_ketua_tim"),nip:p("form_nip_ketua_tim"),pangkat:p("form_gol_ketua_tim"),jabatan:p("form_jabatan_ketua_tim")||"Ketua Tim Peneliti"},{nama:p("form_pembuat_lpp"),nip:p("form_nip_pembuat_lpp"),pangkat:p("form_gol_pembuat_lpp"),jabatan:p("form_jabatan_pembuat_lpp")||"Petugas LPP"},{nama:p("form_petugas_lpf"),nip:p("form_nip_petugas_lpf"),pangkat:p("form_gol_petugas_lpf"),jabatan:p("form_jabatan_petugas_lpf")||"Petugas LPF"},{nama:p("form_indak_1"),nip:p("form_nip_indak_1"),pangkat:p("form_gol_indak_1"),jabatan:p("form_jabatan_indak_1")||"Petugas Penindakan 1"},{nama:p("form_indak_2"),nip:p("form_nip_indak_2"),pangkat:p("form_gol_indak_2"),jabatan:p("form_jabatan_indak_2")||"Petugas Penindakan 2"},{nama:p("form_indak_lainnya"),nip:p("form_nip_indak_lainnya"),pangkat:p("form_gol_indak_lainnya"),jabatan:p("form_jabatan_indak_lainnya")||"Petugas Penindakan 3"}]);let t=e.sprinPegawaiList,n=Array.from(new Set([...Pa,...ba]));a.innerHTML=t.map((i,s)=>`
    <div class="item">
      <div class="grid4">
        <div><label>Nama Pegawai #${s+1}</label><input value="${r(i.nama||"")}" data-spi="${s}" data-spk="nama"></div>
        <div><label>NIP Pegawai #${s+1}</label><input value="${r(i.nip||"")}" data-spi="${s}" data-spk="nip"></div>
        <div>
          <label>Pangkat/Gol. #${s+1}</label>
          <select data-spi="${s}" data-spk="pangkat" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
            ${ia(J,i.pangkat||"","- Pilih Golongan -")}
          </select>
        </div>
        <div>
          <label>Jabatan #${s+1}</label>
          <select data-spi="${s}" data-spk="jabatan" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
            ${ia(n,i.jabatan||"Petugas Pencacah","- Pilih Jabatan -")}
          </select>
        </div>
      </div>
      <button type="button" class="btn danger" onclick="delSprinPegawai(${s})" style="margin-top:8px;">
        <i class="fi fi-rr-trash"></i> Hapus Pegawai
      </button>
    </div>
  `).join(""),a.querySelectorAll("input[data-spi], select[data-spi]").forEach(i=>{i.onchange=i.oninput=()=>{if(d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]){let s=d.databasePerkara[d.activeRecordIndex];s.sprinPegawaiList||(s.sprinPegawaiList=[]),s.sprinPegawaiList[i.dataset.spi][i.dataset.spk]=i.value,w(),Y()}}})}function un(a){if(d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]){let e=d.databasePerkara[d.activeRecordIndex];e.sprinPegawaiList&&(e.sprinPegawaiList.splice(a,1),w(),Ie(),Y())}}function re(a,e){d.activeRecordIndex>=0&&d.databasePerkara[d.activeRecordIndex]&&(d.databasePerkara[d.activeRecordIndex][a]=e,w(),mn())}function mn(){if(d.activeRecordIndex<0)return;let a=d.databasePerkara[d.activeRecordIndex],e=document.getElementById("tl_table_num_BAST_PEMILIK");e&&(e.textContent=F("BAST_PEMILIK"));let t=document.getElementById("tl_table_date_BAST_PEMILIK");t&&(t.textContent=j(a.TL_Tanggal_Surat||a.Tanggal_LP_LP_1));let n=document.getElementById("tl_table_num_BA_SEGEL");n&&(n.textContent=F("BA_SEGEL"));let i=document.getElementById("tl_table_date_BA_SEGEL");i&&(i.textContent=j(a.TL_Tanggal_Surat||a.Tanggal_LP_LP_1));let s=document.getElementById("tl_table_num_KEP_BDN");s&&(s.textContent=F("KEP_BDN"));let l=document.getElementById("tl_table_date_KEP_BDN");l&&(l.textContent=j(a.KEP_Tanggal_ND||a.Tanggal_LP_LP_1));let o=document.getElementById("tl_table_num_SPSA");o&&(o.textContent=F("SPSA"));let u=document.getElementById("tl_table_date_SPSA");u&&(u.textContent=j(a.SPSA_Tanggal||a.Tanggal_LP_LP_1));let g=document.getElementById("tl_table_num_BAST_LIMPAH");g&&(g.textContent=F("BAST_LIMPAH"));let c=document.getElementById("tl_table_date_BAST_LIMPAH");c&&(c.textContent=j(a.Limpah_Tanggal||a.Tanggal_LP_LP_1)),cn(),Ua(d.currentTLDoc),ma(d.currentTLDoc)}function cn(){if(d.activeRecordIndex<0||!d.databasePerkara[d.activeRecordIndex])return;let a=d.databasePerkara[d.activeRecordIndex];[{type:"BAST_PEMILIK",num:F("BAST_PEMILIK"),date:a.TL_Tanggal_Surat||a.Tanggal_LP_LP_1,extra:a.TL_Hari_BAST&&a.TL_Tgl_Huruf_BAST},{type:"BA_SEGEL",num:F("BA_SEGEL"),date:a.TL_Tanggal_Surat||a.Tanggal_LP_LP_1,extra:a.TL_Segel_No_SPLI&&a.TL_Segel_Hari},{type:"KEP_BDN",num:F("KEP_BDN"),date:a.KEP_Tanggal_ND||a.Tanggal_LP_LP_1,extra:a.KEP_Nomor_ND&&a.Kepala_Kantor},{type:"SPSA",num:F("SPSA"),date:a.SPSA_Tanggal||a.Tanggal_LP_LP_1,extra:a.SPSA_Denda&&a.SPSA_Pasal_Pelanggaran},{type:"BAST_LIMPAH",num:F("BAST_LIMPAH"),date:a.Limpah_Tanggal||a.Tanggal_LP_LP_1,extra:a.Instansi_Penerima&&a.Limpah_Pejabat_Penerima}].forEach(t=>{let n=document.getElementById(`badge_status_${t.type}`);if(!n)return;t.num&&t.num!=="-"&&t.date&&t.date!=="-"&&t.extra&&t.extra!=="-"?(n.className="badge-status badge-ready",n.textContent="SIAP CETAK"):(n.className="badge-status badge-warning",n.textContent="BELUM LENGKAP")})}function oe(a){d.currentTLDoc=a;let e=document.getElementById("tlDocFilterSelect");e&&(e.value=a);let t=document.getElementById("reports");t&&(t.innerHTML=""),Ba(a),Ua(a),ma(a)}function ma(a){let e=document.getElementById("tl_reports");if(e){if(typeof Ba=="function"&&Ba(a),d.activeRecordIndex<0){e.innerHTML='<div class="report"><p>Silakan validasi SBP & LP untuk mencetak Dokumen Tindak Lanjut.</p></div>',Sa(0,"tlPageSelectorContainer","tl_reports");return}if(a==="ALL"){let t=[{fn:ae,type:"BAST_PEMILIK"},{fn:ee,type:"BA_SEGEL"},{fn:te,type:"KEP_BDN"},{fn:ne,type:"SPSA"},{fn:ie,type:"BAST_LIMPAH"}];e.innerHTML=t.map(n=>n.fn()).join('<div class="pagebreak"></div>')}else{let t={BAST_PEMILIK:ae,BA_SEGEL:ee,KEP_BDN:te,SPSA:ne,BAST_LIMPAH:ie}[a];t&&(e.innerHTML=t())}Ha("tl_reports"),$a("tl_reports"),ya(0,"tl_reports")}}function Ua(a){let e=document.getElementById("modalDynamicInputBodyTL");if(!e)return;if(d.activeRecordIndex<0){e.innerHTML='<h4>PILIH PERKARA DULU</h4><p class="small">Silakan gunakan tombol Validasi Data LHP untuk mulai.</p>';return}let t=d.databasePerkara[d.activeRecordIndex];if(a==="BAST_PEMILIK"){if(t.TL_BAST_SarkutList||(t.TL_BAST_SarkutList=[{jenis:t.TL_Nama_Sarkut||t.Pengangkut||"-",nopol:t.TL_No_Reg_Sarkut||"-"}]),!t.TL_BAST_BarangList){let l=t.Jumlah_Koli||"1",o=t.Jenis_Koli||"koli",u=t.Komoditi||t.Uraian_Barang||"Barang Bukti",g=!!(t.No_Kontainer&&t.No_Kontainer!=="-"),c=g?"FCL":t.Jenis_Kemasan||"LCL",P=he({jumlahKemasan:l,jenisKemasan:c,nomorKontainer:g?`${t.No_Kontainer}${t.Ukuran_Kontainer?" / "+t.Ukuran_Kontainer:""}`:""}),m=ve({jumlah:l,satuan:o,namaBarang:u,akhiranTipe:""});t.TL_BAST_BarangList=[{jumlahKemasan:l,jenisKemasan:c,nomorKontainer:t.No_Kontainer||"",kemasan:P,jumlahBarang:l,satuanBarang:o,namaBarang:u,tambahanAkhiran:"",uraian:m}]}if(!t.TL_BAST_DokumenList){let l=t.Dokumen_Pemberitahuan||"BC 2.0",o=t.Nomor_Dok_Pemberitahuan||"-",u=t.Tanggal_Dokumen_Pemberitahuan||"";t.TL_BAST_DokumenList=[{jenisDok:l,nomorDok:o,tanggalDok:u,uraian:xe(l,o,u)}]}t.TL_BAST_OrangList||(t.TL_BAST_OrangList=[{nama:"-",identitas:"-"}]),window.updateBastDokumenOtomatis=function(l){let o=t.TL_BAST_DokumenList[l];o&&(o.uraian=xe(o.jenisDok||"BC 2.0",o.nomorDok||"-",o.tanggalDok||""),w(),ma("BAST_PEMILIK"))};let n=t.TL_Rangka_Penyerahan||ce[0],i=!ce.includes(n);window.onTanggalBastChange=function(l){if(re("TL_Tanggal_Surat",l),!l)return;let o=ea(l);re("TL_Hari_BAST",o.hari),re("TL_Tgl_Huruf_BAST",o.teksLengkap);let u=document.getElementById("input_TL_Hari_BAST");u&&(u.value=o.hari);let g=document.getElementById("input_TL_Tgl_Huruf_BAST");g&&(g.value=o.teksLengkap),ma("BAST_PEMILIK")},window.addBastItem=function(l){l==="sarkut"&&t.TL_BAST_SarkutList.push({jenis:"",nopol:""}),l==="barang"&&t.TL_BAST_BarangList.push({kemasan:"",uraian:"",jumlahKemasan:"",jenisKemasan:"LCL",nomorKontainer:"",jumlahBarang:"",satuanBarang:"koli",namaBarang:"",tambahanAkhiran:""}),l==="dokumen"&&t.TL_BAST_DokumenList.push({jenisDok:"BC 2.0",nomorDok:"",tanggalDok:"",uraian:""}),l==="orang"&&t.TL_BAST_OrangList.push({nama:"",identitas:""}),w(),Ua("BAST_PEMILIK"),ma("BAST_PEMILIK")},window.delBastItem=function(l,o){l==="sarkut"&&t.TL_BAST_SarkutList.length>1&&t.TL_BAST_SarkutList.splice(o,1),l==="barang"&&t.TL_BAST_BarangList.length>1&&t.TL_BAST_BarangList.splice(o,1),l==="dokumen"&&t.TL_BAST_DokumenList.length>1&&t.TL_BAST_DokumenList.splice(o,1),l==="orang"&&t.TL_BAST_OrangList.length>1&&t.TL_BAST_OrangList.splice(o,1),w(),Ua("BAST_PEMILIK"),ma("BAST_PEMILIK")},window.updateBastBarangOtomatis=function(l){let o=t.TL_BAST_BarangList[l];o&&(o.kemasan=he({jumlahKemasan:o.jumlahKemasan,jenisKemasan:o.jenisKemasan,nomorKontainer:o.nomorKontainer}),o.uraian=ve({jumlah:o.jumlahBarang,satuan:o.satuanBarang,namaBarang:o.namaBarang,akhiranTipe:o.tambahanAkhiran}),w(),ma("BAST_PEMILIK"))};let s=l=>String.fromCharCode(97+l)+".";e.innerHTML=`
      <!-- 2. BARANG -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">2. BARANG</span>
          <button type="button" class="btn primary" onclick="addBastItem('barang')" style="padding:2px 8px; font-size:11px;">+ Tambah Barang</button>
        </div>
        ${t.TL_BAST_BarangList.map(function(l,o){var u=l.jenisKemasan&&(l.jenisKemasan.toUpperCase().includes("FCL")||l.jenisKemasan.toLowerCase().includes("peti kemas"));return`
            <div style="background:#1e293b; padding:10px; border-radius:6px; margin-bottom:8px; border:1px solid #334155;">
              <div style="font-weight:bold; font-size:11px; margin-bottom:6px; color:var(--primary); display:flex; justify-content:space-between;">
                <span>${s(o)} Barang #${o+1}</span>${t.TL_BAST_BarangList.length>1?`<button type="button" class="btn danger" onclick="delBastItem('barang', ${o})" style="padding:2px 8px; font-size:10px;">Hapus Barang Ini</button>`:""}
              </div>

              <!-- Jml/Kemasan -->
              <div style="background:rgba(15, 23, 42, 0.6); padding:8px; border-radius:4px; border:1px solid #334155; margin-bottom:8px;">
                <div style="font-size:10px; font-weight:700; color:#fbbf24; margin-bottom:4px; text-transform:uppercase;">Jml/Kemasan</div>
                <div class="grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:6px;">
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jumlah Kemasan</label>
                    <input value="${r(l.jumlahKemasan||"")}" placeholder="Contoh: 1" oninput="rec.TL_BAST_BarangList[${o}].jumlahKemasan = this.value; updateBastBarangOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                  </div>
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jenis Kemasan</label>
                    <select onchange="rec.TL_BAST_BarangList[${o}].jenisKemasan = this.value; renderTLFormSection('BAST_PEMILIK'); updateBastBarangOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                      ${ia(ht,l.jenisKemasan||"","- Pilih Kemasan -")}
                    </select>
                  </div>
                </div>

                ${u?`
                  <div style="margin-bottom:6px;">
                    <label style="font-size:10px; color:#93c5fd;">Nomor Peti Kemas / Kontainer</label>
                    <input value="${r(l.nomorKontainer||"")}" placeholder="Contoh: OOCL 234567 / 40 feet" oninput="rec.TL_BAST_BarangList[${o}].nomorKontainer = this.value; updateBastBarangOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #3b82f6; border-radius:4px; font-size:11px;">
                  </div>
                `:""}

                <div style="margin-top:6px;">
                  <label style="font-size:10px; color:#93c5fd;">Preview Jml/Kemasan</label>
                  <input value="${r(l.kemasan||"")}" oninput="rec.TL_BAST_BarangList[${o}].kemasan = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');" style="width:100%; padding:6px; background:#0f172a; color:#93c5fd; border:1px solid #3b82f6; border-radius:4px; font-size:11px;">
                </div>
              </div>

              <!-- Jumlah/Jenis Barang -->
              <div style="background:rgba(15, 23, 42, 0.6); padding:8px; border-radius:4px; border:1px solid #334155; margin-bottom:8px;">
                <div style="font-size:10px; font-weight:700; color:#fbbf24; margin-bottom:4px; text-transform:uppercase;">Jumlah/Jenis Barang</div>
                <div class="grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:6px;">
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jumlah Barang</label>
                    <input value="${r(l.jumlahBarang||"")}" placeholder="Contoh: 12" oninput="rec.TL_BAST_BarangList[${o}].jumlahBarang = this.value; updateBastBarangOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                  </div>
                  <div>
                    <label style="font-size:10px; color:#94a3b8;">Jenis Koli / Satuan</label>
                    <select onchange="rec.TL_BAST_BarangList[${o}].satuanBarang = this.value; updateBastBarangOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                      ${ia(oa,l.satuanBarang||"","- Pilih Satuan -")}
                    </select>
                  </div>
                </div>

                <div style="margin-bottom:6px;">
                  <label style="font-size:10px; color:#94a3b8;">Nama / Komoditi Barang</label>
                  <input value="${r(l.namaBarang||"")}" placeholder="Contoh: Sepatu Olahraga Pria" oninput="rec.TL_BAST_BarangList[${o}].namaBarang = this.value; updateBastBarangOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                </div>

                <div style="margin-bottom:6px;">
                  <label style="font-size:10px; color:#cbd5e1;">Pilihan Tambahan Akhiran</label>
                  <select onchange="rec.TL_BAST_BarangList[${o}].tambahanAkhiran = this.value; updateBastBarangOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                    <option value="" ${l.tambahanAkhiran?"":"selected"}>- Tanpa Tambahan Akhiran -</option>
                    ${Ra.map(g=>`<option value="${g.value}" ${l.tambahanAkhiran===g.value?"selected":""}>${g.label}</option>`).join("")}
                  </select>
                </div>

                <div style="margin-bottom:6px;">
                  <label style="font-size:10px; color:#34d399;">Uraian Barang (Otomatis)</label>
                  <input value="${r(l.uraian||"")}" placeholder="Ketik atau sesuaikan uraian barang..." oninput="rec.TL_BAST_BarangList[${o}].uraian = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');" style="width:100%; padding:6px; background:#0f172a; color:#34d399; border:1px solid #34d399; border-radius:4px; font-size:11px;">
                </div>
              </div>
            </div>
          `}).join("")}
      </div>

      <!-- 3. DOKUMEN -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">3. DOKUMEN</span>
          <button type="button" class="btn primary" onclick="addBastItem('dokumen')" style="padding:2px 8px; font-size:11px;">+ Tambah Dokumen</button>
        </div>
        ${t.TL_BAST_DokumenList.map((l,o)=>`
          <div style="background:#1e293b; padding:10px; border-radius:6px; margin-bottom:8px; border:1px solid #334155;">
            <div style="font-weight:bold; font-size:11px; margin-bottom:6px; color:var(--primary);">${s(o)} Dokumen #${o+1}</div>
            
            <div class="grid3" style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:8px; margin-bottom:6px;">
              <div>
                <label style="font-size:10px; color:#94a3b8;">Jenis Dokumen</label>
                <select onchange="rec.TL_BAST_DokumenList[${o}].jenisDok = this.value; updateBastDokumenOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
                  ${ia(da,l.jenisDok||"BC 2.0","- Pilih Jenis Dokumen -")}
                </select>
              </div>
              <div>
                <label style="font-size:10px; color:#94a3b8;">Nomor Dokumen</label>
                <input value="${r(l.nomorDok||"")}" placeholder="Contoh: 001234" oninput="rec.TL_BAST_DokumenList[${o}].nomorDok = this.value; updateBastDokumenOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
              </div>
              <div>
                <label style="font-size:10px; color:#94a3b8;">Tanggal Dokumen</label>
                <input type="date" value="${r(l.tanggalDok||"")}" onchange="rec.TL_BAST_DokumenList[${o}].tanggalDok = this.value; updateBastDokumenOtomatis(${o});" style="width:100%; padding:6px; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px; font-size:11px;">
              </div>
            </div>

            <div>
              <label style="font-size:10px; color:#38bdf8;">Preview Uraian Dokumen</label>
              <input value="${r(l.uraian||"")}" oninput="rec.TL_BAST_DokumenList[${o}].uraian = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');" style="width:100%; padding:6px; background:#0f172a; color:#38bdf8; border:1px solid #0284c7; border-radius:4px; font-size:11px;">
            </div>

            ${t.TL_BAST_DokumenList.length>1?`
              <button type="button" class="btn danger" onclick="delBastItem('dokumen', ${o})" style="margin-top:6px; padding:2px 8px; font-size:10px;">
                <i class="fi fi-rr-trash"></i> Hapus Dokumen
              </button>
            `:""}
          </div>
        `).join("")}
      </div>

      <!-- 4. ORANG -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:#cbd5e1;">4. ORANG</span>
          <button type="button" class="btn primary" onclick="addBastItem('orang')" style="padding:2px 8px; font-size:11px;">+ Tambah Orang</button>
        </div>
        ${t.TL_BAST_OrangList.map((l,o)=>`
          <div style="background:#1e293b; padding:8px; border-radius:4px; margin-bottom:6px;">
            <div style="font-weight:bold; font-size:11px; margin-bottom:4px; color:var(--primary);">${s(o)} Orang #${o+1}</div>
            <div class="grid">
              <div><label>Nama</label><input value="${r(l.nama)}" oninput="rec.TL_BAST_OrangList[${o}].nama = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');"></div>
              <div><label>No. Identitas</label><input value="${r(l.identitas)}" oninput="rec.TL_BAST_OrangList[${o}].identitas = this.value; savePerkaraToStorage(); showTLReportView('BAST_PEMILIK');"></div>
            </div>
            ${t.TL_BAST_OrangList.length>1?`<button type="button" class="btn danger" onclick="delBastItem('orang', ${o})" style="margin-top:6px; padding:2px 8px; font-size:11px;">Hapus</button>`:""}
          </div>
        `).join("")}
      </div>

      <!-- PENERIMA & RANGKA PENYERAHAN -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px; margin-bottom:12px;">
        <span style="font-size:11px; font-weight:700; color:#cbd5e1;">PENERIMA & RANGKA PENYERAHAN</span>
        <div class="grid">
          <div><label>Nama Penerima</label><input value="${r(t.TL_Nama_Pemilik||t.Nama_Pelaku||"")}" oninput="saveDynamicValTL('TL_Nama_Pemilik', this.value); showTLReportView('BAST_PEMILIK');"></div>
          <div><label>No. Identitas</label><input value="${r(t.TL_NIK_Pemilik||t.Nomor_Identitas||"")}" oninput="saveDynamicValTL('TL_NIK_Pemilik', this.value); showTLReportView('BAST_PEMILIK');"></div>
        </div>
        <div style="margin-top:8px;">
          <label>Alamat Penerima</label>
          <textarea oninput="saveDynamicValTL('TL_Alamat_Pemilik', this.value); showTLReportView('BAST_PEMILIK');">${r(t.TL_Alamat_Pemilik||t.Alamat_Pelaku||"")}</textarea>
        </div>
        <div style="margin-top:8px;">
          <label>Menerima Untuk / Atas Nama:</label>
          <input value="${r(t.TL_Atas_Nama_Pt||t.TL_Nama_Pemilik||t.Nama_Pelaku||"")}" oninput="saveDynamicValTL('TL_Atas_Nama_Pt', this.value); showTLReportView('BAST_PEMILIK');">
        </div>
        <div style="margin-top:8px;">
          <label>Penyerahan Dilaksanakan Dalam Rangka:</label>
          <select style="width:100%; padding:7px; margin-bottom:6px;" onchange="
            if (this.value === 'Penyelesaian lainnya') {
              (document.getElementById('wrapper_manual_rangka') as HTMLElement).style.display = 'block';
            } else {
              (document.getElementById('wrapper_manual_rangka') as HTMLElement).style.display = 'none';
              saveDynamicValTL('TL_Rangka_Penyerahan', this.value);
            }
            showTLReportView('BAST_PEMILIK');
          ">
            ${ia(ce,n,"- Pilih Rangka Penyerahan -")}
          </select>
          <div id="wrapper_manual_rangka" style="display: ${i?"block":"none"};">
            <input id="input_manual_rangka" placeholder="Ketik alasan lainnya..." value="${r(n)}" oninput="saveDynamicValTL('TL_Rangka_Penyerahan', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
        </div>
      </div>

      <!-- PETUGAS PENYERAH & SAKSI -->
      <div style="border:1px solid var(--border-color); padding:10px; border-radius:6px;">
        <span style="font-size:11px; font-weight:700; color:#cbd5e1;">PETUGAS PENYERAH & SAKSI</span>
        <div class="grid" style="margin-top:8px;">
          <div>
            <label>Petugas Penyerah 1</label>
            <input placeholder="Nama Petugas 1" value="${r(t.TL_Petugas_Bast_1||t.ketua_tim||"")}" oninput="saveDynamicValTL('TL_Petugas_Bast_1', this.value); showTLReportView('BAST_PEMILIK');">
            <input placeholder="NIP Petugas 1" style="margin-top:4px;" value="${r(t.TL_NIP_Bast_1||t.nip_ketua_tim||"")}" oninput="saveDynamicValTL('TL_NIP_Bast_1', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
          <div>
            <label>Petugas Penyerah 2</label>
            <input placeholder="Nama Petugas 2" value="${r(t.TL_Petugas_Bast_2||"")}" oninput="saveDynamicValTL('TL_Petugas_Bast_2', this.value); showTLReportView('BAST_PEMILIK');">
            <input placeholder="NIP Petugas 2" style="margin-top:4px;" value="${r(t.TL_NIP_Bast_2||"")}" oninput="saveDynamicValTL('TL_NIP_Bast_2', this.value); showTLReportView('BAST_PEMILIK');">
          </div>
        </div>
        <div style="margin-top:8px;">
          <label>Saksi Pemilik / Kuasa (Kosongkan jika ingin berupa garis panjang)</label>
          <input placeholder="Nama Saksi (Kosongkan untuk _________)" value="${r(t.TL_Saksi_Penerima||"")}" oninput="saveDynamicValTL('TL_Saksi_Penerima', this.value); showTLReportView('BAST_PEMILIK');">
        </div>
      </div>
    `}else if(a==="BA_SEGEL"){let n=t.TL_Tanggal_Surat||"",i=ea(n),s=t.TL_Segel_Hari||i.hari||"",l=t.TL_Segel_Tgl_Huruf||i.teksLengkap||"",o=t.TL_Segel_No_SPLI||t.Nomor_SPLIT||"",u=t.TL_Segel_Tgl_SPLI||t.Tanggal_SPLIT||"";e.innerHTML=`
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-document"></i> NOMOR & TANGGAL BA SEGEL
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor BA Segel (Cukup Angka)</label>
            <input value="${r(t.TL_Segel_Num||"")}" oninput="saveDynamicValTL('TL_Segel_Num', this.value)" placeholder="Contoh: 1" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Surat</label>
            <input type="date" value="${r(n)}" oninput="
              let val = this.value;
              saveDynamicValTL('TL_Tanggal_Surat', val);
              let gen = autoGenerateTeksTanggalBA(val);
              let hariEl = document.getElementById('editorHariSegelInput') as HTMLInputElement;
              let hurufEl = document.getElementById('editorHurufSegelInput') as HTMLInputElement;
              if (hariEl) { hariEl.value = gen.hari; saveDynamicValTL('TL_Segel_Hari', gen.hari); }
              if (hurufEl) { hurufEl.value = gen.teksLengkap; saveDynamicValTL('TL_Segel_Tgl_Huruf', gen.teksLengkap); }
            " style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Hari Pembukaan Segel</label>
            <input id="editorHariSegelInput" value="${r(s)}" oninput="saveDynamicValTL('TL_Segel_Hari', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor SPLIT (Otomatis dari Perkara)</label>
            <input value="${r(o)}" oninput="saveDynamicValTL('TL_Segel_No_SPLI', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
        <div style="margin-bottom:8px;">
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Dalam Huruf</label>
          <input id="editorHurufSegelInput" value="${r(l)}" oninput="saveDynamicValTL('TL_Segel_Tgl_Huruf', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal SPLIT (Otomatis dari Perkara)</label>
          <input type="date" value="${r(u)}" oninput="saveDynamicValTL('TL_Segel_Tgl_SPLI', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
        </div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">A. Sarana Pengangkut</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama & Jenis Sarkut</label><input value="${r(t.TL_Segel_Nama_Sarkut||"")}" oninput="saveDynamicValTL('TL_Segel_Nama_Sarkut', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">No. Register Sarkut</label><input value="${r(t.TL_Segel_Reg_Sarkut||"")}" oninput="saveDynamicValTL('TL_Segel_Reg_Sarkut', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Bendera</label><input value="${r(t.TL_Segel_Bendera||"")}" oninput="saveDynamicValTL('TL_Segel_Bendera', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nahkoda / Pilot / Pengemudi</label><input value="${r(t.TL_Segel_Nahkoda||"")}" oninput="saveDynamicValTL('TL_Segel_Nahkoda', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Identitas Nahkoda</label><input value="${r(t.TL_Segel_Nik_Nahkoda||"")}" oninput="saveDynamicValTL('TL_Segel_Nik_Nahkoda', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">B. Barang</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jml/Jenis/No Peti Kemas/Kemasan</label><input value="${r(t.TL_Segel_Jml_Barang||"")}" oninput="saveDynamicValTL('TL_Segel_Jml_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jumlah/Jenis Barang</label><input value="${r(t.TL_Segel_Jenis_Barang||"")}" oninput="saveDynamicValTL('TL_Segel_Jenis_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jenis/No & Tgl Dokumen</label><input value="${r(t.TL_Segel_Dok_Barang||"")}" oninput="saveDynamicValTL('TL_Segel_Dok_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pemilik/Importir/Eksportir/Kuasa</label><input value="${r(t.TL_Segel_Pemilik_Barang||"")}" oninput="saveDynamicValTL('TL_Segel_Pemilik_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Identitas (NPWP) Barang</label><input value="${r(t.TL_Segel_NPWP_Barang||"")}" oninput="saveDynamicValTL('TL_Segel_NPWP_Barang', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">C. Bangunan Atau Tempat</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Alamat Bangunan/Tempat</label><input value="${r(t.TL_Segel_Alamat_Bangunan||"")}" oninput="saveDynamicValTL('TL_Segel_Alamat_Bangunan', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">No. Reg Bangunan/NPPBKC/NPWP</label><input value="${r(t.TL_Segel_Reg_Bangunan||"")}" oninput="saveDynamicValTL('TL_Segel_Reg_Bangunan', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Pemilik/Yang Menguasai</label><input value="${r(t.TL_Segel_Nama_Pemilik_Tempat||"")}" oninput="saveDynamicValTL('TL_Segel_Nama_Pemilik_Tempat', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Identitas Pemilik Tempat</label><input value="${r(t.TL_Segel_Nik_Pemilik_Tempat||"")}" oninput="saveDynamicValTL('TL_Segel_Nik_Pemilik_Tempat', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:12px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">Data Saksi / Penghadap</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Saksi / Penghadap</label><input value="${r(t.TL_Nama_Pemilik||"")}" oninput="saveDynamicValTL('TL_Nama_Pemilik', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIK Saksi</label><input value="${r(t.TL_NIK_Pemilik||"")}" oninput="saveDynamicValTL('TL_NIK_Pemilik', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div style="margin-bottom:8px;">
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pekerjaan Saksi</label>
          <input value="${r(t.TL_Segel_Pekerjaan||"")}" oninput="saveDynamicValTL('TL_Segel_Pekerjaan', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Alamat Saksi</label>
          <textarea oninput="saveDynamicValTL('TL_Alamat_Pemilik', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; min-height:60px;">${r(t.TL_Alamat_Pemilik||"")}</textarea>
        </div>
      </div>

      <div style="border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">Petugas Penandatangan</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Petugas Pembuka Segel 1 (Penerima 1)</label><input value="${r(t.TL_Segel_P1||"")}" oninput="saveDynamicValTL('TL_Segel_P1', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Petugas 1</label><input value="${r(t.TL_NIP_Segel_1||"")}" oninput="saveDynamicValTL('TL_NIP_Segel_1', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px;">
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Petugas Pembuka Segel 2 (Saksi Penerima 1)</label><input value="${r(t.TL_Segel_P2||"")}" oninput="saveDynamicValTL('TL_Segel_P2', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
          <div><label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Petugas 2</label><input value="${r(t.TL_NIP_Segel_2||"")}" oninput="saveDynamicValTL('TL_NIP_Segel_2', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;"></div>
        </div>
      </div>
    `}else if(a==="KEP_BDN"){let i=(t.KEP_List_Barang||[]).map((s,l)=>`
      <tr data-idx="${l}">
        <td style="padding:4px;"><input value="${r(s.jumlah||"")}" oninput="updateKEPBarang(${l}, 'jumlah', this.value)" placeholder="Jumlah" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${r(s.uraian||"")}" oninput="updateKEPBarang(${l}, 'uraian', this.value)" placeholder="Uraian Barang" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${r(s.kondisi||"")}" oninput="updateKEPBarang(${l}, 'kondisi', this.value)" placeholder="Kondisi" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${r(s.asal||"")}" oninput="updateKEPBarang(${l}, 'asal', this.value)" placeholder="Negara Asal" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px;"><input value="${r(s.ket||"")}" oninput="updateKEPBarang(${l}, 'ket', this.value)" placeholder="Ket" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:6px; border-radius:4px; font-size:11px;"></td>
        <td style="padding:4px; text-align:center;"><button type="button" onclick="removeKEPBarang(${l})" style="background:#dc2626; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:11px;">Hapus</button></td>
      </tr>
    `).join("");e.innerHTML=`
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-document"></i> NOMOR & TANGGAL KEPUTUSAN KEP
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor Keputusan KEP</label>
            <input value="${r(t.KEP_Nomor_ND||"")}" oninput="saveDynamicValTL('KEP_Nomor_ND', this.value)" placeholder="Contoh: KEP-..." style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Keputusan KEP</label>
            <input type="date" value="${r(t.KEP_Tanggal_ND||"")}" oninput="saveDynamicValTL('KEP_Tanggal_ND', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <div style="font-size:11px; font-weight:700; color:#fbbf24; margin-bottom:8px; text-transform:uppercase;">Pejabat Penandatangan</div>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Kepala Kantor</label>
            <input value="${r(t.Kepala_Kantor||"")}" oninput="saveDynamicValTL('Kepala_Kantor', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Kepala Kantor</label>
            <input value="${r(t.NIP_Kepala_Kantor||"")}" oninput="saveDynamicValTL('NIP_Kepala_Kantor', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-size:11px; font-weight:700; color:#fbbf24; text-transform:uppercase;">Daftar Barang yang Dikuasai Negara</span>
          <button type="button" onclick="addKEPBarang()" style="background:#2563eb; color:#fff; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:11px; font-weight:600;">+ Tambah Barang</button>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:11px;">
            <thead>
              <tr style="color:#94a3b8; text-align:left; border-bottom:1px solid #334155;">
                <th style="padding:6px; width:20%;">Jumlah</th>
                <th style="padding:6px; width:30%;">Uraian</th>
                <th style="padding:6px; width:15%;">Kondisi</th>
                <th style="padding:6px; width:15%;">Asal</th>
                <th style="padding:6px; width:10%;">Ket</th>
                <th style="padding:6px; width:10%; text-align:center;">Aksi</th>
              </tr>
            </thead>
            <tbody id="kep-barang-tbody">
              ${i||'<tr><td colspan="6" style="text-align:center; padding:10px; color:#64748b;">Belum ada data barang. Klik Tambah Barang.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `}else a==="SPSA"?e.innerHTML=`
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-document"></i> INFORMASI NOMOR & TANGGAL SPSA
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nomor SPSA</label>
            <input value="${r(t.SPSA_Nomor||"")}" oninput="saveDynamicValTL('SPSA_Nomor', this.value)" placeholder="Contoh: 01" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal SPSA</label>
            <input type="date" value="${r(t.SPSA_Tanggal||"")}" oninput="saveDynamicValTL('SPSA_Tanggal', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-money"></i> DETAIL DENDA & JATUH TEMPO
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Besaran Denda</label>
            <input value="${r(t.SPSA_Denda||"")}" oninput="saveDynamicValTL('SPSA_Denda', this.value)" placeholder="Contoh: Rp 10.000.000,-" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jatuh Tempo Pembayaran</label>
            <input type="date" value="${r(t.SPSA_Jatuh_Tempo||"")}" oninput="saveDynamicValTL('SPSA_Jatuh_Tempo', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-books"></i> PASAL & ALASAN PENETAPAN
        </span>
        <div style="margin-bottom:10px;">
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pasal Pelanggaran SPSA</label>
          <textarea oninput="saveDynamicValTL('SPSA_Pasal_Pelanggaran', this.value)" rows="3" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; font-family:inherit; font-size:11px;">${r(t.SPSA_Pasal_Pelanggaran||"")}</textarea>
        </div>
        <div>
          <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Alasan Penetapan Denda</label>
          <textarea oninput="saveDynamicValTL('SPSA_Alasan', this.value)" rows="3" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; font-family:inherit; font-size:11px;">${r(t.SPSA_Alasan||"")}</textarea>
        </div>
      </div>
    `:a==="BAST_LIMPAH"&&(e.innerHTML=`
      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-calendar"></i> WAKTU & TANGGAL PELIMPAHAN
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Hari Pelimpahan</label>
            <input value="${r(t.Limpah_Hari||"")}" oninput="saveDynamicValTL('Limpah_Hari', this.value)" placeholder="Contoh: Kamis" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Surat</label>
            <input type="date" value="${r(t.Limpah_Tanggal||"")}" oninput="saveDynamicValTL('Limpah_Tanggal', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div style="grid-column: span 2;">
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Tanggal Dalam Huruf</label>
            <input value="${r(t.Limpah_Tgl_Huruf||"")}" oninput="saveDynamicValTL('Limpah_Tgl_Huruf', this.value)" placeholder="Contoh: dua belas Desember tahun dua ribu dua puluh enam" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px; margin-bottom:14px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-building"></i> INSTANSI & PEJABAT PENERIMA (PIHAK KEDUA)
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div style="grid-column: span 2;">
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Instansi / Lembaga</label>
            <input value="${r(t.Instansi_Penerima||"")}" oninput="saveDynamicValTL('Instansi_Penerima', this.value)" placeholder="Contoh: Dinas LHK Provinsi Kepri" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Pejabat Penerima</label>
            <input value="${r(t.Limpah_Pejabat_Penerima||"")}" oninput="saveDynamicValTL('Limpah_Pejabat_Penerima', this.value)" placeholder="Nama lengkap & gelar" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Pejabat Penerima</label>
            <input value="${r(t.Limpah_NIP_Penerima||"")}" oninput="saveDynamicValTL('Limpah_NIP_Penerima', this.value)" placeholder="NIP Pejabat" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div style="grid-column: span 2;">
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jabatan Pejabat Penerima</label>
            <input value="${r(t.Limpah_Jabatan_Penerima||"")}" oninput="saveDynamicValTL('Limpah_Jabatan_Penerima', this.value)" placeholder="Contoh: Kepala Dinas / Penyidik Pegawai Negeri Sipil" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>

      <div style="background:#0f172a; border:1px solid var(--border-color, #334155); padding:12px; border-radius:8px;">
        <span style="font-size:11px; font-weight:700; color:#fbbf24; letter-spacing:0.5px; display:flex; align-items:center; gap:6px; margin-bottom:10px;">
          <i class="fi fi-rr-user"></i> PETUGAS PELIMPAH (PIHAK PERTAMA)
        </span>
        <div class="grid" style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; margin-bottom:8px;">
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Nama Petugas Pelimpah</label>
            <input value="${r(t.Limpah_Petugas_1||t.ketua_tim||"")}" oninput="saveDynamicValTL('Limpah_Petugas_1', this.value)" placeholder="Nama Petugas" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">NIP Petugas Pelimpah</label>
            <input value="${r(t.Limpah_NIP_1||"")}" oninput="saveDynamicValTL('Limpah_NIP_1', this.value)" placeholder="NIP Petugas" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Pangkat / Golongan</label>
            <select onchange="saveDynamicValTL('Limpah_Pangkat_1', this.value)" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px; font-size:11px;">
              ${ia(J,t.Limpah_Pangkat_1||"","- Pilih Golongan -")}
            </select>
          </div>
          <div>
            <label style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Jabatan Petugas</label>
            <input value="${r(t.Limpah_Jabatan_1||"")}" oninput="saveDynamicValTL('Limpah_Jabatan_1', this.value)" placeholder="Contoh: Pemeriksa Bea dan Cukai" style="width:100%; background:#1e293b; border:1px solid #475569; color:#fff; padding:8px 10px; border-radius:6px; margin-top:4px;">
          </div>
        </div>
      </div>
    `)}window.saveDynamicVal=le;window.showReportView=Te;window.renderDynamicInputs=rt;window.switchDocTab=se;window.addItem=sn;window.delItem=on;window.addSplitPegawai=dn;window.delSplitPegawai=pn;window.addSprinPegawai=gn;window.delSprinPegawai=un;window.syncUraianKombinasiLHP=rn;window.saveDynamicValTL=re;window.showTLReportView=ma;window.renderTLFormSection=Ua;window.switchTLDocTab=oe;var ui=1;async function Se(a,e){try{let n=await(await fetch(`/api/config/${a}`)).json();if(n.success&&n.data)return n.data}catch(t){console.error(`Gagal memuat ${a} dari server:`,t)}return JSON.parse(localStorage.getItem(a)||JSON.stringify(e))}async function mi(a,e){localStorage.setItem(a,JSON.stringify(e));try{await fetch(`/api/config/${a}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:e})})}catch(t){console.error(`Gagal menyimpan ${a} ke server:`,t)}}function Be(){_("Asal_Perkara_Select",kt,"","-"),_("Jenis_Penindakan_Select",_t,"","-"),_("Jenis_Pelanggaran_Select",Ke,"","-"),_("Jenis_Perkara_Select",Ea,"","-"),_("Status_Penangkapan_Select",Me,"","-"),_("Modus_Operandi_Select",Ue,"","-"),_("Umur_Pelaku",ge,"","- Pilih Usia -"),_("Jenis_Kelamin_Pelaku",Re,"","-"),_("Jenis_Identitas_Select",va,"NIK",""),_("Pekerjaan_Select",ue,"","-"),_("Komoditi_Select",Na,"","- Pilih Komoditi -"),_("Ukuran_Kontainer_Select",me,"","-"),_("Jenis_Koli_Select",oa,"","- Pilih Jenis Koli -"),_("Jenis_Dok_Pemberitahuan_Select",da,"Tanpa Dokumen",""),_("Jenis_Dok_Pelengkap_Select",He,"-","- (Tanpa Dokumen Pelengkap)"),_("auto_akhiran_select",Ra,"",""),de();let a=Array.from(new Set([...Pa,...ba]));_("form_jabatan_kabid",a,"Kepala Bidang Penindakan dan Penyidikan","- Pilih Jabatan -"),_("form_jabatan_seksi",a,"Kepala Seksi Penyidikan","- Pilih Jabatan -"),_("form_jabatan_ketua_tim",a,"Ketua Tim Peneliti","- Pilih Jabatan -"),_("form_jabatan_pembuat_lpp",a,"Petugas LPP","- Pilih Jabatan -"),_("form_jabatan_lpf",a,"Petugas LPF","- Pilih Jabatan -"),_("form_jabatan_indak_1",a,"Petugas Penindakan 1","- Pilih Jabatan -"),_("form_jabatan_indak_2",a,"Petugas Penindakan 2","- Pilih Jabatan -"),_("form_jabatan_indak_lainnya",a,"Petugas Penindakan 3","- Pilih Jabatan -"),_("form_gol_kabid",J,"Pembina (IV/a)","- Pilih Golongan -"),_("form_gol_seksi",J,"Penata (III/c)","- Pilih Golongan -"),_("form_gol_ketua_tim",J,"","- Pilih Golongan -"),_("form_gol_pembuat_lpp",J,"","- Pilih Golongan -"),_("form_gol_petugas_lpf",J,"","- Pilih Golongan -"),_("form_gol_indak_1",J,"","- Pilih Golongan -"),_("form_gol_indak_2",J,"","- Pilih Golongan -"),_("form_gol_indak_lainnya",J,"","- Pilih Golongan -")}function ot(){_("Umur_Pelaku",ge,"","- Pilih Usia -")}function ka(a){let e=document.getElementById("Hari_SBP"),t=document.getElementById("Tanggal_SBP");if(!e)return;let n=["-","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];e.options.length<7&&(e.innerHTML=n.map(o=>`<option value="${o}">${o}</option>`).join(""));let i=(a||(t?t.value:"")).trim();if(!i||i==="-"){e.value="-";return}let s;if(i.includes("/")){let[o,u,g]=i.split("/");s=new Date(parseInt(g),parseInt(u)-1,parseInt(o),12,0,0)}else if(i.includes("-")){let[o,u,g]=i.split("-");s=new Date(parseInt(o),parseInt(u)-1,parseInt(g),12,0,0)}else s=new Date(i);let l=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];isNaN(s.getTime())?e.value="-":e.value=l[s.getDay()],typeof window.generateKronologisOtomatis=="function"&&window.generateKronologisOtomatis()}function Ia(){let a=document.getElementById("NoLP")||document.getElementById("NoLP_LP_1"),e=document.getElementById("Nomor_SBP"),t=document.getElementById("No_SPRIN_Indak"),n=document.getElementById("Status_Penangkapan_Select"),s=(n?n.value:"-").toUpperCase().includes("LIMPAHAN")?"LIMPAH":"MANDIRI";if(a&&/^\d+$/.test(a.value.trim())&&(a.value=`LP-${a.value.trim()}/KPU.206/2026`),e&&/^\d+$/.test(e.value.trim())&&(e.value=`SBP-${e.value.trim()}/${s}/KPU.2/2026`),t&&/^\d+$/.test(t.value.trim())){let l=t.value.trim(),o=l.length<2?l.padStart(2,"0"):l;t.value=`SPRIN-${o}/KPU.206/2026`}[a,e,t].forEach(l=>{l&&(l.style.color="#f59e0b",l.style.fontWeight="600")}),["preview_LP","preview_NoLP","preview_SBP","preview_SPRIN"].forEach(l=>{let o=document.getElementById(l);o&&(o.textContent="",o.style.display="none")})}function Pn(){let a=p("Hari_SBP"),e=v("Tanggal_SBP"),t=document.getElementById("Jam_Kejadian")?document.getElementById("Jam_Kejadian").value.trim():"",n=t?t.replace(":",".")+" WIB":"-",i=p("Lokasi_Penindakan"),s=p("Nama_Pelaku"),l=p("Modus_Operandi"),o=la(l),u=p("Kantor")!=="-"?p("Kantor"):"Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam",g=o.replace(/[;:]+$/,"").trim(),c=`Pada hari ${a}, tanggal ${e} sekira pukul ${n} di ${i} telah dilakukan penindakan oleh Petugas ${u} terhadap ${s} yang ${g}`,P=document.getElementById("Kronologis");P&&(P.value=c)}function dt(){let a=p("Pasal_Pelanggaran"),e=p("Modus_Operandi"),t=la(e),n=a!=="-"||e!=="-"?`Diduga melanggar ${a} karena ${t}.`:"-",i=document.getElementById("Jenis_Pelanggaran_Pasal");i&&(i.value=n)}function bn(a){let e=document.getElementById("Jenis_Koli");e&&(a==="LAINNYA"?(e.style.display="block",e.value="",e.focus()):(e.style.display="none",e.value=a==="-"?"":a),we())}function we(){let a=document.getElementById("Jumlah_Koli")?.value.trim()||"",e=document.getElementById("Jenis_Koli")?.value.trim()||"",t=document.getElementById("auto_barang")?.value.trim()||"",n=document.getElementById("auto_akhiran_select")?.value||"",i=document.getElementById("auto_kustom_text")?.value.trim()||"",s=document.getElementById("auto_kustom_container");if(s&&(s.style.display=n==="manual"?"block":"none"),!a&&!e&&!t)return;let l=typeof z=="function"?z(a):"",g=[a?`${a} (${l})`:"",e].filter(m=>m!==""&&m!=="-").join(" "),c=t.replace(/[,.\s]+$/,"").trim();if(c){g+=(g?" ":"")+c;let k=c.split(",").map(f=>f.trim()).filter(Boolean).length,y="";if(n==="manual"){if(i){let f=i.replace(/^[,.\s]+/,"");y=k>1?`, ${f}`:` ${f}`}}else if(n!==""){let f=Ra.find(h=>h.value===n);if(f){let h=f.label.replace(/^[,.\s]+/,"");y=k>1?`, ${h}`:` ${h}`}}g+=y}g&&(g=g.charAt(0).toUpperCase()+g.slice(1));let P=document.getElementById("Uraian_Barang");P&&(P.value=g)}typeof window<"u"&&(window.generateUraianBarangOtomatis=we);async function pt(a){if(!a||a==="-")return;let e=a.trim().toLowerCase(),t=[];for(let[n,i]of Object.entries(pe))if(n.toLowerCase()===e){t=i;break}if(t.length===0){for(let[n,i]of Object.entries(pe))if(e.includes(n.toLowerCase())||n.toLowerCase().includes(e)){t=i;break}}t.length!==0&&setTimeout(()=>{document.querySelectorAll('#pasal_pelanggaran_checkboxes input[type="checkbox"]').forEach(i=>{i.checked=!1}),t.forEach(i=>{let s=CSS.escape(i.pasal),l=document.querySelector(`#pasal_pelanggaran_checkboxes input[value="${s}"]`);l&&(l.checked=!0)}),typeof window.syncPasalPelanggaran=="function"?window.syncPasalPelanggaran():typeof Ee=="function"&&Ee()},10)}function yn(a){let e=document.getElementById("Asal_Perkara");e&&(a==="LAINNYA"?(e.style.display="block",e.value="",e.focus()):(e.style.display="none",e.value=a))}function fn(a){let e=document.getElementById("Pekerjaan");e&&(a==="LAINNYA"?(e.style.display="block",e.value="",e.focus()):(e.style.display="none",e.value=a))}function kn(a){let e=document.getElementById("Ukuran_Kontainer");e&&(a==="LAINNYA"?(e.style.display="block",e.value="",e.focus()):(e.style.display="none",e.value=a))}function _n(a){let e=document.getElementById("Jenis_Dok_Pemberitahuan_Manual"),t=document.getElementById("Nomor_Dok_Pemberitahuan"),n=document.getElementById("Dokumen_Pemberitahuan");a==="Tanpa Dokumen"?(e&&(e.style.display="none",e.value=""),t&&(t.value="",t.disabled=!0),n&&(n.value="Tanpa Dokumen")):(t&&(t.disabled=!1),e&&(a==="LAINNYA"?e.style.display="block":(e.style.display="none",e.value=a==="-"?"":a)),gt())}function gt(){let a=document.getElementById("Jenis_Dok_Pemberitahuan_Select"),e=document.getElementById("Dokumen_Pemberitahuan");if(!a||!e)return;let t=a.value;if(t==="Tanpa Dokumen"){e.value="Tanpa Dokumen";return}let n=document.getElementById("Jenis_Dok_Pemberitahuan_Manual"),i=t==="LAINNYA"?n?n.value:"":t==="-"?"":t,s=document.getElementById("Nomor_Dok_Pemberitahuan"),l=s?s.value:"",o=[];i.trim()&&o.push(i.trim()),l.trim()&&o.push(l.trim()),e.value=o.length>0?o.join(" "):"Tanpa Dokumen"}function vn(a){let e=document.getElementById("Jenis_Dok_Pelengkap_Manual"),t=document.getElementById("Nomor_Dok_Pelengkap"),n=document.getElementById("Tanggal_Dok_Pelengkap"),i=document.getElementById("Dokumen_Pelengkap");a==="-"?(e&&(e.style.display="none",e.value=""),t&&(t.value="",t.disabled=!0),n&&(n.value="",n.disabled=!0),i&&(i.value="-")):(t&&(t.disabled=!1),n&&(n.disabled=!1),a==="LAINNYA"?e&&(e.style.display="block",e.value="",e.focus()):e&&(e.style.display="none",e.value=a),ut())}function ut(){let a=document.getElementById("Jenis_Dok_Pelengkap_Select"),e=document.getElementById("Dokumen_Pelengkap");if(!a||!e)return;let t=a.value;if(t==="-"){e.value="-";return}let n=document.getElementById("Jenis_Dok_Pelengkap_Manual"),i=t==="LAINNYA"?n?n.value.trim():"":t,s=document.getElementById("Nomor_Dok_Pelengkap"),l=s?s.value.trim():"",o=document.getElementById("Tanggal_Dok_Pelengkap"),u=o?o.value:"",g=u?j(u):"",c=[];i&&c.push(i),l&&c.push(`nomor ${l}`),g&&g!=="-"&&c.push(`tanggal ${g}`),e.value=c.length>0?c.join(" "):"-"}function hn(){let a=document.getElementById("Jenis_Identitas_Select"),e=document.getElementById("Nomor_Identitas_Input"),t=document.getElementById("Nomor_Identitas");if(!t)return;let n=a?a.value:"NIK",i=e?e.value.trim():"";i?t.value=`${n} : ${i}`:t.value=""}function de(){let a=document.getElementById("kondisi_checkboxes");a&&a.querySelectorAll('input[type="checkbox"]').length===0&&(a.innerHTML=vt.map(s=>`
        <label class="checkbox-item" style="margin-right: 14px; display: inline-flex; align-items: center; cursor: pointer; color: inherit; font-size: 13px;">
          <input type="checkbox" value="${s}" onchange="syncKondisiBarang()" style="margin-right: 6px; cursor: pointer;"> 
          ${s}
        </label>
      `).join(""));let e=document.querySelectorAll('#kondisi_checkboxes input[type="checkbox"]:checked'),t=Array.from(e).map(i=>i.value),n=document.getElementById("Kondisi");n&&(n.value=t.length>0?t.join(", "):"-")}typeof window<"u"&&(window.syncKondisiBarang=de);function Ee(){let a=document.querySelectorAll('#pasal_pelanggaran_checkboxes input[type="checkbox"]:checked'),e=Array.from(a).map(s=>s.value),t="-",n=e.length;n===1?t=e[0]:n===2?t=e[0]+" dan "+e[1]:n===3?t=e[0]+", "+e[1]+" dan "+e[2]:n>3&&(t=e.slice(0,n-2).join(", ")+" dan "+e[n-2]+" serta "+e[n-1]);let i=document.getElementById("Pasal_Pelanggaran");i&&(i.value=t),dt()}function xn(a){let e=document.getElementById("Status_Penangkapan");e&&(e.value=a),Ia(),La(),Y()}function Tn(a){let e=document.getElementById("Jenis_Pelanggaran");e&&(e.value=a)}function An(a){let e=document.getElementById("Jenis_Penindakan");e&&(e.value=a)}function Ln(a){let e=document.getElementById("Jenis_Perkara");e&&(e.value=a)}function In(a){let e=document.getElementById("Modus_Operandi");e&&(e.value=a)}function En(a){let e=document.getElementById("Komoditi");e&&(e.value=a)}function Nn(a){let e=document.getElementById("Kantor");e&&(e.value=a)}async function Sn(){let a=document.getElementById("setting_newKantor");if(!a)return;let e=a.value.trim();if(!e)return;let t=await Se("customKantorList",[]);t.includes(e)?A("PERINGATAN KANTOR","Kantor tersebut sudah terdaftar!","warning"):(t.push(e),await mi("customKantorList",t),await mt(),a.value="",A("KANTOR BERHASIL DITAMBAHKAN","Unit kantor baru ditambahkan ke opsi.","success"))}async function Bn(){let a=document.getElementById("pasal_pelanggaran_checkboxes");if(!a)return;let e=await Se("customPasalMap",{}),t="";Object.keys(De).forEach(n=>{t+=`<div style="grid-column: span 2; font-weight:bold; color:var(--primary); margin-top:6px; border-bottom:1px solid #334155; display:flex; align-items:center; gap:6px;"><i class="fi fi-rr-bookmark"></i> ${n}</div>`,[...De[n],...e[n]||[]].forEach(s=>{t+=`<label class="checkbox-item"><input type="checkbox" value="${r(s)}" onchange="syncPasalPelanggaran()"> ${r(s)}</label>`})}),a.innerHTML=t}async function wn(){let a=await Se("customKomoditiList",[]),e=document.getElementById("optgroup_custom_komoditi");e&&(e.innerHTML=a.map(t=>`<option value="${r(t)}">${r(t)}</option>`).join(""))}async function mt(){let a=await Se("customKantorList",[]),e=[..._a,...a],t=document.getElementById("Kantor_Select"),n=document.getElementById("Kantor");t&&(t.innerHTML='<option value="-">-</option>'+e.map(s=>`<option value="${r(s)}">${r(s)}</option>`).join(""),n&&!n.value&&(t.value=_a[0],n.value=_a[0]));let i=document.getElementById("setting_kantorListDisplay");i&&(i.innerHTML=e.map(s=>`<li>${r(s)}</li>`).join(""))}function Kn(a){if(!a)return;let e=(C,O)=>{let $=document.getElementById(C);$&&($.value=O!=null?String(O):"")},t=a.NoLP||a.NoLP_LP_1||"";e("NoLP",t),e("Tanggal_LP",a.Tanggal_LP||a.Tanggal_LP_LP_1),e("Nomor_SBP",a.Nomor_SBP),e("Tanggal_SBP",a.Tanggal_SBP),e("Jam_Kejadian",a.Jam_Kejadian);let n=a.Hari_SBP;if(!n||n==="-"){let C=a.Tanggal_SBP;if(C){let O=new Date(C);if(isNaN(O.getTime())&&String(C).includes("/")){let $=C.split("/");O=new Date(`${$[2]}-${$[1]}-${$[0]}`)}isNaN(O.getTime())||(n=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"][O.getDay()])}}e("Hari_SBP",n||"-"),e("No_SPRIN_Indak",a.No_SPRIN_Indak),e("Tanggal_SPRIN_Indak",a.Tanggal_SPRIN_Indak),e("Asal_Perkara",a.Asal_Perkara),e("Jenis_Penindakan",a.Jenis_Penindakan);let i=a.Jenis_Perkara||a.jenis_perkara||"";e("Jenis_Perkara",i),document.getElementById("Jenis_Perkara_Select")&&i&&_("Jenis_Perkara_Select",Ea,i,"-"),e("Status_Penangkapan",a.Status_Penangkapan),document.getElementById("Status_Penangkapan_Select")&&a.Status_Penangkapan&&_("Status_Penangkapan_Select",Me,a.Status_Penangkapan,"-"),e("Jenis_Pelanggaran",a.Jenis_Pelanggaran),document.getElementById("Jenis_Pelanggaran_Select")&&a.Jenis_Pelanggaran&&_("Jenis_Pelanggaran_Select",Ke,a.Jenis_Pelanggaran,"-"),e("Pasal_Pelanggaran",a.Pasal_Pelanggaran),e("Modus_Operandi",a.Modus_Operandi),document.getElementById("Modus_Operandi_Select")&&a.Modus_Operandi&&_("Modus_Operandi_Select",Ue,a.Modus_Operandi,"-"),e("Kronologis",a.Kronologis),e("Jenis_Pelanggaran_Pasal",a.Jenis_Pelanggaran_Pasal),e("Lokasi_Penindakan",a.Lokasi_Penindakan),e("Nama_Pelaku",a.Nama_Pelaku),e("Umur_Pelaku",a.Umur_Pelaku||"-"),document.getElementById("Umur_Pelaku")&&_("Umur_Pelaku",ge,a.Umur_Pelaku||"","- Pilih Usia -"),e("Jenis_Kelamin_Pelaku",a.Jenis_Kelamin_Pelaku||"-"),document.getElementById("Jenis_Kelamin_Pelaku")&&_("Jenis_Kelamin_Pelaku",Re,a.Jenis_Kelamin_Pelaku||"","-"),e("TTL",a.TTL);let P=String(a.Nomor_Identitas||"");if(P.includes(" : ")){let C=P.split(" : ");document.getElementById("Jenis_Identitas_Select")&&_("Jenis_Identitas_Select",va,C[0],""),e("Nomor_Identitas_Input",C[1])}else document.getElementById("Jenis_Identitas_Select")&&_("Jenis_Identitas_Select",va,"NIK",""),e("Nomor_Identitas_Input",P);e("Nomor_Identitas",P),e("Pekerjaan",a.Pekerjaan);let m=document.getElementById("Pekerjaan_Select"),k=document.getElementById("Pekerjaan");m&&(_("Pekerjaan_Select",ue,a.Pekerjaan||"","-"),a.Pekerjaan&&!ue.includes(a.Pekerjaan)?(m.value="LAINNYA",k&&(k.style.display="block",k.value=a.Pekerjaan)):k&&(k.style.display="none")),e("Alamat_Pelaku",a.Alamat_Pelaku),e("Nomor_Telepon",a.Nomor_Telepon),e("Nomor_Rekening",a.Nomor_Rekening),e("Pengulangan_Pelanggaran",a.Pengulangan_Pelanggaran),e("Komoditi",a.Komoditi),document.getElementById("Komoditi_Select")&&_("Komoditi_Select",Na,a.Komoditi||"","- Pilih Komoditi -"),e("Kerugian_Negara",a.Kerugian_Negara),e("Jumlah_Koli",a.Jumlah_Koli);let f=String(a.Jenis_Koli||""),h=document.getElementById("Jenis_Koli_Select"),T=document.getElementById("Jenis_Koli");h&&T&&(_("Jenis_Koli_Select",oa,f,"- Pilih Jenis Koli -"),T.value=f,f&&!oa.includes(f.toLowerCase())&&f!=="-"?(h.value="LAINNYA",T.style.display="block"):T.style.display="none");let x=a.Nama_Barang||a.Uraian_Barang||a.Detail_Barang_LPP||a.Komoditi||"";e("Nama_Barang",x),e("nama_barang",x),e("Uraian_Barang",x),e("Detail_Barang_LPP",x),e("Merek",a.Merek),e("Tipe",a.Tipe),e("Kondisi",a.Kondisi),e("Spesifikasi_Lain",a.Spesifikasi_Lain),e("Pengangkut",a.Pengangkut),e("No_Kontainer",a.No_Kontainer),e("Ukuran_Kontainer",a.Ukuran_Kontainer);let L=document.getElementById("Ukuran_Kontainer_Select"),I=document.getElementById("Ukuran_Kontainer");L&&(_("Ukuran_Kontainer_Select",me,a.Ukuran_Kontainer||"","-"),a.Ukuran_Kontainer&&!me.includes(a.Ukuran_Kontainer)?(L.value="LAINNYA",I&&(I.style.display="block",I.value=a.Ukuran_Kontainer)):I&&(I.style.display="none")),e("Kantor",a.Kantor);let S=String(a.Dokumen_Pemberitahuan||a.Dokumen_Yang_Ada||""),E=document.getElementById("Jenis_Dok_Pemberitahuan_Select"),N=document.getElementById("Nomor_Dok_Pemberitahuan");if(S.toLowerCase().includes("tanpa dokumen")||!S||S==="-")E&&_("Jenis_Dok_Pemberitahuan_Select",da,"Tanpa Dokumen",""),N&&(N.value="",N.disabled=!0),e("Dokumen_Pemberitahuan","Tanpa Dokumen");else{let C=S.match(/^(BC\s*[\d\.]+|SPPBMCP|PIBK|CN|PPFTZ-\d{2})/i),O=C?C[0].trim():"",$=S;O&&($=S.replace(C[0],"").replace(/^[\s\-–—:]*/,"").replace(/^nomor\s*/i,"").replace(/^no\.?\s*/i,"").trim()),E&&_("Jenis_Dok_Pemberitahuan_Select",da,O||S,""),N&&(N.disabled=!1,N.value=$),e("Dokumen_Pemberitahuan",S)}e("Tanggal_Dokumen_Pemberitahuan",a.Tanggal_Dokumen_Pemberitahuan);let M=a.Dokumen_Pelengkap||"-";e("Dokumen_Pelengkap",M),e("Jenis_Dok_Pelengkap_Manual",a.Jenis_Dok_Pelengkap_Manual||""),e("Nomor_Dok_Pelengkap",a.Nomor_Dok_Pelengkap||""),e("Tanggal_Dok_Pelengkap",a.Tanggal_Dok_Pelengkap||"");let R=document.getElementById("Jenis_Dok_Pelengkap_Select"),b=document.getElementById("Jenis_Dok_Pelengkap_Manual"),H=document.getElementById("Nomor_Dok_Pelengkap"),B=document.getElementById("Tanggal_Dok_Pelengkap");R&&(_("Jenis_Dok_Pelengkap_Select",He,a.Jenis_Dok_Pelengkap_Select||"-","- (Tanpa Dokumen Pelengkap)"),R.value==="-"?(b&&(b.style.display="none"),H&&(H.disabled=!0),B&&(B.disabled=!0)):R.value==="LAINNYA"?(b&&(b.style.display="block"),H&&(H.disabled=!1),B&&(B.disabled=!1)):(b&&(b.style.display="none"),H&&(H.disabled=!1),B&&(B.disabled=!1))),e("No_LPP",a.No_LPP),e("No_LPF",a.No_LPF),e("Nomor_SPLIT",a.Nomor_SPLIT),e("No_SPRIN_CACAH",a.No_SPRIN_CACAH),e("Nomor_BA",a.Nomor_BA),e("Nomor_LHP",a.Nomor_LHP),e("Tanggal_LPP",a.Tanggal_LPP),e("Catatan_LPP",a.Catatan_LPP),e("Detail_Barang_LPP",a.Detail_Barang_LPP||x),e("Tanggal_LPF",a.Tanggal_LPF),e("Catatan_LPF",a.Catatan_LPF),e("Tanggal_SPLIT",a.Tanggal_SPLIT),e("Dasar_SPLIT",a.Dasar_SPLIT),e("Tanggal_Sprin_Cacah",a.Tanggal_Sprin_Cacah),e("Tanggal_BA",a.Tanggal_BA),e("Hari_Cacah",String(a.Hari_Cacah||"").toLowerCase()),e("TeksTanggal",String(a.TeksTanggal||"").toLowerCase()),e("Tanggal_LHP",a.Tanggal_LHP);let D=Array.from(new Set([...Pa,...ba]));e("form_kabid",a.kabid),e("form_nip_kabid",a.nip_kabid),_("form_jabatan_kabid",D,a.jabatan_kabid||"Kepala Bidang Penindakan dan Penyidikan","- Pilih Jabatan -"),_("form_gol_kabid",J,a.gol_kabid||"","- Pilih Golongan -"),e("form_nama_seksi",a.nama_seksi),e("form_nip_seksi",a.nip_seksi),_("form_jabatan_seksi",D,a.jabatan_seksi||"Kepala Seksi Penyidikan","- Pilih Jabatan -"),_("form_gol_seksi",J,a.gol_seksi||"","- Pilih Golongan -"),e("form_ketua_tim",a.ketua_tim),e("form_nip_ketua_tim",a.nip_ketua_tim),_("form_jabatan_ketua_tim",D,a.jabatan_ketua_tim||"Ketua Tim Peneliti","- Pilih Jabatan -"),_("form_gol_ketua_tim",J,a.gol_ketua_tim||"","- Pilih Golongan -"),e("form_pembuat_lpp",a.pembuat_lpp),e("form_nip_pembuat_lpp",a.nip_pembuat_lpp),_("form_jabatan_pembuat_lpp",D,a.jabatan_pembuat_lpp||"Petugas LPP","- Pilih Jabatan -"),_("form_gol_pembuat_lpp",J,a.gol_pembuat_lpp||"","- Pilih Golongan -"),e("form_petugas_lpf",a.petugas_lpf),e("form_nip_petugas_lpf",a.nip_petugas_lpf),_("form_jabatan_lpf",D,a.jabatan_petugas_lpf||"Petugas LPF","- Pilih Jabatan -"),_("form_gol_petugas_lpf",J,a.gol_petugas_lpf||"","- Pilih Golongan -"),e("form_indak_1",a.indak_1),e("form_nip_indak_1",a.nip_indak_1),_("form_jabatan_indak_1",D,a.jabatan_indak_1||"Petugas Penindakan 1","- Pilih Jabatan -"),_("form_gol_indak_1",J,a.gol_indak_1||"","- Pilih Golongan -"),e("form_indak_2",a.indak_2),e("form_nip_indak_2",a.nip_indak_2),_("form_jabatan_indak_2",D,a.jabatan_indak_2||"Petugas Penindakan 2","- Pilih Jabatan -"),_("form_gol_indak_2",J,a.gol_indak_2||"","- Pilih Golongan -"),e("form_indak_lainnya",a.indak_lainnya),e("form_nip_indak_lainnya",a.nip_indak_lainnya),_("form_jabatan_indak_lainnya",D,a.jabatan_indak_lainnya||"Petugas Penindakan 3","- Pilih Jabatan -"),_("form_gol_indak_lainnya",J,a.gol_indak_lainnya||"","- Pilih Golongan -");let U="Laporan penerimaan perkara diterima, segera lanjutkan dengan penelitian formal dan pengumpulan bahan keterangan lebih lanjut.",aa="Setuju dengan usulan tim peneliti, segera tindak lanjuti proses administrasi penanganan perkara sesuai ketentuan yang berlaku.";e("Catatan_LPP",a.Catatan_LPP&&a.Catatan_LPP!=="-"?a.Catatan_LPP:U),e("Catatan_LPF",a.Catatan_LPF&&a.Catatan_LPF!=="-"?a.Catatan_LPF:aa),typeof La=="function"&&La(),typeof Y=="function"&&Y()}function Mn(){let a=document.getElementById("modalTitle");a&&(a.textContent="Input Data Perkara");let e=document.getElementById("editingRecordIndex");e&&(e.value="-1"),Be(),document.querySelectorAll("#perkaraModal input:not([readonly]), #perkaraModal textarea").forEach(y=>{y.type==="checkbox"?y.checked=!1:y.value=""}),de(),document.getElementById("Jenis_Koli")&&(document.getElementById("Jenis_Koli").style.display="none"),document.getElementById("auto_kustom_container")&&(document.getElementById("auto_kustom_container").style.display="none"),document.getElementById("Asal_Perkara")&&(document.getElementById("Asal_Perkara").style.display="none"),document.getElementById("Pekerjaan")&&(document.getElementById("Pekerjaan").style.display="none"),document.getElementById("Ukuran_Kontainer")&&(document.getElementById("Ukuran_Kontainer").style.display="none"),document.getElementById("Jenis_Dok_Pemberitahuan_Manual")&&(document.getElementById("Jenis_Dok_Pemberitahuan_Manual").style.display="none"),document.getElementById("Nomor_Dok_Pemberitahuan")&&(document.getElementById("Nomor_Dok_Pemberitahuan").disabled=!0),document.getElementById("No_SPRIN_Indak")&&(document.getElementById("No_SPRIN_Indak").value=""),document.getElementById("Tanggal_SPRIN_Indak")&&(document.getElementById("Tanggal_SPRIN_Indak").value=""),document.getElementById("Jenis_Dok_Pelengkap_Select")&&(document.getElementById("Jenis_Dok_Pelengkap_Select").value="-"),document.getElementById("Jenis_Dok_Pelengkap_Manual")&&(document.getElementById("Jenis_Dok_Pelengkap_Manual").value="",document.getElementById("Jenis_Dok_Pelengkap_Manual").style.display="none"),document.getElementById("Nomor_Dok_Pelengkap")&&(document.getElementById("Nomor_Dok_Pelengkap").value="",document.getElementById("Nomor_Dok_Pelengkap").disabled=!0),document.getElementById("Tanggal_Dok_Pelengkap")&&(document.getElementById("Tanggal_Dok_Pelengkap").value="",document.getElementById("Tanggal_Dok_Pelengkap").disabled=!0),document.getElementById("Dokumen_Pelengkap")&&(document.getElementById("Dokumen_Pelengkap").value="-"),document.getElementById("Kantor_Select")&&_a.length>0&&(document.getElementById("Kantor_Select").value=_a[0],document.getElementById("Kantor").value=_a[0]);let n=document.getElementById("Catatan_LPF");n&&!n.value&&(n.value="Setuju dengan usulan tim peneliti, segera tindak lanjuti proses penyusunan administrasi penanganan perkara sesuai ketentuan yang berlaku.");let i=document.getElementById("NoLP")||document.getElementById("NoLP_LP_1"),s=document.getElementById("Tanggal_LP")||document.getElementById("Tanggal_LP_LP_1"),l=document.getElementById("Nomor_SBP"),o=document.getElementById("Tanggal_SBP"),u=document.getElementById("No_SPRIN_Indak"),g=document.getElementById("Tanggal_SPRIN_Indak"),c=null,P=document.getElementById("editingRecordIndex");P&&P.value!=="-1"&&(c=P.value);let m=(y,f,h,T,x)=>{y&&!y.dataset.validationAttached&&(y.dataset.validationAttached="true",y.style.color="#eca223",y.style.fontWeight="400",y.addEventListener("focus",()=>{if(y.value.includes("/")){let L=y.value.match(/^(?:LP|SBP|SPRIN)-0*(\d+)/i);L&&L[1]&&(y.value=L[1])}}),y.addEventListener("blur",()=>{Ia();let L=y.value.trim(),I=f?f.value:"";if(L){let E=wa([{num:L,date:I,numKey:T,dateKey:x,label:h}],{},c);E.isValid||(A(E.message,"error"),y.focus())}}))};m(i,s,"Nomor LP","NoLP","Tanggal_LP"),m(l,o,"SBP","noSbp","Tanggal_SBP"),m(u,g,"SPRIN INDAK","noSprin","Tanggal_SPRIN_Indak"),["preview_LP","preview_NoLP","preview_SBP","preview_SPRIN"].forEach(y=>{let f=document.getElementById(y);f&&(f.innerHTML="")}),o&&!o.dataset.hariAttached&&(o.dataset.hariAttached="true",o.addEventListener("change",()=>ka()),o.addEventListener("input",()=>ka())),ka();let k=document.getElementById("perkaraModal");k&&k.classList.add("active")}function Dn(a){let t=ga()[a]||d.databasePerkara[a];if(!t)return;let n=d.databasePerkara.indexOf(t),i=document.getElementById("editingRecordIndex");i&&(i.value=String(n>=0?n:a));let s=t.NoLP||t.NoLP_LP_1||"",l=document.getElementById("modalTitle");l&&(l.textContent=`Edit Data Perkara LP-${s}`),Be(),Kn(t);let o=document.getElementById("Tanggal_SBP");o&&!o.dataset.hariAttached&&(o.dataset.hariAttached="true",o.addEventListener("change",()=>ka()),o.addEventListener("input",()=>ka())),setTimeout(()=>{ka(t.Tanggal_SBP),t.Modus_Operandi&&pt(t.Modus_Operandi)},50),Ia();let u=document.getElementById("perkaraModal");u&&u.classList.add("active")}function Un(a){ra("KONFIRMASI HAPUS","Apakah Anda yakin ingin menghapus data perkara ini?",()=>{d.databasePerkara.splice(a,1),w(),Ma(),xa(),A("TERHAPUS","Data perkara berhasil dihapus.","danger")})}function ct(){let a=document.getElementById("perkaraModal");a&&a.classList.remove("active")}function Pt(){let a=document.getElementById("editingRecordIndex"),e=a?parseInt(a.value):-1;if(e>=0&&d.databasePerkara[e]&&d.databasePerkara[e].No_LPP){Ne();return}let t=document.getElementById("customConfirmModal");t||(t=document.createElement("div"),t.id="customConfirmModal",t.style.cssText="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 10000; opacity: 0; transition: opacity 0.3s ease; pointer-events: none;",t.innerHTML=`
      <div style="background: #ffffff; padding: 24px; border-radius: 12px; width: 90%; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); transform: translateY(-20px); transition: transform 0.3s ease;">
        <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #0f172a; font-weight: 600;">Konfirmasi Auto-Booking</h3>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">Nomor administrasi awal (LPP, LPF, SPLIT) akan di-booking berurutan. Dokumen cacah & tindak lanjut situasional tetap fleksibel. Lanjutkan?</p>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" id="cancelConfirmBtn" style="padding: 8px 16px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">Batal</button>
          <button type="button" id="okConfirmBtn" style="padding: 8px 16px; background: #0f172a; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">Ya, Lanjutkan</button>
        </div>
      </div>
    `,document.body.appendChild(t)),t.style.pointerEvents="auto",t.style.opacity="1";let n=t.querySelector("div");n&&(n.style.transform="translateY(0)");let i=document.getElementById("cancelConfirmBtn");i&&(i.onclick=function(){t.style.opacity="0",t.style.pointerEvents="none",n&&(n.style.transform="translateY(-20px)")});let s=document.getElementById("okConfirmBtn");s&&(s.onclick=function(){t.style.opacity="0",t.style.pointerEvents="none",n&&(n.style.transform="translateY(-20px)"),Ne()})}function Ne(){try{let a=document.getElementById("editingRecordIndex"),e=a?parseInt(a.value):-1,t=e>=0&&d.databasePerkara[e]?d.databasePerkara[e]:null,n=t&&(t.id||t.recordId)||null,i=t&&t.disposisiId||null,s=(document.getElementById("No_SPRIN_Indak")?.value||"").trim(),l=document.getElementById("Tanggal_SPRIN_Indak")?.value||"",o=(document.getElementById("Nomor_SBP")?.value||"").trim(),u=document.getElementById("Tanggal_SBP")?.value||"",g=((document.getElementById("NoLP")||document.getElementById("NoLP_LP_1"))?.value||"").trim()||"1",c=(document.getElementById("Tanggal_LP")||document.getElementById("Tanggal_LP_LP_1"))?.value||"",P=t&&t.No_LPP?t.No_LPP:ua("","No_LPP","",3),m=t&&t.Tanggal_LPP?t.Tanggal_LPP:c,k=t&&t.No_LPF?t.No_LPF:ua("","No_LPF","",3),y=t&&t.Tanggal_LPF?t.Tanggal_LPF:c,f=t&&t.Nomor_SPLIT?t.Nomor_SPLIT:ua("","Nomor_SPLIT","",3),h=t&&t.Tanggal_SPLIT?t.Tanggal_SPLIT:c,T=(document.getElementById("No_SPRIN_CACAH")?.value||"").trim(),x=document.getElementById("Tanggal_SPRIN_CACAH")?.value||"",L=(document.getElementById("Nomor_BA")?.value||"").trim(),I=document.getElementById("Tanggal_BA")?.value||"",S=(document.getElementById("Nomor_LHP")?.value||"").trim(),E=document.getElementById("Tanggal_LHP")?.value||"",R=wa([{num:s,date:l,numKey:"No_SPRIN_Indak",dateKey:"Tanggal_SPRIN_Indak",label:"Nomor SPRIN INDAK"},{num:o,date:u,numKey:"Nomor_SBP",dateKey:"Tanggal_SBP",label:"Nomor SBP"},{num:g,date:c,numKey:"NoLP",dateKey:"Tanggal_LP",label:"Nomor LP"},{num:P,date:m,numKey:"No_LPP",dateKey:"Tanggal_LPP",label:"Nomor LPP"},{num:k,date:y,numKey:"No_LPF",dateKey:"Tanggal_LPF",label:"Nomor LPF"},{num:f,date:h,numKey:"Nomor_SPLIT",dateKey:"Tanggal_SPLIT",label:"Nomor SPLIT"},{num:T,date:x,numKey:"No_SPRIN_CACAH",dateKey:"Tanggal_Sprin_Cacah",label:"Nomor SPRIN Cacah"},{num:L,date:I,numKey:"Nomor_BA",dateKey:"Tanggal_BA",label:"Nomor BA"},{num:S,date:E,numKey:"Nomor_LHP",dateKey:"Tanggal_LHP",label:"Nomor LHP"}],{tglSprin:l,tglSbp:u,tglLp:c,tglLpp:m,tglLpf:y,tglSplit:h,tglSprinCacah:x,tglBa:I,tglLhp:E},n);if(!R.isValid){A("VALIDASI DITOLAK",R.message,"danger");return}let b=D=>{let U=document.getElementById(D);return U?U.value.trim():""},H=b("Uraian_Barang"),B={id:n||Date.now(),disposisiId:i,No_SPRIN_Indak:s,Tanggal_SPRIN_Indak:l,Nomor_SBP:o,Tanggal_SBP:u,NoLP:g,NoLP_LP_1:g,Tanggal_LP:c,Tanggal_LP_LP_1:c,Jam_Kejadian:b("Jam_Kejadian"),Hari_SBP:b("Hari_SBP"),Asal_Perkara:b("Asal_Perkara"),Jenis_Penindakan:b("Jenis_Penindakan"),Jenis_Perkara:b("Jenis_Perkara"),Status_Penangkapan:b("Status_Penangkapan"),Jenis_Pelanggaran:b("Jenis_Pelanggaran"),Pasal_Pelanggaran:b("Pasal_Pelanggaran"),Modus_Operandi:b("Modus_Operandi"),Kronologis:b("Kronologis"),Jenis_Pelanggaran_Pasal:b("Jenis_Pelanggaran_Pasal"),Lokasi_Penindakan:b("Lokasi_Penindakan"),Nama_Pelaku:b("Nama_Pelaku"),Umur_Pelaku:b("Umur_Pelaku"),Jenis_Kelamin_Pelaku:b("Jenis_Kelamin_Pelaku"),TTL:b("TTL"),Nomor_Identitas:b("Nomor_Identitas"),Pekerjaan:b("Pekerjaan"),Alamat_Pelaku:b("Alamat_Pelaku"),Nomor_Telepon:b("Nomor_Telepon"),Nomor_Rekening:b("Nomor_Rekening"),Pengulangan_Pelanggaran:b("Pengulangan_Pelanggaran"),Komoditi:b("Komoditi"),Kerugian_Negara:b("Kerugian_Negara"),Uraian_Barang:H,Detail_Barang_LPP:H,Merek:b("Merek"),Tipe:b("Tipe"),Kondisi:b("Kondisi"),Spesifikasi_Lain:b("Spesifikasi_Lain"),Jumlah_Koli:b("Jumlah_Koli"),Jenis_Koli:b("Jenis_Koli"),Pengangkut:b("Pengangkut"),No_Kontainer:b("No_Kontainer"),Ukuran_Kontainer:b("Ukuran_Kontainer"),Kantor:b("Kantor"),Dokumen_Pemberitahuan:b("Dokumen_Pemberitahuan"),Tanggal_Dokumen_Pemberitahuan:b("Tanggal_Dokumen_Pemberitahuan"),Dokumen_Pelengkap:b("Dokumen_Pelengkap"),Jenis_Dok_Pelengkap_Select:b("Jenis_Dok_Pelengkap_Select"),Jenis_Dok_Pelengkap_Manual:b("Jenis_Dok_Pelengkap_Manual"),Nomor_Dok_Pelengkap:b("Nomor_Dok_Pelengkap"),Tanggal_Dok_Pelengkap:b("Tanggal_Dok_Pelengkap"),Penyelesaian_Perkara:t&&t.Penyelesaian_Perkara?t.Penyelesaian_Perkara:"",No_LPP:P,Tanggal_LPP:m,No_LPF:k,Tanggal_LPF:y,Nomor_SPLIT:f,Tanggal_SPLIT:h,No_SPRIN_CACAH:T,Tanggal_Sprin_Cacah:x,Nomor_BA:L,Tanggal_BA:I,Nomor_LHP:S,Tanggal_LHP:E,kabid:b("form_kabid"),nip_kabid:b("form_nip_kabid"),jabatan_kabid:b("form_jabatan_kabid"),gol_kabid:b("form_gol_kabid"),nama_seksi:b("form_nama_seksi"),nip_seksi:b("form_nip_seksi"),jabatan_seksi:b("form_jabatan_seksi"),gol_seksi:b("form_gol_seksi"),ketua_tim:b("form_ketua_tim"),nip_ketua_tim:b("form_nip_ketua_tim"),jabatan_ketua_tim:b("form_jabatan_ketua_tim"),gol_ketua_tim:b("form_gol_ketua_tim"),pembuat_lpp:b("form_pembuat_lpp"),nip_pembuat_lpp:b("form_nip_pembuat_lpp"),jabatan_pembuat_lpp:b("form_jabatan_pembuat_lpp"),gol_pembuat_lpp:b("form_gol_pembuat_lpp"),petugas_lpf:b("form_petugas_lpf"),nip_petugas_lpf:b("form_nip_petugas_lpf"),jabatan_petugas_lpf:b("form_jabatan_lpf"),gol_petugas_lpf:b("form_gol_petugas_lpf"),indak_1:b("form_indak_1"),nip_indak_1:b("form_nip_indak_1"),jabatan_indak_1:b("form_jabatan_indak_1"),gol_indak_1:b("form_gol_indak_1"),indak_2:b("form_indak_2"),nip_indak_2:b("form_nip_indak_2"),jabatan_indak_2:b("form_jabatan_indak_2"),gol_indak_2:b("form_gol_indak_2"),indak_lainnya:b("form_indak_lainnya"),nip_indak_lainnya:b("form_nip_indak_lainnya"),jabatan_indak_lainnya:b("form_jabatan_indak_lainnya"),gol_indak_lainnya:b("form_gol_indak_lainnya"),statusAlur:"TERHUBUNG / OTOMATIS",disposisiPetugas:d.currentUser?d.currentUser.namaLengkap||d.currentUser.nama:"Admin"};e>=0&&d.databasePerkara[e]?(B.statusAlur=d.databasePerkara[e].statusAlur||"DRAFT",B.disposisiPetugas=d.databasePerkara[e].disposisiPetugas||"",d.databasePerkara[e]=B):(d.databasePerkara.push(B),d.activeRecordIndex=d.databasePerkara.length-1),w(),ui=1,Ma(),ct(),xa(),A("BERHASIL DISIMPAN","Data perkara & dokumen berhasil diproses.","success")}catch(a){console.error("Error saat menyimpan perkara:",a),A("KESALAHAN SISTEM","Gagal memproses penyimpanan data form.","danger")}}function Rn(){Pt()}function ci(){w(),A("DATA TERSIMPAN","Seluruh data AP3 berhasil dicadangkan.","success")}async function bt(){ft(),await mt(),await wn(),await Bn()}window.addNewPerkaraModal=Mn;window.editPerkara=Dn;window.deletePerkara=Un;window.closeModal=ct;window.confirmAndSubmitPerkara=Pt;window.executePerkaraSubmission=Ne;window.submitPerkaraForm=Rn;window.syncStatusPenangkapan=xn;window.syncJenisPelanggaran=Tn;window.syncJenisPenindakan=An;window.syncJenisPerkara=Ln;window.syncModusOperandi=In;window.syncKomoditi=En;window.syncKantor=Nn;window.updateHariSBP=ka;window.generateKronologisOtomatis=Pn;window.generateKesimpulanOtomatis=dt;window.setPratinjauNomor=Ia;window.toggleAsalPerkaraManual=yn;window.togglePekerjaanManual=fn;window.toggleUkuranKontainerManual=kn;window.toggleJenisDokumen=_n;window.syncDokumenPemberitahuan=gt;window.handleJenisDokPelengkapChange=vn;window.syncDokumenPelengkap=ut;window.syncIdentitasValue=hn;window.handleJenisKoliSelectChange=bn;window.generateUraianBarangOtomatis=we;window.autoGenerateAndAddMasterPasal=pt;window.syncKondisiBarang=de;window.syncPasalPelanggaran=Ee;window.addCustomKantor=Sn;window.initPerkaraDropdownsFromMaster=Be;Pe();var Pi=[Ce,Oe,Ye,at,yt,st,it,lt];Pi.forEach(a=>{Object.keys(a).forEach(e=>{window[e]=a[e]})});window.store=d;Object.defineProperty(window,"databasePerkara",{get:()=>d.databasePerkara,set:a=>{d.databasePerkara=a}});Object.defineProperty(window,"currentUser",{get:()=>d.currentUser,set:a=>{d.currentUser=a}});Object.defineProperty(window,"userAccounts",{get:()=>d.userAccounts,set:a=>{d.userAccounts=a}});Object.defineProperty(window,"activeRecordIndex",{get:()=>d.activeRecordIndex,set:a=>{d.activeRecordIndex=a}});Object.defineProperty(window,"currentDoc",{get:()=>d.currentDoc,set:a=>{d.currentDoc=a}});Object.defineProperty(window,"currentTLDoc",{get:()=>d.currentTLDoc,set:a=>{d.currentTLDoc=a}});Object.defineProperty(window,"selectedPaperSize",{get:()=>d.selectedPaperSize,set:a=>{d.selectedPaperSize=a}});document.addEventListener("DOMContentLoaded",function(){ye(),Ge(),ot();let a=document.querySelectorAll(".nav-btn"),e=document.querySelectorAll(".tab-pane");a.forEach(s=>{s.addEventListener("click",function(l){l.preventDefault(),a.forEach(g=>g.classList.remove("active")),this.classList.add("active");let o=this.getAttribute("data-target");if(!o)return;e.forEach(g=>g.classList.remove("active"));let u=document.getElementById(o);if(u&&u.classList.add("active"),o==="disposisi"&&(ta(),za()),o==="dasbor")xa();else if(o==="laporan"){let g=document.getElementById("docFilterSelect"),c=g?g.value:d.currentDoc;se(c)}else if(o==="tindaklanjut"){let g=document.getElementById("tlDocFilterSelect"),c=g?g.value:d.currentTLDoc;oe(c)}})});let t=document.querySelectorAll(".gemini-nav-item"),n=document.querySelectorAll(".setting-subtab-pane");t.forEach(s=>{s.addEventListener("click",function(){t.forEach(u=>u.classList.remove("active")),this.classList.add("active");let l=this.getAttribute("data-setting-tab");n.forEach(u=>u.classList.remove("active"));let o=document.getElementById(l);o&&o.classList.add("active")})}),document.addEventListener("click",function(s){let l=document.querySelector(".user-profile-wrapper"),o=document.getElementById("userDropdownMenu");l&&!l.contains(s.target)&&o&&o.classList.remove("show")}),bt(),Ma(),xa(),be("F4"),se(d.currentDoc),oe(d.currentTLDoc),Ia();let i=document.getElementById("app-loading-screen");i&&(i.style.opacity="0",setTimeout(()=>{i.style.display="none"},300))});window.addEventListener("beforeprint",()=>{document.querySelectorAll("#reports .report, #tl_reports .report").forEach(a=>{a.style.display="block"})});window.addEventListener("afterprint",()=>{document.getElementById("reports")&&ya(d.currentActivePageIdx,"reports"),document.getElementById("tl_reports")&&ya(d.currentActivePageIdx,"tl_reports")});document.addEventListener("click",function(a){let e=a.target,t=e.closest(".btn-terima-dsp");if(t){let i=t.getAttribute("data-id");i&&Ka("terima",i)}let n=e.closest(".btn-tolak-dsp");if(n){let i=n.getAttribute("data-id");i&&Ka("tolak",i)}});
