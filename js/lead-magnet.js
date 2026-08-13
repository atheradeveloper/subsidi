function openBrochureModal() {
    document.getElementById('brochure-modal').classList.replace('hidden', 'flex');
}

function submitBrochureForm() {
    const name = document.getElementById('lead-name').value;
    const wa = document.getElementById('lead-wa').value;
    const config = window.APP_CONFIG;

    if (!name || !wa) {
        alert("Mohon isi nama dan nomor WhatsApp Anda.");
        return;
    }

    // 1. Kirim data ke WhatsApp Sales
    const msg = `Halo Sales ${config.brandName}, saya ${name}. Saya ingin meminta Brosur Digital proyek ${document.title}. Mohon dikirimkan ke nomor ini.`;
    const waUrl = `https://api.whatsapp.com/send?phone=${config.salesPhone}&text=${encodeURIComponent(msg)}`;
    
    window.open(waUrl, '_blank');

    // 2. Sembunyikan Modal & Berikan Link Download
    document.getElementById('brochure-modal').classList.replace('flex', 'hidden');
    alert("Terima kasih! Brosur akan dikirimkan melalui WhatsApp Anda.");
    
    // Trigger download otomatis (Opsional)
    // window.location.href = 'assets/brosur-graha-athera.pdf';
}