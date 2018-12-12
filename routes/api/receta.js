var express = require('express');
var router = express.Router();

const receta= require('../../database/models/receta');


router.get('/', function (req, res, next) {
    receta.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay "
                })
            } else {
                res.json({
                    count: docs.length,
                    result: docs,
                    request: {
                        type: "GET"
                    }

                });
            }
          }
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', function (req, res, next) {

    let recetaData = {
      nombre: req.body.nombre,
      instrucciones: req.body.instrucciones,
      porciones: req.body.porciones,
      tipo : req.body.tipo,
      ingredientes : req.body.ingredientes,


    };

    let data = new receta(recetaData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: " guardado",
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
    let receta= req.params.id;
    let recetaData = {};
    Object.keys(req.body).forEach((key) => {
        recetaData[key] = req.body[key];
    })

    receta.findByIdAndUpdate(receta, recetaData).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Se actualizaron "

            })
        }
    })
});
router.delete('/:id', function (req, res, next) {
    let idreceta= req.params.id;

    receta.remove({
        _id: idreceta
    }).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "producto eliminado",
                result: result
            })
        }
    })
});


module.exports = router;
