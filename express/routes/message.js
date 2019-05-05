import express from 'express'

const router = express.Router();

router.post('/', (req, res, next) => {
    res.json({
        'err_code': '200',
        "msg": "hahahahahahahaha"
    })
})

module.exports = router;