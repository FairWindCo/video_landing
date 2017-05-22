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


function createFeedBackActivator(nameOfModalElement,nameActivator,activateStyle,removeStyle,feedBackActivatorWrapper) {
  nameOfModalElement = typeof nameOfModalElement !== 'undefined' ? nameOfModalElement : '#feedBackForm';
  nameActivator = typeof nameActivator !== 'undefined' ? nameActivator : '#feedBackActivator';
  nameDeActivator = typeof nameDeActivator !== 'undefined' ? nameDeActivator : "#feedBackFormClose";
  activateMoveStyle = typeof activateStyle !== 'undefined' ? activateStyle : "showBlockMoveAnimation";
  removeMoveStyle = typeof removeStyle !== 'undefined' ? removeStyle : "hideBlockMoveAnimation";
  activateStyle = typeof activateStyle !== 'undefined' ? activateStyle : "showBlockAnimation";
  removeStyle = typeof removeStyle !== 'undefined' ? removeStyle : "hideBlockAnimation";
  feedBackActivatorWrapper=typeof feedBackActivatorWrapper !== 'undefined' ? feedBackActivatorWrapper : "#feedBackActivatorWrapper";
  jQuery(document).ready(function () {
    // Get the modal
    var modal = jQuery(nameOfModalElement);
    var activator=jQuery(nameActivator);
    var deactivator=jQuery(nameDeActivator);
    var feedactivator=jQuery(feedBackActivatorWrapper);
    activator.click(
      function (event) {
        event.preventDefault();
        // When the user clicks on the button, open the modal
        modal.css("display", "block");
        modal.removeClass(removeMoveStyle);
        modal.addClass(activateMoveStyle);

        feedactivator.addClass(removeStyle);
        feedactivator.removeClass(activateStyle);
      });

    deactivator.click(
      function (event) {
        event.preventDefault();
        // When the user clicks on the button, open the modal
        //modal.css("display", "none");
        feedactivator.removeClass(removeStyle);
        feedactivator.addClass(activateStyle);
        modal.removeClass(activateMoveStyle);
        modal.addClass(removeMoveStyle);
      });
  });
}
