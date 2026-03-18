(function (global) {

var dc = {};
var homeHtmlUrl = "./home-snippet.html";
var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

var insertHtml = function (selector, html) {
  document.querySelector(selector).innerHTML = html;
};

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  return string.replace(new RegExp(propToReplace, "g"), propValue);
};

dc.loadHome = function () {
  $ajaxUtils.sendGetRequest(allCategoriesUrl, function (categories) {

    var randomIndex = Math.floor(Math.random() * categories.length);
    var randomCategoryShortName = "'" + categories[randomIndex].short_name + "'";

    $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {

      var html = insertProperty(homeHtml,
        "randomCategoryShortName",
        randomCategoryShortName);

      insertHtml("#main-content", html);
    }, false);
  });
};

dc.loadMenuItems = function (categoryShort) {
  var url = menuItemsUrl + categoryShort;

  $ajaxUtils.sendGetRequest(url, function (data) {

    var html = "<h2>Menu Items (" + categoryShort + ")</h2><ul>";

    data.menu_items.forEach(function (item) {
      html += "<li>" + item.name + " - " + item.description + "</li>";
    });

    html += "</ul><br><a href='#' onclick='$dc.loadHome()'>Back to Home</a>";

    insertHtml("#main-content", html);
  });
};

global.$dc = dc;

})(window);
