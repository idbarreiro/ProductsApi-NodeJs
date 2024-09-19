<h2>Rest Api</h1>

Desarrollar API REST que gestione una lista de productos, uno usando Node.Js.

<h3>Configuración Inicial</h3>

Se realiza la instalacion de los modulos necesarios para el funcionamiento de la Api
<b>Comandos</b>
1. npm install express mssql morgan cors dotenv 
2. npm install @babel/core @babel/cli @babel/preset-env @babel/node nodemon -D

Si desea puede copiar el archivo .env que se envio al correo con los repositorios para la configuración del puerto que desee.

<h3>Ejecución de la Solución</h3>
Para ejecutar la solución y tener acceso a los endpoint de la Api debe ejecutar el siguiente comando
<li>npm run dev</li>

<h3>Configuración base de datos</h3>

Para el proyecto se configuro el usuario sa de Microsoft SQL Server Managment  Studio.

Para que la conexion de la base de datos se realice correctamente se debe realizar la siguiente configuracion:
<li>Ir al administracion de equipos - en el explorador de archivos en la carpeta con nombre (Este equipo) dar click derecho.</li>
<li>Seleccionar la opción administrar.</li>
<li>Ir a la opción servicios y aplicaciones.</li>
<li>Seleccionar la opción SQL Server Configuration Manager.</li>
<li>Dar doble click sobre SQL Server Network Configuration.</li> 
<li>Dar doble click en cada uno de los protocols y cambiar la propiedad TCP/IP de disable a enabled.</li>
<li>Despues seleccionar SQL Server Services y para los servicios SQL Server (MSSQLSERVER) y (SQLSERVER) dar click derecho restart para aplicar los cambios realizados</li>

<h3>Extensiones</h3>
Instalar extension Rest Client VSCode para poder ejecutar los request que se encuentran en el archivo <b>products.http</b>

Para la Rest Api creada con Node.Js se tiene desarrolladas las funcionalidad de 
<li>Actualizar un producto por medio del Id.</li>
<li>Eliminar un producto por medio del Id.</li>
