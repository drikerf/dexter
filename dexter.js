
// Editor class.
var Dexter = function() {
  this.buttons = ['bold', 'underline', 'italic'];
  this.iframe = document.getElementById('textField');
  this.editor = this.iframe.contentWindow.document || this.iframe.contentDocument;
  this.editor.designMode = 'on';
};

// Button handlers.
Dexter.prototype.handleBold = function(e) {
  console.log('clicked bold');
  this.editor.execCommand('bold', false, null);
  this.setButtonState(e);
  this.iframe.focus();
};

Dexter.prototype.handleUnderline = function(e) {
  console.log('clicked underline');
  this.editor.execCommand('underline', false, null);
  this.setButtonState(e);
  this.iframe.focus();
};

Dexter.prototype.handleItalic = function(e) {
  console.log('clicked italic');
  this.editor.execCommand('italic', false, null);
  this.setButtonState(e);
  this.iframe.focus();
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
  $this = this;
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
  document.getElementById('bold').onclick = function(e) {
    dexter.handleBold(e.target);
  };

  document.getElementById('underline').onclick = function(e) {
    dexter.handleUnderline(e.target);
  };

  document.getElementById('italic').onclick = function(e) {
    dexter.handleItalic(e.target);
  };
  
  // Textfield event handlers.
  dexter.editor.onmouseup = function() {
    dexter.updateButtonStates();
  };

  // Submit event handler.
  document.getElementById('editorSubmit').onclick = function(e) {
    e.preventDefault();
    console.log('Output: ' + dexter.editor.body.innerHTML);
  };
};
