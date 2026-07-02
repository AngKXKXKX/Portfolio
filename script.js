    const filterButtons = document.querySelectorAll('.filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        projectCards.forEach((card) => {
          const matches = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !matches);
        });
      });
    });

    document.querySelectorAll('.detail-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        card.classList.toggle('open');
        button.textContent = card.classList.contains('open') ? 'Hide details' : 'Show details';
      });
    });

    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));

    document.querySelectorAll(".project-card").forEach(card => {
      const images = card.querySelectorAll(".project-image");
      let index = 0;

      const show = (i) => {
        images.forEach(img => img.classList.remove("active"));
        if (images[i]) images[i].classList.add("active");
      };

      card.querySelector(".next")?.addEventListener("click", () => {
        index = (index + 1) % images.length;
        show(index);
      });

      card.querySelector(".prev")?.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        show(index);
      });
    });
    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightbox-img");

    let currentImages = [];
    let currentIndex = 0;

    // OPEN LIGHTBOX when clicking image
    document.querySelectorAll(".project-card").forEach(card => {
      const images = card.querySelectorAll(".project-image");

      images.forEach((img, index) => {
        img.addEventListener("click", () => {
          currentImages = Array.from(images);
          currentIndex = index;

          openLightbox();
        });
      });
    });

    function openLightbox() {
      lightbox.classList.remove("hidden");
      updateImage();
    }

    function updateImage() {
      lightboxImg.src = currentImages[currentIndex].src;
    }

    // NEXT
    document.querySelector(".lightbox-next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateImage();
    });

    // PREV
    document.querySelector(".lightbox-prev").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateImage();
    });

    // CLOSE
    document.querySelector(".close-btn").addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });

    // CLICK OUTSIDE TO CLOSE
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add("hidden");
      }
    });
