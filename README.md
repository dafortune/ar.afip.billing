# ar.afip.billing
Client for `wsmtxca` AFIP web service. AFIP is the Argentinian tax agency,
[`wsmtxca`](http://www.afip.gob.ar/facturadecreditoelectronica/documentos/Web-Service-MTXCA-v013.pdf) is a [web service](https://www.afip.gob.ar/ws/documentacion/ws-factura-electronica.asp) meant for electronic billing with items detail apart from some other operation. This is a non-official Node.js client for such service which only implements the electronic billing methods for the service.

This client is inspired by [Afip.js](https://github.com/AfipSDK/afip.js) but meant for `wsmtxca` and reducing the dependency with the file system (for example key and cert for authorization are not read from FS, but you provide them as strings).

This is NOT an official client. Use at your own risk.

## Installation
```
npm i @fortune/ar.afip.billing
```

## Usage

### Obtaining the required keys
In order to use this library you must first get the private key and certificate required to use the web services of AFIP. I will describe the process high level here, referencing to the official documents for further information. It is important to know that you must be registered with the Argentinian tax agency (AFIP) and have a CUIL/CUIT in order to be able to perform the process.

Follow the instructions in "[certificados](https://www.afip.gob.ar/ws/documentacion/certificados.asp)" to get them (sorry these instructions are official and are only available in Spanish up to my knowledge). I advice to start [obtaining a certificate for the "testing" environment](http://www.afip.gob.ar/ws/WSASS/WSASS_manual.pdf) first, as it is self-service and would allow you to get them without risk; the instructions for production are in the same document.

Once you have got the certificate, put them in the file system (in a folder separated from this source code, think these are secrets and you don't want to commit them by accident). 

As next step, you have to authorize using `wsmtxca` with your certificate (for testing env it is explained in [the same document](http://www.afip.gob.ar/ws/WSASS/WSASS_manual.pdf)). Once you this is ready you can move forward with the rest of instructions.

### About the Autorization Cache
AFIP Authorization service (`WSASS`) usually issues a token that last 24 hours, and, once the token has been issued it refuses to generate other in several hours, because of this we need some way to store the authorization token to reuse it in future.

The Auth token must be stored as a secret, in a safe storage and encrypted; but this library is not opinionated in terms of what strategy you use to store the token. You can use the Auth module to create the auth information (token and signature) and to validate its validity (that it is not expired). Once generated you must store the token the way you feel convenient and you can also validate it before usage by usign the Auth service, if the token is not valid (e.g. it is expired) you can use the Auth service to request another one.

We provide [UnsafeNonProductiveFileSystemTokenCacheExample](./unsafe_non_productive_file_system_token_cache_example.js) as as reference non-productive implementation. That implementation is not suitable for production (it is not secure and don't allow you to scale horizontally), use only for testing purposes and as a reference; something as Redis or a Database (plus encryption before saving) are potential (not provided) suitable implementations.

### Examples

```js
const fs = require("fs");

const afip = require("@fortune/ar.afip.billing");
const UnsafeNonProductiveFileSystemTokenCacheExample = require('@fortune/ar.afip.billing/unsafe_non_productive_file_system_token_cache_example');

(async () => {
  const authCache = new UnsafeNonProductiveFileSystemTokenCacheExample(); // DO NOT USE THIS IMPLEMENTATION IN PRODUCTION

  const env = 'test';
  const metaService = new afip.MetaService(env);

  const afipAuth = new afip.Auth({
      metaService,
      cert: fs
          .readFileSync("/path/to/cert")
          .toString("utf8"),
      key: fs
          .readFileSync("/path/to/private_key")
          .toString("utf8"),
  });

  let auth;
  const cuit = // ... CUIT

  const cacheKey = `wsmtxca-${cuit}-${env}`;

  if (await authCache.has(cacheKey)) {
      const ta = await authCache.get(cacheKey);
      
      auth = afip.Auth.getServiceTAFromAuthData({
          sign: ta.sign,
          token: ta.token,
          expirationTime: new Date(ta.expirationTime)
      });
  }

  if (!auth) {
      auth = await afipAuth.createAuthData('wsmtxca');
      await authCache.save(cacheKey, auth);
  }

  const eb = new afip.Billing({
      cuit: cuit,
      auth,
      metaService,
  });

  console.log(await eb.getAlicuotasIVA());
  console.log(await eb.getPuntosDeVenta());
  console.log(await eb.getMonedas());
  console.log(await eb.getCotizacionMoneda((await eb.getMonedas())[1].codigo));
  console.log(await eb.getCondicionesIVA());
  console.log(await eb.getTiposComprobante());
  console.log(await eb.getTiposDocumento());
  console.log(await eb.getTiposTributo());
  console.log(await eb.getUnidadesMedida());
  console.log(await eb.getTiposDatosAdicionales());
  console.log(await eb.getPuntosDeVentaCAE());
  console.log(await eb.getUltimoComprobanteAutorizado({
      codigoTipoComprobante: 1,
      numeroPuntoVenta: 1,
  }));
  console.log(await eb.getComprobante({
      codigoTipoComprobante: 1,
      numeroPuntoVenta: 1,
      numeroComprobante: 1,
  }));
  console.log(await eb.autorizarComprobante({
    codigoTipoComprobante: 1,
    numeroPuntoVenta: 1,
    numeroComprobante: 6,
    fechaEmision: new Date(),
    codigoTipoDocumento: 80, // DNI
    numeroDocumento: 30710316097,
    importeSubtotal: 1,
    importeTotal: 1.21,
    subtotalesIVA: [
      {
        codigo: 5,
        importe: 0.21,
      },
    ],
    codigoMoneda: "PES",
    cotizacionMoneda: 1,
    codigoConcepto: 2,
    items: [
      {
        unidadesMtx: 1,
        codigoMtx: "0111111111117",
        descripcion: "Test",
        cantidad: 1,
        codigoUnidadMedida: 98,
        precioUnitario: 1,
        codigoCondicionIVA: 5,
        importeItem: 1.21,
        importeIVA: 0.21,
      },
    ],
    importeGravado: 1,
    fechaServicioDesde: new Date(),
    fechaServicioHasta: new Date(),
    fechaVencimientoPago: new Date(),
  }));
})().catch(err => console.error('error', err));
```
