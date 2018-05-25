function updatePlayers(callback) {
  var queryTime =  performance.now();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      try {
        var parseTime =  performance.now(); // used for performace testing
        // parse respose to JSON
        var data = JSON.parse(xhr.responseText);
        if (data.Items) {
          var players = parsePlayers(data.Items);
          // parse players
          console.log('players data',{
            data: data.Items,
            queryTime: ((parseTime - queryTime) / 1000) + 's',
            parseTime: ((performance.now() - parseTime) / 1000) + 's'
          });
          if (callback) callback(players);
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
  if (window.location.host.indexOf('localhost') !== -1) {
    xhr.open("GET", "/api/players", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
  } else {
    xhr.open("GET", 'https://netssandboxmg01.cloud.infor.com'+"/IDORequestService/MGRestService.svc/json/NBAS_Members/derFullName,RowPointer,TeamID/adv/?filter=MemberType=%27ply%27%20AND%20League=%27"+'NBA'+"%27&orderby=&rowcap=100000&distinct=&customloadmethod=&customloadmethodparms=&loadtype=&bookmark=&postquerycommand=&readonly=");
    xhr.setRequestHeader("authorization", 'b/XdI6IQzCviZOGJ0E+002DoKUFOPmVDkwpQDbQjm3w/qkdxDUzmqvSYEZDCmJGWpA23OTlhFpxRHFz3WOsvay8V58XdIp/UIsr5TpCdMwtW3QXF2ahwQYp2O6GzKlJclG6x+UxF9a5yRYcPLAiJIbRfw9X/EBjDOs5AYC26S/51LNcjEWDEH/RXVMJoUVGuCnc+TijGIjfdBEj42toZj+uDtYZJcPaNIKK32xqKcc2AUI7DOWGzKIXns5ZIJzwuejhzdXmDMkfS3pbwEWESZsw2RD3o0Q6KoC2CCgCFIQa2tRNjR7e9gAz8EM2OKwYPvnU8elJuRpkL7KBfYtxXpg==');
    xhr.setRequestHeader("accept", "application/json");
    xhr.send(null);
  }
}

function parsePlayers(data) {
  var players = {id:{},name:{}};
  data.forEach(function(playerData, i){
    var player = {};
    Object.keys(playerData).forEach(function(playerDetail, x){
      player[playerData[playerDetail].Name] = playerData[playerDetail].Value;
    });
    players.id[player.RowPointer] = {name: player.derFullName}; // used in suggestive search
    players.name[player.derFullName] = player.RowPointer;
  });

  return players;
}

module.exports = { updatePlayers }