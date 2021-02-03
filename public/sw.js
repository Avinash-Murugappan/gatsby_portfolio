/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-8f407f2bceb503467634.js"
  },
  {
    "url": "framework-8e528b732ab2eaadb7b7.js"
  },
  {
    "url": "app-32e085a6a6bd66eebcf6.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-36dc033f967ae9fe9cda.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "d66bf9d2b2bded4b94fbf85ecaf8ca36"
  },
  {
    "url": "static/webfonts/s/montserrat/v15/JTUQjIg1_i6t8kCHKm459WxRyS7m.woff2"
  },
  {
    "url": "static/webfonts/s/montserrat/v15/JTUPjIg1_i6t8kCHKm459WxZFgrz_PZw.woff2"
  },
  {
    "url": "static/webfonts/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_aZA3gnD_g.woff2"
  },
  {
    "url": "static/webfonts/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2"
  },
  {
    "url": "static/webfonts/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_bZF3gnD_g.woff2"
  },
  {
    "url": "static/webfonts/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2"
  },
  {
    "url": "polyfill-0eca59d2ee8c0828e3a6.js"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "806644941f053de604fb623e50fd0f52"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\page-data\/.*\/page-data\.json/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, workbox.strategies.staleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */

importScripts(`idb-keyval-iife.min.js`)

const { NavigationRoute } = workbox.routing

const navigationRoute = new NavigationRoute(async ({ event }) => {
  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-32e085a6a6bd66eebcf6.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  return await caches.match(offlineShell)
})

workbox.routing.registerRoute(navigationRoute)

const messageApi = {
  setPathResources(event, { path, resources }) {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources(event) {
    event.waitUntil(idbKeyval.clear())
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi } = event.data
  if (gatsbyApi) messageApi[gatsbyApi](event, event.data)
})
