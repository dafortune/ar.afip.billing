const nock = require("nock");

module.exports = function () {
  return nock("https://wsaahomo.afip.gov.ar:443", { encodedQueryParams: true })
    .post(
      "/ws/services/LoginCms",
      '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:impl="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns:intf="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns:tns1="http://wsaa.view.sua.dvadac.desein.afip.gov"><soap:Body><tns1:loginCms xmlns:tns1="http://wsaa.view.sua.dvadac.desein.afip.gov" xmlns="http://wsaa.view.sua.dvadac.desein.afip.gov"><tns1:in0>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</tns1:in0></tns1:loginCms></soap:Body></soap:Envelope>'
    )
    .reply(
      200,
      '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><loginCmsResponse xmlns="http://wsaa.view.sua.dvadac.desein.afip.gov"><loginCmsReturn>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; standalone=&quot;yes&quot;?&gt;\n&lt;loginTicketResponse version=&quot;1.0&quot;&gt;\n    &lt;header&gt;\n        &lt;source&gt;CN=wsaahomo, O=AFIP, C=AR, SERIALNUMBER=CUIT 33693450239&lt;/source&gt;\n        &lt;destination&gt;SERIALNUMBER=CUIT 66666666666, CN=fact&lt;/destination&gt;\n        &lt;uniqueId&gt;1444900662&lt;/uniqueId&gt;\n        &lt;generationTime&gt;2021-03-24T16:04:10.183-03:00&lt;/generationTime&gt;\n        &lt;expirationTime&gt;2021-03-25T04:04:10.183-03:00&lt;/expirationTime&gt;\n    &lt;/header&gt;\n    &lt;credentials&gt;\n        &lt;token&gt;myToken&lt;/token&gt;\n        &lt;sign&gt;mySignature&lt;/sign&gt;\n    &lt;/credentials&gt;\n&lt;/loginTicketResponse&gt;\n</loginCmsReturn></loginCmsResponse></soapenv:Body></soapenv:Envelope>',
      [
        "Date",
        "Wed, 24 Mar 2021 19:04:10 GMT",
        "Content-Type",
        "text/xml;charset=utf-8",
        "Connection",
        "close",
        "Transfer-Encoding",
        "chunked",
      ]
    );
};
