(() => {
  const button = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if (!button || !nav) return;
  const close = () => { nav.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', '打开菜单'); };
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { close(); button.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) close(); });
  window.matchMedia('(min-width: 981px)').addEventListener('change', close);
})();
