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


// only implement if no native implementation is available
if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
};

function MyTabs(tabContainerElementId,tabElementSelector,toggleElementSelector){
  if(typeof tabContainerElementId === 'undefined' ) {
    throw new SyntaxError("No ID");
    return;
  }
  var tabElement=document.getElementById(tabContainerElementId);
  if(typeof tabContainerElementId === 'undefined' ) {
    throw new SyntaxError("No Element with this ID");
    return;
  }

  tabElementSelector = typeof tabElementSelector !== 'undefined' ? tabElementSelector : '.content-tab';
  toggleElementSelector = typeof toggleElementSelector !== 'undefined' ? toggleElementSelector : '.tab-selector';


  var contentTabs=tabElement.querySelectorAll(tabElementSelector);
  var toggleElements=tabElement.querySelectorAll(toggleElementSelector);

  if((typeof contentTabs === 'undefined') && contentTabs.length==0) {
    throw new SyntaxError("No content tab with "+tabElementSelector);
    return;
  }
  if((typeof toggleElements === 'undefined') && toggleElements.length==0) {
    throw new SyntaxError("No tab toggle with "+toggleElementSelector);
    return;
  }


  var currentTab=contentTabs[0];
  var curentIndex=0;

  function setCssClassForElements(listOfElements,cssClass){
    if(typeof listOfElements === 'undefined') return listOfElements;
    if(typeof listOfElements.length === 'undefined'){
      listOfElements.classList.add(cssClass);
      return listOfElements;
    }
    for (var i = 0; i < listOfElements.length; i++) {
      listOfElements[i].classList.add(cssClass);
    }
    return listOfElements;
  }

  function removeCssClassForElements(listOfElements,cssClass){
    if(typeof listOfElements === 'undefined') return listOfElements;
    if(typeof listOfElements.length === 'undefined'){
      listOfElements.classList.remove(cssClass);
      return listOfElements;
    }
    for (var i = 0; i < listOfElements.length; i++) {
      listOfElements[i].classList.remove(cssClass);
    }
    return listOfElements;
  }

  removeCssClassForElements(contentTabs,"fadeInAnimation");
  setCssClassForElements(contentTabs,"fadeOutAnimation");
  removeCssClassForElements(currentTab,"fadeOutAnimation");
  setCssClassForElements(currentTab,"fadeInAnimation");
  toggleElements[0].classList.add("activeToggle");

  this.setActiveTab=function(tabNumber){
    if((typeof tabNumber === 'number' || typeof tabNumber === 'string') && tabNumber>=0 && tabNumber<contentTabs.length && curentIndex!=tabNumber){
      removeCssClassForElements(currentTab,"fadeInAnimation");
      removeCssClassForElements(contentTabs[tabNumber],"fadeOutAnimation");
      setCssClassForElements(currentTab,"fadeOutAnimation");
      setCssClassForElements(contentTabs[tabNumber],"fadeInAnimation");
      toggleElements[curentIndex].classList.remove("activeToggle");
      toggleElements[tabNumber].classList.add("activeToggle");
      currentTab=contentTabs[tabNumber];
      curentIndex=tabNumber;
    }
  }

  this.showAllTabs=function (){
    for (var i = 0; i < toggleElements.length; i++) {
      toggleElements[i].style.display="";
    }
    return this;
  }

  function isInt(value) {
    return value === parseInt(value, 10)
  }

  this.showTabs=function (tabsList){
    if(typeof tabsList === 'undefined') return this;
    if(isInt(tabsList)){
      //toggleElements[indexToHide].style.visibility="visible";
      toggleElements[tabsList].style.display="";
      return this;
    }
    if(typeof tabsList === 'string') tabsList=tabsList.split(',');
    if(Array.isArray(tabsList)){
      for (var i = 0; i < tabsList.length; i++) {
        var indexToHide=tabsList[i];
        //toggleElements[indexToHide].style.visibility="visible";
        toggleElements[indexToHide].style.display="";
      }
    }
    return this;
  }

  this.hideTabs=function (tabsList){
    if(typeof tabsList === 'undefined') return this;
    if(isInt(tabsList)){
      //toggleElements[indexToHide].style.visibility="hidden";
      toggleElements[indexToHide].style.display="none";
      return this;
    }
    if(typeof tabsList === 'string') tabsList=tabsList.split(',');
    if(Array.isArray(tabsList)){
      for (var i = 0; i < tabsList.length; i++) {
        var indexToHide=tabsList[i];
        //toggleElements[indexToHide].style.visibility="hidden";
        toggleElements[indexToHide].style.display="none";
      }
    }
    return this;
  }
  var _self = this;
  for (var i = 0; i < toggleElements.length; i++) {
    toggleElements[i].setAttribute("data-toggleNumber",i.toString());
    toggleElements[i].addEventListener("click",function(event){
      event.preventDefault();
      //event.stopPropagation();
      var index=this.getAttribute("data-toggleNumber");
      _self.setActiveTab(index);
    });
  }
}


