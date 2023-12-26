

const fs = require('fs')

class ProductManager {

    constructor() {
        
        this.path = "./bd.json"
        this.productos = this.leerProductos()
    }

    #id = 0

    async leerProductos() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            // console.log(JSON.parse(data))
            
            return JSON.parse(data) || []
        } catch (error) {
            // Manejo de errores en la lectura del archivo
            console.error('ERROR: Al leer el archivo:', error);
            return [];
        }
    }

    async writeProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos, null, 2));
        } catch (error) {
            // Manejo de errores en la escritura del archivo
            console.error('Error al escribir en el archivo:', error);
        }
    }
    
    getProducts() {
        return this.productos
    }

    async addProduct(title, description, price, thumbail, code, stock) {
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

        await this.writeProducts(); // Esperar a que se complete la escritura antes de retornar

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






