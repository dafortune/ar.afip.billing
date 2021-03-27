const nock = require("nock");

module.exports = function () {
  return nock("https://fwshomo.afip.gov.ar:443", { encodedQueryParams: true })
    .post(
      "/wsmtxca/services/MTXCAService",
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tns="http://impl.service.wsmtxca.afip.gov.ar/service/"><soap:Body><tns:consultarTiposDocumentoRequest><authRequest><token>myToken</token><sign>mySignature</sign><cuitRepresentada>66666666666</cuitRepresentada></authRequest></tns:consultarTiposDocumentoRequest></soap:Body></soap:Envelope>'
    )
    .reply(
      200,
      "<?xml version='1.0' encoding='utf-8'?><soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\"><soapenv:Body><ns1:consultarTiposDocumentoResponse xmlns:ns1=\"http://impl.service.wsmtxca.afip.gov.ar/service/\"><arrayTiposDocumento><codigoDescripcion><codigo>80</codigo><descripcion>CUIT</descripcion></codigoDescripcion><codigoDescripcion><codigo>86</codigo><descripcion>CUIL</descripcion></codigoDescripcion><codigoDescripcion><codigo>87</codigo><descripcion>CDI</descripcion></codigoDescripcion><codigoDescripcion><codigo>89</codigo><descripcion>LE</descripcion></codigoDescripcion><codigoDescripcion><codigo>90</codigo><descripcion>LC</descripcion></codigoDescripcion><codigoDescripcion><codigo>91</codigo><descripcion>CI Extranjera</descripcion></codigoDescripcion><codigoDescripcion><codigo>92</codigo><descripcion>en trámite</descripcion></codigoDescripcion><codigoDescripcion><codigo>93</codigo><descripcion>Acta Nacimiento</descripcion></codigoDescripcion><codigoDescripcion><codigo>95</codigo><descripcion>CI Bs. As. RNP</descripcion></codigoDescripcion><codigoDescripcion><codigo>96</codigo><descripcion>DNI</descripcion></codigoDescripcion><codigoDescripcion><codigo>94</codigo><descripcion>Pasaporte</descripcion></codigoDescripcion><codigoDescripcion><codigo>0</codigo><descripcion>CI Policía Federal</descripcion></codigoDescripcion><codigoDescripcion><codigo>1</codigo><descripcion>CI Buenos Aires</descripcion></codigoDescripcion><codigoDescripcion><codigo>2</codigo><descripcion>CI Catamarca</descripcion></codigoDescripcion><codigoDescripcion><codigo>3</codigo><descripcion>CI Córdoba</descripcion></codigoDescripcion><codigoDescripcion><codigo>4</codigo><descripcion>CI Corrientes</descripcion></codigoDescripcion><codigoDescripcion><codigo>5</codigo><descripcion>CI Entre Ríos</descripcion></codigoDescripcion><codigoDescripcion><codigo>6</codigo><descripcion>CI Jujuy</descripcion></codigoDescripcion><codigoDescripcion><codigo>7</codigo><descripcion>CI Mendoza</descripcion></codigoDescripcion><codigoDescripcion><codigo>8</codigo><descripcion>CI La Rioja</descripcion></codigoDescripcion><codigoDescripcion><codigo>10</codigo><descripcion>CI San Juan</descripcion></codigoDescripcion><codigoDescripcion><codigo>11</codigo><descripcion>CI San Luis</descripcion></codigoDescripcion><codigoDescripcion><codigo>9</codigo><descripcion>CI Salta</descripcion></codigoDescripcion><codigoDescripcion><codigo>12</codigo><descripcion>CI Santa Fe</descripcion></codigoDescripcion><codigoDescripcion><codigo>13</codigo><descripcion>CI Santiago del Estero</descripcion></codigoDescripcion><codigoDescripcion><codigo>14</codigo><descripcion>CI Tucumán</descripcion></codigoDescripcion><codigoDescripcion><codigo>16</codigo><descripcion>CI Chaco</descripcion></codigoDescripcion><codigoDescripcion><codigo>17</codigo><descripcion>CI Chubut</descripcion></codigoDescripcion><codigoDescripcion><codigo>18</codigo><descripcion>CI Formosa</descripcion></codigoDescripcion><codigoDescripcion><codigo>19</codigo><descripcion>CI Misiones</descripcion></codigoDescripcion><codigoDescripcion><codigo>20</codigo><descripcion>CI Neuquén</descripcion></codigoDescripcion><codigoDescripcion><codigo>21</codigo><descripcion>CI La Pampa</descripcion></codigoDescripcion><codigoDescripcion><codigo>22</codigo><descripcion>CI Río Negro</descripcion></codigoDescripcion><codigoDescripcion><codigo>23</codigo><descripcion>CI Santa Cruz</descripcion></codigoDescripcion><codigoDescripcion><codigo>24</codigo><descripcion>CI Tierra del Fuego</descripcion></codigoDescripcion><codigoDescripcion><codigo>30</codigo><descripcion>Certificado de Migración</descripcion></codigoDescripcion></arrayTiposDocumento></ns1:consultarTiposDocumentoResponse></soapenv:Body></soapenv:Envelope>",
      [
        "Date",
        "Wed, 24 Mar 2021 19:05:25 GMT",
        "X-Powered-By",
        "Servlet/3.0; JBossAS-6",
        "Connection",
        "close",
        "Content-Type",
        'application/soap+xml; action="http://impl.service.wsmtxca.afip.gov.ar/service/MTXCAServicePortType/consultarTiposDocumentoResponse";charset=utf-8',
        "Transfer-Encoding",
        "chunked",
      ]
    );
};
