const domSelector = document.querySelector('books');
window.addEventListener('load', e=> {
	getBooksList('');
	//Check whether serviceworker object is available or not.
	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('MyServiceWorker.js', { insecure: true });
			console.info('Service Worker successfully registered.');
		} catch (errorInfo) {
			console.error('Service Worker failed to registered.');
		}
	}
})

async function getBooksList(str) {
	//Fetching books using async List 
	var sk = str ? str : 'test';
	const res = await fetch('https://www.googleapis.com/books/v1/volumes?q="'+sk+'"');
	//storing response and converting into JSON.
	const json = await res.json();
	//Appending each article with a new line.
	domSelector.innerHTML = json.items.map(listBookItem).join('\n');
}

/**
* args book - object contains complete details of book.
* returns formatted HTML content.
**/
function listBookItem(book){
	if(book.volumeInfo) {
		return `
    <div class="book">
      <a href="${book.volumeInfo.previewLink}">
        <h2>${book.volumeInfo.title}</h2>
        <img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="${book.volumeInfo.title}">
        <p>${book.volumeInfo.description || 'Description not available.'}</p>
      </a>
    </div>
  `;
	} else {
		return `
    <div class="book">
      <a href="#">
        <h2>Sorry! No cahced results found.</h2>
        <p>Try after sometime.</p>
      </a>
    </div>
  `;
	}	
}
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'EN';
recognition.interimResults = false;
$('.audio').on('click', function(ev){
	recognition.start();
});

$('#t1').on('change paste propertychange', function(ev){
	getBooksList($('#t1').val());
});

recognition.addEventListener('result', (e) => {
	console.log('results : '+e.results[0][0].transcript);
	$('#t1').val(e.results[0][0].transcript);
	$('#t1').trigger('change');
	recognition.stop();
});

recognition.onspeechend = function() {
  console.log('Speech has stopped being detected');
}