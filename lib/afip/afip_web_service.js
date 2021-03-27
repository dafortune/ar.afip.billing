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

/**
 * Base class for AFIP web services
 **/
module.exports = class WebService {
  constructor(webServiceOptions) {
    if (!webServiceOptions) {
      throw new Error("Missing Web Service Object");
    }

    this.soapv12 = webServiceOptions.soapV12 || false;

    this.WSDL = webServiceOptions.WSDL;
    this.URL = webServiceOptions.URL;
  }

  async executeRequest(operation, params = {}) {
    if (!this.soapClient) {
      let soapClientOptions = {
        disableCache: true,
        forceSoap12Headers: true,
      };

      this.soapClient = await soap.createClientAsync(
        this.WSDL,
        soapClientOptions
      );
      this.soapClient.setEndpoint(this.URL);
    }

    let [result] = await this.soapClient[operation + "Async"](params);

    return result;
  }
};
