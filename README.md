# PROYECTO FINAL | Curso de Backend | Coderhouse 2022

## Aclaraciones:
1) Se desea resaltar la idea de "API RESTful". Por lo que la mayoría de los endpoints entregan respuestas json, para que luego se implemente un front que las consuma.
2) Algunos endpoints renderizan vistas desde el servidor, utilizando el motor de plantillas "EJS". Esto se realizó así para cumplir con algunos requisitos del proyecto a modo de demostrar el aprendizaje de dicho motor de plantillas. Solo se aplica para vistas del panel de administrador "/admin", vistas de algunos errores, y para mostrar cierta información del servidor y su proceso ("/config").
3) Si bien el chat funciona con websockets, también se agregaron los endpoints necesarios para insertar, borrar y obtener mensajes mediante http a modo de API RESTful.
4) El frontend es servido desde la carpeta "public" del mismo servidor. El mismo se implemento con HTML, CSS, y JavaScript. A futuro se realizara un frontend en REACT en un servidor aparte.
5) No olvidar crear el archivo ".env" con los datos expuestos en ".env.example".
6) Los usuarios creados, por defecto son de rol "user". Por lo que, para crear un "admin" y testear las rutas a las que solo estos tienen acceso, se debe crear un usuario y luego modificar su role en la base de datos (desde mongo).
7) Opté por dejar en el proyecto los archivos correspondientes a la opción de base de datos de "firebase" para hacer su correcta y completa implementación a futuro (por el momento no funciona correctamente).
8) Se realizo el deploy en ["Railway"](https://proyectofinal-fullstack-production.up.railway.app/): https://proyectofinal-fullstack-production.up.railway.app/  


Para probar las funciones de admin desde ese [deploy en Railway](https://proyectofinal-fullstack-production.up.railway.app/), puedes usar el siguiente usuario:  

- email: rami@mail.com
- password: rami123

## Endpoints de la API:
1) **Productos**:  


	Metodos GET:
	- "/api/productos" → devuelve todos los productos existentes en la base datos. Puede o no recibir query param de orden por precio asc o desc ("?sort=1" || "?sort=-1").
	- "/api/productos/:id" → Devuelve un unico producto por id.
	- "/api/productos/categoria/:category" → devuelve todos los productos de esa categoria. Puede o no recibir query param de orden por precio asc o desc ("?sort=1" || "?sort=-1").  
	

	Metodo POST:
	- "/api/productos" → Recibe por body los datos del producto y devuelve el producto con su id asignado por el backend. Los datos obligatorios a enviar por body son: nombre, precio, stock. Alcaracion: Para acceder a este endpoint es necesario estar logueado como administrador.  


	Metodo PUT:
	- "/api/productos/:id" → Recibe por body los campos a modificar del producto con id que se paso por param de url. Alcaracion: Para acceder a este endpoint es necesario estar logueado como administrador.  


	Metodo DELETE:
	- "/api/productos/:id" → Elimina de la base de datos el producto con el id indicado en el param de url. Alcaracion: Para acceder a este endpoint es necesario estar logueado como administrador.  
	
    ```json
	El modelo de productos es el siguente:
    		timestamp: valor generado por el backend,
    		nombre: texto requerido,
    		descripcion: texto opcional,
    		codigo: texto opcional,
    		foto: texto (url) opcional,
    		precio: numero requerido,
    		stock: numero requerido,
    		categoria: texto opcional
     ```

2) **Carritos**:  


	Metodo GET:
	- "/api/carrito/:id/productos" → devuelve todos los productos existentes en el carrito.  
	

	Metodos POST:
	- "/api/carrito" → crea un nuevo carrito y se lo asigna al usuario.	
	- "/api/carrito/:id/productos" → agrega los productos que se pasan por body al carrito con el id indicado en el param url. El body del request debe contener: idProd (id del producto a agregar) y quantity (cantidad de dicho producto).  


	Metodos DELETE:
	- "/api/carrito/:id" → Elimina un carrito por completo.
	- "/api/carrito/:id/productos/:id_prod" → Elimina el producto con id indicado en el ultimo param de url (id_prod) del carrito que se indica en el primer param url (id).  


	Aclaracion: Para todos los endpoints de carrito se debe estar logueado. Solo se puede acceder al carrito del cual el usuario logueado es dueño.


3) **Usuarios**:  


	Metodos GET:
	- "/api/user/current" → Devuelve los datos del usuario logueado.
	- "/api/user/:id" → Devuelve los datos del usuario con id indicado.  

	
	Metodo POST:
	- "/api/user" → Registra un usuario en la base de datos Y devuelve los datos del mismo sin el password.
    ```json
		Recibe por body:
    		email: texto requerido,
   	 	    password: texto requerido,
    		firstName: texto requerido,
   		    lastName: texto requerido,
    		address: texto requerido,
    		age: numero requerido,
    		tel: numero requerido,
    		avatar: puede ser imagen o url opcional,
    		currentCart: {type: String, default: ""}  
    ```
	
	Metodo PUT:
	- "/api/user/:id" → Modifica los campos indicados con los valores enviados por body. Se debe estar autenticado para acceder.  


4) **Ordenes**:  


	Metodos GET:
	- "/api/order/:email" → Devuelve las ordenes generadas por el usuario cuyo email es el indicado en el param.  


	Metodo POST:
	- "/api/order" → Crea una nueva orden de compra a partir de los productos existentes en el carrito del usuario logueado. No requiere pasar ningun dato por body, solo estar logueado y tener productos en el carrito.  


5) **Chat/Mensajes**:  

	
	Metodo GET:	
	- "/api/chat/:email" → Devuelve todos los mensajes correspondientes a ese email.  


	Metodo POST:
	- "/api/chat" → Inserta un nuevo mensaje en la base de datos.
	Recibe por body:
	email: texto requerido,
	text: texto requerido.

	Metodo DELETE:
	- "/api/chat/:id" → Elimina un mensaje por su numero de id.  

	
6) **Categorias**:  

	
	Metodo GET:
	- "/api/categories" → Devuelve todas las categorias existentes en la base de datos.  

	
	Metodo POST:
	- "/api/categories" → Crea una nueva categoria y la guarda en la base de datos. Solo los usuarios con rol de admin pueden acceder.
	Recibe por body unicamente el "name" de la categoria.  

	
	Metodo DELETE:
	- "/api/categories/:name" → Elimina una categoria por su nombre. Solo los usuarios con rol de admin pueden acceder.  


7) **Login**:  

	
	Metodo POST:
	- "/login" → Inicia sesion del usuario pasado por body y devuelve los datos del mismo. La sesion se guarda en base de datos por 1min.
	Recibe por body:
	email: texto requerido,
	password: texto requerido.  


8) **Logout**:  


	Metodo GET:
	- "/logout" → Cierra sesion del usuario activo.