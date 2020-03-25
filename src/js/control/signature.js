import control from '../control';

/**
 * Button class
 * Output a <button>Label</button> form element
 */
export default class controlButton extends control {

  /**
   * build a text DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    let {type, ...attrs} = this.config;

    return this.markup(type, utils.parsedHtml(this.label), attrs);
  }
}

// register the following controls
control.register('signature', controlButton);
control.register(['canvas'], controlButton, 'signature');