function createFeedBackTabActivator() {
  jQuery(document).ready(function () {
    jQuery(".phone_future--form--tab").click(function (event) {
      event.preventDefault();
      jQuery(document).find(".content-tab").removeClass("fadeInAnimation");
      jQuery(document).find(".content-tab").addClass("fadeOutAnimation");
      var element=jQuery(this);
      var data=element.attr("datatab");
      var dest=jQuery(".content-tab."+data + "-form");
      dest.removeClass("fadeOutAnimation");
      dest.addClass("fadeInAnimation");
    })
  });
}

function MyModality(modalElementId,tabContainer,deactivatorSelector,activateMoveStyle,removeMoveStyle,activateStyle,removeStyle){
  if(typeof modalElementId === 'undefined' ) {
    throw new SyntaxError('No ID');
    return;
  }
  var modalElement=document.getElementById(modalElementId);
  if(typeof modalElement === 'undefined' ) {
    throw new SyntaxError('No Element with this ID');
    return;
  }

  var internalTabSelectorObject=tabContainer;
  var internalTab=typeof tabContainer !== 'undefined' && tabContainer !==null && internalTabSelectorObject instanceof MyTabs;
  var hiddenActivator=null;
  var isShow=false;
  var isModal=false;

  deactivatorSelector = typeof deactivatorSelector !== 'undefined' ? deactivatorSelector : '#feedBackFormClose';
  activateMoveStyle = typeof activateStyle !== 'undefined' ? activateStyle : 'showBlockMoveAnimation';
  removeMoveStyle = typeof removeStyle !== 'undefined' ? removeStyle : 'hideBlockMoveAnimation';
  activateStyle = typeof activateStyle !== 'undefined' ? activateStyle : 'showBlockAnimation';
  removeStyle = typeof removeStyle !== 'undefined' ? removeStyle : 'hideBlockAnimation';

  modalElement.style.display="none";

  var deactivators=modalElement.querySelectorAll(deactivatorSelector);


  var modalElementParent=modalElement.parentNode;
  var modalElementWrapper=document.createElement("div");
  modalElementWrapper.classList.add("modal");
  modalElementWrapper.addEventListener("click",function (event) {
    if(modalElementWrapper !== event.currentTarget && modalElementWrapper===event.target){
      hideModalElementListener(event);
    } else if (modalElementWrapper===event.target) {
      hideModalElementListener(event);
    }
  });


  function showModalElementListener(event,hideActivator,showInModalMode) {
    event.preventDefault();
    //event.stopPropagation();
    if(isShow) return;
    modalElement.style.display="block";



    hideActivator = typeof hideActivator !== 'undefined' ? hideActivator : false;
    showInModalMode = typeof showInModalMode !== 'undefined' ? showInModalMode : false;


    if(hideActivator){
      if(event.currentTarget !== 'undefined'){
        hiddenActivator=event.currentTarget;
        hiddenActivator.classList.remove(activateStyle);
        hiddenActivator.classList.add(removeStyle);
      } else if(event.target !== 'undefined'){
        hiddenActivator=event.target;
        hiddenActivator.classList.remove(activateStyle);
        hiddenActivator.classList.add(removeStyle);
      }
    }

    if(showInModalMode){
      modalElementWrapper.style.display="block";
      modalElementParent.insertBefore(modalElementWrapper,modalElement);
      modalElementWrapper.appendChild(modalElement);
      isModal=true;
    }

    modalElement.classList.remove(removeMoveStyle);
    modalElement.classList.add(activateMoveStyle);
    isShow=true;
  }

  function hideModalElementListener(event) {
    event.preventDefault();
    //event.stopPropagation();
    if(!isShow) return;

    if(typeof hiddenActivator!=='undefined' && hiddenActivator!==null){
      hiddenActivator.classList.remove(removeStyle);
      hiddenActivator.classList.add(activateStyle);
      hiddenActivator=null;
    }

    if(isModal){
      modalElementWrapper.style.display="none";
      modalElementWrapper.removeChild(modalElement);
      modalElementParent.removeChild(modalElementWrapper);
      modalElementParent.appendChild(modalElement);
      isModal=false;
    }

    modalElement.classList.remove(activateMoveStyle);
    modalElement.classList.add(removeMoveStyle);
    isShow=false;
  }

  if(typeof deactivators !== 'undefined' ) {
    if(typeof deactivators.length === 'undefined'){
      deactivators.addEventListener("click",hideModalElementListener);
    } else {
      for (var i = 0; i < deactivators.length; i++) {
        deactivators[i].addEventListener("click",hideModalElementListener);
      }
    }
  }

  var _self=this;



  this.addActivatorById=function(elementId,hideActivator,showInModalMode,activeTab,hiddenTab){
    if(typeof modalElementId === 'undefined' ) return _self;
    activatorElement=document.getElementById(elementId);
    if(typeof activatorElement === 'undefined' ) return _self;
    activeTab = typeof activeTab !== 'undefined' ? activeTab : 0;

    activatorElement.addEventListener("click",function (event) {
      showModalElementListener(event,hideActivator,showInModalMode);
      if(internalTab){
        internalTabSelectorObject.setActiveTab(activeTab);
        internalTabSelectorObject.hideTabs(hiddenTab);
      }
    });
    return _self;
  }

  this.addActivatorBySelector=function(elementSelector,hideActivator,showInModalMode,activeTab,hiddenTab){
    if(typeof modalElementId === 'undefined' ) return _self;
    activatorElements=document.querySelectorAll(elementSelector);
    if(typeof activatorElements === 'undefined' ) return _self;
    activeTab = typeof activeTab !== 'undefined' ? activeTab : 0;

    for (var i = 0; i < activatorElements.length; i++) {
      activatorElements[i].addEventListener("click",function (event) {
        showModalElementListener(event,hideActivator,showInModalMode);
        if(internalTab){
          internalTabSelectorObject.setActiveTab(activeTab);
          internalTabSelectorObject.hideTabs(hiddenTab);
        }
      });
    }
    return _self;
  }

}

function itemChanger(itemSelectElement,changersElement) {
  if(typeof itemSelectElement === 'undefined' ) {
    throw new SyntaxError('No ID');
    return;
  }
  var selector=document.getElementById(itemSelectElement);
  if(typeof selector === 'undefined' ) {
    throw new SyntaxError('No Element with this ID');
    return;
  }
  if(typeof changersElement === 'undefined' ) {
    throw new SyntaxError('No changers selectors');
    return;
  }
  changers=document.querySelectorAll(changersElement);
  for(var i = 0; i < changers.length; i++){
    changers[i].setAttribute('data-toggleSelectorNumber',i.toString());
    changers[i].addEventListener("click",function (event) {
      var index=this.getAttribute('data-toggleSelectorNumber');
      selector.selectedIndex=index;
    });
  }

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
