

const fs = require('fs')

class ProductManager {

    constructor() {
        
        console.log('resultado:')

        this.path = "./bd.json"
        this.productos = async () => {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            data = JSON.parse(data)
            console.log('resultado de data:')
            console.log(data)
            return  data || []
        }
    }

    #id = 0

    getProducts() {
        return this.productos
    }

    addProduct(title, description, price, thumbail, code, stock) {
        //Controlar que el producto no este repetido
        if (this.productos.find(n => n.code === code)) return 'ERROR: Producto repetido'
        
        //Controla que todos los valores contengan datos. 
        if(!(title && description && price && thumbail && code && stock)) return "ERROR: Todos los campos son requeridos"

        let producto = {
            id: this.#id,
            title: title,
            description: description,
            price: price,
            thumbail: thumbail,
            code: code,
            stock: stock
        }

        this.#id++
        this.productos.push(producto)

        fs.promises.writeFile(this.path, JSON.stringify(producto))

        return "Producto agregado exitosamente"
    }
    
    getProductById(getId) {
        return this.productos.find(n => n.id == getId) || "ERROR: Not found"
    }
}


//Instanciando la clase
const administrador = new ProductManager

//✓	Se llama “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(administrador.getProducts())

//✓	Se llama al método “addProduct” con los campos detallados
// console.log(administrador.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25))

//✓	Se llama el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// console.log(administrador.getProducts())

//✓	Se llama al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// console.log(administrador.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25))

//Se agregan 2 productos mas
// console.log(administrador.addProduct("producto prueba2", "Este es un producto prueba2", 300, "Sin imagen2","abc124", 50))
// console.log(administrador.addProduct("producto prueba3", "Este es un producto prueba3", 400, "Sin imagen3","abc125", 100))

//✓	Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
// console.log(administrador.getProductById(0))

//Faltan datos para ingresar el nuevo producto
// console.log(administrador.addProduct("producto prueba3", "Este es un producto prueba3", 400, "Sin imagen3","", 100))


// Se vuelve a llamar a todos los productos.
// console.log(administrador.getProducts())






