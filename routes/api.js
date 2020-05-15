const express = require('express');
const router = express.Router();
const poetryControllers = require('../controllers/poetryserver/poetry')
const poemControllers = require('../controllers/poetryserver/poems')
const shijingControlls = require('../controllers/poetryserver/shijing')
const poemCollectionControllers = require('../controllers/poetryserver/poemCollections')
const poetControllers = require('../controllers/poetryserver/poets')
const idiomControllers = require('../controllers/dictionaries/idioms')
const wordControllers = require('../controllers/dictionaries/word')
const ciyuControllers = require('../controllers/dictionaries/ciyu')
const xiehouyuControllers = require('../controllers/dictionaries/xiehouyu')

 
router.get('/ts/poetrys', poetryControllers.getList);
router.get('/ts/poetrys/condition', poetryControllers.getListByCondition);
router.get('/ts/poetrys/author-id', poetryControllers.getListByAuthorId);

router.get('/song/poems', poemControllers.getList);
router.get('/song/poems/condition', poemControllers.getListByCondition);
router.get('/song/poems/title', poemControllers.getPoemTitleList);
router.get('/song/poems/author-id', poemControllers.getListByAuthorId);

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

router.get('/dictionaries/idioms/word',idiomControllers.getListByCondition)
router.get('/dictionaries/idioms',idiomControllers.getList)

router.get('/dictionaries/words/condition',wordControllers.getListByCondition)
router.get('/dictionaries/words',wordControllers.getList)

router.get('/dictionaries/ciyu/word',ciyuControllers.getListByCondition)
router.get('/dictionaries/ciyu',ciyuControllers.getList)

router.get('/dictionaries/xiehouyu/word',xiehouyuControllers.getListByCondition)
router.get('/dictionaries/xiehouyu',xiehouyuControllers.getList)


module.exports = router;
