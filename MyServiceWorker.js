//These assets will be collected as part of static loading.
//These elements helps to build static template
const STATIC_ASSETS = [
 './',
 './images/logo.png',
 './images/online.png',
 './images/offline.png',
 './images/searchicon.png',
 './images/icons/audio.svg',
 './styles.css',
 './app.js',
 './location.js',
 './jquery-1.11.3.min.js',
 './defaultobject.json'
];


//installing service worker for the first time.
self.addEventListener('install', async event => {
	console.log('Service worker has been installed.');
	const cache = await caches.open('listed-books');
	cache.addAll(STATIC_ASSETS);
});

//Obtaining {or} getting data from API
self.addEventListener('fetch', event => {
	console.log('Fetch the resources from existing or get updated data.');
	const req = event.request;
	const url = new URL(req.url);
	//If request is same then use existing data.
	if(url.origin == location.origin) {
		event.respondWith(serveFromExisting(req));	
	} else {
		//If request origin is different then make a call
		event.respondWith(getNewBooksList(req));
	}
});

async function serveFromExisting(req) {
	console.log('Books cahced.');
	const cahcedResponse = caches.match(req);
	return cahcedResponse || fetch(req);
}

async function getNewBooksList(req) {
	const cache = await caches.open('new-books');
	
	try {
		const res = await fetch(req);
		cache.put(req, res.clone());
		return res;
	} catch (errorInfo) {
		const cahcedData = await cache.match(req);
		return cahcedData || await caches.match('./defaultobject.json');
	}
}


/*
* Notification Management
*/
self.addEventListener('push', function(event) {
  console.log('Hey.. I got a Push Message.');

  const title = 'Alert!';
  const options = {
    body: '<p>welcome</p><a href="#">Update</a>Hi, you got an update.',
    icon: 'logo-square.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
