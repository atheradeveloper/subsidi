// KPR Calculator Logic
// Annuity KPR formula: P = (r * PV) / (1 - (1 + r)^-n)

function hitungKPR(hargaJual, uangMuka, bungaTahunan, tenorTahun) {
    const plafonPinjaman = hargaJual - uangMuka;
    if (plafonPinjaman <= 0) return { angsuran: 0, plafon: 0 };

    const bungaBulanan = (bungaTahunan / 100) / 12;
    const totalBulan = tenorTahun * 12;

    let angsuranPerBulan = 0;
    if (bungaBulanan === 0) {
        angsuranPerBulan = plafonPinjaman / totalBulan;
    } else {
        angsuranPerBulan = (plafonPinjaman * bungaBulanan) / (1 - Math.pow(1 + bungaBulanan, -totalBulan));
    }

    return {
        angsuran: Math.round(angsuranPerBulan),
        plafon: plafonPinjaman
    };
}

// Calculate additional buying costs (BPHTB, AJB/Notaris, Provisi, Admin)
function hitungBiayaLegalitas(hargaJual, plafonPinjaman, isSubsidized = false) {
    let bphtb = 0;
    let ajbNotaris = 0;
    let provisiBank = 0;
    let adminBank = 1000000; // Flat estimate 1 million IDR

    if (isSubsidized) {
        // Subsidized housing has flat/exempted/heavily discounted fees
        bphtb = 0; // Usually exempt or covered by developer
        ajbNotaris = 2500000; // Standard package for subsidies
        provisiBank = 0.005 * plafonPinjaman; // Often lower or promo
    } else {
        // Commercial rules
        // BPHTB = 5% of (Harga Jual - NPOPTKP). Let's use 60 million IDR as standard NPOPTKP in Central Java
        const npoptkp = 60000000;
        bphtb = Math.max(0, 0.05 * (hargaJual - npoptkp));
        // AJB & Notaris is typically around 1% of Sales Price
        ajbNotaris = Math.round(0.01 * hargaJual);
        // Bank Provision is typically 1% of Loan Principal
        provisiBank = Math.round(0.01 * plafonPinjaman);
    }

    const totalBiayaAwal = bphtb + ajbNotaris + provisiBank + adminBank;

    return {
        bphtb,
        ajbNotaris,
        provisiBank,
        adminBank,
        totalBiayaAwal
    };
}

// Bind calculator elements and attach event listeners
function inisialisasiKalkulator(isSubsidized = false) {
    const inputHarga = document.getElementById('input-harga-kpr');
    const inputDPPersen = document.getElementById('input-dp-persen');
    const inputDPNominal = document.getElementById('input-dp-nominal');
    const inputBunga = document.getElementById('input-bunga-kpr');
    const inputTenor = document.getElementById('input-tenor-kpr');

    const outPlafon = document.getElementById('out-plafon');
    const outAngsuran = document.getElementById('out-angsuran');
    const outBphtb = document.getElementById('out-bphtb');
    const outAjb = document.getElementById('out-ajb');
    const outProvisi = document.getElementById('out-provisi');
    const outAdmin = document.getElementById('out-admin');
    const outTotalBiayaAwal = document.getElementById('out-total-awal');

    if (!inputHarga || !inputDPPersen || !inputDPNominal || !inputBunga || !inputTenor) return;

    // Helper to format currency to IDR
    const formatIDR = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

    function updateKalkulator() {
        const harga = parseFloat(inputHarga.value) || 0;
        const dpPersen = parseFloat(inputDPPersen.value) || 0;
        const bunga = parseFloat(inputBunga.value) || 0;
        const tenor = parseFloat(inputTenor.value) || 0;

        // Calculate DP nominal from percent
        const dpNominal = Math.round(harga * (dpPersen / 100));
        inputDPNominal.value = dpNominal;

        const kprResult = hitungKPR(harga, dpNominal, bunga, tenor);
        const legalitas = hitungBiayaLegalitas(harga, kprResult.plafon, isSubsidized);

        // Update UI output fields
        outPlafon.innerText = formatIDR(kprResult.plafon);
        outAngsuran.innerText = formatIDR(kprResult.angsuran);
        outBphtb.innerText = formatIDR(legalitas.bphtb);
        outAjb.innerText = formatIDR(legalitas.ajbNotaris);
        outProvisi.innerText = formatIDR(legalitas.provisiBank);
        outAdmin.innerText = formatIDR(legalitas.adminBank);
        outTotalBiayaAwal.innerText = formatIDR(legalitas.totalBiayaAwal);
    }

    // Bind event listeners
    inputHarga.addEventListener('input', updateKalkulator);
    inputDPPersen.addEventListener('input', updateKalkulator);
    inputBunga.addEventListener('input', updateKalkulator);
    inputTenor.addEventListener('input', updateKalkulator);

    // Dynamic nominal input handler (updates percentage)
    inputDPNominal.addEventListener('input', () => {
        const harga = parseFloat(inputHarga.value) || 0;
        const dpNominal = parseFloat(inputDPNominal.value) || 0;
        if (harga > 0) {
            const dpPersen = (dpNominal / harga) * 100;
            inputDPPersen.value = Math.min(100, Math.max(0, dpPersen)).toFixed(1);
        }
        updateKalkulator();
    });

    // Run once at start
    updateKalkulator();
}
