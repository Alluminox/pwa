let cacheName = 'notes-workers.v.1.0.0';
let filesToCache = [
    '/pwa/',
    '/pwa/index.html',
    '/pwa/style/colors.css',
    '/pwa/style/styles.css',
    '/pwa/js/object.observe.polyfill.js',
    '/pwa/js/array.observe.polyfill.js',
    '/pwa/js/index.js'
];

/* 1-A Adiciono um listener no service worker para quando o evento de 'install' acontecer
    Podermos adicionar nossos arquivos da aplicação em CACHE 
*/
self.addEventListener('install', (e) => {
    console.log('[Service Worker] installed!');

    /*1-B Faço uma requisicao ao cache do browser pelo método 'open' do objeto 'cache' e adiciono
    o nome do meu cache e no 'then' eu recebo uma instancia de cache propriamente dito 
    onde adiciono meu array de arquivos para cache
    */
    const filesCached = caches.open(cacheName).then((cache) => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(filesToCache);
    });


    /* 1-C Digo ao meu evento 'espere ate'(wait until) que o meu cache adicione meus 'aquivos'(filesToCahce = [])
        para serem cacheados pelo browser(worker)
    */
    e.waitUntil(filesCached);

});


/* 2-A Adiciono um listener no service worker para quando o evento de 'activate' acontecer 
    Eu pego as keys adiciona ao cache e verifico se meu cache mudar, isto é
    se alguma 'key' do meu cache for diferente eu remove essa key do cache,
    e retorno uma Promise dessas cache keys
*/
self.addEventListener('activate', (e) => {
    console.log('[Service Worker] Activated!');

    const cacheKeysPromise = caches.keys().then(keys => {
        const cacheKeys = keys.map(key => {
            if (key !== cacheName) return caches.delete(key);
        })
        return Promise.all(cacheKeys);
    });


    e.waitUntil(cacheKeysPromise);
});


/* 3-A Adiciono um listener no service worker para quando o evento de 'fetch' acontecer 
ou seja, quando o browser buscar algum arquivo na aplicação, retornaremos do cache */
self.addEventListener('fetch', e => {
    console.log('[Service Worker] Fetch!', e.request.url);

    /*3-B Fazemos um match no cache baseado na request do usuario, se encontrar , disponibiliza no 'then' */
    const cacheFetch = caches.match(e.request).then(response => {
        return response || fetch(e.request);
    });

    e.respondWith(cacheFetch);
});

// manifest.json
// display: fullscreen
// minimal_ui
// standalone