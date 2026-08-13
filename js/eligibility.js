function checkKPREligibility() {
    const gaji = parseFloat(document.getElementById('check-gaji').value) || 0;
    const cicilanTarget = parseFloat(document.getElementById('check-cicilan').value) || 0;
    const resultDiv = document.getElementById('eligibility-result');

    if (gaji === 0 || cicilanTarget === 0) return;

    // Aturan Perbankan: Cicilan maksimal 30-40% dari gaji
    const maxCicilan = gaji * 0.35;

    resultDiv.classList.remove('hidden');
    if (cicilanTarget <= maxCicilan) {
        resultDiv.innerHTML = `
            <div class="p-4 bg-emerald-100 text-emerald-800 rounded-lg">
                <p class="font-bold">✅ Anda Layak!</p>
                <p class="text-sm">Cicilan Rp ${cicilanTarget.toLocaleString('id-ID')} masih dalam batas aman (35% gaji).</p>
            </div>`;
    } else {
        resultDiv.innerHTML = `
            <div class="p-4 bg-amber-100 text-amber-800 rounded-lg">
                <p class="font-bold">⚠️ Perlu Perhatian</p>
                <p class="text-sm">Cicilan ini cukup tinggi untuk gaji Anda. Disarankan mencari tenor lebih panjang.</p>
            </div>`;
    }
}