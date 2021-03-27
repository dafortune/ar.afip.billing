const nock = require("nock");

module.exports = function () {
  return nock("https://fwshomo.afip.gov.ar:443", { encodedQueryParams: true })
    .post(
      "/wsmtxca/services/MTXCAService",
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://impl.service.wsmtxca.afip.gov.ar/service/"><soap:Body><tns:consultarTiposComprobanteRequest><authRequest><token>myToken</token><sign>mySignature</sign><cuitRepresentada>66666666666</cuitRepresentada></authRequest></tns:consultarTiposComprobanteRequest></soap:Body></soap:Envelope>'
    )
    .reply(
      200,
      "<?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\"><soapenv:Body><ns1:consultarTiposComprobanteResponse xmlns:ns1=\"http://impl.service.wsmtxca.afip.gov.ar/service/\"><arrayTiposComprobante><codigoDescripcion><codigo>1</codigo><descripcion>Factura A</descripcion></codigoDescripcion><codigoDescripcion><codigo>2</codigo><descripcion>Nota de Débito A</descripcion></codigoDescripcion><codigoDescripcion><codigo>3</codigo><descripcion>Nota de Crédito A</descripcion></codigoDescripcion><codigoDescripcion><codigo>6</codigo><descripcion>Factura B</descripcion></codigoDescripcion><codigoDescripcion><codigo>7</codigo><descripcion>Nota de Débito B</descripcion></codigoDescripcion><codigoDescripcion><codigo>8</codigo><descripcion>Nota de Crédito B</descripcion></codigoDescripcion><codigoDescripcion><codigo>51</codigo><descripcion>Factura M. No habilitado para CAEA</descripcion></codigoDescripcion><codigoDescripcion><codigo>52</codigo><descripcion>Nota de Débito M. No habilitado para CAEA</descripcion></codigoDescripcion><codigoDescripcion><codigo>53</codigo><descripcion>Nota de Crédito M. No habilitado para CAEA</descripcion></codigoDescripcion><codigoDescripcion><codigo>88</codigo><descripcion>Remito Electrónico de Tabaco Acondicionado (sólo para comprobantes asociados)</descripcion></codigoDescripcion><codigoDescripcion><codigo>991</codigo><descripcion>Remito Electrónico de Tabaco en Hebras (sólo para comprobantes asociados)</descripcion></codigoDescripcion><codigoDescripcion><codigo>201</codigo><descripcion>Factura de Crédito Electrónica MiPyMEs (FCE) A</descripcion></codigoDescripcion><codigoDescripcion><codigo>202</codigo><descripcion>Nota de Débito Electrónica MiPyMEs (FCE) A</descripcion></codigoDescripcion><codigoDescripcion><codigo>203</codigo><descripcion>Nota de Crédito Electrónica MiPyMEs (FCE) A</descripcion></codigoDescripcion><codigoDescripcion><codigo>206</codigo><descripcion>Factura de Crédito Electrónica MiPyMEs (FCE) B</descripcion></codigoDescripcion><codigoDescripcion><codigo>207</codigo><descripcion>Nota de Débito Electrónica MiPyMEs (FCE) B</descripcion></codigoDescripcion><codigoDescripcion><codigo>208</codigo><descripcion>Nota de Crédito Electrónica MiPyMEs (FCE) B</descripcion></codigoDescripcion><codigoDescripcion><codigo>91</codigo><descripcion>Remito (sólo para comprobantes asociados)</descripcion></codigoDescripcion><codigoDescripcion><codigo>995</codigo><descripcion>Remito Electrónico de Carne (sólo para comprobantes asociados)</descripcion></codigoDescripcion></arrayTiposComprobante></ns1:consultarTiposComprobanteResponse></soapenv:Body></soapenv:Envelope>",
      [
        "Date",
        "Wed, 24 Mar 2021 19:05:25 GMT",
        "X-Powered-By",
        "Servlet/3.0; JBossAS-6",
        "Connection",
        "close",
        "Content-Type",
        'application/soap+xml; action="http://impl.service.wsmtxca.afip.gov.ar/service/MTXCAServicePortType/consultarTiposComprobanteResponse";charset=utf-8',
        "Transfer-Encoding",
        "chunked",
      ]
    );
};
