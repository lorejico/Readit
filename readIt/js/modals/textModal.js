function openTextModal(array, serviceCalled, selectedText){
  jQuery('#modalTitleId').empty();
  jQuery('#modalTitleId').append(serviceCalled + ': ' + selectedText);
  jQuery('#modalBodyId').empty();

  jQuery.each(array, function (index, value) {
    jQuery('#modalBodyId').append('<label><input type="checkbox" class="optionsSelected" id="' + index + '" value="' + value +'">' + value);
    jQuery('#modalBodyId').append('</label><br>');
  });

  jQuery('#saveChangesId').show();
  jQuery('#exportChangesId').hide();

}
