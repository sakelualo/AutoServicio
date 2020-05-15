// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST: 'https://desabus.edomex.gob.mx/bussrv/sei',
  TOKEN_AUTH_USERNAME: 'seiusr',
  TOKEN_AUTH_PASSWORD: 'aguacate',
  BASEENPOINT_AUTOSERVICIO: 'http://localhost:8090/api/autoservicio',
  BASEENPOINT_ENCRIPTDECRIPT: 'http://localhost:8090/api/encriptdecript',
  BASEENPOINT_SOLICITUD_CONSTANCIA: 'http://localhost:8090/api/autoservicio/solicitudConstancia',
  BASEENPOINT_ETIQUETAS: 'http://localhost:8090/api/etiquetasparametros/etiquetaspagina',
  BASEENPOINT_NOTIFICACIONES: 'http://localhost:8090/api/notificaciones/searchByCveServPubCtTiposNotificaciones',
  BASEENPOINT_CANCELAR_NOTIFICACIONES: 'http://localhost:8090/api/notificaciones/updateDtNotificacionesByLlnotifi',
  BASEENPOINT_DATOS_PERSONALES: 'http://localhost:8085/datosPersonales',
  BASEENPOINT_BITACORA: 'http://localhost:8090/api/autoservicio/bitacora',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
