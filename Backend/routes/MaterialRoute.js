const express = require('express');
const router = express.Router();
const {CreateMaterial,UploadFile,getAll,getSingle,getSingleMaterial,getSingleMaterialAttachment} = require('../controllers/Material')
const {CoursevalidateToken} = require('../Utils/JWT')

const upload = require('../Utils/multer')
router.post('/create', CoursevalidateToken ,async(req,res)=>{

    CreateMaterial(req,res);

})

router.post('/uploadfile/:id',upload.array("pictures", 10),async(req,res)=>{

    UploadFile(req,res);

})

router.get('/Allfolders/:id',async(req,res)=>{
    getAll(req,res);
})

router.get('/folder/:id',async(req,res)=>{
    getSingle(req,res);
})

router.get('/file/:id',async(req,res)=>{
    getSingleMaterialAttachment(req,res)
})

module.exports = router;