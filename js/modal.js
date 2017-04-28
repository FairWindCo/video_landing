/**
 * Created by Сергей on 09.03.2017.
 */


function createAjax(formName,nameOfModalForm,nameOfModalElement){
  formName = typeof formName !== 'undefined' ? formName : '#feedback';
  nameOfModalElement = typeof nameOfModalElement !== 'undefined' ? nameOfModalElement : '#myModalResponse';
  nameOfModalForm = typeof nameOfModalForm !== 'undefined' ? nameOfModalForm : '#myModal';
  // prepare Options Object
  var options = {
    url:        'http://nkt.ua/mailer.php',
    type:'post',
    dataType:  'json',
    success:    function(data) {
      if(typeof data!== 'undefined') {
        var modal = jQuery(nameOfModalElement);
        var modalForm = jQuery(nameOfModalForm);
        modalForm.css("display", "none");
        modal.css("display", "block");
        text = typeof data['text'] !== 'undefined'? data['text'] : data['error'];
        if(data['error'] !== 'undefined'){
          modal.find('.propouseWindow--header').addClass('propouseWindow--header__red')
        } else {
          modal.find('.propouseWindow--header').removeClass('propouseWindow--header__red')
        }
        modal.find('.responseHeaderText').text(data['message']);
        modal.find('.responseText').text(text);
        //alert('Thanks for your comment!' + data);
      }
    }
  };

  jQuery(document).ready(function () {
    jQuery(formName).submit(function() {
      // submit the form
      jQuery(this).ajaxSubmit(options);
      // return false to prevent normal browser submit and page navigation
      return false;
    });
  });
}

function createModal(nameOfModalElement,nameActivator,noComments) {
  nameOfModalElement = typeof nameOfModalElement !== 'undefined' ? nameOfModalElement : '#myModal';
  nameActivator = typeof nameActivator !== 'undefined' ? nameActivator : '#showmodal';
  noComments = typeof noComments !== 'undefined' ? noComments : false;
  jQuery(document).ready(function () {
    // Get the modal
    var modal = jQuery(nameOfModalElement);
    jQuery(nameActivator).click(
      function (event) {
        event.preventDefault();
        // When the user clicks on the button, open the modal
        modal.css("display", "block");
        if(noComments){
          //alert("test" + modal.find("[name=comment]"));
          modal.find("[name=comment]").css("display", "none");
        } else {
          modal.find("[name=comment]").css("display", "block");
        }
      }
    );
    // Get the <span> element that closes the modal
    modal.find('.modal--close').click(
      function () {
        // When the user clicks on <span> (x), close the modal
        modal.css("display", "none");
      }
    );
    modal.click(function (event) {
      if (modal.is(event.target)) {
        modal.css("display", "none");
      }
    })
  });
}

function createModalActivator(nameOfModalElement,nameActivator,noComments) {
  nameOfModalElement = typeof nameOfModalElement !== 'undefined' ? nameOfModalElement : '#myModal';
  nameActivator = typeof nameActivator !== 'undefined' ? nameActivator : '#showmodal';
  noComments = typeof noComments !== 'undefined' ? noComments : false;
  jQuery(document).ready(function () {
    // Get the modal
    var modal = jQuery(nameOfModalElement);
    jQuery(nameActivator).click(
      function (event) {
        event.preventDefault();
        // When the user clicks on the button, open the modal
        modal.css("display", "block");
        if(noComments){
          //alert("test" + modal.find("[name=comment]"));
          modal.find("[name=comment]").css("display", "none");
        } else {
          modal.find("[name=comment]").css("display", "block");
        }
      }
    );
  });
}

function createModalWindow(nameOfModalElement) {
  nameOfModalElement = typeof nameOfModalElement !== 'undefined' ? nameOfModalElement : '#myModalResponse';
  jQuery(document).ready(function () {
    // Get the modal
    var modal = jQuery(nameOfModalElement);
    // Get the <span> element that closes the modal
    modal.find('.modal--close').click(
      function () {
        // When the user clicks on <span> (x), close the modal
        modal.css("display", "none");
      }
    );
    modal.click(function (event) {
      if (modal.is(event.target)) {
        modal.css("display", "none");
      }
    })
  });
}
