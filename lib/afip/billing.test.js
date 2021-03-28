const { expect } = require("chai");
const afip = require(".");

const mtxcaserviceWSDL = require("../../tests/stubs/mtxca_service.wsdl");
const mockConsultarAlicuotasIVA = require("../../tests/stubs/consultar_alicuotas_iva");
const mockConsultarComprobante = require("../../tests/stubs/consultar_comprobante");
const mockConsultarCondicionesIVA = require("../../tests/stubs/consultar_condiciones_iva");
const mockConsultarCotizacionMoneda = require("../../tests/stubs/consultar_cotizacion_moneda");
const mockConsultarMonedas = require("../../tests/stubs/consultar_monedas");
const mockConsultarPuntosVentaCAE = require("../../tests/stubs/consultar_puntos_venta_cae");
const mockConsultarPuntosVenta = require("../../tests/stubs/consultar_puntos_venta");
const mockConsultarTiposComprobante = require("../../tests/stubs/consultar_tipos_comprobante");
const mockConsultarTiposDatosAdicionales = require("../../tests/stubs/consultar_tipos_datos_adicionales");
const mockConsultarTiposDocumento = require("../../tests/stubs/consultar_tipos_documento");
const mockConsultarTiposTributo = require("../../tests/stubs/consultar_tipos_tributo");
const mockConsultarUltimoComprobanteAutorizado = require("../../tests/stubs/consultar_ultimo_comprobante_autorizado");
const mockConsultarUnidadesMedida = require("../../tests/stubs/consultar_unidades_medida");
const mockAutorizarComprobante = require("../../tests/stubs/autorizar_comprobante");

function getAuthMock() {
  return {
    token: 'myToken',
    sign: 'mySignature'
  };
}

