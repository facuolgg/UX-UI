// script.js - Portfolio Personal (Facundo Federico Olguín)

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. NAVEGACIÓN MOBILE
  // ==========================================
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

  // ==========================================
  // 2. MODAL CASO DE ESTUDIO (OPENART)
  // ==========================================
  const openModalBtn = document.getElementById('btn-open-modal-openart');
  const modal = document.getElementById('modal-openart');
  const backdrop = document.getElementById('modal-openart-backdrop');
  const closeBtn = document.getElementById('modal-openart-close-btn');
  const footerCloseBtn = document.getElementById('modal-openart-footer-close-btn');

  if (openModalBtn && modal) {
    let previousActiveElement = null;

    // Selector de todos los elementos interactivos enfocables dentro del modal
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const getFocusableElements = () => {
      return Array.from(modal.querySelectorAll(focusableSelectors)).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      );
    };

    const openModal = () => {
      previousActiveElement = document.activeElement;
      modal.classList.remove('hidden');
      modal.removeAttribute('aria-hidden');
      document.body.classList.add('overflow-hidden');

      // Foco al primer elemento enfocable (o botón de cierre)
      requestAnimationFrame(() => {
        const focusable = getFocusableElements();
        if (focusable.length > 0) {
          focusable[0].focus();
        } else if (closeBtn) {
          closeBtn.focus();
        }
      });
    };

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('overflow-hidden');

      // Restaurar foco al elemento que disparó el modal
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      } else if (openModalBtn) {
        openModalBtn.focus();
      }
    };

    // Apertura
    openModalBtn.addEventListener('click', openModal);

    // Cierre mediante botones
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);

    // Cierre al hacer click en el backdrop o fuera de la tarjeta
    if (backdrop) backdrop.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('min-h-full')) {
        closeModal();
      }
    });

    // Gestión del teclado: Cierre con Esc y Trampa de Foco (Focus Trap)
    document.addEventListener('keydown', (e) => {
      const isModalOpen = !modal.classList.contains('hidden');
      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: si estamos en el primero, ciclar al último
          if (document.activeElement === firstElement || !modal.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: si estamos en el último, ciclar al primero
          if (document.activeElement === lastElement || !modal.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
});
