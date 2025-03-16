if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let c = {};
    const r = e => a(e, t),
      o = { module: { uri: t }, exports: c, require: r };
    s[t] = Promise.all(i.map(e => o[e] || r(e))).then(e => (n(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '1abeb2355c0c15022ae21fb9ed7c2e3c' },
        { url: '/_next/static/chunks/341.2903e54d3da731c1.js', revision: '2903e54d3da731c1' },
        { url: '/_next/static/chunks/472.a3826d29d6854395.js', revision: 'a3826d29d6854395' },
        {
          url: '/_next/static/chunks/4bd1b696-5b6c0ccbd3c0c9ab.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        { url: '/_next/static/chunks/684-dff6e8585da7670f.js', revision: 'mqrbC6UBBxEcarkwTDaUi' },
        {
          url: '/_next/static/chunks/app/_not-found/page-f08302ee705a96b1.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        {
          url: '/_next/static/chunks/app/api/users/route-f4fbabec368c7e02.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        {
          url: '/_next/static/chunks/app/layout-59ba18e3218c3117.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        {
          url: '/_next/static/chunks/app/page-67ebba2e4c8f9c9d.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        {
          url: '/_next/static/chunks/framework-859199dea06580b0.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        { url: '/_next/static/chunks/main-6c44255adc3890fb.js', revision: 'mqrbC6UBBxEcarkwTDaUi' },
        {
          url: '/_next/static/chunks/main-app-2df7d000fff14d60.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        {
          url: '/_next/static/chunks/pages/_app-a66f9296699c5863.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        {
          url: '/_next/static/chunks/pages/_error-7688f4c9a69e67c8.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-8bb97dcc50526021.js',
          revision: 'mqrbC6UBBxEcarkwTDaUi',
        },
        { url: '/_next/static/css/ae3893684835670d.css', revision: 'ae3893684835670d' },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
          revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/mqrbC6UBBxEcarkwTDaUi/_buildManifest.js',
          revision: 'a843aa2b76a9bc4f57f91bfe27938fbb',
        },
        {
          url: '/_next/static/mqrbC6UBBxEcarkwTDaUi/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/manifest.json', revision: '8cd78fca28858d039768af11eb33bcd4' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: i }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
