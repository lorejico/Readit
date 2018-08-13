function openErrorTextModal(serviceCalled){
  jQuery('#modalTitleId').empty();
  jQuery('#modalTitleId').append(serviceCalled);

  jQuery('#modalBodyId').empty();
  jQuery('#modalBodyId').append('<p>Tienes que buscar una palabra.</p>');

  jQuery('#saveChangesId').hide();
  jQuery('#exportChangesId').hide();
}
