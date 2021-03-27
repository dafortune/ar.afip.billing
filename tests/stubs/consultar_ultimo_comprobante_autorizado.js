const nock = require("nock");

module.exports = function () {
  return nock("https://fwshomo.afip.gov.ar:443", { encodedQueryParams: true })
    .post(
      "/wsmtxca/services/MTXCAService",
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://impl.service.wsmtxca.afip.gov.ar/service/"><soap:Body><tns:consultarUltimoComprobanteAutorizadoRequest><authRequest><token>myToken</token><sign>mySignature</sign><cuitRepresentada>66666666666</cuitRepresentada></authRequest><consultaUltimoComprobanteAutorizadoRequest><codigoTipoComprobante>1</codigoTipoComprobante><numeroPuntoVenta>1</numeroPuntoVenta></consultaUltimoComprobanteAutorizadoRequest></tns:consultarUltimoComprobanteAutorizadoRequest></soap:Body></soap:Envelope>'
    )
    .reply(
      200,
      "<?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\"><soapenv:Body><ns1:consultarUltimoComprobanteAutorizadoResponse xmlns:ns1=\"http://impl.service.wsmtxca.afip.gov.ar/service/\"><numeroComprobante>4</numeroComprobante></ns1:consultarUltimoComprobanteAutorizadoResponse></soapenv:Body></soapenv:Envelope>",
      [
        "Date",
        "Wed, 24 Mar 2021 19:05:27 GMT",
        "X-Powered-By",
        "Servlet/3.0; JBossAS-6",
        "Connection",
        "close",
        "Content-Type",
        'application/soap+xml; action="http://impl.service.wsmtxca.afip.gov.ar/service/MTXCAServicePortType/consultarUltimoComprobanteAutorizadoResponse";charset=utf-8',
        "Transfer-Encoding",
        "chunked",
      ]
    );
};
