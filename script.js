var d=document.documentElement,b=document.getElementById('lg');
function s(l){d.setAttribute('data-l',l);d.lang=l;b.textContent=l=='es'?'EN':'ES'}
s((navigator.language||'es').slice(0,2)=='en'?'en':'es');
b.onclick=function(){s(d.getAttribute('data-l')=='es'?'en':'es')};
var tt=document.getElementById('toast');
function toast(m){tt.textContent=m;tt.style.opacity=1;setTimeout(function(){tt.style.opacity=0},2200)}
document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
  link.addEventListener('click', function() {
    var email = link.getAttribute('href').slice(7);
    var message = d.lang === 'en' ? 'Email copied' : 'Email copiado';
    function fallback() {
      var field = document.createElement('textarea');
      field.value = email;
      field.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(field);
      field.select();
      var copied = false;
      try { copied = document.execCommand('copy'); } catch (error) {}
      field.remove();
      link.focus({ preventScroll: true });
      toast(copied ? message : email);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function() { toast(message); }, fallback);
    } else {
      fallback();
    }
  });
});
