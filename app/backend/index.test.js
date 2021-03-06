// subject:

const app = require('./index');



// dependencies:

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');

const config = require('./config');
const debug = require('./helpers/debug');
const routes = require('./routes');



// mocks:

jest.mock('body-parser');
jest.mock('compression');
jest.mock('express');

jest.mock('./config', () => {
  return {
    port: 7777
  };
});

jest.mock('./routes', () => {
  return jest.fn();
});

jest.mock('./helpers/debug', () => {
  return 'debug middleware';
});



// tests:

describe('app', () => {
  it('creats an express app instance', () => {
    expect(express).toHaveBeenCalled();
  });

  it('sets up json body parsing', () => {
    expect(app.use).toHaveBeenCalledWith(bodyParser.json());
  });

  it('sets up urlencoded body parsing', () => {
    expect(bodyParser.urlencoded).toHaveBeenCalledWith({
      extended: true
    });

    expect(app.use).toHaveBeenCalledWith(bodyParser.urlencoded());
  });

  it('sets up gzip compression', () => {
    expect(app.use).toHaveBeenCalledWith(compression());
  });

  it('sets up public directories', () => {
    expect(express.static).toHaveBeenCalledWith(`${appRoot}/app/public`);
    expect(express.static).toHaveBeenCalledWith(`${appRoot}/app/public/dist`);

    expect(app.use).toHaveBeenCalledWith(`express static - ${appRoot}/app/public`);
    expect(app.use).toHaveBeenCalledWith(`express static - ${appRoot}/app/public/dist`);
  });

  it('initializes all routes with express app', () => {
    expect(routes).toHaveBeenCalledWith(app);
  });

  it('sets up debug middleware', () => {
    expect(app.use).toHaveBeenCalledWith(debug);
  });

  it('listens on port defined by config', () => {
    expect(app.listen).toHaveBeenCalledWith(config.port);
  });
});
