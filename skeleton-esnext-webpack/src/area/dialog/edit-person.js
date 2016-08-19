import {DialogController} from 'features/dialog/index';

export class EditPerson {
  static inject = [DialogController];
  person = {firstName: ''};

  constructor(controller) {
    this.controller = controller;

    controller.settings.lock = true;
  }

  activate(person) {
    this.person = person;
  }
}