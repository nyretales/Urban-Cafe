let cart = {}, total = 0;

function renderMenu(){
  const wrapper = document.getElementById('menu');
  wrapper.innerHTML = '';

  MENU.forEach(cat => {
    wrapper.innerHTML += `
      <div class="section-title" style="background:${cat.color}">
        ${cat.kategori.toUpperCase()}
      </div>
      <div class="menu-grid" id="${cat.id}"></div>
    `;

    const target = document.getElementById(cat.id);

    cat.items.forEach(i => {
      target.innerHTML += `
      <div class="item">
        <img loading="lazy" src="${i.img}">
        <b>${i.nama}</b>
        <div>Rp ${i.harga.toLocaleString('id-ID')}</div>
        <div class="qty">
          <button onclick="minus('${i.id}',${i.harga})">−</button>
          <span id="q-${i.id}">0</span>
          <button onclick="add('${i.id}','${i.nama}',${i.harga})">+</button>
        </div>
      </div>`;
    });
  });
}

function add(id,nama,harga){
  cart[id] = cart[id] || { nama, qty:0, harga };
  cart[id].qty++;
  total += harga;
  update(id);
}

function minus(id,harga){
  if(!cart[id]) return;
  cart[id].qty--;
  total -= harga;
  if(cart[id].qty<=0) delete cart[id];
  update(id);
}

function update(id){
  document.getElementById('q-'+id).textContent = cart[id]?.qty || 0;
  document.getElementById('total').textContent = 'Total: Rp ' + total.toLocaleString('id-ID');
}

function orderWA(){
  if(!Object.keys(cart).length) return alert('Belum ada pesanan');
  let msg='Halo Urban Cafe, saya pesan:%0A';
  for(const i in cart){ msg+=`- ${cart[i].nama} x${cart[i].qty}%0A`; }
  msg+=`Total Rp ${total.toLocaleString('id-ID')}`;
  window.open('https://wa.me/6282319527214?text='+msg,'_blank');
}

renderMenu();      

