import { store, savePerkaraToStorage } from '../state/store.js';
import { escText } from '../utils/formatters.js';
import { showToast, showToastConfirm } from '../utils/ui.js';
export async function initUserAccounts() {
    try {
        let response = await fetch('/api/auth/users');
        let result = await response.json();
        if (result.success) {
            store.userAccounts = result.data || [];
        }
    }
    catch (e) {
        console.error("Gagal memuat akun dari server:", e);
        store.userAccounts = [];
    }
    let adminUser = store.userAccounts.find((u) => u && u.email && u.email.toLowerCase() === "admin");
    if (!adminUser) {
        let newAdmin = { nama: "Admin System", email: "admin", pass: "admin", role: "Admin" };
        try {
            await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAdmin)
            });
            store.userAccounts.push(newAdmin);
        }
        catch (err) {
            console.error("Gagal menginisialisasi akun admin ke server:", err);
        }
    }
}
export function checkLoginSession() {
    let session = JSON.parse(localStorage.getItem('currentUserSession') || 'null');
    if (!session) {
        let overlay = document.getElementById('authOverlay');
        if (overlay)
            overlay.style.display = 'flex';
        return;
    }
    store.currentUser = session;
    let overlay = document.getElementById('authOverlay');
    if (overlay)
        overlay.style.display = 'none';
    applyUserProfile();
}
export function switchAuthTab(tab) {
    let btnLogin = document.getElementById('authTabLoginBtn');
    let btnReg = document.getElementById('authTabRegisterBtn');
    let loginForm = document.getElementById('loginForm');
    let registerForm = document.getElementById('registerForm');
    if (tab === 'login') {
        if (btnLogin)
            btnLogin.classList.add('active');
        if (btnReg)
            btnReg.classList.remove('active');
        if (loginForm)
            loginForm.style.display = 'block';
        if (registerForm)
            registerForm.style.display = 'none';
    }
    else {
        if (btnLogin)
            btnLogin.classList.remove('active');
        if (btnReg)
            btnReg.classList.add('active');
        if (loginForm)
            loginForm.style.display = 'none';
        if (registerForm)
            registerForm.style.display = 'block';
    }
}
export async function handleLoginSubmit(e) {
    e.preventDefault();
    let emailInput = document.getElementById('login_email');
    let passInput = document.getElementById('login_password');
    let overlay = document.getElementById('authOverlay');
    if (!emailInput || !passInput)
        return;
    let email = emailInput.value.trim();
    let pass = passInput.value.trim();
    try {
        let response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pass })
        });
        let result = await response.json();
        if (result.success) {
            store.currentUser = result.user;
            localStorage.setItem('currentUserSession', JSON.stringify(result.user));
            if (overlay)
                overlay.style.display = 'none';
            applyUserProfile();
            if (window.renderPerkaraTable)
                window.renderPerkaraTable();
            if (window.updateDashboardStats)
                window.updateDashboardStats();
            showToast("LOGIN BERHASIL", `Selamat datang, ${result.user.nama} (${result.user.role})`, "success");
        }
        else {
            showToast("LOGIN GAGAL", result.error || "Email/Username atau kata sandi tidak cocok!", "danger");
        }
    }
    catch (err) {
        showToast("KESALAHAN SISTEM", "Gagal terhubung ke server backend.", "danger");
    }
}
export async function handleRegisterSubmit(e) {
    e.preventDefault();
    let namaInput = document.getElementById('reg_nama');
    let emailInput = document.getElementById('reg_email');
    let roleInput = document.getElementById('reg_role');
    let passInput = document.getElementById('reg_password');
    if (!namaInput || !emailInput || !roleInput || !passInput)
        return;
    let nama = namaInput.value.trim();
    let email = emailInput.value.trim().toLowerCase();
    let role = roleInput.value;
    let pass = passInput.value.trim();
    try {
        let response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, email, role, pass })
        });
        let result = await response.json();
        if (result.success) {
            showToast("REGISTRASI BERHASIL", "Silakan login menggunakan akun baru Anda.", "success");
            switchAuthTab('login');
            let loginEmail = document.getElementById('login_email');
            let loginPass = document.getElementById('login_password');
            if (loginEmail)
                loginEmail.value = email;
            if (loginPass)
                loginPass.value = '';
            await initUserAccounts();
        }
        else {
            showToast("REGISTRASI GAGAL", result.error || "Gagal mendaftarkan akun.", "warning");
        }
    }
    catch (err) {
        showToast("KESALAHAN SISTEM", "Gagal terhubung ke server backend.", "danger");
    }
}
export function applyUserProfile() {
    if (!store.currentUser)
        return;
    let displayName = store.currentUser.namaLengkap || store.currentUser.nama || 'Pengguna AP3';
    let displayEmail = store.currentUser.email || store.currentUser.username || '-';
    let displayRole = store.currentUser.role || 'Penyidik';
    let initial = displayName.charAt(0).toUpperCase();
    let navName = document.getElementById('nav_user_name');
    let navRole = document.getElementById('nav_user_role');
    let avatarIcon = document.getElementById('sidebarAvatarText');
    if (navName)
        navName.textContent = displayName;
    if (avatarIcon)
        avatarIcon.textContent = initial;
    if (navRole) {
        navRole.textContent = displayRole;
        if (displayRole === 'Admin' || displayRole === 'Kepala Seksi Penyidikan') {
            navRole.style.background = 'rgba(56, 189, 248, 0.15)';
            navRole.style.color = '#38bdf8';
            navRole.style.borderColor = 'rgba(56, 189, 248, 0.3)';
        }
        else {
            navRole.style.background = 'rgba(16, 185, 129, 0.15)';
            navRole.style.color = '#10b981';
            navRole.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        }
    }
    let dropName = document.getElementById('dropdownUserName');
    let dropEmail = document.getElementById('dropdownUserEmail');
    let dropRole = document.getElementById('dropdownUserRole');
    if (dropName)
        dropName.textContent = displayName;
    if (dropEmail)
        dropEmail.textContent = displayEmail;
    if (dropRole)
        dropRole.textContent = displayRole;
    let setUserName = document.getElementById('setting_userName');
    let setUserEmail = document.getElementById('setting_userEmail');
    let setUserRole = document.getElementById('setting_userRole');
    if (setUserName)
        setUserName.value = displayName;
    if (setUserEmail)
        setUserEmail.value = displayEmail;
    if (setUserRole)
        setUserRole.value = displayRole;
    let btnAddNew = document.getElementById('btnAddNewPerkara');
    if (btnAddNew) {
        if (displayRole.includes('Penyidik')) {
            btnAddNew.style.display = 'none';
        }
        else {
            btnAddNew.style.display = 'inline-flex';
        }
    }
    let tabNavUsers = document.getElementById('tabNavUsers');
    if (tabNavUsers) {
        if (displayRole === 'Admin') {
            tabNavUsers.style.display = 'flex';
            if (typeof window.renderRegisteredUsersTable === 'function') {
                window.renderRegisteredUsersTable();
            }
        }
        else {
            tabNavUsers.style.display = 'none';
        }
    }
    if (typeof window.populateDisposisiUserDropdown === 'function') {
        window.populateDisposisiUserDropdown();
    }
    if (typeof window.checkDisposisiAccessByRole === 'function') {
        window.checkDisposisiAccessByRole();
    }
    if (typeof window.renderDisposisiTable === 'function') {
        window.renderDisposisiTable();
    }
}
export function renderRegisteredUsersTable() {
    let tbody = document.getElementById('registeredUsersTableBody');
    if (!tbody)
        return;
    tbody.innerHTML = store.userAccounts.map((u, i) => {
        let isPasswordShown = (store.visiblePasswordIndex === i);
        let passVal = u && u.pass ? u.pass : '';
        let passDisplay = isPasswordShown ? `<span class="password-preview-box">${escText(passVal)}</span>` : `••••••••`;
        let eyeIcon = isPasswordShown ? `<i class="fi fi-rr-eye-crossed"></i>` : `<i class="fi fi-rr-eye"></i>`;
        return `
      <tr>
        <td><b>${i + 1}</b></td>
        <td><b>${escText(u?.nama || '-')}</b></td>
        <td>${escText(u?.email || '-')}</td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            ${passDisplay}
            <button type="button" class="btn secondary" style="padding:2px 6px; font-size:10px;" onclick="togglePasswordPreview(${i})">${eyeIcon}</button>
          </div>
        </td>
        <td><span class="role-badge-pill">${escText(u?.role || '-')}</span></td>
        <td style="text-align:center;">
          <div style="display:flex; gap:4px; justify-content:center;">
            <button type="button" class="btn danger" style="padding:2px 6px; font-size:10px;" onclick="deleteUserAccount(${i})">
              <i class="fi fi-rr-trash"></i> Hapus
            </button>
          </div>
        </td>
      </tr>
    `;
    }).join('');
}
export function togglePasswordPreview(index) {
    store.visiblePasswordIndex = (store.visiblePasswordIndex === index) ? -1 : index;
    renderRegisteredUsersTable();
}
export function deleteUserAccount(index) {
    let user = store.userAccounts[index];
    if (!user)
        return;
    if (store.currentUser && user.email && store.currentUser.email.toLowerCase() === user.email.toLowerCase()) {
        showToast("TIDAK DAPAT MENGHAPUS", "Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif!", "warning");
        return;
    }
    showToastConfirm("KONFIRMASI HAPUS AKUN", `Apakah Anda yakin ingin menghapus akun user "${user.nama}" (${user.email})?`, async () => {
        store.userAccounts.splice(index, 1);
        try {
            await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'sync_users', list: store.userAccounts })
            });
        }
        catch (e) {
            console.error("Gagal memperbarui data user di server:", e);
        }
        renderRegisteredUsersTable();
        populateDisposisiUserDropdown();
        showToast("AKUN TERHAPUS", "Akun pengguna telah berhasil dihapus dari sistem.", "danger");
    });
}
export function populateDisposisiUserDropdown() {
    let select = document.getElementById('val_disposisi_user');
    if (!select)
        return;
    let penyidikList = store.userAccounts.filter((u) => u && u.role && u.role.toLowerCase().includes('penyidik'));
    select.innerHTML = `<option value="-">- Pilih Penyidik -</option>` + penyidikList.map((u) => `<option value="${escText(u.nama)}">${escText(u.nama)}</option>`).join('');
}
export function toggleDropdown(event) {
    event.stopPropagation();
    let menu = document.getElementById('userDropdownMenu');
    if (menu)
        menu.classList.toggle('show');
}
export function toggleUserDropdown(event) {
    event.stopPropagation();
    let menu = document.getElementById('userDropdownMenu');
    if (menu)
        menu.classList.toggle('show');
}
export function openProfileSettingTab() {
    let menu = document.getElementById('userDropdownMenu');
    if (menu)
        menu.classList.remove('show');
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    navButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(tab => tab.classList.remove('active'));
    let setBtn = document.querySelector('.nav-btn[data-target="pengaturan"]');
    if (setBtn)
        setBtn.classList.add('active');
    let setTab = document.getElementById('pengaturan');
    if (setTab)
        setTab.classList.add('active');
}
export function handleLogout() {
    let menu = document.getElementById('userDropdownMenu');
    if (menu)
        menu.classList.remove('show');
    showToastConfirm("KONFIRMASI LOGOUT", "Apakah Anda yakin ingin keluar dari aplikasi AP3?", () => {
        localStorage.removeItem('currentUserSession');
        store.currentUser = null;
        showToast("LOGOUT BERHASIL", "Anda telah keluar dari aplikasi.", "info");
        setTimeout(() => {
            let overlay = document.getElementById('authOverlay');
            if (overlay)
                overlay.style.display = 'flex';
        }, 500);
    });
}
export function confirmResetAllData() {
    let userRole = (store.currentUser && store.currentUser.role) ? store.currentUser.role.toLowerCase() : '';
    let isAuthorized = userRole === 'super admin' || userRole === 'admin' || userRole.includes('kasi');
    if (!isAuthorized) {
        showToast("AKSES DITOLAK", "Hanya Admin atau Kasi yang berhak mereset seluruh database!", "danger");
        return;
    }
    showToastConfirm("RESET SEMUA DATABASE", "Apakah Anda yakin ingin menghapus seluruh database perkara dan disposisi secara permanen?", async () => {
        try {
            await fetch('/api/perkara/reset', { method: 'POST' });
        }
        catch (e) {
            console.error("Gagal mereset database perkara di server:", e);
        }
        localStorage.removeItem('databasePerkara');
        localStorage.removeItem('databaseDisposisi');
        localStorage.removeItem('databaseDraftDisposisi');
        if (typeof store !== 'undefined' && store) {
            store.databasePerkara = [];
            if (typeof savePerkaraToStorage === 'function')
                savePerkaraToStorage();
            if (store.databaseDisposisi)
                store.databaseDisposisi = [];
            store.activeRecordIndex = -1;
        }
        location.reload();
    });
}
export function getFilteredDataForUser() {
    if (!store.currentUser)
        return store.databasePerkara;
    if (store.currentUser.role === 'Admin' || store.currentUser.role === 'Kepala Seksi Penyidikan') {
        return store.databasePerkara;
    }
    else {
        return store.databasePerkara.filter((rec) => rec.disposisiPetugas && rec.disposisiPetugas.toLowerCase() === store.currentUser?.nama.toLowerCase());
    }
}
window.confirmResetAllData = confirmResetAllData;
window.handleLoginSubmit = handleLoginSubmit;
window.handleRegisterSubmit = handleRegisterSubmit;
window.togglePasswordPreview = togglePasswordPreview;
window.deleteUserAccount = deleteUserAccount;
window.toggleUserDropdown = toggleUserDropdown;
window.handleLogout = handleLogout;
window.openProfileSettingTab = openProfileSettingTab;
//# sourceMappingURL=auth.js.map