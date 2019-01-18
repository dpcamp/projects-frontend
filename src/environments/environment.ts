// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  usersUrl: 'http://192.168.235.96:3000/api/users',
  jobsUrl: 'http://192.168.235.96:3000/api/jobs',
  invsUrl: 'http://192.168.235.96:3000/api/invoices',
  reqsUrl: 'http://192.168.235.96:3000/api/requisitions',
  authUrl: 'http://GRF-MISDEV:8888/',
  ADUrl: 'http://GRF-MISDEV:3000/api/users',
  VERSION: require('../../package.json').version
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
