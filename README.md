
# Project Cicchini

Este proyecto es una API para la gestión de productos y carritos de compras, permitiendo agregar, modificar, eliminar y listar productos almacenados en un archivo JSON. Se utiliza Express.js para el manejo de rutas y fs para la manipulación de archivos.

Dicho proyecto se realiza a modo educativo, para curso de Back end I de CoderHouse.


## API Reference

#### Routes

#### Products


```http
GET /api/products → Obtener todos los productos paginados.

GET /api/products/:pid → Obtener un producto por su ID.

GET /api/products?page=<numero de pagina>&limit=<limite como numero>&sort=<orden>&query=<title> → Obtener productos paginados pasando por parametros como se desea ordenar.

POST /api/products → Agregar un nuevo producto.

PUT /api/products/:pid → Modificar un producto.

DELETE /api/products/:pid → Eliminar un producto.
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Título del producto |
| `description` | `string` | **Optional**. Descripción del producto |
| `code` | `string` / `number` | **Required**. Código del producto |
| `price` | `number` | **Required**. Precio del producto |
| `stock` | `number` | **Required**. Stock del producto |
| `category` | `string` | **Required**. Categoría a la que pertenece el producto |
| `thumbnail` | `link` | **Optional**. Referencia del producto |

#### Carts
```http
POST /api/carts → Crear un nuevo carrito.

POST /api/carts/:cid/products/:pid → Agregar un producto al carrito.

GET /api/carts/:cid → Obtener un carrito por ID.

DELETE /api/carts/:cid/products/:pid → Eliminar un producto del carrito.

DELETE /api/carts/:cid → Eliminar un carrito especifico por ID.

PUT /api/carts/:cid → Reemplaza todos los productos del carrito por req.body.

PUT /api/carts/:cid/products/:pid → Actualiza solo la cantidad de un producto en el carrito.
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `cid`      | `number` | **Required**. Id del carrito |
| `pid`      | `number` | **Required**. Id del producto a agregar o eliminar |


## Authors

- [@nec91](https://github.com/nec91/ProjectCicchini)


## Tech Stack

**Server:** NodeJS
**Dependences:** Express, dotenv, mongoose, mongoose-paginate-v2
**Testing:** POSTMAN
**DB:** MongoDB


## Environment Variables

Para correr este proyecto es necesario crear un archivi .ENV, donde se introduciran las siguientes variables de entorno. La clave de las mismas serán las siguientes:

`USERMONGODB`

`PASSWORDMONGODB`

Los valores seran proporcionados por el administrador de dicho proyecto en un ambiente seguro.

## Deployment

Para inicializar el proyecto, posicionarse dentro de la carpeta /ProjectCicchini e instalar node_modules con el siguiente comando

```bash
  npm install
```

Las dependecias ya se encuentran instaladas en el package.json

Caso contrario instalarlas con el siguiente comando

```bash
  npm install express dotenv mongoose mongoose-paginate-v2
```

Para levantar el servidor utilizar el siguiente comando (en el caso de usar el package.json que figura en el repositorio de GitHub)

```bash
  npm run dev
```

