var express = require('express');
var router = express.Router();

const pedido= require('../../database/models/pedido');

/* GET users. */
router.get('/', function (req, res, next) {
    pedido.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay pedidos en la BD"
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

    let pedidoData = {
      descripcion: req.body.descripcion,
      fechaentrga: req.body.fechaentrga,
      fechaderegistro : req.body.fechaderegistro,
      entregado : req.body.entregado,
      costetotal : req.body.costetotal,
      cliente : req.body.cliente,
      productos : req.body.productos,


    }

    let data = new pedido(pedidoData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "pedido guardado",
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
    let idpedido= req.params.id;
    let pedidoData = {};
    Object.keys(req.body).forEach((key) => {
        pedidoData[key] = req.body[key];
    })

    pedido.findByIdAndUpdate(pedido, pedidoData).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Se actualizaron el pedido"

            })
        }
    })
});
router.delete('/:id', function (req, res, next) {
    let idpedido = req.params.id;

    idpedido.remove({
        _id: idpedido
    }).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "pedidoeliminado",
                result: result
            })
        }
    })
});


module.exports = router;
