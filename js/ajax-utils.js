var $ajaxUtils = {};

$ajaxUtils.sendGetRequest = function (url, callback, isJson) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (isJson === false) {
        callback(xhr.responseText);
      } else {
        callback(JSON.parse(xhr.responseText));
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send(null);
};
