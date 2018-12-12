var express = require('express');
var router = express.Router();

const producto= require('../../database/models/producto');


router.get('/', function (req, res, next) {
    producto.find().exec()
        .then(docs => {
            if (docs.length == 0) {
                res.json({
                    message: "NO hay productos en la BD"
                });
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

    let productoData = {
      nombre: req.body.nombre,
      descripcion : req.body.descripcion,
      precio: req.body.precio,
      stock : req.body.stock,

    };

    let data = new producto(productoData);

    data.save()
        .then(docs => {
            console.log(res);
            res.json({
                message: "producto guardado",
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
    let producto= req.params.id;
    let productoData = {};
    Object.keys(req.body).forEach((key) => {
        productoData[key] = req.body[key];
    })

    producto.findByIdAndUpdate(producto, productoData).exec((err, result) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        if (result) {
            res.status(200).json({
                message: "Se actualizaron los producto"

            })
        }
    })
});
router.delete('/:id', function (req, res, next) {
    let idproducto = req.params.id;

    producto.remove({
        _id: idproducto
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
