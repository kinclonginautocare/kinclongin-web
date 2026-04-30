/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== SMOOTH SCROLL & REMOVE MENU MOBILE ===============*/
const scrollLinks = document.querySelectorAll('.nav__link, .home__button, .about__button, .services__button, .gallery__button, .nav__logo, .scrollup');

const smoothScrollAction = (e) =>{
    const targetId = e.currentTarget.getAttribute('href');

    // Hanya jalankan smooth scroll jika href dimulai dengan # dan bukan hanya #
    if (!targetId || !targetId.startsWith('#') || targetId === '#') return;

    e.preventDefault();

    const targetElement = document.querySelector(targetId);
    
    // For nav links, also close the mobile menu
    if (e.currentTarget.classList.contains('nav__link')) {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show-menu');
    }

    // GSAP Smooth Scroll
    if (targetElement) {
        gsap.to(document.scrollingElement || document.documentElement, {
            duration: 1.5, // Durasi lebih lambat (1.5 detik)
            scrollTop: targetElement.offsetTop,
            ease: 'power2.inOut' // Animasi yang lebih halus
        });
    }
}
scrollLinks.forEach(link => link.addEventListener('click', smoothScrollAction));

/*=============== SWIPER CAR ===============*/
const syncThemeColor = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const colorClass = Array.from(activeSlide.classList).find(cls => cls.startsWith('car__'));

    // Hapus semua class warna yang mungkin sudah ada di body
    document.body.classList.remove('active-yellow', 'active-green', 'active-blue');

    if (colorClass) {
        const colorName = colorClass.split('__')[1]; // 'yellow', 'green', 'blue'
        const colorVar = `var(--${colorName}-color)`;

        // Update the global active color variable. This will affect all elements using --active-color.
        document.documentElement.style.setProperty('--active-color', colorVar);

        // Tambahkan class yang sesuai dengan slide yang aktif ke body
        document.body.classList.add(`active-${colorName}`);
    }
}

const swiperHome = new Swiper('.home__swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    
    // TAMBAHKAN INI (dalam milidetik)
    speed: 1500, // Ini durasi transisi perpindahan fotonya (1.5 detik) agar smooth

    autoplay: {
        delay: 7000, // Ini durasi nunggu di setiap slide (5 detik)
        disableOnInteraction: false,
    },
    
    effect: 'fade',
    fadeEffect: {
        crossFade: true // Biar transisi antar gambar nggak tumpang tindih aneh
    },

    pagination: {
        el: '.home .swiper-pagination',
        clickable: true,
        renderBullet: (index, className) => {
            return '<span class="' + className + '">' + String(index + 1).padStart(2, '0') + "</span>";
        },
    },
    on: {
        init: function(){
            syncThemeColor(this)
        },
        slideChange: function(){
            syncThemeColor(this)
        }
    }
})

/*=============== GSAP ANIMATION ===============*/
gsap.from('.home__panel-1', {y: -1000, duration: 2})
gsap.from('.home__panel-2', {y: 1000, duration: 2})
gsap.from('.home__image', {x: -1000, duration: 2})
gsap.from('.home__titles', {y: 100, opacity:0, delay: 2})
gsap.from('.home__title', {y: 100, opacity:0, delay: 2.1})

/*=============== ABOUT ANIMATION ===============*/
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
        gsap.from('.about__image', { opacity: 0, x: -50, duration: 1.2, delay: .3, ease: 'power3.out' });
        gsap.from('.about__data', { opacity: 0, x: 50, duration: 1.2, delay: .5, ease: 'power3.out' });
        observer.unobserve(entry.target);
    }
}, { threshold: 0.4 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

/*=============== SERVICES ANIMATION ===============*/
const servicesSection = document.getElementById('services');
if (servicesSection) {
    const servicesObserver = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            gsap.utils.toArray('.services__card').forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'power3.out'
                });
            });
            gsap.from('.services__button', {
               opacity: 0,
               y: 50,
               duration: 0.8,
               delay: 0.8
            });
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.2 });
    servicesObserver.observe(servicesSection);
}

/*=============== SERVICES SLIDER ===============*/
const swiperServices = new Swiper('.services__swiper', {
   loop: true, // Loop bagus untuk tampilan mobile
   spaceBetween: 24, // Sedikit kurangi jarak di mobile
   grabCursor: true,
   slidesPerView: 'auto', // Biarkan CSS yang menentukan lebar kartu
   centeredSlides: true,
   pagination: {
      el: '.services__swiper .swiper-pagination',
      clickable: true,
   },
   breakpoints:{
      992: { // Untuk tablet dan desktop
         slidesPerView: 3,
         centeredSlides: false,
         loop: false, // Matikan loop untuk tampilan grid statis
         pagination: false,
         spaceBetween: 32,
      }
   }
});

