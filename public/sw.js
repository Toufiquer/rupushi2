if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const c=e=>a(e,i),o={module:{uri:i},exports:r,require:c};s[i]=Promise.all(t.map((e=>o[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"93ef7d64a22a56b35b073e37902fc191"},{url:"/_next/static/J3jxqfmSrhHdtUZaZoUVr/_buildManifest.js",revision:"94b2250488a1081f959bf25ec9a89f88"},{url:"/_next/static/J3jxqfmSrhHdtUZaZoUVr/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-115b80152e754551.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/0e762574-4b179466626feb65.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/341.2903e54d3da731c1.js",revision:"2903e54d3da731c1"},{url:"/_next/static/chunks/370b0802-b2c5b37b90838a72.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/411-41da2a11448be8b1.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/472.a3826d29d6854395.js",revision:"a3826d29d6854395"},{url:"/_next/static/chunks/479ba886-2dda1d725083609a.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/4bd1b696-989d33d1584df2ab.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/637-b54fae5ad3464ef8.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/671-1cda450a3f6381f2.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/684-457d7afd6dc0cd8a.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/766-a6e455eafe893f41.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/787-f49ff8c93ba50dc2.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/8e1d74a4-a5403b44adc26909.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/942-3ecdc985864c4944.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/95-8c2e022914cb9307.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/_not-found/page-7b137d85f9de4771.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/about-us/page-69c7f26df45bdc62.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/api/auth-check/route-04c2e30744651d6c.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/api/media/route-68c5d45b5faa797f.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/api/orders/route-2855d9680594fdd5.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/api/products/route-63a6387762dd8745.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/api/products/trash/route-de86c9c0d9f7f943.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/api/users/route-65e3ca52220d749c.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/cart/page-931ac0ded54ad327.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/dashboard/loading-1bf7d8f29a0ac1ea.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/dashboard/media/page-67e4558ffe8bf100.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/dashboard/page-81252312a2603160.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/layout-8e837974c93afc4f.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/login/page-2e09b6fd4bd229db.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/page-1341498679996f82.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/privacy-policy/page-52371381d4e1c469.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/return-policy/page-9c8e703959cf867b.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/terms-condition/page-0e8583816aba97cf.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/app/wishlist/page-05da9873de1b013d.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/framework-859199dea06580b0.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/main-6c44255adc3890fb.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/main-app-2df7d000fff14d60.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/pages/_app-a66f9296699c5863.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/pages/_error-7688f4c9a69e67c8.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-6fcb39914e3011c5.js",revision:"J3jxqfmSrhHdtUZaZoUVr"},{url:"/_next/static/css/7db50a086db3b5a1.css",revision:"7db50a086db3b5a1"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icons/icon-1280x720.png",revision:"de4c5128935818862f993c23eb9e6dd1"},{url:"/icons/icon-144x144.png",revision:"6120c1843bcb919a17f54071760d741f"},{url:"/icons/icon-192x192.png",revision:"be8c477e4a2f6787f93804098a753672"},{url:"/icons/icon-412x915.png",revision:"0181581c36466fbed68c8bca8802a0c6"},{url:"/icons/icon-512x512.png",revision:"60e6ca7a95298e84f690b760b09d1118"},{url:"/manifest.json",revision:"7b98c19f080ab4a63047869f7e9a709f"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
