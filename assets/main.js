(function(){
var d=document,root=d.documentElement,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return[].slice.call((c||d).querySelectorAll(s))};
/* theme */
var th=$('.th');function setT(t){root.setAttribute('data-theme',t);if(th){th.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode')}}
setT(root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
if(th)th.addEventListener('click',function(){var n=root.getAttribute('data-theme')==='dark'?'light':'dark';setT(n);try{localStorage.setItem('theme',n)}catch(e){}});
/* mobile menu */
var mt=$('.mt'),mm=$('#mm');
function closeM(restore){if(!mm||!mt)return;mm.classList.remove('open');mt.setAttribute('aria-expanded','false');mt.setAttribute('aria-label','Open menu');d.body.style.overflow='';if(restore)mt.focus()}
if(mt&&mm){mt.addEventListener('click',function(){var o=mm.classList.toggle('open');mt.setAttribute('aria-expanded',o);mt.setAttribute('aria-label',o?'Close menu':'Open menu');d.body.style.overflow=o?'hidden':'';if(o){var first=$('a,button,summary',mm);if(first)first.focus()}else mt.focus()});mm.addEventListener('click',function(e){if(e.target.closest('a'))closeM(false)});mm.addEventListener('keydown',function(e){if(e.key==='Tab'){var f=$$('a[href],button:not([disabled]),summary',mm).filter(function(x){return x.offsetParent!==null});if(!f.length)return;var first=f[0],last=f[f.length-1];if(e.shiftKey&&d.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&d.activeElement===last){e.preventDefault();first.focus()}}});var mq=matchMedia('(min-width:1000px)');if(mq.addEventListener)mq.addEventListener('change',function(){if(mq.matches)closeM(false)});else mq.addListener(function(){if(mq.matches)closeM(false)})}
/* dropdowns */
var has=$$('.links .has');function closeAll(except){has.forEach(function(h){if(h!==except){h.classList.remove('open');$('button',h).setAttribute('aria-expanded','false')}})}
has.forEach(function(h){var b=$('button',h),t;function op(){clearTimeout(t);closeAll(h);h.classList.add('open');b.setAttribute('aria-expanded','true')}function cl(){h.classList.remove('open');b.setAttribute('aria-expanded','false')}
b.addEventListener('click',function(){h.classList.contains('open')?cl():op()});
if(matchMedia('(hover:hover)').matches){h.addEventListener('mouseenter',op);h.addEventListener('mouseleave',function(){t=setTimeout(cl,160)})}
h.addEventListener('focusout',function(e){if(!h.contains(e.relatedTarget))cl()})});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){var opened=has.filter(function(h){return h.classList.contains('open')})[0];closeAll();if(opened){var b=$('button',opened);if(b)b.focus()}if(mm&&mm.classList.contains('open'))closeM(true)}});
d.addEventListener('click',function(e){if(!e.target.closest('.has'))closeAll()});
/* header, fab, reveal, year */
var hd=$('.hd'),fab=$('.fab');function sc(){hd&&hd.classList.toggle('sc',scrollY>8);fab&&fab.classList.toggle('show',scrollY>700)}addEventListener('scroll',sc,{passive:true});sc();
var rv=$$('.reveal');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -6% 0px',threshold:.06});rv.forEach(function(x){var n=[].filter.call(x.parentNode.children,function(c){return c.classList.contains('reveal')}).indexOf(x);if(n>0)x.style.transitionDelay=Math.min(n,5)*90+'ms';io.observe(x)})}else rv.forEach(function(x){x.classList.add('in')});
$$('.yr').forEach(function(y){y.textContent=new Date().getFullYear()});
/* portfolio filter */
var pg=$('#pgrid');if(pg){var cards=$$('.pj',pg),chips=$$('.filters .chip'),ps=$('#ps'),pe=$('#pempty'),cur='All';
function pf(){var q=(ps.value||'').toLowerCase().trim(),n=0;cards.forEach(function(c){var ok=(cur==='All'||c.dataset.f===cur)&&(!q||c.dataset.t.indexOf(q)>-1);c.style.display=ok?'':'none';if(ok)n++});pe.classList.toggle('show',!n)}
function sf(f){cur=f;chips.forEach(function(c){c.setAttribute('aria-pressed',c.dataset.f===f)});pf()}
chips.forEach(function(c){c.addEventListener('click',function(){sf(c.dataset.f);history.replaceState(null,'','#'+(c.dataset.f==='All'?'':c.dataset.f.replace(/ /g,'-')))})});ps.addEventListener('input',pf);
var h=decodeURIComponent(location.hash.slice(1)),target=h&&document.getElementById(h);if(target&&target.matches('.filters .chip[data-f]'))sf(target.dataset.f);
/* make filtered grid reflow: reset span layout when a filter is active */}
/* blog filter + search + pagination */
var bg=$('#bgrid');if(bg){var arts=$$('.ac',bg),bch=$$('.filters .chip'),bs=$('#bs'),be=$('#bempty'),pag=$('#pag'),cat='All',page=1,PER=6;
function render(){var q=(bs.value||'').toLowerCase().trim(),list=arts.filter(function(a){return(cat==='All'||a.dataset.c===cat)&&(!q||a.dataset.t.indexOf(q)>-1)}),pages=Math.max(1,Math.ceil(list.length/PER));if(page>pages)page=pages;
arts.forEach(function(a){a.style.display='none'});list.slice((page-1)*PER,page*PER).forEach(function(a){a.style.display='';a.classList.add('in')});be.classList.toggle('show',!list.length);
pag.innerHTML='';if(pages>1){var pb=function(l,p,dis,cu,al){var b=d.createElement('button');b.type='button';b.textContent=l;if(al)b.setAttribute('aria-label',al);b.disabled=dis;if(cu)b.setAttribute('aria-current','true');b.onclick=function(){page=p;render();bg.scrollIntoView({behavior:'smooth',block:'start'})};pag.appendChild(b)};pb('←',page-1,page===1,0,'Previous page');for(var i=1;i<=pages;i++)pb(i,i,0,i===page,'Page '+i);pb('→',page+1,page===pages,0,'Next page')}}
bch.forEach(function(c){c.addEventListener('click',function(){cat=c.dataset.c;page=1;bch.forEach(function(x){x.setAttribute('aria-pressed',x===c)});render()})});bs.addEventListener('input',function(){page=1;render()});render()}
/* calculator */
var cfgEl=$('#pcfg');if(cfgEl){var C=JSON.parse(cfgEl.textContent),st={xp:0,xr:0},$m=function(n){return'$'+Math.round(n).toLocaleString('en-US')};
function calc(){var pk=C.pk[$('input[name=pk]:checked').value],std=pk.std+st.xp*C.xp+st.xr*C.xr,items=[pk.name+' package'],mo=0;if(st.xp)items.push(st.xp+' extra page(s)');if(st.xr)items.push(st.xr+' extra revision round(s)');
$$('input[name=ad]:checked').forEach(function(a){var ad=C.addons.filter(function(x){return x.id===a.value})[0];if(ad.per==='month'){mo+=ad.std}else{std+=ad.std}items.push(ad.name+(ad.per==='month'?' (monthly)':''))});
var pr=pk.now+(std-pk.std)*C.discount;$('#tp').textContent=$m(pr);$('#ts').textContent=$m(std);$('#td').textContent='−'+$m(std-pr);$('#tm').textContent=mo?$m(mo*C.discount)+' / mo':'—';
var txt='Hi Crestpane! Estimate from your pricing page:\n- '+items.join('\n- ')+'\nEstimated one-time price: '+$m(pr)+(mo?'\nMonthly maintenance: '+$m(mo*C.discount):'')+'\n(estimate, USD)';
$('#cq').onclick=function(e){e.preventDefault();if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).catch(function(){});window.open(C.tg,'_blank','noopener,noreferrer')};
$('#cm').href='mailto:'+C.email+'?subject='+encodeURIComponent('Website estimate')+'&body='+encodeURIComponent(txt)}
$$('[data-s]').forEach(function(b){b.addEventListener('click',function(){var k=b.dataset.s;st[k]=Math.max(0,Math.min(20,st[k]+ +b.dataset.d));$('#'+k).textContent=st[k];calc()})});
$$('#calc input').forEach(function(i){i.addEventListener('change',calc)});calc()}
/* briefs */
function mk(f,msg){var s=$('.stat',f);s.className='stat warn show';s.innerHTML='';var p=d.createElement('p');p.style.marginBottom='1rem';p.textContent='Your message is ready, but nothing has been sent yet. This website has no server, so please send it yourself:';s.appendChild(p);
var a=d.createElement('a');a.className='btn b1 sm';a.href='https://t.me/Legend_teen';a.target='_blank';a.rel='noopener';a.textContent='Copy & open Telegram';a.onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(msg).catch(function(){});};
var m=d.createElement('a');m.className='btn b2 sm';m.style.marginLeft='.6rem';m.textContent='Send by email';m.href='mailto:forge.team.sup@gmail.com?subject='+encodeURIComponent(f.dataset.title)+'&body='+encodeURIComponent(msg);s.appendChild(a);s.appendChild(m);s.scrollIntoView({block:'center',behavior:'smooth'})}
$$('form[data-brief]').forEach(function(f){var steps=$$('[data-step]',f),i=0,pr=$$('.prog i',f),nx=$('[data-next]',f),pv=$('[data-prev]',f),sb=$('[data-submit]',f);
function show(n){i=n;steps.forEach(function(s,k){s.hidden=k!==n});pr.forEach(function(p,k){p.classList.toggle('on',k<=n)});if(pv){pv.hidden=n===0;nx.hidden=n===steps.length-1;sb.hidden=n!==steps.length-1}}
function val(scope){var ok=true;$$('[required]',scope).forEach(function(x){var er=x.parentNode.querySelector('.er'),bad=!x.value.trim()||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(x.value));x.setAttribute('aria-invalid',bad);if(er)er.textContent=bad?(x.type==='email'?'Enter a valid email address.':'This field is required.'):'';if(bad&&ok){x.focus();ok=false}});return ok}
if(steps.length){show(0);nx.addEventListener('click',function(){if(val(steps[i]))show(i+1)});pv.addEventListener('click',function(){show(i-1)});var q=new URLSearchParams(location.search).get('plan'),sel=$('#plansel');if(q&&sel)sel.value=q}
f.addEventListener('submit',function(e){e.preventDefault();if(!val(f))return;var fd=new FormData(f),o={};fd.forEach(function(v,k){if(!v)return;o[k]=o[k]?o[k]+', '+v:v});mk(f,'Hi Crestpane! ('+f.dataset.title+')\n\n'+Object.keys(o).map(function(k){return k+': '+o[k]}).join('\n'))})});
$$('form[data-mailto]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var em=f.email.value;location.href='mailto:'+f.dataset.mailto+'?subject='+encodeURIComponent(f.dataset.subject)+'&body='+encodeURIComponent('Please add me to the Crestpane newsletter: '+em)})});

/* motion: progress bar, hero parallax, magnetic button */
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,hv=matchMedia('(hover:hover)').matches;
if(!rm){var sp=d.createElement('div');sp.className='sp';sp.setAttribute('aria-hidden','true');d.body.appendChild(sp);var pt=0;function pg2(){pt=0;var h=d.documentElement.scrollHeight-innerHeight;sp.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'}addEventListener('scroll',function(){if(!pt)pt=requestAnimationFrame(pg2)},{passive:true});pg2()}

/* staggered reveal for grids */
if('IntersectionObserver' in window){var io2=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io2.unobserve(x.target)}})},{rootMargin:'0px 0px -6% 0px',threshold:.06});
['.sl','.ind','.bg','.fw','.pg','.kv'].forEach(function(s){$$(s).forEach(function(g){g.classList.remove('reveal');[].slice.call(g.children).forEach(function(c,i){c.style.setProperty('--i',i%3);c.classList.add('reveal');io2.observe(c)})})});
$$('.tlw').forEach(function(g){[].slice.call(g.children).forEach(function(c,i){c.style.setProperty('--i',i)})});
$$('.why').forEach(function(g){[].slice.call(g.children).forEach(function(c,i){c.style.setProperty('--i',i)})})}
if(!rm&&hv){
/* hero parallax */
var hero=$('.hero'),stg=$('.stage2');
if(hero&&stg){var ly=$$('.lyr',stg),tx=0,ty=0,cx=0,cy=0,run=false;
function tick(){cx+=(tx-cx)*.07;cy+=(ty-cy)*.07;ly.forEach(function(l){var k=+l.dataset.d;l.style.transform='translate3d('+(cx*k).toFixed(2)+'px,'+(cy*k*.7).toFixed(2)+'px,0)'});if(Math.abs(tx-cx)>.001||Math.abs(ty-cy)>.001)requestAnimationFrame(tick);else run=false}
function go(){if(!run){run=true;requestAnimationFrame(tick)}}
hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;go()});
hero.addEventListener('pointerleave',function(){tx=ty=0;go()})}
/* magnetic CTA */
$$('.cpill').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.08).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.15).toFixed(1)+'px'});b.addEventListener('pointerleave',function(){b.style.translate=''})});
/* card tilt */
$$('.pj,.pk').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.classList.add('tilting');c.style.setProperty('--ry',(x*7).toFixed(2)+'deg');c.style.setProperty('--rx',(-y*5).toFixed(2)+'deg')});c.addEventListener('pointerleave',function(){c.classList.remove('tilting');c.style.removeProperty('--rx');c.style.removeProperty('--ry')})});
/* spotlight on dark sections */
$$('section.dk').forEach(function(s){s.addEventListener('pointermove',function(e){var r=s.getBoundingClientRect();s.style.setProperty('--mx',(e.clientX-r.left)+'px');s.style.setProperty('--my',(e.clientY-r.top)+'px')})})}
})();

