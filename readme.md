# Subir PDF's a Zoho

## Instalar Modulos

> npm init o yarn init

## Modificar las variables

> Modifique las variables de entorno con los datos de su organización y la dirección de su DB en MongoDb

## Cargar los datos

> en el directorio './resources/pdf' Se deberá incluir un archivo .json con el formato de
> {  
>  ID_DE_ZOHO:XXXXXXXXXXXXXXXXXXX,
> NOMBRE_DE_ARCHIVO: xxxxxxx
> }

## Iniciar la carga

> Para iniciar la carga una vez completados los pasos anteriores en su consola ingrese el siguiente comando -- nodemon index
> La primera vez se generará un token para que la aplicación pueda ingresar a su organización,
> La segunda vez que guarde el archivo se procederá a la carga de los mismos

## Comentarios

> Actualmente la carga está configurada solo para Potentials / Negociaciones
