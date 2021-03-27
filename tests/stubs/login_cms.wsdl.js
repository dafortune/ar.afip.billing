const nock = require("nock");

module.exports = function () {
  return nock("https://wsaahomo.afip.gov.ar:443", { encodedQueryParams: true })
    .get("/ws/services/LoginCms")
    .query({ wsdl: "" })
    .reply(
      200,
      '<?xml version="1.0" encoding="UTF-8"?>\n<wsdl:definitions targetNamespace="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns:apachesoap="http://xml.apache.org/xml-soap" xmlns:impl="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns:intf="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns:tns1="http://wsaa.view.sua.dvadac.desein.afip.gov" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:wsdlsoap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n<!--WSDL created by Apache Axis version: 1.4\nBuilt on Apr 22, 2006 (06:55:48 PDT)-->\n <wsdl:types>\n  <schema elementFormDefault="qualified" targetNamespace="http://wsaa.view.sua.dvadac.desein.afip.gov" xmlns="http://www.w3.org/2001/XMLSchema">\n   <import namespace="https://wsaahomo.afip.gov.ar/ws/services/LoginCms"/>\n   <element name="loginCms">\n    <complexType>\n     <sequence>\n      <element name="in0" type="xsd:string"/>\n     </sequence>\n    </complexType>\n   </element>\n   <element name="loginCmsResponse">\n    <complexType>\n     <sequence>\n      <element name="loginCmsReturn" type="xsd:string"/>\n     </sequence>\n    </complexType>\n   </element>\n  </schema>\n  <schema elementFormDefault="qualified" targetNamespace="https://wsaahomo.afip.gov.ar/ws/services/LoginCms" xmlns="http://www.w3.org/2001/XMLSchema">\n   <complexType name="LoginFault">\n    <sequence/>\n   </complexType>\n   <element name="fault" type="impl:LoginFault"/>\n  </schema>\n </wsdl:types>\n\n   <wsdl:message name="loginCmsRequest">\n\n      <wsdl:part element="tns1:loginCms" name="parameters">\n\n      </wsdl:part>\n\n   </wsdl:message>\n\n   <wsdl:message name="LoginFault">\n\n      <wsdl:part element="impl:fault" name="fault">\n\n      </wsdl:part>\n\n   </wsdl:message>\n\n   <wsdl:message name="loginCmsResponse">\n\n      <wsdl:part element="tns1:loginCmsResponse" name="parameters">\n\n      </wsdl:part>\n\n   </wsdl:message>\n\n   <wsdl:portType name="LoginCMS">\n\n      <wsdl:operation name="loginCms">\n\n         <wsdl:input message="impl:loginCmsRequest" name="loginCmsRequest">\n\n       </wsdl:input>\n\n         <wsdl:output message="impl:loginCmsResponse" name="loginCmsResponse">\n\n       </wsdl:output>\n\n         <wsdl:fault message="impl:LoginFault" name="LoginFault">\n\n       </wsdl:fault>\n\n      </wsdl:operation>\n\n   </wsdl:portType>\n\n   <wsdl:binding name="LoginCmsSoapBinding" type="impl:LoginCMS">\n\n      <wsdlsoap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>\n\n      <wsdl:operation name="loginCms">\n\n         <wsdlsoap:operation soapAction=""/>\n\n         <wsdl:input name="loginCmsRequest">\n\n            <wsdlsoap:body use="literal"/>\n\n         </wsdl:input>\n\n         <wsdl:output name="loginCmsResponse">\n\n            <wsdlsoap:body use="literal"/>\n\n         </wsdl:output>\n\n         <wsdl:fault name="LoginFault">\n\n            <wsdlsoap:fault name="LoginFault" use="literal"/>\n\n         </wsdl:fault>\n\n      </wsdl:operation>\n\n   </wsdl:binding>\n\n   <wsdl:service name="LoginCMSService">\n\n      <wsdl:port binding="impl:LoginCmsSoapBinding" name="LoginCms">\n\n         <wsdlsoap:address location="https://wsaahomo.afip.gov.ar/ws/services/LoginCms"/>\n\n      </wsdl:port>\n\n   </wsdl:service>\n\n</wsdl:definitions>\n',
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
