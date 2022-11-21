'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "dc572470be4ee0b2acbafcb1788f46f8",
"/": "dc572470be4ee0b2acbafcb1788f46f8",
"manifest.json": "0f9fce703302bd950fa93d76ea08cf10",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/assets/stations.json": "05cd1fb9b19135f7ad68aa342e8a1bd0",
"assets/assets/busLines.json": "e7056d5452ee9dd9d3fb7b3e7bb512be",
"assets/splash/pers0.svg": "56af2bf6bdfd89317925575a2ad20e5c",
"assets/splash/lamp3.svg": "ce43ea6ebca4efc2007cd3ef3553bd37",
"assets/splash/pers4.svg": "27119394156b07d674e783cd1c88ccf0",
"assets/splash/stat0.svg": "5b41d1c677a443a526aa9cb639a61e1d",
"assets/splash/lamp1.svg": "3251337bec72029bcef1fad923822f7a",
"assets/splash/pers11.svg": "ea1b8c232fbf66eb165e08171eab332e",
"assets/splash/obj2.svg": "d77f8003cd18d7302a8eade44488e1a9",
"assets/splash/pers7.svg": "08567b901f5b862c4ada519b5299f441",
"assets/splash/stat2.svg": "74eb80b9df93b8492ad70d16b4018bb2",
"assets/splash/obj0.svg": "9bfade9c599bce35dfc61c80356315ff",
"assets/splash/pers8.svg": "ab9f9bc6c1132049e041475987c2a742",
"assets/splash/pers9.svg": "f63bb166d6bbfbe0bbf2ebd9d3ada8e9",
"assets/splash/lamp0.svg": "a8520de5bbd6863188f34a03aff8d422",
"assets/splash/pers5.svg": "adbec3f03c9806eb59c694a35d0183b2",
"assets/splash/stat1.svg": "8de40bd8529f278f43a4d5dc952524b7",
"assets/splash/pers6.svg": "04da78832fbff480942d88bb2955c40b",
"assets/splash/obj1.svg": "d1aabfd65dbf8dda0e232623cc1b19c0",
"assets/splash/stat3.svg": "63fa4eb7585d23554b824f52ccd84c05",
"assets/splash/pers3.svg": "2f9056ba0cb7fe0ba50efcd0f5c582ba",
"assets/splash/lamp2.svg": "fb09a42a8438bafa1a2aff2a87a5d87f",
"assets/splash/persBlank.svg": "d8b5d2ea6accafe154bf13fb00d0d110",
"assets/splash/obj3.svg": "ecf23caa1126d99f7a25478505a4e3ff",
"assets/splash/pers10.svg": "21a8b9914905eadf7a9eedf1c46197f3",
"assets/splash/pers1.svg": "c1c02cb8601e5538253a9e8039b733f0",
"assets/splash/pers2.svg": "65a688483d5a769772004957e42cbe5d",
"assets/splash/splashLogo.svg": "af3be1d59b2e142e3ee5eb385db9d841",
"assets/splash/tabIconDI.svg": "f837aa0402fb7d36dbd4e97ada0b73ab",
"assets/schedules/subotica/4R.txt": "f51b77550a323c756dd09dc29e4eb97d",
"assets/schedules/subotica/8AA.txt": "de9251e6373e524b835e711fd6016c59",
"assets/schedules/subotica/3R.txt": "ca18156a2194cd938fc559517d9bd805",
"assets/schedules/subotica/16R.txt": "cdc07ed28f4dfda7ca5b8b2e478cf24d",
"assets/schedules/subotica/8A.txt": "de9251e6373e524b835e711fd6016c59",
"assets/schedules/subotica/16B.txt": "cdc07ed28f4dfda7ca5b8b2e478cf24d",
"assets/schedules/subotica/1A.txt": "f53e4a2b6ec934ad1f5a61e76e004aa6",
"assets/schedules/subotica/8AR.txt": "a001bc6034e9f34364583bf80f776e76",
"assets/schedules/subotica/2B.txt": "ca46210559dd11fee2dd407b9bf084dc",
"assets/schedules/subotica/16A.txt": "848cc1768660b8235ed2d9ab12d42675",
"assets/schedules/subotica/2R.txt": "ca46210559dd11fee2dd407b9bf084dc",
"assets/schedules/subotica/3B.txt": "ca18156a2194cd938fc559517d9bd805",
"assets/schedules/subotica/2A.txt": "17942e4b762c96c41e9acdab49321bd7",
"assets/schedules/subotica/4B.txt": "f51b77550a323c756dd09dc29e4eb97d",
"assets/schedules/subotica/4A.txt": "05b1589d7c86743283f288ae32dad729",
"assets/schedules/subotica/6R.txt": "b22286260370fc4f8c9316bbdef8b0e3",
"assets/schedules/subotica/1AB.txt": "6344c0a7472ef870e7c21c0193a3deff",
"assets/schedules/subotica/2.txt": "17942e4b762c96c41e9acdab49321bd7",
"assets/schedules/subotica/3.txt": "9f2224e6d4a9f16622c0a70408da3d1c",
"assets/schedules/subotica/3A.txt": "9f2224e6d4a9f16622c0a70408da3d1c",
"assets/schedules/subotica/4.txt": "05b1589d7c86743283f288ae32dad729",
"assets/schedules/subotica/1AR.txt": "6344c0a7472ef870e7c21c0193a3deff",
"assets/schedules/subotica/8.txt": "236031358b7b621abd95308023571978",
"assets/schedules/subotica/1AA.txt": "f53e4a2b6ec934ad1f5a61e76e004aa6",
"assets/schedules/subotica/8AB.txt": "a001bc6034e9f34364583bf80f776e76",
"assets/schedules/subotica/16.txt": "848cc1768660b8235ed2d9ab12d42675",
"assets/schedules/subotica/6B.txt": "b22286260370fc4f8c9316bbdef8b0e3",
"assets/schedules/subotica/6A.txt": "dbadda92a1baef95869bd664982b3db4",
"assets/schedules/subotica/6.txt": "dbadda92a1baef95869bd664982b3db4",
"assets/schedules/novi_sad/1B.txt": "cf63bcbcb4da45cd33412f8cfa5242bb",
"assets/schedules/novi_sad/9A.txt": "82b3b157475d9ac8ea7941fb7824d6c0",
"assets/schedules/novi_sad/72A.txt": "20580709cbd825c3239f31b585ae585f",
"assets/schedules/novi_sad/14B.txt": "af23f0917f41ee2d69150d26af9c4b1e",
"assets/schedules/novi_sad/12B.txt": "b27394bd1c9019e36a984159dc589ed5",
"assets/schedules/novi_sad/9B.txt": "084385ede2bd2db8f2ac887e79bccfb3",
"assets/schedules/novi_sad/74A.txt": "fc6f2ebafdfaafd2c8b4041f3c47625d",
"assets/schedules/novi_sad/74B.txt": "a7311f761c1e37c2d52a40fee53f46f8",
"assets/schedules/novi_sad/76B.txt": "9f729e5c1d156eed89c1a31456752243",
"assets/schedules/novi_sad/8A.txt": "7d89b42586aa4f384448161db95d1a4b",
"assets/schedules/novi_sad/13B.txt": "dcba72a9a050aad9270b030a3f806591",
"assets/schedules/novi_sad/7A.txt": "bdc65d77ab229cfa3b771f66f36dff25",
"assets/schedules/novi_sad/18A.txt": "58144cc2c58775a2ce09dfef65555517",
"assets/schedules/novi_sad/15A.txt": "9f625f405f575763f46c8b958b130c0a",
"assets/schedules/novi_sad/18B.txt": "98438e115789e7f78d36ea4e3a727cdd",
"assets/schedules/novi_sad/16B.txt": "df3e672381b4809cf596ba798c5cfaf1",
"assets/schedules/novi_sad/76A.txt": "d03a3077b8f6e7bc2b4c9523e84c6977",
"assets/schedules/novi_sad/1A.txt": "30b815bebb746a80fcd639e9ff3ed8f6",
"assets/schedules/novi_sad/60B.txt": "050f85a2afe2dc3e0a13f20ea07bc89b",
"assets/schedules/novi_sad/5B.txt": "2f15eb8aa5337577ea6ed5bddadf9686",
"assets/schedules/novi_sad/5A.txt": "7f2b63d870d882861a8b15092e02e07a",
"assets/schedules/novi_sad/2B.txt": "59734dd68a3aba2b08b324228c6c7763",
"assets/schedules/novi_sad/13A.txt": "be525eff6722498fb96c27d8aa77baa8",
"assets/schedules/novi_sad/10A.txt": "ddcb6b7c8ef1daeea05ce1559b1ad803",
"assets/schedules/novi_sad/15B.txt": "cf977e25d3fadbb763d218d253a91248",
"assets/schedules/novi_sad/3AA.txt": "91cae8b52251935083f2a6d99ac45787",
"assets/schedules/novi_sad/11B.txt": "2b216da14aaf67efb0a9ba733ba45595",
"assets/schedules/novi_sad/16A.txt": "b6bc973a21dbbd48a0a92193c24bf986",
"assets/schedules/novi_sad/17A.txt": "f224e6263bf4ef060154a3a9ca0e0123",
"assets/schedules/novi_sad/3B.txt": "9de5b7b3c3e850f78a8d36507ec458c1",
"assets/schedules/novi_sad/17B.txt": "5d392a613e978426823423e937806ad1",
"assets/schedules/novi_sad/7B.txt": "68f1b48c3e525820194d9f804c61791d",
"assets/schedules/novi_sad/2A.txt": "a38486cc31ee4c81bd12f5f6c2a6fe5c",
"assets/schedules/novi_sad/path.txt": "258a738559e9764cf13e6671c8a80083",
"assets/schedules/novi_sad/4B.txt": "6ee6dda7d2e702517662e926e2bcfa07",
"assets/schedules/novi_sad/4A.txt": "ecaa0a31ab2d2324c7ff3d0cb6c8e4ef",
"assets/schedules/novi_sad/64A.txt": "eda213b4a64f2465005150be081447c4",
"assets/schedules/novi_sad/14A.txt": "d156530ab4def0dae44e12fbeaeacb2c",
"assets/schedules/novi_sad/3BB.txt": "bc5f643096bfa06536c566a6397b1c8b",
"assets/schedules/novi_sad/3AB.txt": "d014c6608af4b09923e5acc5b926e84f",
"assets/schedules/novi_sad/3A.txt": "9d6f4e8b7e172ee3411f1bda0eab0447",
"assets/schedules/novi_sad/3BA.txt": "b70c103f7007c7ef43451a5bd8c54749",
"assets/schedules/novi_sad/11A.txt": "7a48c5962e14ef48528ca717897646cc",
"assets/schedules/novi_sad/64B.txt": "6cc35b8cbf53a9b22aa55411c4b36355",
"assets/schedules/novi_sad/6B.txt": "e349fa2e7ecac3b97015d39595e48bc7",
"assets/schedules/novi_sad/12A.txt": "357a6381346fda60453142ba8daf5255",
"assets/schedules/novi_sad/10B.txt": "5563f35d1f55040534bccb320cb39ee6",
"assets/schedules/novi_sad/6A.txt": "7964817397396fe15d88ee0775b2a0d7",
"assets/schedules/novi_sad/20A.txt": "94f428ca3c9e3ad5d40b86d6d1478c68",
"assets/schedules/novi_sad/60A.txt": "333a2691a3f82e7b7fd62d5d41d2a911",
"assets/schedules/novi_sad/20B.txt": "83af0ca9e0d7b9e13d3f59dfbca329c3",
"assets/schedules/novi_sad/72B.txt": "b6187e1c743f71b2a0a5b45a93cd9985",
"assets/schedules/novi_sad/8B.txt": "89c53fe89494b7b4f14d43fc4734a7c6",
"assets/stations.json": "05cd1fb9b19135f7ad68aa342e8a1bd0",
"assets/busLines.json": "140225e3a9d4d460a2f0a0654fcd24b9",
"assets/nameLists/zenskaImena.txt": "2af3ada39c0fe4460361ecc3342db8ec",
"assets/nameLists/muskaImena.txt": "535ab8f61268ae714a1fc33fa57e9fb2",
"assets/google_fonts/Roboto-MediumItalic.ttf": "cabdb4a12e5de710afde298809306937",
"assets/google_fonts/Roboto-Black.ttf": "301fe70f8f0f41c236317504ec05f820",
"assets/google_fonts/Roboto-Regular.ttf": "f36638c2135b71e5a623dca52b611173",
"assets/google_fonts/Roboto-Thin.ttf": "4f0b85f5b601a405bdc7b23aad6d2a47",
"assets/google_fonts/Roboto-BlackItalic.ttf": "c470ca2b5b4f4437a3fe71b113a289a2",
"assets/google_fonts/Roboto-ThinItalic.ttf": "7384da64612787e3662872e9d19cbc2d",
"assets/google_fonts/Roboto-Bold.ttf": "9ece5b48963bbc96309220952cda38aa",
"assets/google_fonts/Roboto-LightItalic.ttf": "2ffc058ddedacfeaa23542026c8108e2",
"assets/google_fonts/a0e62c76df9173512c94484b3994d83d2b4648dadb8ea6104f3656a3b60f25bc.ttf": "f3b472c693d1fd76e36db85bce258c52",
"assets/google_fonts/Roboto-Light.ttf": "6090d256d88dcd7f0244eaa4a3eafbba",
"assets/google_fonts/Roboto-Italic.ttf": "465d1affcd03e9c6096f3313a47e0bf5",
"assets/google_fonts/Roboto-Medium.ttf": "b2d307df606f23cb14e6483039e2b7fa",
"assets/google_fonts/Roboto-BoldItalic.ttf": "0be9fa8f2863998d1e52c84165976880",
"assets/NOTICES": "4c030dbbf1c44de1bec1c35b0da82e2f",
"assets/AssetManifest.json": "5fc0c4ed52f7c1f57dd69be78075e906",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"version.json": "6ecdee6e721540bd020a5813ca91ab02",
"main.dart.js": "c4ff4a3669ffd761c57cf09d77ebd2f3",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
