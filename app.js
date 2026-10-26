const products=[
{id:1,name:'Personalized Birthday Card',cat:'cards',price:499,img:'assets/product-1.jpg',desc:'A handmade card designed around your special person.'},
{id:2,name:'Memory Book',cat:'books',price:1299,img:'assets/product-2.jpg',desc:'A custom memory book filled with photos, notes and little details.'},
{id:3,name:'Scrapbook Gift',cat:'gifts',price:1499,img:'assets/product-3.jpg',desc:'A playful handmade scrapbook for birthdays, friendships and surprises.'},
{id:4,name:'Custom Story Card',cat:'cards',price:699,img:'assets/product-4.jpg',desc:'Tell us your story and we turn it into a one-of-a-kind handmade card.'},
{id:5,name:'Photo Memory Album',cat:'books',price:1799,img:'assets/product-5.jpg',desc:'A personalized album made to preserve your favourite moments.'},
{id:6,name:'Handmade Surprise Gift',cat:'gifts',price:999,img:'assets/product-6.jpg',desc:'A thoughtful handmade surprise for someone who deserves something special.'}
];
let cart=[];const grid=document.getElementById('grid'),count=document.getElementById('count'),drawer=document.getElementById('drawer'),overlay=document.getElementById('overlay'),items=document.getElementById('items'),total=document.getElementById('total');
function money(n){return '₹'+n.toLocaleString('en-IN')}
function render(filter='all'){grid.innerHTML='';products.filter(p=>filter==='all'||p.cat===filter).forEach(p=>{const el=document.createElement('article');el.className='card';el.innerHTML=`<div class="pic"><img src="${p.img}"><span class="tag">HANDMADE</span></div><div class="info"><h3>${p.name}</h3><div class="meta"><span class="price">${money(p.price)}</span><button class="add">+</button></div></div>`;el.querySelector('.add').onclick=e=>{e.stopPropagation();add(p.id)};el.onclick=()=>alert(`${p.name}

${p.desc}

Demo product — actual details can be replaced.`);grid.appendChild(el)})}
function add(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});renderCart();openBag()}
function renderCart(){count.textContent=cart.reduce((s,i)=>s+i.qty,0);let t=0;items.innerHTML=cart.length?cart.map(i=>{const p=products.find(x=>x.id===i.id);t+=p.price*i.qty;return `<div class="item"><img src="${p.img}"><div><strong>${p.name}</strong><small>${money(p.price)} × ${i.qty}</small></div><button class="remove" onclick="removeItem(${p.id})">×</button></div>`}).join(''):`<p style="text-align:center;color:#888;padding:70px 10px">Your bag is waiting ♡</p>`;total.textContent=money(t)}
function removeItem(id){cart=cart.filter(i=>i.id!==id);renderCart()}
function openBag(){drawer.classList.add('open');overlay.classList.add('show')}function closeBag(){drawer.classList.remove('open');overlay.classList.remove('show')}
document.getElementById('bag').onclick=openBag;document.getElementById('bagClose').onclick=closeBag;overlay.onclick=closeBag;
document.getElementById('menu').onclick=()=>document.getElementById('mobile').classList.add('open');document.getElementById('close').onclick=()=>document.getElementById('mobile').classList.remove('open');document.querySelectorAll('.mobile a').forEach(a=>a.onclick=()=>document.getElementById('mobile').classList.remove('open'));
document.getElementById('filterBtn').onclick=()=>document.getElementById('filters').classList.toggle('show');document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)});
document.getElementById('search').onclick=()=>document.getElementById('shop').scrollIntoView({behavior:'smooth'});render();renderCart();