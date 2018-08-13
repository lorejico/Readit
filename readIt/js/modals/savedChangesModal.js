function openSavedUserDataModal(array){
  jQuery('#modalTitleId').empty();
  jQuery('#modalTitleId').append("Datos guardados");

  jQuery('#modalBodyId').empty();
  jQuery.each(array, function (index, value) {
    jQuery('#modalBodyId').append('<p>' + value +'</p>');
  });
  
  jQuery('#saveChangesId').hide();
  jQuery('#exportChangesId').show();
}
