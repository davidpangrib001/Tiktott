const express = require('express');
const router = express.Router();
const { v1 } = require('node-tiklydown');
const { igdl } = require('instagram-url-direct');
const { cekKey } = require('../database/db');
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const {
  cakLontong,
  bijak,
  quotes,
  fakta,
  ptl,
  motivasi,
} = require('../controllers/randomtext');

router.get('/checkkey', async (req, res) => {
  const apikey = req.query.apikey;
  if (!apikey) {
    return res.status(404).json({
      status: 'error',
      message: 'Masukkan Apikey sebagai Parameter!',
    });
  }
  const check = await cekKey(apikey);
  if (!check) {
    return res.status(403).json({
      status: 'error',
      message: `Apikey ${apikey} Tidak Valid.`,
    });
  }
  return res.status(200).json({
    status: 'success',
    apikey,
    message: 'Aktif :)',
  });
});

router.get('/ytplay', youtubePlay);

router.get('/tiktok', async (req, res, next) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      status: 'error',
      creator: 'Davitt',
      message: 'Masukkan Parameter url. Contoh URL: https://vm.tiktok.com/ZSLQm7jbj/',
    });
  }
  try {
    const response = await v1(url);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/ig', async (req, res, next) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      status: 'error',
      creator: 'Davitt',
      message: 'Masukkan Parameter url. Contoh URL: https://www.instagram.com/p/CK0tLXyAzEI',
    });
  }
  try {
    const response = await igdl(url);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

module.exports = router;
