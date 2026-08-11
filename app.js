(() => {
  const hours = [
    { d: 'Tue – Fri', t: '11 – 7' },
    { d: 'Saturday', t: '10 – 7' },
    { d: 'Sunday', t: '11 – 4' },
    { d: 'Monday', t: 'Closed' },
  ];

  const menu = [
    { title: 'Pies', note: 'ALL BUTTER · SUET BASE',
      items: [
        { name: 'Steak & Kidney', price: '$9.50', tags: [], desc: 'The old faithful. Beef, kidney, a good glug of ale.' },
        { name: 'Minced Beef & Onion', price: '$9', tags: [], desc: 'Exactly what it says. Nothing it doesn’t need.' },
        { name: 'Chicken & Mushroom', price: '$9', tags: [], desc: 'Creamy, proper, comforting.' },
        { name: 'Cheese, Onion & Potato', price: '$8.50', tags: ['V'], desc: 'For the ones who don’t do meat but still mean business.' },
        { name: 'Steak & Stilton', price: '$10', tags: [], desc: 'A bit posher than we’d normally allow.' },
        { name: 'Pie of the Week', price: 'MP', tags: [], desc: 'Ask at the counter. It changes. That’s the point.' },
      ] },
    { title: 'Pie & Mash', note: 'WITH PROPER GRAVY',
      items: [
        { name: 'Pie & Mash', price: '$12', tags: [], desc: 'One pie, a mountain of mash, a ladle of proper gravy.' },
        { name: 'Double Pie & Mash', price: '$16', tags: [], desc: 'For the seriously committed.' },
        { name: 'Mash & Gravy', price: '$6', tags: ['V'], desc: 'The full experience, minus the pie.' },
        { name: 'Extra Gravy', price: '$1.50', tags: [], desc: 'Go on then.' },
      ] },
    { title: 'Pasties & Rolls', note: 'BAKED THIS MORNING',
      items: [
        { name: 'Cornish Pasty', price: '$7', tags: [], desc: 'Beef, swede, potato, onion. Crimped by hand.' },
        { name: 'Sausage Roll', price: '$5', tags: [], desc: 'Flaky, peppery, gone by noon.' },
        { name: 'Vegan Sausage Roll', price: '$5', tags: ['VG'], desc: 'Honestly, you’d struggle to tell.' },
        { name: 'Scotch Egg', price: '$6', tags: [], desc: 'Runny yolk if you’re early. Get in early.' },
        { name: 'Pork Pie', price: '$6.50', tags: [], desc: 'Hot water crust, proper jelly.' },
      ] },
    { title: 'Sides', note: 'THE SUPPORTING CAST',
      items: [
        { name: 'Mushy Peas', price: '$3.50', tags: ['V'], desc: '' },
        { name: 'Chips', price: '$4', tags: ['V'], desc: 'Chip-shop cut. Salt and vinegar on the side.' },
        { name: 'Baked Beans', price: '$3', tags: ['V'], desc: '' },
        { name: 'Pickled Onion', price: '$1', tags: ['V'], desc: 'One. Enormous. Fierce.' },
        { name: 'Bread & Butter', price: '$2.50', tags: ['V'], desc: '' },
      ] },
    { title: 'Sweet', note: 'IF THERE’S ROOM',
      items: [
        { name: 'Sticky Toffee Pudding', price: '$7', tags: ['V'], desc: 'With custard, obviously.' },
        { name: 'Treacle Tart', price: '$6', tags: ['V'], desc: 'Sharp, sweet, a little bit sticky.' },
        { name: 'Bread & Butter Pudding', price: '$6', tags: ['V'], desc: '' },
        { name: 'Eccles Cake', price: '$4', tags: ['V'], desc: 'Currants, flaky pastry, dangerously moreish.' },
      ] },
    { title: 'Drinks', note: 'WET YOUR WHISTLE',
      items: [
        { name: 'Builder’s Tea', price: '$3', tags: [], desc: 'Strong. Milky. Two sugars unless told otherwise.' },
        { name: 'Dandelion & Burdock', price: '$4', tags: ['VG'], desc: '' },
        { name: 'Cream Soda', price: '$4', tags: ['VG'], desc: '' },
        { name: 'Filter Coffee', price: '$3.50', tags: ['VG'], desc: '' },
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
