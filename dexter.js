
// Editor class.
var Dexter = function() {
  this.buttons = ['bold', 'underline', 'italic'];
  this.iframe = document.getElementById('textField');
  this.editor = this.iframe.contentWindow.document || this.iframe.contentDocument;
  this.editor.designMode = 'on';
  this.setStyles();
};


// Set styles.
Dexter.prototype.setStyles = function() {
  var css = document.createElement('link');
  css.href = 'editor.css';
  css.rel = 'stylesheet';
  css.type = 'text/css';
  this.editor.body.appendChild(css);
};

// Button handlers.
Dexter.prototype.handleBold = function(btn) {
  console.log('clicked bold');
  this.editor.execCommand('bold', false, null);
  this.setButtonState(btn);
  this.iframe.focus();
};

Dexter.prototype.handleUnderline = function(btn) {
  console.log('clicked underline');
  this.editor.execCommand('underline', false, null);
  this.setButtonState(btn);
  this.iframe.focus();
};

Dexter.prototype.handleItalic = function(btn) {
  console.log('clicked italic');
  this.editor.execCommand('italic', false, null);
  this.setButtonState(btn);
  this.iframe.focus();
};

Dexter.prototype.handleLinkBtn = function(btn) {
  var popover = document.getElementById('linkPopover');
  if (popover.style.display === '') {
    popover.style.top = this.iframe.getBoundingClientRect().top + 'px';
    popover.style.left = btn.getBoundingClientRect().left + 'px';
    popover.style.display = 'block';
  } else {
    popover.style.display = '';
  }
};

// TODO: Doesnt work with firefox.
Dexter.prototype.handleLinkSubmit = function(btn) {
  document.getElementById('linkPopover').style.display = '';
  var href = document.getElementById('linkHref').value;
  this.editor.execCommand('createLink', false, href);
};

Dexter.prototype.handleUnlink = function(btn) {
  this.editor.execCommand('unlink', false, null);
};

// Sets button to active or inactive.
Dexter.prototype.setButtonState = function(btn) {
  if (this.editor.queryCommandState(btn.id) &&
      btn.className.indexOf(' active') < 0) {
    // Set to active.
    console.log('Setting state of ' + btn.id + ' to active');
    btn.className = btn.className + ' active';
  } else if (!this.editor.queryCommandState(btn.id)){
    // Remove active.
    console.log('Settings state of ' + btn.id + ' to inactive');
    btn.className = btn.className.replace(/\s+active/g, '');
  } else {
    // Change nothing.
    return;
  }
};

// Update all button states.
Dexter.prototype.updateButtonStates = function() {
  // We need to copy this for the Editor object.
  var $this = this;
  this.buttons.forEach(function(btn) {
    $this.setButtonState(document.getElementById(btn));
    console.log(document.getElementById(btn));
  });
};

// Init.
window.onload = function() {
  // Editor.
  var dexter = new Dexter();
  
  // Button event handlers.
  // We pass target to handlers.
  document.getElementById('bold').onclick = function(e) {
    dexter.handleBold(e.target);
  };

  document.getElementById('underline').onclick = function(e) {
    dexter.handleUnderline(e.target);
  };

  document.getElementById('italic').onclick = function(e) {
    dexter.handleItalic(e.target);
  };

  document.getElementById('link').onclick = function(e) {
    dexter.handleLinkBtn(e.target);
  };

  document.getElementById('linkSubmit').onclick = function(e) {
    e.preventDefault();
    dexter.handleLinkSubmit(e.target);
  };

  document.getElementById('unlink').onclick = function(e) {
    dexter.handleUnlink(e.target);
  };
  
  // Textfield event handlers.
  // Currently updates on mouseclick and arrow keys.
  dexter.editor.onmouseup = function() {
    dexter.updateButtonStates();
  };
  dexter.editor.onkeydown = function(e) {
    if (e.keyCode < 37 || e.keyCode > 40) {
      return;
    }
    dexter.updateButtonStates();
  };

  // Submit event handler.
  document.getElementById('editorSubmit').onclick = function(e) {
    e.preventDefault();
    console.log('Output: ' + dexter.editor.body.innerHTML.replace(/<link.+>/, ''));
  };
};
