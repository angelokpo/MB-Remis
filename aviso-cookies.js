// Aviso de cookies: se muestra una sola vez por dispositivo y no tapa el botón de WhatsApp.
(function () {
    var CLAVE = 'mb_remis_aviso_cookies';

    try {
        if (localStorage.getItem(CLAVE) === 'aceptado') return;
    } catch (e) { /* sin almacenamiento: se muestra igual */ }

    var estilos = document.createElement('style');
    estilos.textContent =
        '.aviso-cookies{position:fixed;left:20px;bottom:20px;z-index:1100;max-width:430px;' +
        'background:#121212;color:#e6e6e6;border:2px solid #121212;border-radius:16px;' +
        'box-shadow:5px 5px 0 #f5b301;padding:18px 20px;display:flex;flex-direction:column;gap:12px;' +
        'font-family:"Plus Jakarta Sans",sans-serif;font-size:.88rem;line-height:1.5;' +
        'animation:avisoCookiesEntrar .35s ease both}' +
        '.aviso-cookies p{margin:0;color:#e6e6e6}' +
        '.aviso-cookies strong{color:#f5b301;font-family:"Montserrat",sans-serif;font-weight:800}' +
        '.aviso-cookies a{color:#f5b301;text-decoration:underline;text-underline-offset:2px}' +
        '.aviso-cookies-acciones{display:flex;align-items:center;gap:14px;flex-wrap:wrap}' +
        '.aviso-cookies button{background:#f5b301;color:#121212;font-weight:800;font-size:.88rem;' +
        'border:2px solid #f5b301;border-radius:10px;padding:8px 22px;cursor:pointer;transition:all .15s ease}' +
        '.aviso-cookies button:hover{background:#ffffff;border-color:#ffffff}' +
        '@keyframes avisoCookiesEntrar{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}' +
        '@media (max-width:576px){.aviso-cookies{left:12px;right:12px;bottom:12px;max-width:none}}';
    document.head.appendChild(estilos);

    var aviso = document.createElement('div');
    aviso.className = 'aviso-cookies';
    aviso.setAttribute('role', 'region');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
        '<p><strong><i class="fas fa-cookie-bite" aria-hidden="true"></i> Cookies</strong><br>' +
        'Usamos cookies propias y de terceros, como Google, para que el sitio funcione y para mostrar anuncios. ' +
        'Podés ver más en nuestra <a href="privacidad.html">Política de privacidad</a>.</p>' +
        '<div class="aviso-cookies-acciones"><button type="button">Entendido</button></div>';
    document.body.appendChild(aviso);

    // Si el aviso queda encima del botón flotante de WhatsApp, se sube el botón.
    var botonWa = document.querySelector('.btn-wa-float');
    var bottomOriginal = botonWa ? botonWa.style.bottom : '';

    function acomodarBotonWa() {
        if (!botonWa) return;
        botonWa.style.bottom = bottomOriginal;
        var a = aviso.getBoundingClientRect();
        var b = botonWa.getBoundingClientRect();
        var seTocan = a.right > b.left - 10 && a.top < b.bottom + 10;
        if (seTocan) {
            botonWa.style.bottom = (window.innerHeight - a.top + 12) + 'px';
        }
    }

    acomodarBotonWa();
    aviso.addEventListener('animationend', acomodarBotonWa);
    window.addEventListener('resize', acomodarBotonWa);

    aviso.querySelector('button').addEventListener('click', function () {
        try { localStorage.setItem(CLAVE, 'aceptado'); } catch (e) { }
        window.removeEventListener('resize', acomodarBotonWa);
        if (botonWa) botonWa.style.bottom = bottomOriginal;
        aviso.remove();
    });
})();
