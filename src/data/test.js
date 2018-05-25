
module.exports = function(callback) {
  var queryTime =  performance.now();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      try {
        var parseTime =  performance.now(); // used for performace testing
        // parse respose to JSON
        var data = JSON.parse(xhr.responseText);
        if (data) {
          console.log('data',{
            data: data,
            queryTime: ((parseTime - queryTime) / 1000) + 's',
            parseTime: ((performance.now() - parseTime) / 1000) + 's'
          });
          if (callback) callback(data);
        } else {
          console.log('data', xhr.responseText);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (xhr.status === 504 ) {
      console.log('no response, check server');
    }
  }
  xhr.open("GET", "/api/test", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send();
}