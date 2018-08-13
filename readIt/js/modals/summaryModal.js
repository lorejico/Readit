function openSummaryTextModal(summary, serviceCalled, selectedText){
  jQuery('#modalTitleId').empty();
  jQuery('#modalTitleId').append(serviceCalled + ': ' + selectedText);

  jQuery('#modalBodyId').empty();
  jQuery('#modalBodyId').append('<p>'+ summary + '</p>');

  jQuery('#saveChangesId').show();
  jQuery('#exportChangesId').hide();

}
