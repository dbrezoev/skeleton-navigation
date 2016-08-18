import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';
import moment from 'moment';
import {Timespan} from 'features/utils/index';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import '../style.css';
@customElement('timepicker')
@inject(Element)
export class Timepicker {
  @bindable({defaultBindingMode: bindingMode.twoWay}) value = null;
  @bindable options = null;
  @bindable disabled = false;
  @bindable readonly = false;

  constructor(element) {
    this.element = element;
  }

  bind() {
    const defaultOpts = {
      format: 'HH:mm',
      icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down',
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-crosshairs',
        clear: 'fa fa-trash',
        close: 'fa fa-times'
      }
    };

    let div = this.element.firstElementChild;
    let input = div.firstElementChild;
    this.$element = $(div);
    this.options = this.options || {};
    if (this.options.format !== undefined) {
      delete this.options.format;
    }

    let options = $.extend({}, defaultOpts, this.options);
    this.datepicker = this.$element.datetimepicker(options);
    this.datepicker.on('dp.change', (ev) => {
      let elVal = input.value;
      if (elVal === '') {
        this.value = undefined;
      } else {
        let newTimespan = new Timespan(elVal);
        const areSame = newTimespan.equals(this.value);
        if (!areSame) {
          this.value = newTimespan;
        }
      }
    });

    this.valueChanged(this.value);
  }

  valueChanged(newValue, oldValue) {
    if (newValue === null || newValue === undefined || newValue === false) {
      let input = this.element.firstElementChild.firstElementChild;
      input.value = '';
      return;
    }

    if (newValue.constructor.name !== 'Timespan') {
      throw new Error('This has to be Timespan type.');
    }

    const areSame = newValue.equals(oldValue);
    if (areSame) {
      return;
    }

    let timeAsMoment = moment(newValue.toString(), 'HH:mm');
    this.$element.data('DateTimePicker').date(timeAsMoment);
  }
}