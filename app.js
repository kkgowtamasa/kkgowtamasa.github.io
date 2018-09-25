  $(document).ready(function(ev) {
	    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }
  
    var country = $(this).val();
    var formattedCountryName = toTitleCase(country);
    //var uri = 'https://api.population.io/1.0/population/2018/'+formattedCountryName+'/18';
	//var uri = 'https://www.googleapis.com/books/v1/volumes?q="'+formattedCountryName+'"';
	var uri = 'https://newsapi.org/v2/everything?q=bengaluru&apiKey=1ae9a77a12ec452884d08691616a1ed1';
    $.ajax({
      url: uri,
      method : 'GET',
	  headers : {'Accept' : '*/*'},
      success: function(data) {
        var res = data.articles[0];
        $('#male').html(res.title.title);
        $('#female').html(res.description);
      },
      error: function(errorInfo) {
        console.log(errorInfo);
		$('#main-card').hide();
      }
    });

  });

