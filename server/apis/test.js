'use strict';

const express = require(`express`);
const testApi = express.Router();

testApi.get(`/`, async (req, res) => {
  return res.json({
    success: true,
    generatedAt: (new Date()).toISOString(),
  });
});

module.exports = testApi;
