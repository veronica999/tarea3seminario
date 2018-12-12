var express = require('express');
var router = express.Router();

const alimento= require('../../database/models/alimento');

/* GET users. */
router.get('/', function (req, res, next) {
    alimento.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay alimento en la BD"
                })
            } else {
                res.json({
                    count: docs.length,
                    result: docs,
                    request: {
                        type: "GET"
                    }

                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', function (req, res, next) {

    let alimentoData = {
      nombre: req.body.nombre,
      calorias : req.body.calorias,
      hidratosCa : req.body.hidratosCa,
      proteinas : req.body.proteinas,
      grasaa : req.body.grasaa,
      fibra : req.body.fibra,

    }

    let data = new alimento(alimentoData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "alimento guardado",
                doc: docs
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});
router.patch('/:id', function (req, res, next) {
    let idalimento= req.params.id;
    let alimentoData = {};
    Object.keys(req.body).forEach((key) => {
        alimentoData[key] = req.body[key];
    })

    alimento.findByIdAndUpdate(idalimento, alimentoData).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Se actualizaron los datos"

            })
        }
    })
});
router.delete('/:id', function (req, res, next) {
    let idalimento = req.params.id;

    alimento.remove({
        _id: idalimento
    }).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "cliente eliminado",
                result: result
            })
        }
    })
});


module.exports = router;
