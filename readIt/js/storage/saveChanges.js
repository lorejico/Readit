$(document).ready(function(){
  $("#saveChangesId").click(function(){
    var date = getDateAndHour();
    var selectedCheckBoxArray = [];
    selectedCheckBoxArray.push(date);
    var title = $('#modalTitleId').text();
    selectedCheckBoxArray.push(title);
    $("input:checkbox.optionsSelected:checked").each(function(){
      selectedCheckBoxArray.push($(this).val());
    });
    chrome.storage.sync.get('dataSaved', function (result) {
      if(result.dataSaved == null ) {
        chrome.storage.sync.set({'dataSaved': selectedCheckBoxArray}, function() {
        });
      }
      else {
        var historyData = result.dataSaved;
        var persistentData = selectedCheckBoxArray.concat(historyData);
        chrome.storage.sync.set({'dataSaved': persistentData}, function() {
        });
      }
    });
  });
});

function getDateAndHour(){
  var date = "";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0
  var yyyy = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();

  if(dd < 10) {
      dd = '0'+ dd;
  }

  if(mm < 10) {
      mm = '0'+ mm;
  }

  if(hours < 10) {
      hours = '0'+ hours;
  }

  if(minutes < 10) {
      minutes = '0'+ minutes;
  }

  date = dd + '/' + mm + '/' + yyyy + '. ' + hours + ':' + minutes;
  return date;
}
