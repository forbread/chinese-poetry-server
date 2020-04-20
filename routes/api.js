const express = require('express');
const router = express.Router();
const poetryControllers = require('../controllers/poetry')
const poemControllers = require('../controllers/poems')
const shijingControlls = require('../controllers/shijing')
const poemCollectionControllers = require('../controllers/poemCollections')
const poetControllers = require('../controllers/poets')

 
router.get('/ts/poetrys', poetryControllers.getList);
router.get('/ts/poetrys/condition', poetryControllers.getListByCondition);
router.get('/ts/poetrys/author-id', poetryControllers.getListByAuthorId);

router.get('/song/poems', poemControllers.getList);
router.get('/song/poems/condition', poemControllers.getListByCondition);
router.get('/song/poems/title', poemControllers.getPoemTitleList);

router.get('/shijing/list/condition', shijingControlls.getListByCondition);
router.get('/shijing/list', shijingControlls.getList);
router.get('/shijing/chapter', shijingControlls.getChapter);
router.get('/shijing/section', shijingControlls.getSection);
router.get('/sishuwujing/list', shijingControlls.getSishuwujingList);

router.get('/wudai/poems',poemCollectionControllers.getList)
router.get('/wudai/poems/condition',poemCollectionControllers.getListByCondition)
router.get('/wudai/poets',poemCollectionControllers.getAuthorList)
router.get('/wudai/poems/title',poemCollectionControllers.getRhythmicList)

router.get('/poetry/poets/dynasty',poetControllers.getPoetryListByDynasty)
router.get('/poetry/poet:id',poetControllers.getPoetryById)
router.get('/poetry/poets/list',poetControllers.getPoetryList)
router.get('/poem/poet:id',poetControllers.getPoemById)
router.get('/poem/poets/list',poetControllers.getPoemList)


module.exports = router;
