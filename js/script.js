// Mobile nav toggle
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('.nav__links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item__q').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');

    item.parentElement.querySelectorAll('.faq-item').forEach((other) => {
      other.classList.remove('is-open');
      other.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('.contact-form__submit');
  submitBtn.setAttribute('disabled', 'true');
  contactFormStatus.textContent = 'Envoi en cours...';

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm),
    });
    if (!response.ok) throw new Error('Request failed');
    contactFormStatus.textContent = 'Merci ! On revient vers vous très vite.';
    contactForm.reset();
  } catch (err) {
    contactFormStatus.textContent = "Oups, l'envoi a échoué. Réessayez ou écrivez-nous directement par mail.";
  } finally {
    submitBtn.removeAttribute('disabled');
  }
});

// Custom cursor pill on portfolio hover
const cursorPill = document.getElementById('cursorPill');
document.querySelectorAll('[data-cursor-label]').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    cursorPill.textContent = item.dataset.cursorLabel;
    cursorPill.classList.add('is-active');
  });
  item.addEventListener('mousemove', (e) => {
    cursorPill.style.left = `${e.clientX}px`;
    cursorPill.style.top = `${e.clientY}px`;
  });
  item.addEventListener('mouseleave', () => {
    cursorPill.classList.remove('is-active');
  });
});

