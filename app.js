  function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }
  $("#search").on('change', function(ev) {
    var country = $(this).val();
    var formattedCountryName = toTitleCase(country);
    //var uri = 'https://api.population.io/1.0/population/2018/'+formattedCountryName+'/18';
	var uri = 'https://www.googleapis.com/books/v1/volumes?q="'+formattedCountryName+'"';
    $.ajax({
      url: uri,
      method : 'GET',
	  headers : {'Accept' : '*/*'},
      success: function(data) {
        var res = data.items[0].volumeInfo;
		$('#main-card').show();
        $('#male').html(data.items[0].volumeInfo.title);
        $('#female').html(data.items[0].volumeInfo.subtitle);
      },
      error: function(errorInfo) {
        console.log(errorInfo);
		$('#main-card').hide();
      }
    })
  });


