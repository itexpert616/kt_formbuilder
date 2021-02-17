import control from '../control';
import utils from '../utils';

/**
 * Text input class
 * Output a <input type="text" ... /> form element
 */
export default class controlSelect extends control {

  /**
   * definition
   * @return {[type]} [description]
   */
  static get definition() {
    return {
      inactive: ['checkbox'],
      mi18n: {
        minSelectionRequired: 'minSelectionRequired'
      }
    };
  }

  /**
   * build a text DOM element, supporting other jquery text form-control's
   * @return {Object} DOM Element to be injected into the form.
   */
  build() {
    let options = [];
    let {values, value, placeholder, type, inline, other, otherLabel, otherName, otherPlaceholder, otherValue, secOth, secOthLabel, secOthName, secOthPlaceholder, secOthValue, toggle, ...data} = this.config;
    let optionType = type.replace('-group', '');
    let isSelect = type === 'select';
    if (data.multiple || type === 'checkbox-group') {
      data.name = data.name + '[]';
    }

    if (type === 'checkbox-group' && data.required) {
      this.onRender = this.groupRequired;
    }

    delete data.title;

    if (values) {
      // if a placeholder is specified, add it to the top of the option list
      if (placeholder && isSelect) {
        options.push(this.markup('option', placeholder, {
          disabled: null,
          selected: null
        }));
      }

      // process the rest of the options
      for (let i = 0; i < values.length; i++) {
        let option = values[i];
        if (typeof option === 'string') {
          option = {'label': option, 'value': option};
        }
        let {label = '', ...optionAttrs} = option;
        optionAttrs.id = `${data.id}-${i}`;

        // don't select this option if a placeholder is defined
        if (!optionAttrs.selected || placeholder || typeof value !== 'undefined') {
          delete optionAttrs.selected;
          delete option.selected;
        }

        // if a value is defined at select level, select this attribute
        if (typeof value !== 'undefined' && optionAttrs.value === value) {
          optionAttrs.selected = true;
          option.selected = true;
        }

        if (isSelect) {
          let o = this.markup('option', document.createTextNode(label), optionAttrs);
          options.push(o);
        } else {
          let wrapperClass = optionType;
          if (inline) {
            wrapperClass += '-inline';
          }
          optionAttrs.type = optionType;
          if (optionAttrs.selected) {
            optionAttrs.checked = 'checked';
            delete optionAttrs.selected;
          }
          let input = this.markup('input', null, Object.assign({}, data, optionAttrs));
          let labelAttrs = {for: optionAttrs.id};
          let labelContent = [input, label];
          if (toggle) {
            let kcToggle = this.markup('span');
            labelContent = [input, kcToggle, label];
            labelAttrs.className = 'kc-toggle';
          }

          let inputLabel = this.markup('label', labelContent, labelAttrs);
          let wrapper = this.markup('div', inputLabel, {className: wrapperClass});
          options.push(wrapper);
        }
      }

      // if configured to display an 'other' option, prepare the elements
      if (other) {
        if (!isSelect) {
        //   let label = 'Other';
        //   let otherOptionAttrs = {
        //     id: `${data.id}-other`,
        //     value: 'Other'
        //   };
        //   let o = this.markup('option', document.createTextNode(label), otherOptionAttrs);
        //   options.push(o);
        // } else {
          let otherOptionAttrs = {
            id: `${data.id}-other`,
            className: `${data.className} other-option`,
            value: '',
            events: {
              click: () => this.otherOptionCB(otherOptionAttrs.id)
            }
          };
          // let label = mi18n.current.other;
          let wrapperClass = optionType;
          if (inline) {
            wrapperClass += '-inline';
          }

          let optionAttrs = Object.assign({}, data, otherOptionAttrs);
          optionAttrs.type = optionType;

          let otherValAttrs = {
            type: 'text',
            events: {
              input: evt => {
                const otherInput = evt.target;
                const other = otherInput.previousElementSibling;
                other.value = otherInput.value;
              }
            },
            id: `${otherOptionAttrs.id}-value`,
            className: 'other-val'
          };
          let otherInputs = [
            this.markup('input', null, optionAttrs),
            document.createTextNode('Other'),
            this.markup('input', null, otherValAttrs)
          ];
          let inputLabel = this.markup('label', otherInputs, {for: optionAttrs.id});
          let wrapper = this.markup('div', inputLabel, {className: wrapperClass});
          options.push(wrapper);
        }
      }
    }

    // build & return the DOM elements
    if (other || secOth) {
      if (type == 'select') {
        const lastOptionId = `${data.id}-${values.length-1}`;
        const lastOptionSelected = values[values.length-1].selected;

        const select = this.markup(optionType, options, {
          ...data,
          events: {
            change: e => this.selectedOptionChanged(e, lastOptionId)
          }
        });

        const elements = [select];
        if (other) {
          const otherReqiredSpan = this.markup('span', '*', {className: 'fb-required fb-select-other-required-span'});
          const otherInputLabel = this.markup('label', [otherLabel, otherReqiredSpan], {className: 'fb-select-other-label field-label'});
          const otherInputType = lastOptionSelected ? 'text' : 'hidden';
          const otherInputAttr = {type: otherInputType, id: `${lastOptionId}-other-input`, className: 'form-control select-other-value', value: otherValue, name: otherName, placeholder: otherPlaceholder};
          const otherInput = this.markup('input', null, utils.trimObj(otherInputAttr));
          const otherWrapperClass = ['fb-select-other-wrapper'];
          if (!lastOptionSelected) {
            otherWrapperClass.push('select-other-val');
          }
          const otherWrapper = this.markup('div', [otherInputLabel, otherInput], {id: `${lastOptionId}-other-wrapper`, className: otherWrapperClass.join(' ')});
          elements.push(otherWrapper);
        }
        if (secOth) {
          const secOthReqiredSpan = this.markup('span', '*', {className: 'fb-required fb-select-secOth-required-span'});
          const secOthInputLabel = this.markup('label', [secOthLabel, secOthReqiredSpan], {className: 'fb-select-secOth-label field-label'});
          const secOthInputType = lastOptionSelected ? 'text' : 'hidden';
          const secOthInputAttr = {type: secOthInputType, id: `${lastOptionId}-secOth-input`, className: 'form-control select-secOth-value', value: secOthValue, name: secOthName, placeholder: secOthPlaceholder};
          const secOthInput = this.markup('input', null, utils.trimObj(secOthInputAttr));
          const secOthWrapperClass = ['fb-select-secOth-wrapper'];
          if (!lastOptionSelected) {
            secOthWrapperClass.push('select-secOth-val');
          }
          const secOthWrapper = this.markup('div', [secOthInputLabel, secOthInput], {id: `${lastOptionId}-secOth-wrapper`, className: secOthWrapperClass.join(' ')});
          elements.push(secOthWrapper);
        }

        return this.markup('div', elements, {className: data.className + '-wrapper'});
      }
    }

    if (type == 'select') {
      return this.markup(optionType, options, data);
    } else {
      return this.markup('div', options, {className: type});
    }
  }

