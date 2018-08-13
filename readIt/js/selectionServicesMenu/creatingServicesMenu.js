var features = {
  "Definitions":"Definiciones",
  "Synonyms":"Palabras parecidas",
  "Antonyms":"Palabras contrarias",
  "Youtube":"Youtube",
  "Wikipedia":"Wikipedia",
  "Pictograms":"Pictogramas",
  "Summary":"Resumen",
  "OutLoudReading":"Lectura en voz alta"
};

function creatingServicesMenu() {
  // parsexml();
  document.write("<ul>");
  document.write('<li><input type="checkbox" id="select_all"/> Seleccionar todas</li>');
  $.each(features, function (index, value) {
   document.write('<li><input class="notSelectAll checkbox" type="checkbox" name="check[]" id=' + index + '>' + value + '</li>');
  });
  // document.write('<li><input class="notSelectAll checkbox" type="checkbox" name="check[]" id="capital_letters"/>Mostrar en mayúsculas</li>');
  document.write("</ul>");

  document.write('<div style="text-align:center;">');
  document.write('<input type="button" id="selectionButton" value="Aceptar"/>');
  document.write("</div>");

}

// Intento de parsear xml
// function parsexml() {
//   $(document).ready(function(){
//
//     var xml = $.ajax({
//       type: "GET",
//       url: "xml/featuresList.xml",
//       dataType: "xml",
//       async: false
//     }).responseText;
//
//     $(xml).find('service').each(function(key, value){
//       var id = $(this).find('index').text();
//       var name = $(this).find('name').text();
//       features.push({
//           index: id,
//           value: name
//       });
//     });
//     $.each(features, function (index, value) {
//       alert(value.index + value.value);
//     });
//   });
// }
