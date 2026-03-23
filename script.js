function toggleMenu(){
  const m=document.getElementById('mobileMenu');
  m.classList.toggle('open');
  const b=document.querySelectorAll('.hamburger span');
  if(m.classList.contains('open')){
    b[0].style.transform='rotate(45deg) translate(5px,5px)';
    b[1].style.opacity='0';
    b[2].style.transform='rotate(-45deg) translate(5px,-5px)';
  } else {
    b[0].style.transform='';
    b[1].style.opacity='1';
    b[2].style.transform='';
  }
}

function closeMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  const b=document.querySelectorAll('.hamburger span');
  b[0].style.transform='';
  b[1].style.opacity='1';
  b[2].style.transform='';
}

function scrollToTop(){
  window.scrollTo({top:0,behavior:'smooth'});
}

window.addEventListener('scroll',()=>{
  document.getElementById('scrollTopBtn').classList.toggle('vis',window.scrollY>400);
});

const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // Counters
      e.target.querySelectorAll('.counter').forEach(c=>{
        if(c.dataset.animated)return;
        c.dataset.animated='true';
        animateCounter(c);
      });
      // Review bars
      e.target.querySelectorAll('.review-bar-fill').forEach(b=>{
        if(b.dataset.animated)return;
        b.dataset.animated='true';
        setTimeout(()=>{b.style.width=b.dataset.width+'%';},300);
      });
    }
  });
},{threshold:.15,rootMargin:'0px 0px -50px 0px'});

document.querySelectorAll('.anim,.anim-l,.anim-r,.anim-s,.stat-card').forEach(el=>obs.observe(el));

function animateCounter(el){
  const target=parseFloat(el.dataset.target);
  const decimal=parseInt(el.dataset.decimal||'0');
  const final=el.dataset.final||null;
  const duration=2000;
  const start=performance.now();
  
  function ease(t){return 1-Math.pow(1-t,4);}
  
  function update(now){
    const p=Math.min((now-start)/duration,1);
    const ep=ease(p);
    let current=ep*target;
    if(decimal>0){
      el.textContent=current.toFixed(decimal);
    } else {
      current=Math.round(current);
      el.textContent=target>=1000?current.toLocaleString('fr-FR'):current;
    }
    if(p<1) requestAnimationFrame(update);
    else if(final) el.textContent=final;
  }
  requestAnimationFrame(update);
}

const secs=document.querySelectorAll('section[id]');
const navA=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.id;});
  navA.forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});
});

window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  document.querySelectorAll('.particle').forEach((p,i)=>{
    p.style.transform=`translateY(${s*(0.1+i*0.05)}px)`;
  });
});