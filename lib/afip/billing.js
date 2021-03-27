const WebService = require("./afip_web_service");
const dataTypes = require("./data_types");

module.exports = class Billing {
  constructor({ auth, metaService }) {
    const meta = metaService.getMeta("wsmtxca");

    const webServiceOptions = {
      WSDL: meta.WSDL,
      URL: meta.URL,
    };

    this.auth = auth;
    this.webService = new WebService(webServiceOptions);
  }

  async getAlicuotasIVA() {
    return (
      (
        (await this.executeRequest("consultarAlicuotasIVA"))
          .arrayAlicuotasIVA || {}
      ).codigoDescripcion || []
    );
  }

  async getPuntosDeVenta() {
    return (
      (
        (await this.executeRequest("consultarPuntosVenta")).arrayPuntosVenta ||
        {}
      ).codigoDescripcion || []
    );
  }

  async getPuntosDeVentaCAE() {
    return (
      (
        (await this.executeRequest("consultarPuntosVentaCAE"))
          .arrayPuntosVenta || {}
      ).codigoDescripcion || []
    );
  }

  async getMonedas() {
    return (
      ((await this.executeRequest("consultarMonedas")).arrayMonedas || {})
        .codigoDescripcion || []
    );
  }

  async getComprobante({
    codigoTipoComprobante,
    numeroPuntoVenta,
    numeroComprobante,
  }) {
    const comprobante = await this.executeRequest("consultarComprobante", {
      consultaComprobanteRequest: {
        codigoTipoComprobante,
        numeroPuntoVenta,
        numeroComprobante,
      },
    });

    if (!comprobante || !comprobante.comprobante) {
      return comprobante;
    }

    return { comprobante: this.parseComprobante(comprobante.comprobante) };
  }

  async getCotizacionMoneda(codigoMoneda) {
    const cotizacion = (
      await this.executeRequest("consultarCotizacionMoneda", { codigoMoneda })
    ).cotizacionMoneda;

    return parseFloat(cotizacion);
  }

  async getCondicionesIVA() {
    return (
      (
        (await this.executeRequest("consultarCondicionesIVA"))
          .arrayCondicionesIVA || {}
      ).codigoDescripcion || []
    );
  }

  async getTiposComprobante() {
    return (
      (
        (await this.executeRequest("consultarTiposComprobante"))
          .arrayTiposComprobante || {}
      ).codigoDescripcion || []
    );
  }

  async getTiposDocumento() {
    return (
      (
        (await this.executeRequest("consultarTiposDocumento"))
          .arrayTiposDocumento || {}
      ).codigoDescripcion || []
    );
  }

  async getTiposTributo() {
    return (
      (
        (await this.executeRequest("consultarTiposTributo"))
          .arrayTiposTributo || {}
      ).codigoDescripcion || []
    );
  }

  async getUnidadesMedida() {
    return (
      (
        (await this.executeRequest("consultarUnidadesMedida"))
          .arrayUnidadesMedida || {}
      ).codigoDescripcion || []
    );
  }

  async getTiposDatosAdicionales() {
    return (
      (
        (await this.executeRequest("consultarTiposDatosAdicionales"))
          .arrayTiposDatosAdicionales || {}
      ).codigoDescripcion || []
    );
  }

  async getUltimoComprobanteAutorizado({
    codigoTipoComprobante,
    numeroPuntoVenta,
  }) {
    const result = await this.executeRequest(
      "consultarUltimoComprobanteAutorizado",
      {
        consultaUltimoComprobanteAutorizadoRequest: {
          codigoTipoComprobante,
          numeroPuntoVenta,
        },
      }
    );

    return {
      numeroComprobante: parseInt(result.numeroComprobante),
    };
  }

  async autorizarComprobante({
    codigoTipoComprobante,
    numeroPuntoVenta,
    numeroComprobante,
    fechaEmision, // optional
    fechaVencimientoPago,
    codigoTipoDocumento, // optional
    numeroDocumento, // optional

    importeGravado, // optional
    importeNoGravado, // optional
    importeExento, // optional
    importeSubtotal,
    importeOtrosTributos, // optional
    importeTotal,

    codigoMoneda,
    cotizacionMoneda,

    observaciones, // optional

    codigoConcepto,
    fechaServicioDesde, //optional
    fechaServicioHasta, // optional

    // comprobantesAsociados, // optional
    // periodoComprobantesAsociados, // optional
    otrosTributos, // optional
    items,
    subtotalesIVA, // optional
    datosAdicionales, // optional
    // compradores // optional
  }) {
    const result = await this.executeRequest("autorizarComprobante", {
      comprobanteCAERequest: {
        codigoTipoComprobante,
        numeroPuntoVenta,
        numeroComprobante,
        fechaEmision: dataTypes.serializeDate(fechaEmision),

        codigoTipoDocumento,
        numeroDocumento,

        importeGravado,
        importeNoGravado,
        importeExento,
        importeSubtotal,
        importeOtrosTributos,
        importeTotal,

        codigoMoneda,
        cotizacionMoneda,

        observaciones,

        codigoConcepto,
        fechaServicioDesde:
          fechaServicioDesde && dataTypes.serializeDate(fechaServicioDesde),
        fechaServicioHasta:
          fechaServicioHasta && dataTypes.serializeDate(fechaServicioHasta),

        fechaVencimientoPago:
          fechaVencimientoPago && dataTypes.serializeDate(fechaVencimientoPago),

        // arrayComprobantesAsociados: comprobantesAsociados && comprobantesAsociados.map(c => {
        // 	return {
        // 		comprobanteAsociado: {
        // 		codigoTipoComprobante: c.codigoTipoComprobante,
        // 		numeroPuntoVenta: c.numeroPuntoVenta,
        // 		numeroComprobante: c.numeroComprobante,
        // 		cuit: c.cuit,
        // 		fechaEmision: dataTypes.serializeDate(c.fechaEmision),
        // 	 }
        // };
        // }),

        // periodoComprobantesAsociados: periodoComprobantesAsociados && periodoComprobantesAsociados.map(p => {
        // 	return {
        // 		fechaDesde: dataTypes.serializeDate(fechaDesde),
        // 		fechaHasta: dataTypes.serializeDate(fechaHasta)
        // 	};
        // }),

        arrayOtrosTributos:
          otrosTributos &&
          otrosTributos.map((ot) => {
            return {
              otroTributo: {
                codigo: ot.codigo,
                descripcion: ot.descripcion,
                baseImponible: ot.baseImponible,
                importe: ot.importe,
              },
            };
          }),

        arrayItems:
          items &&
          items.map((i) => {
            return {
              item: {
                unidadesMtx: i.unidadesMtx,
                codigoMtx: i.codigoMtx,
                codigo: i.codigo,
                descripcion: i.descripcion,
                cantidad: i.cantidad,
                codigoUnidadMedida: i.codigoUnidadMedida,
                precioUnitario: i.precioUnitario,
                importeBonificacion: i.importeBonificacion,
                codigoCondicionIVA: i.codigoCondicionIVA,
                importeIVA: i.importeIVA,
                importeItem: i.importeItem,
              },
            };
          }),
        arraySubtotalesIVA:
          subtotalesIVA &&
          subtotalesIVA.map((s) => {
            return {
              subtotalIVA: {
                codigo: s.codigo,
                importe: s.importe,
              },
            };
          }),
        arrayDatosAdicionales:
          datosAdicionales &&
          datosAdicionales.map((d) => {
            return {
              datoAdicional: {
                t: d.t,
                c1: d.c1,
                c2: d.c2,
                c3: d.c3,
                c4: d.c4,
                c5: d.c5,
                c6: d.c6,
              },
            };
          }),

        // arrayCompradores: compradores && compradores.map(c => {
        // 	return {
        //     comprador: {
        // 		codigoTipoDocumento: c.codigoTipoDocumento,
        // 		numeroDocumento: c.numeroDocumento,
        // 		porcentaje: c.porcentaje
        // 	   }
        //   };
        // }),
      },
    });

    if (result.resultado === "R") {
      const error = new Error(
        `autorizacion rechazada: ${JSON.stringify(result.arrayErrores)}`
      );
      error.errors = result.arrayErrores;

      throw error;
    }

    return {
      comprobanteResponse: result.comprobanteResponse && {
        CAE: result.comprobanteResponse.CAE,
        codigoTipoComprobante: result.comprobanteResponse.codigoTipoComprobante,
        cuit: parseInt(result.comprobanteResponse.cuit, 10),
        fechaEmision: result.comprobanteResponse.fechaEmision,
        fechaVencimientoCAE: result.comprobanteResponse.fechaVencimientoCAE,
        numeroComprobante: parseInt(
          result.comprobanteResponse.numeroComprobante,
          10
        ),
        numeroPuntoVenta: parseInt(
          result.comprobanteResponse.numeroPuntoVenta,
          10
        ),
      },
      arrayObservaciones: result.arrayObservaciones,
      resultado: result.resultado,
      evento: result.evento,
    };
  }

  async executeRequest(operation, params = {}) {
    const p = Object.assign(
      {},
      await this.getWSInitialRequest(operation),
      params
    );

    const results = await this.webService.executeRequest(operation, p);

    if (results.arrayErrores) {
      const error = new Error(
        `business error: ${JSON.stringify(results.arrayErrores)}`
      );
      error.errors = results.arrayErrores.codigoDescripcion || [];
      throw error;
    }

    return results;
  }

  async getWSInitialRequest() {
    const { token, sign } = await this.auth.getServiceTA("wsmtxca");

    return {
      authRequest: {
        token: token,
        sign: sign,
        cuitRepresentada: this.auth.getCuit(),
      },
    };
  }

  parseComprobante(comprobante) {
    return {
      arrayItems: {
        item: ((comprobante.arrayItems || {}).item || []).map((i) => {
          return {
            cantidad: parseFloat(i.cantidad),
            codigoCondicionIVA: i.codigoCondicionIVA,
            codigoMtx: i.codigoMtx,
            codigoUnidadMedida: i.codigoUnidadMedida,
            descripcion: i.descripcion,
            importeIVA: parseFloat(i.importeIVA),
            importeItem: parseFloat(i.importeItem),
            precioUnitario: parseFloat(i.precioUnitario),
            unidadesMtx: i.unidadesMtx,
          };
        }),
      },
      arraySubtotalesIVA: {
        subtotalIVA: (
          (comprobante.arraySubtotalesIVA || {}).subtotalIVA || []
        ).map((i) => {
          return {
            codigo: i.codigo,
            importe: parseFloat(i.importe),
          };
        }),
      },
      codigoAutorizacion: comprobante.codigoAutorizacion,
      codigoConcepto: comprobante.codigoConcepto,
      codigoMoneda: comprobante.codigoMoneda,
      codigoTipoAutorizacion: comprobante.codigoTipoAutorizacion,
      codigoTipoComprobante: comprobante.codigoTipoComprobante,
      codigoTipoDocumento: comprobante.codigoTipoDocumento,
      cotizacionMoneda: parseFloat(comprobante.cotizacionMoneda),
      fechaEmision: comprobante.fechaEmision,
      fechaServicioDesde: comprobante.fechaServicioDesde,
      fechaServicioHasta: comprobante.fechaServicioHasta,
      fechaVencimiento: comprobante.fechaVencimiento,
      fechaVencimientoPago: comprobante.fechaVencimientoPago,
      importeGravado: parseFloat(comprobante.importeGravado),
      importeSubtotal: parseFloat(comprobante.importeSubtotal),
      importeTotal: parseFloat(comprobante.importeTotal),
      numeroComprobante: parseInt(comprobante.numeroComprobante, 10),
      numeroDocumento: parseInt(comprobante.numeroDocumento, 10),
      numeroPuntoVenta: parseInt(comprobante.numeroPuntoVenta, 10),
    };
  }
};
