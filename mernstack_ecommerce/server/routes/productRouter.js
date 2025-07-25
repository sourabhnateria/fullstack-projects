const router = require('express').Router()
const productController= require ('../controller/productController')

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/product')
.get(productController.getProducts)
.post(productController.createProducts)


router.route('/product/:id')
.delete(productController.deleteProduct)
.put(productController.updateProduct)
module.exports = router