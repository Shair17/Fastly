# Fastly by Shair

# TODO

Lista de TODOS (cosas que faltan hacer) en Fastly, está separado por 3 categorías: **app**, **server** y **web**.

## App
* Mejorar pantalla de inicio de ***Fastly Main***, organizarlo mejor y mostrar contenido muy relevante para el usuario.
* Agregar pantallas de categorías, establecimientos, productos y alguna otra que se requiera.
* Pantalla de búsqueda, poner tan solo unos cuantos elementos en búsquedas recientes, más abajo poner más cosas, como productos o cosas que te podrían interesar (recordar lo que hace netflix cuando no hay una pélicula: se muestra contenido relacionado a la búsqueda...)
* Pantalla de carrito, poner los elementos agregados al carrito allí, hacer una bonita interfaz :)
* Pantalla de favoritos, poner los elementos agregados a favoritos allí, hacer una bonita interfaz :)
* Pantalla de perfil, mejorar sección de **Pedidos**
* Pantalla de perfil, llevar al usuario a la página de **Fastly** en play store al presionar **Califícanos**

## Server
* Eventos de socket para ordenes, solo faltan pequeños detalles.

## Web
* Crear panel administrativo web para **repartidores**
* Crear panel administrativo web para **clientes**
* Terminar lo que falta en el panel administrativo web para **admin**
* Reemplazar por un monorepo de react con vitejs, para así tener una sola carpeta de node_modules para todos los proyectos, menos al de main que es en nextjs.

# FUTURO

Son cambios o características que se pueden o no agregar en un futuro.

* ¿Reescribir todo el servidor en GO?
* ¿Migrar de arquitectura monolitica a microservicios pero con GO?
* ¿Usar tRPC o graphql?
* ¿Autenticación Oauth con más proveedores además de Facebook (Actual)?
* ¿Autenticación vía OTP por mensaje de texto con twilio?
* ¿Agregar modulos de Trending y Service?
* ¿Agregar ruc en entidad de customer (aún no se si será necesario o no)?
* ¿Agregar entidad de reservas (la idea de jorge que me comentó sobre hacer reservas...)?