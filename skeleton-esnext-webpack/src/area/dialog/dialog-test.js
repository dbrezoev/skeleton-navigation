import {EditPerson} from './edit-person';
import {DialogService} from 'features/dialog/index';
import {Logger} from 'features/service/index';
import {inject} from 'aurelia-framework';

@inject(Logger, DialogService)
export class DialogTest {
  constructor(logger, dialogService) {
    this.dialogService = dialogService;
    this.logger = logger;

    this.firstName = 'Wade';
    this.lastName = 'Watts';
  }

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  openDialog() {
    debugger;
    let person = {
      firstName: this.firstName,
      lastName: this.lastName
    };
    this.dialogService.openDialog({viewModel: EditPerson, model: person}).then(response => {
      if (!response.wasCancelled) {
        console.log('good - ', response.output);
        this.firstName = response.output.firstName;
        this.lastName = response.output.lastName;
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

  openModalDialog() {
    debugger
    let person = {
      firstName: this.firstName,
      lastName: this.lastName
    };
    this.dialogService.openModalDialog({viewModel: EditPerson, model: person}).then(response => {
      if (!response.wasCancelled) {
        console.log('good - ', response.output);
        this.firstName = response.output.firstName;
        this.lastName = response.output.lastName;
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }

  openConfirmDialog() {
    debugger
    this.dialogService.openConfirmDialog({msg: 'Сигурни ли сте?'}).then(response => {
      console.log(response);
    });
  }

  canDeactivate() {
    if (this.dialogService.hasOpenDialogs()) {
      this.logger.error('Моля, затворете всички диалози преди да отворите нова страница.');
      return false;
    }

    return true;
  }

  hello(tab) {
  }
}