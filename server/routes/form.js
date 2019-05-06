import express from 'express'
import formidableMiddleware from 'express-formidable'

let events = [{
    event: 'error',
    action: (req, res, error) => {
        console.log(error)
        res.json({
            code: 310,
            err_msg: error
        })
    }
}]

let options = {
    encoding: 'utf-8',
    uploadDir: '/test',
    keepExtensions: true,
    multiples: true, // req.files to be arrays of files
    /* maxFileSize: 10 * 1024, */
}
let form = formidableMiddleware(options, events)
const router = express.Router();

router.post("/", form, (req, res) => {
    res.json({
        data: req.fields
    })
})

module.exports = router;