(function (global) {

var dc = {};
var homeHtmlUrl = "./home-snippet.html";
var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

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
