# Next.js Openjira App

Para correr localmente es necesario una base de datos

```
docker-compose up -d
```

- El -d, significa (detached) que se ejecute en segundo plano sin aparecer en la consola

MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno en el archivo .env creandolo previamente

## Llenar la base de datos con informacion de pruebas

```
http://localhost:3000/api/seed
```
