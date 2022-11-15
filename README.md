# PROYECTO FINAL | Curso de Backend | Coderhouse 2022

## Aclaraciones:
1) Se desea resaltar la idea de "API RESTful". Por lo que la mayoría de los endpoints entregan respuestas json, para que luego se implemente un front que las consuma.
2) Algunos endpoints renderizan vistas desde el servidor, utilizando el motor de plantillas "EJS". Esto se realizó así para cumplir con algunos requisitos del proyecto a modo de demostrar el aprendizaje de dicho motor de plantillas. Solo se aplica para vistas del panel de administrador "/admin", vistas de algunos errores, y para mostrar cierta información del servidor y su proceso ("/config").
3) Si bien el chat funciona con websockets, también se agregaron los endpoints necesarios para insertar, borrar y obtener mensajes mediante http a modo de API RESTful.
4) El frontend es servido desde la carpeta "public" del mismo servidor. El mismo se implemento con HTML, CSS, y JavaScript. A futuro se realizara un frontend en REACT en un servidor aparte.
5) No olvidar crear el archivo ".env" con los datos expuestos en ".env.example".
6) Los usuarios creados, por defecto son de rol "user". Por lo que, para crear un "admin" y testear las rutas a las que solo estos tienen acceso, se debe crear un usuario y luego modificar su role en la base de datos (desde mongo).
7) Opté por dejar en el proyecto los archivos correspondientes a la opción de base de datos de "firebase" para hacer su correcta y completa implementación a futuro (por el momento no funciona correctamente).