/* back to top with progress ring */
(function(){var d=document,b=d.createElement('button');b.type='button';b.className='btt';b.setAttribute('aria-label','Back to top');b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';d.body.appendChild(b);
var rmm=matchMedia('(prefers-reduced-motion:reduce)').matches,t=0;function u(){t=0;var h=d.documentElement.scrollHeight-innerHeight,y=window.scrollY;b.classList.toggle('show',y>700);b.style.setProperty('--p',h>0?Math.min(100,y/h*100).toFixed(1):0)}
addEventListener('scroll',function(){if(!t)t=requestAnimationFrame(u)},{passive:true});u();
b.addEventListener('click',function(){window.scrollTo({top:0,behavior:rmm?'auto':'smooth'})})})();
/* active navigation: resolve relative links consistently on every nested page */
(function(){
var path=location.pathname.replace(/\/+$/,'')||'/';
if(path==='/')path='/index.html';
var fallback=null;
if(/^\/(work)\//.test(path))fallback='/portfolio.html';
else if(/^\/insights\//.test(path)&&!/^\/insights\/category\//.test(path)&&path!=='/insights/index.html')fallback='/insights/index.html';
document.querySelectorAll('.links a,.mm a').forEach(function(a){
try{
var target=new URL(a.getAttribute('href'),location.href).pathname.replace(/\/+$/,'')||'/';
var active=target===path||(fallback&&target===fallback);
if(active){a.classList.add('cur');a.setAttribute('aria-current','page')}
else if(a.classList.contains('cur')){a.classList.remove('cur');a.removeAttribute('aria-current')}
}catch(e){/* Ignore malformed optional navigation URLs. */}
});
})();
