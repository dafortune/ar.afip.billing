const path = require("path");

const SERVICES = {
  wsaa: {
    production: {
      URL: "https://wsaa.afip.gov.ar/ws/services/LoginCms",
      WSDL: "https://wsaa.afip.gov.ar/ws/services/LoginCms?wsdl",
    },
    test: {
      URL: "https://wsaahomo.afip.gov.ar/ws/services/LoginCms",
      WSDL: "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?wsdl",
    },
  },

  wsmtxca: {
    production: {
      URL: "https://serviciosjava.afip.gob.ar/wsmtxca/services/MTXCAService",
      WSDL:
        "https://serviciosjava.afip.gob.ar/wsmtxca/services/MTXCAService?wsdl",
    },
    test: {
      URL: "https://fwshomo.afip.gov.ar/wsmtxca/services/MTXCAService",
      WSDL: "https://fwshomo.afip.gov.ar/wsmtxca/services/MTXCAService?wsdl",
    },
  },
};

class MetaService {
  constructor(environment) {
    this.environment = environment;
  }

  getMeta(service) {
    if (!Object.prototype.hasOwnProperty.call(SERVICES, service)) {
      throw new Error(`service ${service} is not defined`);
    }

    if (
      !Object.prototype.hasOwnProperty.call(SERVICES[service], this.environment)
    ) {
      throw new Error(
        `environment ${this.environment} is not defined for ${service}`
      );
    }

    return SERVICES[service][this.environment];
  }
}

module.exports = MetaService;
