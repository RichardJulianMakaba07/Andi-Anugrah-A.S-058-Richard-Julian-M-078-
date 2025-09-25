let currentUser = null;

    function showPage(pageId) {
      if (pageId === 'formulir' && !currentUser) {
        showAlert('Anda harus login terlebih dahulu untuk mengakses formulir.');
        return;
      }
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(pageId + '-page').classList.add('active');
      const btn = document.querySelector(`.nav-btn[onclick="showPage('${pageId}')"]`);
      if (btn) btn.classList.add('active');
      clearAlerts();
    }

    function showAlert(message, type = 'error') {
      const alertContainer = document.getElementById('alert-container');
      const alert = document.createElement('div');
      alert.className = `alert alert-${type}`;
      alert.textContent = message;
      alert.style.display = 'flex';
      alertContainer.appendChild(alert);
      setTimeout(() => alert.remove(), 5000);
    }

    function clearAlerts() {
      document.getElementById('alert-container').innerHTML = '';
    }

    function showLoading(show = true) {
      document.getElementById('loading').style.display = show ? 'block' : 'none';
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
      return /^08\d{8,11}$/.test(phone.replace(/\s/g, ''));
    }

    function resetForm() {
      document.getElementById('studentForm').reset();
      showAlert('Formulir telah direset.', 'success');
    }

    // Register
    document.getElementById('registerForm').addEventListener('submit', e => {
      e.preventDefault();
      clearAlerts();
      const data = Object.fromEntries(new FormData(e.target));
      if (!data.nama_lengkap.trim()) return showAlert('Nama Lengkap wajib diisi.');
      if (data.username.length < 4) return showAlert('Username minimal 4 karakter.');
      if (!validateEmail(data.email)) return showAlert('Format Email tidak valid.');
      if (data.password.length < 6) return showAlert('Password minimal 6 karakter.');
      if (data.password !== data.confirm_password) return showAlert('Password dan Konfirmasi tidak cocok!');
      showLoading(true);
      setTimeout(() => {
        showLoading(false);
        showAlert('Registrasi berhasil! Silakan login.', 'success');
        setTimeout(() => showPage('login'), 1500);
      }, 1500);
    });

    // Login
    document.getElementById('loginForm').addEventListener('submit', e => {
      e.preventDefault();
      clearAlerts();
      const data = Object.fromEntries(new FormData(e.target));
      if (!data.username.trim()) return showAlert('Username wajib diisi.');
      if (!data.password) return showAlert('Password wajib diisi.');
      showLoading(true);
      setTimeout(() => {
        showLoading(false);
        currentUser = data.username;
        showAlert('Login berhasil!', 'success');
        setTimeout(() => showPage('formulir'), 1000);
      }, 1000);
    });

    // Formulir
    document.getElementById('studentForm').addEventListener('submit', e => {
      e.preventDefault();
      clearAlerts();
      const data = Object.fromEntries(new FormData(e.target));
      if (!data.nama.trim()) return showAlert('Nama Calon Siswa wajib diisi.');
      if (!data.tempat_lahir.trim()) return showAlert('Tempat Lahir wajib diisi.');
      if (!data.tanggal_lahir) return showAlert('Tanggal Lahir wajib diisi.');
      if (!data.agama) return showAlert('Agama wajib dipilih.');
      if (!data.alamat.trim()) return showAlert('Alamat wajib diisi.');
      if (!validatePhone(data.telepon)) return showAlert('Nomor telepon tidak valid. Contoh: 081234567890');
      if (!data.jenis_kelamin) return showAlert('Jenis Kelamin wajib dipilih.');
      showLoading(true);
      setTimeout(() => {
        showLoading(false);
        console.log('Data Formulir:', data);
        showPage('success');
      }, 2000);
    });

    // Validasi realtime
    document.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('blur', function() {
        if (this.checkValidity() && this.value.trim()) {
          this.style.borderColor = '#28a745';
        } else if (this.value.trim()) {
          this.style.borderColor = '#dc3545';
        }
      });
      input.addEventListener('focus', function() {
        this.style.borderColor = '#667eea';
      });
    });