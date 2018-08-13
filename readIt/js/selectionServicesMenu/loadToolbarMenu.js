$("#selectionButton").click(function(){
    var selectedCheckBoxArray = [];
  $("input:checkbox.notSelectAll:checked").each(function(){
    selectedCheckBoxArray.push($(this).attr('id'));
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {servicesToDisplay: selectedCheckBoxArray}, function(response) {
    });
  });
});
