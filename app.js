(() => {
  const hours = [
    { d: 'Tue – Fri', t: '11 – 7' },
    { d: 'Saturday', t: '10 – 7' },
    { d: 'Sunday', t: '11 – 4' },
    { d: 'Monday', t: 'Closed' },
  ];

  const menu = [
    { title: 'Pie & Mash', note: '',
      items: [
        { name: 'Pie & Mash', price: '$12.50', tags: [], desc: 'Traditional London Pie & Mash. With parsley liquor or gravy. Beef or veg.' },
        { name: 'Doner Kebab Pie', price: '$12.50', tags: [], desc: '' },
        { name: 'Chicken Vindaloo', price: '$12.50', tags: [], desc: '' },
        { name: 'Scotch Pie', price: '$12.50', tags: [], desc: '' },
        { name: 'Cheese & Onion', price: '$12.50', tags: [], desc: '' },
        { name: 'Spinach, Mushroom & Cheddar', price: '$12.50', tags: [], desc: '' },
        { name: '2 Pies + 2 Mash', price: '$22.50', tags: [], desc: '' },
        { name: '2 Pies + 1 Mash', price: '$18.50', tags: [], desc: '' },
        { name: 'Solo Pie', price: '$8.95', tags: [], desc: '' },
      ] },
    { title: 'Pasties', note: '',
      items: [
        { name: 'Cheesy Chipshop Curry', price: '$8.00', tags: [], desc: '' },
        { name: 'Baked Mac & Cheese', price: '$8.00', tags: [], desc: '' },
        { name: 'Classic Cornish Pasty', price: '$8.00', tags: [], desc: '' },
      ] },
    { title: 'Sausage Rolls', note: '3 FOR $10',
      items: [
        { name: 'Cumberland Pork', price: '$3.95', tags: [], desc: 'Classic British sausage roll.' },
        { name: 'Brick Lane Spicy Goan Pork', price: '$3.95', tags: [], desc: 'Slow heat with bursts of garlic & tomato.' },
        { name: 'King Arthur', price: '$3.95', tags: [], desc: 'All beef.' },
        { name: 'The 1066', price: '$3.95', tags: [], desc: 'Double cream Normandy brie, red pepper, arugula, sun-dried tomato + red onion.' },
      ] },
    { title: 'Sides', note: '',
      items: [
        { name: 'Beans', price: '$3.00', tags: [], desc: '' },
        { name: 'Mash', price: '$5.00', tags: [], desc: '' },
        { name: 'Gravy or Parsley Liquor', price: '$3.00', tags: [], desc: '' },
      ] },
    { title: 'Afters', note: '',
      items: [
        { name: 'Sticky Toffee Pudding', price: '$5.05', tags: [], desc: '' },
        { name: 'Eccles Cakes', price: '$5.05', tags: [], desc: '' },
      ] },
    { title: 'Hot Drinks', note: '',
      items: [
        { name: 'Yorkshire Tea', price: '$3.00', tags: [], desc: 'Original, Gold or Decaf.' },
      ] },
  ];

  function renderHours(container) {
    container.innerHTML = hours.map(h =>
      `<div class="row"><span>${h.d}</span><span>${h.t}</span></div>`
    ).join('');
  }

  function renderFooterHours(container) {
    container.innerHTML = '<div class="footer-label">HOURS</div>' + hours.map(h =>
      `<div class="row"><span>${h.d}</span><span>${h.t}</span></div>`
    ).join('');
  }

  function renderMenu(container) {
    container.innerHTML = menu.map(cat => `
      <section class="menu-cat">
        <div class="menu-cat-head">
          <h2>${cat.title}</h2>
          <span class="line"></span>
          <span class="note">${cat.note}</span>
        </div>
        ${cat.items.map(it => `
          <div class="menu-item">
            <div class="menu-item-name">
              <span class="name">${it.name}</span>
              ${it.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <span class="price">${it.price}</span>
            ${it.desc ? `<p class="desc">${it.desc}</p>` : ''}
          </div>
        `).join('')}
      </section>
    `).join('') + `
      <p class="menu-legend">
        <span class="red">V</span> VEGETARIAN &nbsp;·&nbsp; <span class="red">VG</span> VEGAN &nbsp;·&nbsp; <span class="red">GF</span> GLUTEN-FREE &nbsp;·&nbsp; <span class="red">HOT</span> HAS A KICK<br />
        Allergies? Have a word — most things can be sorted.
      </p>
    `;
  }

  const homeView = document.getElementById('home-view');
  const menuView = document.getElementById('menu-view');

  let io;
  function initReveal(root) {
    if (io) io.disconnect();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll('[data-reveal]'));
    if (reduced) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target;
          const d = parseFloat(el.dataset.delay) || 0;
          el.style.transitionDelay = d + 'ms';
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  }

  function setRoute(route) {
    const isHome = route === 'home';
    homeView.hidden = !isHome;
    menuView.hidden = isHome;
    window.scrollTo(0, 0);
    initReveal(isHome ? homeView : menuView);
  }

  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', () => setRoute(el.dataset.route));
  });

  function applyMobile() {
    const isMobile = window.matchMedia('(max-width: 820px)').matches;
    document.querySelectorAll('[data-hide-mobile]').forEach(el => {
      el.style.display = isMobile ? 'none' : 'flex';
    });
  }
  window.matchMedia('(max-width: 820px)').addEventListener('change', applyMobile);
  applyMobile();

  let pending = false;
  function parallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const y = window.scrollY;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const f = parseFloat(el.dataset.parallax) || 0;
      el.style.transform = `translate3d(0, ${(y * f).toFixed(1)}px, 0)`;
    });
  }
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { parallax(); pending = false; });
  }, { passive: true });

  renderHours(document.getElementById('hours-home'));
  renderFooterHours(document.getElementById('hours-footer'));
  renderMenu(document.getElementById('menu-body'));
  initReveal(homeView);
})();
