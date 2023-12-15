const shoppingCartServices = require("../services/shoppingCartServices")
const productoServices = require("../services/productServices")

module.exports = {

    carrito: async (req,res)=>{
        const productos = await shoppingCartServices.getAtllShoppingCart()

        const productosUsuario = await shoppingCartServices.productsFilter(productos, req)

        const total = await shoppingCartServices.getTotalPrice(productosUsuario)

        res.render("carrito_de_compras", {productosUsuario, total})
    },

    agregarACarrito: async (req, res) => {
        const idProducto = req.params.id
        const user = req.session.userLogged
        const userId = user.id
        const size = req.body
        console.log("TALLE ELEGIDO ===>>>", size)

        productoServices.getProductId(idProducto).then(producto => {
            shoppingCartServices.addToCart(producto, userId)
            res.redirect("/carrito")
        })
    },

}