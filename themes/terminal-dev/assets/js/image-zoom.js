(() => {
  const triggers = document.querySelectorAll('.article-image-trigger');
  if (!triggers.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'image-zoom-dialog';
  dialog.innerHTML = `
    <button type="button" class="image-zoom-close" aria-label="Close">×</button>
    <img class="image-zoom-img" alt="" />
  `;
  document.body.appendChild(dialog);

  const img = dialog.querySelector('.image-zoom-img');
  const closeBtn = dialog.querySelector('.image-zoom-close');

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || '';
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  };

  const close = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    img.src = '';
  };

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-full-src');
      const innerImg = btn.querySelector('img');
      const alt = innerImg ? innerImg.getAttribute('alt') : '';
      open(src, alt);
    });
  });

  closeBtn.addEventListener('click', close);

  // Backdrop click: native <dialog> reports the click target as the dialog
  // element itself when the user clicks outside the inner content.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
})();
