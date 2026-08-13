function initTestimonials() {
    const track = document.getElementById('testimonial-track');
    if (!track) return;

    const items = track.children;
    const total = items.length;
    let index = 0;

    function updateSlider() {
        // Cek apakah kita di mode Mobile atau Desktop
        const isMobile = window.innerWidth < 768; // 768px adalah breakpoint 'md' Tailwind
        
        // Jika Mobile: geser 100% (1 item per slide)
        // Jika Desktop: geser 33.33% (3 item per slide)
        const step = isMobile ? 100 : 33.3333;
        
        // Hitung limit agar slide tidak berhenti di ruang kosong
        // Di desktop, kita berhenti di index ke (total - 3)
        const maxIndex = isMobile ? total - 1 : total - 3;
        
        if (index > maxIndex) index = 0;

        track.style.transform = `translateX(-${index * step}%)`;
    }

    setInterval(() => {
        const isMobile = window.innerWidth < 768;
        const maxIndex = isMobile ? total - 1 : total - 3;
        
        index++;
        if (index > maxIndex) index = 0;
        
        updateSlider();
    }, 4000); // Slide setiap 4 detik

    // Re-calculate jika user resize layar (putar HP atau resize browser)
    window.addEventListener('resize', updateSlider);
    
    // Jalankan sekali saat load
    updateSlider();
}

document.addEventListener('DOMContentLoaded', initTestimonials);