const express = require("express")
const path = require("path")
const router = express.Router()
const controllStudentCsv = require("../Controller/studentsCsv")
const upload = require("../Middleware/multer")

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../index.html"))
})

router.post("/upload", upload.single('csv'), controllStudentCsv.studentcsv)

router.get("/students/:id/result", controllStudentCsv.getresult)

router.get("/students", controllStudentCsv.getallresult)




module.exports = router