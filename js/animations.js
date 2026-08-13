// Load GSAP via CDN dinamik agar tidak memperlambat loading awal
const loadGSAP = () => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    script.onload = () => {
        const scrollScript = document.createElement('script');
        scrollScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
        scrollScript.onload = initAnimations;
        document.body.appendChild(scrollScript);
    };
    document.body.appendChild(script);
};

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Efek Fade Up untuk semua elemen dengan class 'reveal'
    gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%", // Mulai animasi saat elemen 85% masuk layar
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
}

// Jalankan hanya jika ada elemen yang perlu di-animate
if (document.querySelector('.reveal')) {
    loadGSAP();
}