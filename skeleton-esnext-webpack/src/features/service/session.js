import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {Logger} from './logger';

const constant = {
  appData: 'appData'
};

@inject(Router, Logger)
export class Session {

  constructor(router, logger) {
    this.router = router;
    this.log = logger;

    this.initUserData();

    if (this.userRemembered()) {
      this.restoreData();
    }
  }

  initUserData() {
    this.userName = null;
    this.userClaims = [];
    this.userRoles = [];
    this.userAccessRights = [];

    this.isLoggedIn = false;
    this.isBusy = false;
  }

  setUser(data) {
    if (data) {
      localStorage[constant.appData] = JSON.stringify(data);
      this.restoreData();
    }
  }

  clearUser() {
    localStorage.clear();
    this.initUserData();
  }

  userHasAccessRight(requiredAccessRight) {
    return this.userAccessRights[requiredAccessRight] === true;
  }

  userHasAllAccessRights(requiredAccessRights) {
    return requiredAccessRights.every(accessRight => {
      return this.userHasAccessRight(accessRight);
    });
  }

  userHasRole(requredRole) {
    return this.userRoles[requredRole] === true;
  }

  userHasAtLeastOneRole(requiredRoles) {
    return requiredRoles.some(requiredRole => {
      return this.userHasRole(requiredRole);
    });
  }

  getUserClaim(claimType) {
    return this.userClaims[claimType];
  }

  isUserLoggedIn() {
    return this.isLoggedIn === true;
  }

  userRemembered() {
    let isInLocalStorage = localStorage[constant.appData] !== undefined;
    return isInLocalStorage;
  }

  restoreData() {
    const data = JSON.parse(localStorage[constant.appData]);

    this.userName = data.userName;
    this.userClaims = data.userClaims.reduce(function(hash, userClaim) {
      hash[userClaim.type] = userClaim.value;
      return hash;
    }, {});
    this.userRoles = data.userRoles.reduce((hash, userRole) => {
      hash[userRole] = true;
      return hash;
    }, {});
    this.userAccessRights = data.userAccessRights.reduce((hash, accessRight) => {
      hash[accessRight] = true;
      return hash;
    }, {});

    // todo: delete
    this.userAccessRights['access'] = true;

    this.isLoggedIn = true;
    this.router.navigate('');
  }

  rememberedToken() {
    const token = JSON.parse(localStorage[constant.appData]).token;
    return token;
  }

  getUserName() {
    return this.userName;
  }
}