const express = require('express');
const router = express.Router();

const { isProduction } = require('../../config/keys.js');

// router.get('/', function(req, res, next) {
//   res.json({
//     message: "GET /api/csrf"
//   });
// });

if(!isProduction) {
    router.get('/restore', (req, res) => {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken);
        res.status(200).json({
            'CSRF-Token': csrfToken
        });
    });
}



module.exports = router;