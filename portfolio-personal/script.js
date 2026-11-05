// script.js - Portfolio Personal (Facundo Federico Olguín)

document.addEventListener('DOMContentLoaded', () => {
  // --- NAVEGACIÓN MOBILE ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileMenu) {
    const toggleMenu = (shouldOpen) => {
      const isOpen = shouldOpen !== undefined ? shouldOpen : mobileMenu.classList.contains('hidden');
      
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
        if (iconMenu && iconClose) {
          iconMenu.classList.add('hidden');
          iconClose.classList.remove('hidden');
        }
      } else {
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        if (iconMenu && iconClose) {
          iconMenu.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      }
    };

    menuToggle.addEventListener('click', () => {
      const isCurrentlyHidden = mobileMenu.classList.contains('hidden');
      toggleMenu(isCurrentlyHidden);
    });

    // Cerrar menú al hacer clic en cualquiera de las anclas de navegación
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        toggleMenu(false);
        menuToggle.focus();
      }
    });

    // Cerrar menú si la pantalla se redimensiona a desktop (>= 768px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        toggleMenu(false);
      }
    });
  }
});
