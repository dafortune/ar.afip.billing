const nock = require("nock");

module.exports = function () {
  return nock("https://fwshomo.afip.gov.ar:443", { encodedQueryParams: true })
    .post(
      "/wsmtxca/services/MTXCAService",
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://impl.service.wsmtxca.afip.gov.ar/service/"><soap:Body><tns:autorizarComprobanteRequest><authRequest><token>myToken</token><sign>mySignature</sign><cuitRepresentada>66666666666</cuitRepresentada></authRequest><comprobanteCAERequest><codigoTipoComprobante>1</codigoTipoComprobante><numeroPuntoVenta>1</numeroPuntoVenta><numeroComprobante>5</numeroComprobante><fechaEmision>2021-03-24</fechaEmision><codigoTipoDocumento>80</codigoTipoDocumento><numeroDocumento>20135099202</numeroDocumento><importeGravado>1</importeGravado><importeSubtotal>1</importeSubtotal><importeTotal>1.21</importeTotal><codigoMoneda>PES</codigoMoneda><cotizacionMoneda>1</cotizacionMoneda><codigoConcepto>2</codigoConcepto><fechaServicioDesde>2021-03-24</fechaServicioDesde><fechaServicioHasta>2021-03-24</fechaServicioHasta><fechaVencimientoPago>2021-03-24</fechaVencimientoPago><arrayItems><item><unidadesMtx>1</unidadesMtx><codigoMtx>0111111111117</codigoMtx><descripcion>Test</descripcion><cantidad>1</cantidad><codigoUnidadMedida>98</codigoUnidadMedida><precioUnitario>1</precioUnitario><codigoCondicionIVA>5</codigoCondicionIVA><importeIVA>0.21</importeIVA><importeItem>1.21</importeItem></item></arrayItems><arraySubtotalesIVA><subtotalIVA><codigo>5</codigo><importe>0.21</importe></subtotalIVA></arraySubtotalesIVA></comprobanteCAERequest></tns:autorizarComprobanteRequest></soap:Body></soap:Envelope>'
    )
    .reply(
      200,
      "<?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\"><soapenv:Body><ns1:autorizarComprobanteResponse xmlns:ns1=\"http://impl.service.wsmtxca.afip.gov.ar/service/\"><resultado>A</resultado><comprobanteResponse><cuit>66666666666</cuit><codigoTipoComprobante>1</codigoTipoComprobante><numeroPuntoVenta>1</numeroPuntoVenta><numeroComprobante>5</numeroComprobante><fechaEmision>2021-03-24</fechaEmision><CAE>71129054763262</CAE><fechaVencimientoCAE>2021-04-03</fechaVencimientoCAE></comprobanteResponse></ns1:autorizarComprobanteResponse></soapenv:Body></soapenv:Envelope>",
      [
        "Date",
        "Wed, 24 Mar 2021 19:07:21 GMT",
        "X-Powered-By",
        "Servlet/3.0; JBossAS-6",
        "Connection",
        "close",
        "Content-Type",
        'application/soap+xml; action="http://impl.service.wsmtxca.afip.gov.ar/service/MTXCAServicePortType/autorizarComprobanteResponse";charset=utf-8',
        "Transfer-Encoding",
        "chunked",
      ]
    );
};
