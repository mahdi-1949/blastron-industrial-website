const toggle=document.querySelector('.hamb');
const panel=document.querySelector('.mobile-panel');
const closeMobileMenu=()=>{
  if(!toggle||!panel)return;
  panel.classList.remove('open');
  toggle.classList.remove('is-active');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','باز کردن منو');
  document.body.classList.remove('mobile-menu-open');
};
if(toggle&&panel){
  toggle.addEventListener('click',()=>{
    const opening=!panel.classList.contains('open');
    panel.classList.toggle('open',opening);
    toggle.classList.toggle('is-active',opening);
    toggle.setAttribute('aria-expanded',String(opening));
    toggle.setAttribute('aria-label',opening?'بستن منو':'باز کردن منو');
    document.body.classList.toggle('mobile-menu-open',opening);
  });
  document.addEventListener('click',event=>{
    if(panel.classList.contains('open')&&!panel.contains(event.target)&&!toggle.contains(event.target))closeMobileMenu();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&panel.classList.contains('open')){
      closeMobileMenu();
      toggle.focus();
    }
  });
  panel.querySelectorAll('details.mobile-nav-group').forEach(group=>{
    group.addEventListener('toggle',()=>{
      if(group.open)panel.querySelectorAll('details.mobile-nav-group').forEach(other=>{if(other!==group)other.open=false;});
    });
  });
  panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));
}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',closeMobileMenu));
document.querySelectorAll('.form').forEach(form=>form.addEventListener('submit',event=>{
  event.preventDefault();
  alert('این فرم نمایشی است. برای دریافت درخواست واقعی باید به سامانه ایمیل یا CRM متصل شود.');
}));
const progress=document.createElement('div');
progress.className='scroll-progress';
document.body.appendChild(progress);
const updateProgress=()=>{
  const range=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(range>0?Math.min(100,scrollY/range*100):0)+'%';
};
addEventListener('scroll',updateProgress,{passive:true});
updateProgress();
const observer=('IntersectionObserver'in window)?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.1}):null;
document.querySelectorAll('.section-head,.service-card,.project,.copy,.image-stack,.process-step,.before-after').forEach(element=>{
  element.classList.add('reveal');
  if(observer)observer.observe(element);
  else element.classList.add('is-visible');
});
document.querySelectorAll('.before-after input').forEach(input=>{
  const root=input.closest('.before-after');
  const update=()=>root.style.setProperty('--position',input.value+'%');
  input.addEventListener('input',update);
  update();
});
