# Project Cicchini

Este proyecto es una **API educativa** desarrollada como parte del curso de **Back End III de CoderHouse**, originalmente orientada a la gestión de productos y carritos de compras, y extendida para incluir **gestión de usuarios, mascotas** y **generación de datos de prueba (mocks)** con conexión a MongoDB Atlas.

La API permite:
- Agregar, modificar, eliminar y listar productos.
- Crear y administrar carritos de compras.
- Gestionar usuarios y mascotas.
- Generar datos ficticios (usuarios y mascotas) para pruebas, con contraseñas encriptadas y formatos compatibles con MongoDB.

---

## API Reference

### Products
```http
GET    /api/products
GET    /api/products/:pid
GET    /api/products?page=<n>&limit=<n>&sort=<asc|desc>&query=<title>
POST   /api/products
PUT    /api/products/:pid
DELETE /api/products/:pid
```

| Parameter     | Type                 | Description |
|---------------|----------------------|-------------|
| `title`       | `string`             | **Required**. Título del producto |
| `description` | `string`             | **Optional**. Descripción del producto |
| `code`        | `string` / `number`  | **Required**. Código del producto |
| `price`       | `number`             | **Required**. Precio del producto |
| `stock`       | `number`             | **Required**. Stock del producto |
| `category`    | `string`             | **Required**. Categoría a la que pertenece el producto |
| `thumbnail`   | `link`               | **Optional**. Referencia del producto |

---

### Carts
```http
POST   /api/carts
POST   /api/carts/:cid/products/:pid
GET    /api/carts/:cid
DELETE /api/carts/:cid/products/:pid
DELETE /api/carts/:cid
PUT    /api/carts/:cid
PUT    /api/carts/:cid/products/:pid
```

| Parameter | Type     | Description |
|-----------|----------|-------------|
| `cid`     | `string` | **Required**. Id del carrito |
| `pid`     | `string` | **Required**. Id del producto a agregar o eliminar |

---

### Users (básico para integración con mocks)
```http
GET    /api/users
GET    /api/users/:uid
POST   /api/users
```
- Los usuarios incluyen: `first_name`, `last_name`, `email`, `password` (encriptado con bcrypt), `role` (`user` o `admin`), y `pets` (array de ObjectId o vacío por defecto).

---

### Pets
```http
GET    /api/pets
GET    /api/pets/:pid
POST   /api/pets
```
- Las mascotas incluyen: `name`, `species` y `owner` (ObjectId del usuario dueño, opcional).

---

### Mocks (nueva funcionalidad)
**Ruta base:** `/api/mocks`

```http
GET    /api/mocks/mockingusers?count=<n>
GET    /api/mocks/mockingpets?count=<n>
POST   /api/mocks/generateData
```

#### GET `/mockingusers`
Genera `n` usuarios ficticios (por defecto 50), sin insertarlos en la base de datos.  
- Contraseña por defecto: `"coder123"` (encriptada con bcrypt).
- Rol aleatorio entre `user` y `admin`.
- `pets` inicial como array vacío.
- Campos con formato de documento MongoDB.

#### GET `/mockingpets`
Genera `n` mascotas ficticias, sin insertarlas en la base de datos.

#### POST `/generateData`
Genera e inserta en la base de datos usuarios y mascotas según los parámetros recibidos.  
**Body ejemplo:**
```json
{
  "users": 10,
  "pets": 5
}
```
- Inserta los documentos en las colecciones `users` y `pets` de la base configurada (`BackEndIII` en MongoDB Atlas).
- Retorna cantidad insertada y `_id` de cada documento.

---

## Tech Stack

**Server:** Node.js + Express.js  
**DB:** MongoDB Atlas (colecciones: `products`, `carts`, `users`, `pets`)  
**Dependencias clave:**  
- express  
- dotenv  
- mongoose + mongoose-paginate-v2  
- bcrypt (hash de contraseñas)  
- @faker-js/faker (generación de datos ficticios)  

**Testing:** Postman

---

## Environment Variables

Crear un archivo `.env` en el root del proyecto con las siguientes variables:

```env
USERMONGODB=<usuario Mongo Atlas>
PASSWORDMONGODB=<contraseña Mongo Atlas>
PORT=<puerto local>
```

**Nota:** La cadena de conexión (`connectionString`) en la configuración ya apunta a la base `BackEndIII`:
```
mongodb+srv://${USERMONGODB}:${PASSWORDMONGODB}@cluster0.noki4.mongodb.net/BackEndIII?retryWrites=true&w=majority&appName=Cluster0
```

---

## Deployment

Para iniciar el proyecto:

```bash
npm install
npm run dev
```

---

## Authors

- [@nec91](https://github.com/nec91/ProjectCicchini)
