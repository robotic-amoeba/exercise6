# Ejercicio 6

## Introducción

Gracias a las mejoras en disponibilidad que hemos implementado, el número de clientes de nuestro servicio va a incrementarse rápidamente. A partir de ahora, la aplicación tiene que ser capaz de gestionar una cantidad muy elevada de peticiones simultáneas de envío de mensajes. 

### 1 - Dejando las cosas para luego

Para ser capaces de atender una mayor cantidad de peticiones y evitar una saturación de nuestra aplicación, vamos a implementar un sistema de procesamiento asíncrono basado en el encolado de las peticiones. Esta medida nos permitirá procesar cada conexión entrante con mucha más rapidez, por lo que podremos atender a más clientes.

- Define e inicializa una instancia de `redis` en el sistema.
- Implementa una cola de trabajos basada en `redis` (puedes desarrollar la implementación completa o usar una librería existente, lo que prefieras) y un proceso que se encargue de recoger los trabajos encolados (en orden de llegada) y procesar su envío.
- Modifica nuestro endpoint `/messages` de forma que ahora encole los mensajes conforme los reciba, para su posterior procesado y envío. Piensa cómo debe ser la respuesta de este endpoint, ahora que el mensaje aún no fue procesado.

### 2 - ¿Cómo va lo mío?

Ahora el cliente que manda una petición de envío de mensaje no puede saber si el envío se realizó correctamente en el momento. Hay que ofrecer una sistema que permita consultar el estado de un mensaje (¿ha sido enviado correctamente o no? ¿está en espera de ser procesado? ¿ha ido algo mal?). Para esto, es necesario que todos los mensajes sean identificados de forma unica a su recepción en el sistema.

- Asigna un identificador único a cada mensaje recibido en el endpoint `/messages`. De esta forma podemos consultar su estado más adelante.
- Implementa un nuevo endpoint `/message/:messageId/status` con método `GET` que permita consultar el estado de un mensaje. Como parámetro para la consulta debe recibir el identificador único del mensaje en el path. Por ejemplo: `http://127.0.0.1:9006/message/156656739486/status`. La respuesta del endpoint será un JSON con un único campo `status` que contenga el estado del mensaje consultado.
- Piensa en los posibles estados de un mensaje ahora que se procesan de forma asíncrona.
- ¿Cómo afectan estos cambios a nuestro modelo de datos? ¿Qué queremos almecenar ahora? ¿Y cuándo?