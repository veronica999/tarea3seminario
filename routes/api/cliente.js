var express = require('express');
var router = express.Router();

const cliente= require('../../database/models/usuario');

/* GET users. */
router.get('/', function (req, res, next) {
    cliente.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay usuarios en la BD"
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

        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
/* save users. */
router.post('/', function (req, res, next) {

    let clienteData = {
      nombre: req.body.nombre,
      ci : req.body.ci,
      saldo : req.body.saldo,
      fechaderegistro : req.body.fechaderegistro,
    };

    let data = new cliente(clienteData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "cliente guardado",
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
    let idcliente= req.params.id;
    let clienteData = {};
    Object.keys(req.body).forEach((key) => {
        clienteData[key] = req.body[key];
    })

    cliente.findByIdAndUpdate(idcliente, clienteData).exec((err, result) => {
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
    let idcliente = req.params.id;

    cliente.remove({
        _id: idcliente
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
