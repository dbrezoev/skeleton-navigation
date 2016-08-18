import {BaseColumn} from './base-column';

// todo: implement
export class SelectColumn extends BaseColumn {
  constructor(config, template, grid, columnId) {
    super(config, template, grid, columnId);

    this.filterValue = config['filter-value'];
    if (this.filterValue === undefined) {
      const viewModelPropertyName = config['filter-value.bind'];
      if (viewModelPropertyName !== undefined) {
        this.filterValue = this.subscribe(viewModelPropertyName, 'filterValue');
      } else {
        this.filterValue = undefined;
      }
    }

    const viewModelItemsPropertyName = config['filter-items.bind'];
    if (viewModelItemsPropertyName === undefined) {
      throw new Error('Argument Exception! ViewModel has to define "filter-items.bind" value!');
    }

    this.items = this.subscribe(viewModelItemsPropertyName, 'items');
  }

  hasFilterValue() {
    return this.filterValue !== undefined;
  }

  matchFilter(filteredValue) {
    if (filteredValue === undefined) {
      throw new Error('Filtered value can\'t be undefined!');
    }

    if (this.hasFilterValue()) {
      return this.filterValue === filteredValue;
    }

    // no filter value -> match everything
    return true;
  }

  getFilterValue() {
    if (this.hasFilterValue()) {
      let result = [{
        name: this.field,
        value: this.filterValue
      }];
    }
  }

  compare(first, second) {
    let result;
    if (first > second) {
      result = 1;
    } else if (first < second) {
      result = -1;
    } else {
      result = 0;
    }

    if (this.isSortDirectionDesc()) {
      result *= -1;
    }

    return result;
  }
}
