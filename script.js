const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
  });
}
document.querySelectorAll('.nav-group > .nav-label').forEach(button => {
  button.addEventListener('click', () => {
    const group = button.closest('.nav-group');
    const expanded = group.classList.toggle('open');
    button.setAttribute('aria-expanded', String(expanded));
  });
});
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const form = document.querySelector('#quote-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Quote request: ${data.get('service') || 'Electrical services'}`);
    const body = encodeURIComponent(
`Hello Wynn's Electrical Service,

I would like to request a quote.

Name: ${data.get('name')}
Company: ${data.get('company') || 'Not provided'}
Email: ${data.get('email')}
Phone: ${data.get('phone') || 'Not provided'}
Service requested: ${data.get('service')}
Project location: ${data.get('location') || 'Not provided'}

Project details:
${data.get('message')}

Preferred contact method: ${data.get('contact-method') || 'Email'}`
    );
    const email = form.dataset.email || 'Thomas@wynnselectrical.com';
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    const status = document.querySelector('#form-status');
    if (status) status.textContent = 'Your email application should open with your request prepared. Please review and send it to complete your request.';
  });
}
