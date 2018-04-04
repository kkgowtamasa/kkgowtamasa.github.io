const domSelector = document.querySelector('books');
let swRegistration = null;
window.addEventListener('load', e=> {
	getBooksList('');
	//Check whether serviceworker object is available or not.
	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('MyServiceWorker.js', { insecure: true }).then(function(sw) {
				swRegistration = sw;
			}).catch(function(err){
				alert('caught error'+JSON.stringify(err,null,4));
			});;
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

/*recognition.addEventListener('result', (e) => {
	console.log('results : '+e.results[0][0].transcript);
	$('#t1').val(e.results[0][0].transcript);
	$('#t1').trigger('change');
	recognition.stop();
});
*/

recognition.onresult = (e) => {
	console.log('results : '+e.results[0][0].transcript);
	$('#t1').val(e.results[0][0].transcript);
	$('#t1').trigger('change');
	recognition.stop();
};

recognition.onspeechend = function() {
  console.log('Speech has stopped being detected');
}

var OneSignal = window.OneSignal || [];
  OneSignal.push(["init", {
      appId: "3486342b-2331-4a65-bf2e-40da9f2eb73e",
      autoRegister: false, /* Set to true to automatically prompt visitors */
      notifyButton: {
          enable: true, /* Set to false to hide */
		   colors: { // Customize the colors of the main button and dialog popup button
      'circle.background': 'rgb(243,66,150)',
      'circle.foreground': 'white',
      'badge.background': 'rgb(243,66,150)',
      'badge.foreground': 'white',
      'badge.bordercolor': 'white',
      'pulse.color': 'white',
      'dialog.button.background.hovering': 'rgb(77, 101, 113)',
      'dialog.button.background.active': 'rgb(243, 66, 150)',
      'dialog.button.background': 'rgb(243,66,150)',
      'dialog.button.foreground': 'white'
    }
      },
	   welcomeNotification: {
		   disable: false,
        "title": "My Custom Title",
        "message": "Thanks for subscribing!",
        // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
    }
    }]);
	
	
	
	function updateOnlineStatus() {
	getLocation();
	$("#locstatus").removeClass('offline').addClass('online');
}

function updateOfflineStatus() {
	$("#locstatus").removeClass('online').addClass('offline');
}


window.addEventListener('load', function() {
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOfflineStatus);
});