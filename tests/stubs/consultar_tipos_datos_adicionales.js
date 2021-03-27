const nock = require("nock");

module.exports = function () {
  return nock("https://fwshomo.afip.gov.ar:443", { encodedQueryParams: true })
    .post(
      "/wsmtxca/services/MTXCAService",
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://impl.service.wsmtxca.afip.gov.ar/service/"><soap:Body><tns:consultarTiposDatosAdicionalesRequest><authRequest><token>myToken</token><sign>mySignature</sign><cuitRepresentada>66666666666</cuitRepresentada></authRequest></tns:consultarTiposDatosAdicionalesRequest></soap:Body></soap:Envelope>'
    )
    .reply(
      200,
      '<?xml version=\'1.0\' encoding=\'utf-8\'?><soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope"><soapenv:Body><ns1:consultarTiposDatosAdicionalesResponse xmlns:ns1="http://impl.service.wsmtxca.afip.gov.ar/service/"><arrayTiposDatosAdicionales><codigoDescripcion><codigo>1</codigo><descripcion>Datos adicionales para Entes Reguladores. [NO HABILITADO - RESERVADO PARA USO FUTURO]</descripcion></codigoDescripcion><codigoDescripcion><codigo>2</codigo><descripcion>Datos adicionales para Empresas Promovidas. Deberá indicarse el identificador de proyecto en el campo 1 (c1). RG 3056/2011</descripcion></codigoDescripcion><codigoDescripcion><codigo>3</codigo><descripcion>Datos adicionales para Proveedores de Internet. [NO HABILITADO - RESERVADO PARA USO FUTURO]</descripcion></codigoDescripcion><codigoDescripcion><codigo>10</codigo><descripcion>Datos adicionales para Educación pública de gestión privada. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3749/2015</descripcion></codigoDescripcion><codigoDescripcion><codigo>11</codigo><descripcion>Datos adicionales para Bienes Inmuebles. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3749/2015</descripcion></codigoDescripcion><codigoDescripcion><codigo>12</codigo><descripcion>Datos adicionales para Loc. Temp. Inmuebles Turísticos. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3749/2015</descripcion></codigoDescripcion><codigoDescripcion><codigo>13</codigo><descripcion>Datos adicionales para Representantes de Modelos. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3779/2015</descripcion></codigoDescripcion><codigoDescripcion><codigo>14</codigo><descripcion>Datos adicionales para Agencias de Publicidad. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3779/2015</descripcion></codigoDescripcion><codigoDescripcion><codigo>15</codigo><descripcion>Datos adicionales para P.F. que Desarrollan Actividades de Modelaje. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3779/2015</descripcion></codigoDescripcion><codigoDescripcion><codigo>21</codigo><descripcion>Datos adicionales para Factura Electrónica de Crédito MiPyME. CBU y Alias del Emisor. Obligatorio para Factura. Deberá indicarse el CBU en el campo 1 (c1). Puede indicarse el Alias en el campo 2 (c2)</descripcion></codigoDescripcion><codigoDescripcion><codigo>22</codigo><descripcion>Datos adicionales para Factura Electrónica de Crédito MiPyME. Anulación. Obligatorio para Nota de Débito o Nota de Crédito. Indica si el comprobante que se está solicitando la autorización es para anular un comprobante de Factura Electrónica de Crédito Rechazada. Deberá indicarse "S" o "N" en el campo 1 (c1)</descripcion></codigoDescripcion><codigoDescripcion><codigo>23</codigo><descripcion>Datos adicionales para Factura Electrónica. Referencia Comercial. Podrá ser utilizado para informar una referencia al receptor del comprobante en el campo 1 (c1)</descripcion></codigoDescripcion><codigoDescripcion><codigo>27</codigo><descripcion>Datos adicionales para Factura Electrónica de Crédito MiPyME. Opción de Transferencia. Obligatorio para Factura. Deberá indicarse la opción elegida en el campo 1 (c1). Las opciones admitidas son: (i) "SCA" para Sistema de Circulación Abierta y, (ii) "ADC" para Agentes de Depósito Colectivo. </descripcion></codigoDescripcion></arrayTiposDatosAdicionales></ns1:consultarTiposDatosAdicionalesResponse></soapenv:Body></soapenv:Envelope>',
      [
        "Date",
        "Wed, 24 Mar 2021 19:05:26 GMT",
        "X-Powered-By",
        "Servlet/3.0; JBossAS-6",
        "Connection",
        "close",
        "Content-Type",
        'application/soap+xml; action="http://impl.service.wsmtxca.afip.gov.ar/service/MTXCAServicePortType/consultarTiposDatosAdicionalesResponse";charset=utf-8',
        "Transfer-Encoding",
        "chunked",
      ]
    );
};
