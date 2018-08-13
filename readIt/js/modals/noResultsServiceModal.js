function openNoResultsServiceTextModal(serviceCalled, selectedText){
  jQuery('#modalTitleId').empty();
  jQuery('#modalTitleId').append(serviceCalled + ': ' + selectedText);

  jQuery('#modalBodyId').empty();
  jQuery('#modalBodyId').append('<p> Lo que has buscado no tiene resultados.');

  jQuery('#saveChangesId').hide();
  jQuery('#exportChangesId').hide();
}
