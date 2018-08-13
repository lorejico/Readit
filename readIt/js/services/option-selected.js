var userText= "";
var selectionableText = "";
var serviceCalled = "";
$(document).ready(function(){
  //Llamar al servicio de definiciones
  $("#Definitions").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var url = 'https://sesat.fdi.ucm.es/tfgapi/servicios/rest/definicion/json/' + userText;
    serviceCalled = this.textContent;
    callingGetWebService(url, userText, serviceCalled);
  });
  //Llamar al servicio de sinónimos
  $("#Synonyms").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var url = 'https://sesat.fdi.ucm.es/tfgapi/servicios/rest/sinonimos/json/' + userText;
    var serviceCalled = this.textContent;
    callingGetWebService(url, userText, serviceCalled);
  });
  //Llamar al servicio de antónimos
  $("#Antonyms").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var url = 'https://sesat.fdi.ucm.es/tfgapi/servicios/rest/antonimos/json/' + userText;
    var serviceCalled = this.textContent;
    callingGetWebService(url, userText, serviceCalled);
  });
  //Llamar al servicio de pictogramas
  $("#Pictograms").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var url = 'https://sesat.fdi.ucm.es/serviciopictar/' + userText;
    var serviceCalled = this.textContent;
    callingPictogramsService(url, userText, serviceCalled);
  });
  //Llamar al servicio de resumenes
  $("#Summary").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var url = 'https://sesat.fdi.ucm.es/grafeno/run/summary_es';
    var serviceCalled = this.textContent;
    callingSummaryWebService(url, userText, serviceCalled);
  });
  //Llamar a la lectura en voz alta
  $("#OutLoudReading").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var serviceCalled = this.textContent;
    chrome.extension.sendMessage({ msg: userText });
  });
  //Abrir nueva pestaña de Youtube
  $("#Youtube").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var url = "https://www.youtube.com/results?search_query=" + userText;
    openCenteringWindow(url);
  });
  //Abrir nueva pestaña de Wikipedia
  $("#Wikipedia").click(function(){
    if (selectionableText == ""){
      getSearchText();
    }
    var url = "https://es.wikipedia.org/wiki/" + userText;
    openCenteringWindow(url);
  });
  //Llamanos al blog del colegioestudio3
  $("#Blog").click(function(){
    var url = "http://colegioestudio3.blogspot.com.es";
    openCenteringWindow(url);
  });
  //Abrir popup con los datos guardados por el usuario
  $("#getChangesId").click(function(){
    var savedUserData = [];
    chrome.storage.sync.get('dataSaved', function (result) {
      savedUserData = result.dataSaved;
      if(savedUserData != null){
        openSavedUserDataModal(savedUserData);
      }
    });
  });

});

window.addEventListener('mouseup', function(){
  selectionableText = getSelectionText();
  if (selectionableText.length > 0){ // check there's some text selected
      userText = selectionableText;
  }
}, false)

function getSelectionText(){
  var selectedText = "";
  if (document.getSelection()){
      selectedText = document.getSelection().toString();
  }
  return selectedText;
}

function callingGetWebService(url, selectedText, serviceCalled) {
  if(selectedText == ""){
    openErrorTextModal(serviceCalled);
  }
  else{
    $.get(url, function( data ) {
      var jsonData = JSON.parse(data);
      var arrayDef = [];
      switch (serviceCalled) {
        case "Definiciones":
          arrayDef = parseDefinitionsData(jsonData);
          break;
        case "Palabras parecidas":
          arrayDef = parseSynonymsData(jsonData);
          break;
        case "Palabras diferentes":
          arrayDef = parseAntonymsData(jsonData);
          break;
      }
      if(arrayDef.length == 0){
        openNoResultsServiceTextModal(serviceCalled, selectedText);
      }
      else {
        openTextModal(arrayDef, serviceCalled, selectedText);
      }
    });
  }
}

function callingSummaryWebService(url, selectedText, serviceCalled) {
  if(selectedText == ""){
    openErrorTextModal(serviceCalled);
  }
  else{
    var inputDataJson = {}
    inputDataJson["text"] = selectedText;
    var json_data = JSON.stringify(inputDataJson);
    $.ajax({
      url:url,
      type:"POST",
      data:json_data,
      dataType: "json",
      async:false,
      headers: {
        'Content-Type':'application/json'
      },
      success: function(summary){
        var title = selectedText.substring(0,10) + "...";
        if(summary.result == ""){
          openNoResultsServiceTextModal(serviceCalled, title);
        }
        else {
          openSummaryTextModal(summary.result, serviceCalled, title);
        }
      },
      error: function(XMLHttpRequest) {
        openNoResultsServiceTextModal(serviceCalled, selectedText);
      }
    });
  }
}

function callingPictogramsService(url, selectedText, serviceCalled){
  if(selectedText == ""){
    openErrorTextModal(serviceCalled);
  }
  else{
    $.get(url, function( data ) {
      var pictosArrayId = parseStringData(data);
      if(pictosArrayId.length == 0){
        openNoResultsServiceTextModal(serviceCalled, selectedText);
      }
      else{
        openImgDataModal(pictosArrayId, serviceCalled, selectedText);
      }
    });
  }
}

function getSearchText(){
  var searchText = document.getElementById('searchText').value;
  if(searchText != ""){
    userText = searchText;
  }
}

function openCenteringWindow(url){
  var width  = 900;
  var height  = 700;
  var left = (window.screen.width / 2) - ((width / 2) + 10);
  var top = (window.screen.height / 2) - ((height / 2) + 50);
  return  window.open(url, "_blank", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left="
  + left + ",top=" + top + ",screenX=" + left + ",screenY="
  + top + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
}

function parseDefinitionsData(jsonData){
  var arrayDefinitions = [];
  $.each(jsonData.definiciones, function (index, value) {
    var def = value.definicion;
    arrayDefinitions.push(def);
  });
  return arrayDefinitions;
}

function parseSynonymsData(jsonData){
  var arraySynonyms = [];
  $.each(jsonData.sinonimos, function (index, value) {
    var def = value.sinonimo;
    arraySynonyms.push(def);
  });
  return arraySynonyms;
}

function parseAntonymsData(jsonData){
  var arrayAntonyms = [];
  $.each(jsonData.antonimos, function (index, value) {
    var def = value.antonimo;
    arrayAntonyms.push(def);
  });
  return arrayAntonyms;
}

function parseStringData(data){
  var pictosArrayIds = [];
  $.each(data, function (index, value){
    var pictosId = value.substring(value.indexOf("["));
    pictosId = pictosId.substring(0, pictosId.indexOf("]"));
    pictosId = pictosId.substring(1);
    var pictoId = pictosId.split(', ');
    $.each(pictoId, function (index, value){
      pictosArrayIds.push(value);
    });
  });
  return pictosArrayIds;
}
