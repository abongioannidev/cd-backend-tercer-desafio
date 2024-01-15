# Servidor con express

## Consigna

Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

### Aspectos a incluir

- Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.
- Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
- El servidor debe contar con los siguientes endpoints:
  - ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
    - Si no se recibe query de límite, se devolverán todos los productos.
    - Si se recibe un límite, sólo devolver el número de productos solicitados.
  - ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.

### Sugerencias

- Tu clase lee archivos con promesas. recuerda usar async/await en tus endpoints
- Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.

### Formato del entregable

- Link al repositorio de Github con el proyecto completo, el cual debe incluir:
  - carpeta src con app.js dentro y tu ProductManager dentro.
  - package.json con la info del proyecto.
  - NO INCLUIR LOS node_modules generados.

## Servir aplicacion de forma local

```
# instalar dependencias
npm install

# ejecutar aplicacion
npm run start


```

## Coleccion de Postman para prueba

```
{
	"info": {
		"_postman_id": "d367617d-24f9-4bde-9d46-790f1959e239",
		"name": "desafios-coderhouse",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "14969183"
	},
	"item": [
		{
			"name": "desafio 3",
			"item": [
				{
					"name": "GET Products",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/products?limit=5",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"products"
							],
							"query": [
								{
									"key": "limit",
									"value": "5"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "GET Product by id",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/products/1",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"products",
								"1"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
```