/*=============== GALLERY ANIMATION ===============*/
const gallerySection = document.getElementById('gallery');
if (gallerySection) {
    const galleryObserver = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            gsap.utils.toArray('.gallery__item').forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: index * .1,
                    ease: 'power3.out'
                });
            });
            gsap.from('.gallery__button', {
               opacity: 0,
               y: 50,
               duration: 0.8,
               delay: 1
            });
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.2 });
    galleryObserver.observe(gallerySection);
}

/*=============== GLIGHTBOX ===============*/
const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
});

/*=============== CONTACT ANIMATION ===============*/
const contactSection = document.getElementById('contact');
if (contactSection) {
    const contactObserver = new IntersectionObserver((entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            gsap.from('.contact__content-data', { opacity: 0, x: -50, duration: 1, delay: .2, ease: 'power3.out' });
            gsap.from('.contact__content-form', { opacity: 0, x: 50, duration: 1, delay: .4, ease: 'power3.out' });
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.3 });
    contactObserver.observe(contactSection);
}

/*=============== EMAIL VALIDATION ===============*/
const contactForm = document.getElementById('contact-form'),
      contactEmail = document.getElementById('contact-email'),
      contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('.contact__button');

    // Check if the field has a value and if the email is valid
    if (contactEmail.value === '' || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(contactEmail.value)) {
        // Show error message
        contactMessage.textContent = 'Email tidak valid ❌';
        contactMessage.style.color = 'hsl(0, 100%, 60%)'; // Red color
    } else {
        // Show sending state and disable button
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';

        // Ganti 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', dan 'YOUR_PUBLIC_KEY' dengan milik Anda
        emailjs.sendForm('service_qnc99vw', 'template_ac0kgs7', '#contact-form', 'WUJcHYF31alugbfEv')
            .then(() => {
                // Show success message
                contactMessage.textContent = 'Pesan berhasil terkirim ✅';
                contactMessage.style.color = 'var(--green-color)';

                // Remove the message after five seconds
                setTimeout(() => {
                    contactMessage.textContent = '';
                    contactForm.reset();
                }, 5000);
            }, (error) => {
                // Show error message
                contactMessage.textContent = 'Gagal mengirim pesan ❌';
                contactMessage.style.color = 'hsl(0, 100%, 60%)'; // Red color
                console.log('FAILED...', error);
            }).finally(() => {
                // Restore button state after a delay
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Kirim Pesan';
                }, 5000);
            });
    }
};

contactForm.addEventListener('submit', sendEmail);

/*=============== PRELOADER ===============*/
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
    preloader.classList.add('preloader--hidden');
});

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // Show the button when reaching near the bottom of the page
    const isNearBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 150;

    if(isNearBottom){
        scrollUp.classList.add('show-scroll')
    } else {
        scrollUp.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== GALLERY GDRIVE ===============*/
async function loadAutoGallery() {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwZWU3cwwLLDRgnZUxRn16eOD2eV8DdV6kqpp8zANNAO8INe10YvIFVrJuu-LwOAWnSNQ/exec';
    const galleryContainer = document.getElementById('gallery-content');

    try {
        const response = await fetch(scriptUrl);
        const images = await response.json();

        galleryContainer.innerHTML = '';

        images.forEach(img => {
            const driveImgUrl = `https://lh3.googleusercontent.com/d/${img.id}`;
            
            const item = `
                <div class="gallery__item" data-img="${driveImgUrl}">
                    <img src="${driveImgUrl}" alt="${img.name}" class="gallery__img" loading="lazy">
                    <div class="gallery__overlay">
                        <i class="ri-add-line"></i>
                    </div>
                </div>
            `;
            galleryContainer.innerHTML += item;
        });

    } catch (error) {
        console.error("gagal narik galeri:", error);
        galleryContainer.innerHTML = '<p>Gagal memuat galeri. Cek koneksi</p>';
    }
}

// Panggil
loadAutoGallery();

/*=============== CUSTOM LIGHTBOX ===============*/
document.addEventListener("click", function(e) {
    const item = e.target.closest(".gallery__item");
    if (!item) return;

    const imgSrc = item.getAttribute("data-img");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightboxImg.src = imgSrc;
    lightbox.classList.add("active");
});

// tombol close
document.querySelector(".lightbox-close").onclick = () => {
    document.getElementById("lightbox").classList.remove("active");
};

// klik luar gambar buat close
document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target.id === "lightbox") {
        this.classList.remove("active");
    }
});
