import control from '../control';
import utils from '../utils';

/**
 * Button class
 * Output a <button>Label</button> form element
 */
export default class controlSignature extends control {

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
control.register(['signature'], controlSignature);
control.register(['canvas'], controlSignature, 'signature');
