// This file is inspired on a similar file from https://github.com/AfipSDK/afip.js
// 
// MIT License
//
// Copyright (c) 2019 Afip SDK
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

const soap = require("soap");
const forge = require("node-forge");
const xml2js = require("xml2js");

const xmlParser = new xml2js.Parser({
  normalizeTags: true,
  normalize: true,
  explicitArray: false,
  attrkey: "header",
  tagNameProcessors: [(key) => key.replace("soapenv:", "")],
});

class Auth {
  constructor({ metaService, cert, key }) {
    this.CERT = cert;
    this.PRIVATEKEY = key;

    const meta = metaService.getMeta("wsaa");

    this.WSAA_WSDL = meta.WSDL;
    this.WSAA_URL = meta.URL;
  }

  async createAuthData(service) {
    const date = new Date();

    // Tokent request authorization XML
    const tra = `<?xml version="1.0" encoding="UTF-8" ?>
	<loginTicketRequest version="1.0">
		<header>
			<uniqueId>${Math.floor(date.getTime() / 1000)}</uniqueId>
			<generationTime>${new Date(
        date.getTime() - 600000
      ).toISOString()}</generationTime>
			<expirationTime>${new Date(
        date.getTime() + 600000
      ).toISOString()}</expirationTime>
		</header>
		<service>${service}</service>
	</loginTicketRequest>`.trim();

    const cert = this.CERT;
    const key = this.PRIVATEKEY;

    const p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(tra, "utf8");
    p7.addCertificate(cert);
    p7.addSigner({
      authenticatedAttributes: [
        {
          type: forge.pki.oids.contentType,
          value: forge.pki.oids.data,
        },
        {
          type: forge.pki.oids.messageDigest,
        },
        {
          type: forge.pki.oids.signingTime,
          value: new Date(),
        },
      ],
      certificate: cert,
      digestAlgorithm: forge.pki.oids.sha256,
      key: key,
    });
    p7.sign();
    const bytes = forge.asn1.toDer(p7.toAsn1()).getBytes();
    const signedTRA = Buffer.from(bytes, "binary").toString("base64");

    const soapClientOptions = { disableCache: true, endpoint: this.WSAA_URL };

    const soapClient = await soap.createClientAsync(
      this.WSAA_WSDL,
      soapClientOptions
    );

    const loginArguments = { in0: signedTRA };

    const [loginCmsResult] = await soapClient.loginCmsAsync(loginArguments);

    const res = await xmlParser.parseStringPromise(
      loginCmsResult.loginCmsReturn
    );

    const taData = res.loginticketresponse;

    return {
      expirationTime: new Date(taData.header[1].expirationtime),
      token: taData.credentials.token,
      sign: taData.credentials.sign,
    };
  }

  static getServiceTAFromAuthData({ expirationTime, token, sign }) {
    const actualTime = new Date(Date.now() + EXPIRATION_LEE_WAY);

    if (actualTime >= expirationTime) {
      return null;
    }

    return {
      token,
      sign
    };
  }
}

module.exports = Auth;
