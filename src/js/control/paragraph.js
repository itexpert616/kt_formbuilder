import control from '../control';
import utils from '../utils';
/**
 * Text input class
 * Output a <input type="text" ... /> form element
 */
export default class controlParagraph extends control {

  /**
   * configure the tinymce editor requirements
   */
  configure() {
    // this.js = ['//cdn.tinymce.com/4/tinymce.min.js'];

    // additional javascript config
    if (this.classConfig.js) {
      let js = this.classConfig.js;
      if (!Array.isArray(js)) {
        js = new Array(js);
      }
      this.js.concat(js);
      delete this.classConfig.js;
    }

    // additional css config
    if (this.classConfig.css) {
      this.css = this.classConfig.css;
    }

    // configure the tinyMCE editor defaults
    this.editorOptions = {
      // height: 250,
      paste_data_images: true,
      setup: function(editor) {
        editor.on('change', function(e) {
          editor.save();
          let value = editor.getContent();
          let label = utils.closest(editor.targetElm, '.form-field').querySelector('.field-label');
          label.innerHTML = utils.parsedHtml(value);
        });
      },
      plugins: [
        'advlist autolink lists link anchor',
        'searchreplace visualblocks code',
        'insertdatetime table contextmenu paste code'
      ],
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | table',
      removed_menuitems: 'newdocument'
    };
  }

  /**
   * build a paragraph DOM element
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    let {type, ...attrs} = this.config;

    // some types use an element of a different name
    let typeMap = {
      'paragraph': 'p',
      'header': this.subtype
    };
    if (typeMap[type]) {
      type = typeMap[type];
    }
    this.field = this.markup(type, utils.parsedHtml(this.label), attrs);
    return {
      field: this.field,
      layout: 'noLabel'
    };
  }

  /**
   * When the element is rendered into the DOM, execute the following code to initialise it
   * @param {Object} evt - event
   */
  onRender(evt) {
    const textarea = $(this.field).closest('.paragraph-field').find('textarea')[0];
    if (textarea) {
      if (window.tinymce.editors[textarea.id]) {
        window.tinymce.editors[textarea.id].remove();
      }

      // define options & allow them to be overwritten in the class config
      let options = $.extend(this.editorOptions, this.classConfig);
      options.target = textarea;

      // initialise the editor
      window.tinymce.init(options);
    }
  }
}

// register the following controls
control.register(['paragraph', 'header'], controlParagraph);
control.register(['p'], controlParagraph, 'paragraph');
control.register(['large', 'medium', 'small'], controlParagraph, 'header');