  /**
   * setCustomValidity for checkbox-group
   */
  groupRequired() {
    const checkboxes = this.element.getElementsByTagName('input');
    const setValidity = (checkbox, isValid) => {
      let minReq = control.mi18n('minSelectionRequired', 1);
      if (!isValid) {
        checkbox.setCustomValidity(minReq);
      } else {
        checkbox.setCustomValidity('');
      }
    };
    const toggleRequired = (checkboxes, isValid) => {
      [].forEach.call(checkboxes, cb => {
        if (isValid) {
          cb.removeAttribute('required');
        } else {
          cb.setAttribute('required', 'required');
        }
        setValidity(cb, isValid);
      });
    };

    const toggleValid = () => {
      let isValid = [].some.call(checkboxes, cb => cb.checked);
      toggleRequired(checkboxes, isValid);
    };

    for (let i = checkboxes.length - 1; i >= 0; i--) {
      checkboxes[i].addEventListener('change', toggleValid);
    }
    toggleValid();
  }

  /**
   * Callback for 'other' option.
   * Toggles the hidden text area for "other" option.
   * @param  {String} otherId id of the "other" option input
   */
  otherOptionCB(otherId) {
    const otherInput = document.getElementById(otherId);
    const otherInputValue = document.getElementById(`${otherId}-value`);

    if (otherInput.checked) {
      otherInputValue.style.display = 'inline-block';
    } else {
      otherInputValue.style.display = 'none';
    }
  }

  /**
   * Callback for select 'other' option.
   * Toggles the hidden text area for "other" option.
   * @param  {Object} e event
   * @param  {String} lastOptionId id of the "other" option
   */
  selectedOptionChanged(e, lastOptionId) {
    const curId = $(e.target).find(':selected').attr('id');

    if (lastOptionId !== null) {
      const otherInput = document.getElementById(`${lastOptionId}-other-input`);
      const otherInputWrapper = document.getElementById(`${lastOptionId}-other-wrapper`);
      if (otherInput && otherInputWrapper) {
        if (curId == lastOptionId) {
          otherInput.type = 'text';
          otherInputWrapper.style.display = 'block';
        } else {
          otherInput.type = 'hidden';
          otherInputWrapper.style.display = 'none';
        }
      }

      const secOthInput = document.getElementById(`${lastOptionId}-secOth-input`);
      const secOthInputWrapper = document.getElementById(`${lastOptionId}-secOth-wrapper`);
      if (secOthInput) {
        if (curId == lastOptionId) {
          secOthInput.type = 'text';
          secOthInputWrapper.style.display = 'block';
        } else {
          secOthInput.type = 'hidden';
          secOthInputWrapper.style.display = 'none';
        }
      }
    }
  }
}

// register this control for the following types & text subtypes
control.register(['select', 'checkbox-group', 'radio-group', 'checkbox'], controlSelect);
