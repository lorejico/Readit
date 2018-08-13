$(document).ready(function(){
  $("#exportChangesId").click(function(){
    var savedUserData = [];
    chrome.storage.sync.get('dataSaved', function (result) {
      savedUserData = result.dataSaved;
      var htmlData = getHtmlData(savedUserData);
      if(savedUserData != null){
        saveHTML("misDatosGuardados.html", htmlData);
      }
    });

  });
});

var saveHTML = function(fileName, html){
  //  Escape HTML
  var el = document.createElement("dummy");
  el.innerText = html;

  var escapedHTML = el.innerHTML;

  //  Use dummy <a /> tag to save
  var link = document.createElement("a");
  link.download = fileName;
  link.href = "data:text/html,"+escapedHTML;

  link.click(); // trigger click/download
}

function getHtmlData(savedUserData){
  var htmlData = "";
  htmlData = "%3Chtml%3E%3Cbody%3E";
  $.each(savedUserData, function (index, value) {
    var data = value;
    var htmlElement = "%3Cp%3E" + value + "%3C/p%3E";
    htmlData = htmlData.concat(htmlElement);
  });
  htmlData = htmlData.concat("%3C/body%3E%3C/html%3E");
  return htmlData;
}