describe("electronic billing", () => {
  beforeEach(() => {
    mtxcaserviceWSDL();
  });

  it("#getAlicuotasIVA", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarAlicuotasIVA();

    expect(await eb.getAlicuotasIVA()).to.eql([
      {
        codigo: "3",
        descripcion: "0%",
      },
      {
        codigo: "4",
        descripcion: "10.5%",
      },
      {
        codigo: "5",
        descripcion: "21%",
      },
      {
        codigo: "6",
        descripcion: "27%",
      },
      {
        codigo: "8",
        descripcion: "5%",
      },
      {
        codigo: "9",
        descripcion: "2.5%",
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getComprobante", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarComprobante();

    expect(
      await eb.getComprobante({
        codigoTipoComprobante: 1,
        numeroPuntoVenta: 1,
        numeroComprobante: 1,
      })
    ).to.eql({
      comprobante: {
        arrayItems: {
          item: [
            {
              cantidad: 1,
              codigoCondicionIVA: "5",
              codigoMtx: "0111111111117",
              codigoUnidadMedida: "98",
              descripcion: "Test",
              importeIVA: 0.21,
              importeItem: 1.21,
              precioUnitario: 1,
              unidadesMtx: 1,
            },
          ],
        },
        arraySubtotalesIVA: {
          subtotalIVA: [
            {
              codigo: "5",
              importe: 0.21,
            },
          ],
        },
        codigoAutorizacion: "71129054763160",
        codigoConcepto: "2",
        codigoMoneda: "PES",
        codigoTipoAutorizacion: "E",
        codigoTipoComprobante: "1",
        codigoTipoDocumento: "80",
        cotizacionMoneda: 1,
        fechaEmision: new Date("2021-03-24T00:00:00.000Z"),
        fechaServicioDesde: new Date("2021-03-24T00:00:00.000Z"),
        fechaServicioHasta: new Date("2021-03-24T00:00:00.000Z"),
        fechaVencimiento: new Date("2021-04-03T00:00:00.000Z"),
        fechaVencimientoPago: new Date("2021-03-24T00:00:00.000Z"),
        importeGravado: 1,
        importeSubtotal: 1,
        importeTotal: 1.21,
        numeroComprobante: 1,
        numeroDocumento: 20135099202,
        numeroPuntoVenta: 1,
      },
    });

    expect(mock.isDone()).to.equal(true);
  });

  it("#getCondicionesIVA", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarCondicionesIVA();

    expect(await eb.getCondicionesIVA()).to.eql([
      {
        codigo: "1",
        descripcion: "No gravado",
      },
      {
        codigo: "2",
        descripcion: "Exento",
      },
      {
        codigo: "3",
        descripcion: "0%",
      },
      {
        codigo: "9",
        descripcion: "2.5%",
      },
      {
        codigo: "8",
        descripcion: "5%",
      },
      {
        codigo: "4",
        descripcion: "10.5%",
      },
      {
        codigo: "5",
        descripcion: "21%",
      },
      {
        codigo: "6",
        descripcion: "27%",
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getCotizacionMoneda", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarCotizacionMoneda();

    expect(await eb.getCotizacionMoneda("DOL")).to.equal(65);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getMonedas", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarMonedas();

    expect(await eb.getMonedas()).to.eql([
      {
        codigo: "PES",
        descripcion: "Pesos Argentinos",
      },
      {
        codigo: "DOL",
        descripcion: "Dólar Estadounidense",
      },
      {
        codigo: "007",
        descripcion: "Florines Holandeses",
      },
      {
        codigo: "010",
        descripcion: "Pesos Mejicanos",
      },
      {
        codigo: "011",
        descripcion: "Pesos Uruguayos",
      },
      {
        codigo: "014",
        descripcion: "Coronas Danesas",
      },
      {
        codigo: "015",
        descripcion: "Coronas Noruegas",
      },
      {
        codigo: "016",
        descripcion: "Coronas Suecas",
      },
      {
        codigo: "018",
        descripcion: "Dólar Canadiense",
      },
      {
        codigo: "019",
        descripcion: "Yens",
      },
      {
        codigo: "021",
        descripcion: "Libra Esterlina",
      },
      {
        codigo: "023",
        descripcion: "Bolívar Venezolano",
      },
      {
        codigo: "024",
        descripcion: "Corona Checa",
      },
      {
        codigo: "025",
        descripcion: "Dinar Yugoslavo",
      },
      {
        codigo: "026",
        descripcion: "Dólar Australiano",
      },
      {
        codigo: "027",
        descripcion: "Dracma Griego",
      },
      {
        codigo: "028",
        descripcion: "Florín (Antillas Holandesas)",
      },
      {
        codigo: "029",
        descripcion: "Güaraní",
      },
      {
        codigo: "031",
        descripcion: "Peso Boliviano",
      },
      {
        codigo: "032",
        descripcion: "Peso Colombiano",
      },
      {
        codigo: "033",
        descripcion: "Peso Chileno",
      },
      {
        codigo: "034",
        descripcion: "Rand Sudafricano",
      },
      {
        codigo: "036",
        descripcion: "Sucre Ecuatoriano",
      },
      {
        codigo: "051",
        descripcion: "Dólar de Hong Kong",
      },
      {
        codigo: "052",
        descripcion: "Dólar de Singapur",
      },
      {
        codigo: "053",
        descripcion: "Dólar de Jamaica",
      },
      {
        codigo: "054",
        descripcion: "Dólar de Taiwan",
      },
      {
        codigo: "055",
        descripcion: "Quetzal Guatemalteco",
      },
      {
        codigo: "056",
        descripcion: "Forint (Hungría)",
      },
      {
        codigo: "057",
        descripcion: "Baht (Tailandia)",
      },
      {
        codigo: "059",
        descripcion: "Dinar Kuwaiti",
      },
      {
        codigo: "012",
        descripcion: "Real",
      },
      {
        codigo: "030",
        descripcion: "Shekel (Israel)",
      },
      {
        codigo: "035",
        descripcion: "Nuevo Sol Peruano",
      },
      {
        codigo: "060",
        descripcion: "Euro",
      },
      {
        codigo: "040",
        descripcion: "Lei Rumano",
      },
      {
        codigo: "042",
        descripcion: "Peso Dominicano",
      },
      {
        codigo: "043",
        descripcion: "Balboas Panameñas",
      },
      {
        codigo: "044",
        descripcion: "Córdoba Nicaragüense",
      },
      {
        codigo: "045",
        descripcion: "Dirham Marroquí",
      },
      {
        codigo: "063",
        descripcion: "Lempira Hondureña",
      },
      {
        codigo: "046",
        descripcion: "Libra Egipcia",
      },
      {
        codigo: "047",
        descripcion: "Riyal Saudita",
      },
      {
        codigo: "062",
        descripcion: "Rupia Hindú",
      },
      {
        codigo: "061",
        descripcion: "Zloty Polaco",
      },
      {
        codigo: "064",
        descripcion: "Yuan (Rep. Pop. China)",
      },
      {
        codigo: "002",
        descripcion: "Dólar Libre EEUU",
      },
      {
        codigo: "009",
        descripcion: "Franco Suizo",
      },
      {
        codigo: "041",
        descripcion: "Derechos Especiales de Giro",
      },
      {
        codigo: "049",
        descripcion: "Gramos de Oro Fino",
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getPuntosDeVenta", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarPuntosVenta();

    expect(await eb.getPuntosDeVenta()).to.eql([]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getPuntosDeVentaCAE", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarPuntosVentaCAE();

    expect(await eb.getPuntosDeVentaCAE()).to.eql([]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getTiposComprobante", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarTiposComprobante();

    expect(await eb.getTiposComprobante()).to.eql([
      {
        codigo: "1",
        descripcion: "Factura A",
      },
      {
        codigo: "2",
        descripcion: "Nota de Débito A",
      },
      {
        codigo: "3",
        descripcion: "Nota de Crédito A",
      },
      {
        codigo: "6",
        descripcion: "Factura B",
      },
      {
        codigo: "7",
        descripcion: "Nota de Débito B",
      },
      {
        codigo: "8",
        descripcion: "Nota de Crédito B",
      },
      {
        codigo: "51",
        descripcion: "Factura M. No habilitado para CAEA",
      },
      {
        codigo: "52",
        descripcion: "Nota de Débito M. No habilitado para CAEA",
      },
      {
        codigo: "53",
        descripcion: "Nota de Crédito M. No habilitado para CAEA",
      },
      {
        codigo: "88",
        descripcion:
          "Remito Electrónico de Tabaco Acondicionado (sólo para comprobantes asociados)",
      },
      {
        codigo: "991",
        descripcion:
          "Remito Electrónico de Tabaco en Hebras (sólo para comprobantes asociados)",
      },
      {
        codigo: "201",
        descripcion: "Factura de Crédito Electrónica MiPyMEs (FCE) A",
      },
      {
        codigo: "202",
        descripcion: "Nota de Débito Electrónica MiPyMEs (FCE) A",
      },
      {
        codigo: "203",
        descripcion: "Nota de Crédito Electrónica MiPyMEs (FCE) A",
      },
      {
        codigo: "206",
        descripcion: "Factura de Crédito Electrónica MiPyMEs (FCE) B",
      },
      {
        codigo: "207",
        descripcion: "Nota de Débito Electrónica MiPyMEs (FCE) B",
      },
      {
        codigo: "208",
        descripcion: "Nota de Crédito Electrónica MiPyMEs (FCE) B",
      },
      {
        codigo: "91",
        descripcion: "Remito (sólo para comprobantes asociados)",
      },
      {
        codigo: "995",
        descripcion:
          "Remito Electrónico de Carne (sólo para comprobantes asociados)",
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getTiposDatosAdicionales", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarTiposDatosAdicionales();

    expect(await eb.getTiposDatosAdicionales()).to.eql([
      {
        codigo: "1",
        descripcion:
          "Datos adicionales para Entes Reguladores. [NO HABILITADO - RESERVADO PARA USO FUTURO]",
      },
      {
        codigo: "2",
        descripcion:
          "Datos adicionales para Empresas Promovidas. Deberá indicarse el identificador de proyecto en el campo 1 (c1). RG 3056/2011",
      },
      {
        codigo: "3",
        descripcion:
          "Datos adicionales para Proveedores de Internet. [NO HABILITADO - RESERVADO PARA USO FUTURO]",
      },
      {
        codigo: "10",
        descripcion:
          "Datos adicionales para Educación pública de gestión privada. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3749/2015",
      },
      {
        codigo: "11",
        descripcion:
          "Datos adicionales para Bienes Inmuebles. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3749/2015",
      },
      {
        codigo: "12",
        descripcion:
          "Datos adicionales para Loc. Temp. Inmuebles Turísticos. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3749/2015",
      },
      {
        codigo: "13",
        descripcion:
          "Datos adicionales para Representantes de Modelos. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3779/2015",
      },
      {
        codigo: "14",
        descripcion:
          "Datos adicionales para Agencias de Publicidad. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3779/2015",
      },
      {
        codigo: "15",
        descripcion:
          "Datos adicionales para P.F. que Desarrollan Actividades de Modelaje. Deberá indicarse si está (1) o no (0) alcanzado por la norma en el campo 1 (c1). RG 3779/2015",
      },
      {
        codigo: "21",
        descripcion:
          "Datos adicionales para Factura Electrónica de Crédito MiPyME. CBU y Alias del Emisor. Obligatorio para Factura. Deberá indicarse el CBU en el campo 1 (c1). Puede indicarse el Alias en el campo 2 (c2)",
      },
      {
        codigo: "22",
        descripcion:
          'Datos adicionales para Factura Electrónica de Crédito MiPyME. Anulación. Obligatorio para Nota de Débito o Nota de Crédito. Indica si el comprobante que se está solicitando la autorización es para anular un comprobante de Factura Electrónica de Crédito Rechazada. Deberá indicarse "S" o "N" en el campo 1 (c1)',
      },
      {
        codigo: "23",
        descripcion:
          "Datos adicionales para Factura Electrónica. Referencia Comercial. Podrá ser utilizado para informar una referencia al receptor del comprobante en el campo 1 (c1)",
      },
      {
        codigo: "27",
        descripcion:
          'Datos adicionales para Factura Electrónica de Crédito MiPyME. Opción de Transferencia. Obligatorio para Factura. Deberá indicarse la opción elegida en el campo 1 (c1). Las opciones admitidas son: (i) "SCA" para Sistema de Circulación Abierta y, (ii) "ADC" para Agentes de Depósito Colectivo.',
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getTiposDocumento", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarTiposDocumento();

    expect(await eb.getTiposDocumento()).to.eql([
      {
        codigo: "80",
        descripcion: "CUIT",
      },
      {
        codigo: "86",
        descripcion: "CUIL",
      },
      {
        codigo: "87",
        descripcion: "CDI",
      },
      {
        codigo: "89",
        descripcion: "LE",
      },
      {
        codigo: "90",
        descripcion: "LC",
      },
      {
        codigo: "91",
        descripcion: "CI Extranjera",
      },
      {
        codigo: "92",
        descripcion: "en trámite",
      },
      {
        codigo: "93",
        descripcion: "Acta Nacimiento",
      },
      {
        codigo: "95",
        descripcion: "CI Bs. As. RNP",
      },
      {
        codigo: "96",
        descripcion: "DNI",
      },
      {
        codigo: "94",
        descripcion: "Pasaporte",
      },
      {
        codigo: "0",
        descripcion: "CI Policía Federal",
      },
      {
        codigo: "1",
        descripcion: "CI Buenos Aires",
      },
      {
        codigo: "2",
        descripcion: "CI Catamarca",
      },
      {
        codigo: "3",
        descripcion: "CI Córdoba",
      },
      {
        codigo: "4",
        descripcion: "CI Corrientes",
      },
      {
        codigo: "5",
        descripcion: "CI Entre Ríos",
      },
      {
        codigo: "6",
        descripcion: "CI Jujuy",
      },
      {
        codigo: "7",
        descripcion: "CI Mendoza",
      },
      {
        codigo: "8",
        descripcion: "CI La Rioja",
      },
      {
        codigo: "10",
        descripcion: "CI San Juan",
      },
      {
        codigo: "11",
        descripcion: "CI San Luis",
      },
      {
        codigo: "9",
        descripcion: "CI Salta",
      },
      {
        codigo: "12",
        descripcion: "CI Santa Fe",
      },
      {
        codigo: "13",
        descripcion: "CI Santiago del Estero",
      },
      {
        codigo: "14",
        descripcion: "CI Tucumán",
      },
      {
        codigo: "16",
        descripcion: "CI Chaco",
      },
      {
        codigo: "17",
        descripcion: "CI Chubut",
      },
      {
        codigo: "18",
        descripcion: "CI Formosa",
      },
      {
        codigo: "19",
        descripcion: "CI Misiones",
      },
      {
        codigo: "20",
        descripcion: "CI Neuquén",
      },
      {
        codigo: "21",
        descripcion: "CI La Pampa",
      },
      {
        codigo: "22",
        descripcion: "CI Río Negro",
      },
      {
        codigo: "23",
        descripcion: "CI Santa Cruz",
      },
      {
        codigo: "24",
        descripcion: "CI Tierra del Fuego",
      },
      {
        codigo: "30",
        descripcion: "Certificado de Migración",
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getTiposTributo", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarTiposTributo();

    expect(await eb.getTiposTributo()).to.eql([
      {
        codigo: "1",
        descripcion: "Impuestos Nacionales",
      },
      {
        codigo: "2",
        descripcion: "Impuestos Provinciales",
      },
      {
        codigo: "3",
        descripcion: "Impuestos Municipales",
      },
      {
        codigo: "4",
        descripcion: "Impuestos Internos",
      },
      {
        codigo: "5",
        descripcion: "IIBB",
      },
      {
        codigo: "6",
        descripcion: "Percepción de IVA",
      },
      {
        codigo: "7",
        descripcion: "Percepción de IIBB",
      },
      {
        codigo: "8",
        descripcion: "Percepción por Impuestos Municipales",
      },
      {
        codigo: "9",
        descripcion: "Otras Percepciones",
      },
      {
        codigo: "13",
        descripcion: "Percepción de IVA a No Categorizado",
      },
      {
        codigo: "99",
        descripcion: "Otros",
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#getUltimoComprobanteAutorizado", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarUltimoComprobanteAutorizado();

    expect(
      await eb.getUltimoComprobanteAutorizado({
        codigoTipoComprobante: 1,
        numeroPuntoVenta: 1,
      })
    ).to.eql({ numeroComprobante: 4 });

    expect(mock.isDone()).to.equal(true);
  });

  it("#getUnidadesMedida", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockConsultarUnidadesMedida();

    expect(await eb.getUnidadesMedida()).to.eql([
      {
        codigo: "96",
        descripcion: "packs",
      },
      {
        codigo: "2",
        descripcion: "metros",
      },
      {
        codigo: "3",
        descripcion: "metros cuadrados",
      },
      {
        codigo: "4",
        descripcion: "metros cúbicos",
      },
      {
        codigo: "41",
        descripcion: "miligramos",
      },
      {
        codigo: "14",
        descripcion: "gramos",
      },
      {
        codigo: "6",
        descripcion: "1000 kWh",
      },
      {
        codigo: "16",
        descripcion: "mm cúbicos",
      },
      {
        codigo: "18",
        descripcion: "hectolitros",
      },
      {
        codigo: "25",
        descripcion: "jgo. pqt. mazo naipes",
      },
      {
        codigo: "30",
        descripcion: "dam cúbicos",
      },
      {
        codigo: "31",
        descripcion: "hm cúbicos",
      },
      {
        codigo: "32",
        descripcion: "km cúbicos",
      },
      {
        codigo: "33",
        descripcion: "microgramos",
      },
      {
        codigo: "34",
        descripcion: "nanogramos",
      },
      {
        codigo: "35",
        descripcion: "picogramos",
      },
      {
        codigo: "48",
        descripcion: "curie",
      },
      {
        codigo: "49",
        descripcion: "milicurie",
      },
      {
        codigo: "50",
        descripcion: "microcurie",
      },
      {
        codigo: "51",
        descripcion: "uiacthor",
      },
      {
        codigo: "52",
        descripcion: "muiacthor",
      },
      {
        codigo: "53",
        descripcion: "kg base",
      },
      {
        codigo: "54",
        descripcion: "gruesa",
      },
      {
        codigo: "61",
        descripcion: "kg bruto",
      },
      {
        codigo: "62",
        descripcion: "uiactant",
      },
      {
        codigo: "63",
        descripcion: "muiactant",
      },
      {
        codigo: "64",
        descripcion: "uiactig",
      },
      {
        codigo: "65",
        descripcion: "muiactig",
      },
      {
        codigo: "66",
        descripcion: "kg activo",
      },
      {
        codigo: "67",
        descripcion: "gramo activo",
      },
      {
        codigo: "68",
        descripcion: "gramo base",
      },
      {
        codigo: "1",
        descripcion: "kilogramos",
      },
      {
        codigo: "29",
        descripcion: "toneladas",
      },
      {
        codigo: "10",
        descripcion: "quilates",
      },
      {
        codigo: "47",
        descripcion: "mililitros",
      },
      {
        codigo: "5",
        descripcion: "litros",
      },
      {
        codigo: "27",
        descripcion: "cm cúbicos",
      },
      {
        codigo: "15",
        descripcion: "milimetros",
      },
      {
        codigo: "20",
        descripcion: "centímetros",
      },
      {
        codigo: "17",
        descripcion: "kilómetros",
      },
      {
        codigo: "7",
        descripcion: "unidades",
      },
      {
        codigo: "8",
        descripcion: "pares",
      },
      {
        codigo: "9",
        descripcion: "docenas",
      },
      {
        codigo: "11",
        descripcion: "millares",
      },
      {
        codigo: "0",
        descripcion: "",
      },
      {
        codigo: "97",
        descripcion: "seña/anticipo",
      },
      {
        codigo: "98",
        descripcion: "otras unidades",
      },
      {
        codigo: "99",
        descripcion: "bonificación",
      },
      {
        codigo: "95",
        descripcion: "anulación/devolución",
      },
    ]);

    expect(mock.isDone()).to.equal(true);
  });

  it("#autorizarComprobante", async () => {
    const metaService = new afip.MetaService("test");
    const auth = getAuthMock();

    const eb = new afip.Billing({
      cuit: 66666666666,
      auth,
      metaService,
    });

    const mock = mockAutorizarComprobante();

    expect(
      await eb.autorizarComprobante({
        codigoTipoComprobante: 1,
        numeroPuntoVenta: 1,
        numeroComprobante: 5,
        fechaEmision: new Date("2021-03-24T03:00:00.000Z"),
        codigoTipoDocumento: 80, // DNI
        numeroDocumento: 20135099202,
        importeSubtotal: 1,
        importeTotal: 1.21,
        subtotalesIVA: [
          {
            codigo: 5,
            importe: 0.21,
          },
        ],
        codigoMoneda: "PES",
        cotizacionMoneda: 1,
        codigoConcepto: 2,
        items: [
          {
            unidadesMtx: 1,
            codigoMtx: "0111111111117",
            descripcion: "Test",
            cantidad: 1,
            codigoUnidadMedida: 98,
            precioUnitario: 1,
            codigoCondicionIVA: 5,
            importeItem: 1.21,
            importeIVA: 0.21,
          },
        ],
        importeGravado: 1,
        fechaServicioDesde: new Date("2021-03-24T03:00:00.000Z"),
        fechaServicioHasta: new Date("2021-03-24T03:00:00.000Z"),
        fechaVencimientoPago: new Date("2021-03-24T03:00:00.000Z"),
      })
    ).to.eql({
      comprobanteResponse: {
        CAE: "71129054763262",
        codigoTipoComprobante: "1",
        cuit: 66666666666,
        fechaEmision: new Date("2021-03-24T00:00:00.000Z"),
        fechaVencimientoCAE: new Date("2021-04-03T00:00:00.000Z"),
        numeroComprobante: 5,
        numeroPuntoVenta: 1,
      },
      arrayObservaciones: undefined,
      evento: undefined,
      resultado: "A",
    });

    expect(mock.isDone()).to.equal(true);
  });
});
