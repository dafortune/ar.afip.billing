const nock = require("nock");

module.exports = function () {
  return nock("https://fwshomo.afip.gov.ar:443", { encodedQueryParams: true })
    .post(
      "/wsmtxca/services/MTXCAService",
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://impl.service.wsmtxca.afip.gov.ar/service/"><soap:Body><tns:consultarTiposTributoRequest><authRequest><token>myToken</token><sign>mySignature</sign><cuitRepresentada>66666666666</cuitRepresentada></authRequest></tns:consultarTiposTributoRequest></soap:Body></soap:Envelope>'
    )
    .reply(
      200,
      "<?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\"><soapenv:Body><ns1:consultarTiposTributoResponse xmlns:ns1=\"http://impl.service.wsmtxca.afip.gov.ar/service/\"><arrayTiposTributo><codigoDescripcion><codigo>1</codigo><descripcion>Impuestos Nacionales</descripcion></codigoDescripcion><codigoDescripcion><codigo>2</codigo><descripcion>Impuestos Provinciales</descripcion></codigoDescripcion><codigoDescripcion><codigo>3</codigo><descripcion>Impuestos Municipales</descripcion></codigoDescripcion><codigoDescripcion><codigo>4</codigo><descripcion>Impuestos Internos</descripcion></codigoDescripcion><codigoDescripcion><codigo>5</codigo><descripcion>IIBB</descripcion></codigoDescripcion><codigoDescripcion><codigo>6</codigo><descripcion>Percepción de IVA</descripcion></codigoDescripcion><codigoDescripcion><codigo>7</codigo><descripcion>Percepción de IIBB</descripcion></codigoDescripcion><codigoDescripcion><codigo>8</codigo><descripcion>Percepción por Impuestos Municipales</descripcion></codigoDescripcion><codigoDescripcion><codigo>9</codigo><descripcion>Otras Percepciones</descripcion></codigoDescripcion><codigoDescripcion><codigo>13</codigo><descripcion>Percepción de IVA a No Categorizado</descripcion></codigoDescripcion><codigoDescripcion><codigo>99</codigo><descripcion>Otros</descripcion></codigoDescripcion></arrayTiposTributo></ns1:consultarTiposTributoResponse></soapenv:Body></soapenv:Envelope>",
      [
        "Date",
        "Wed, 24 Mar 2021 19:05:26 GMT",
        "X-Powered-By",
        "Servlet/3.0; JBossAS-6",
        "Connection",
        "close",
        "Content-Type",
        'application/soap+xml; action="http://impl.service.wsmtxca.afip.gov.ar/service/MTXCAServicePortType/consultarTiposTributoResponse";charset=utf-8',
        "Transfer-Encoding",
        "chunked",
      ]
    );
};
