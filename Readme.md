1. Para ver el backend en production ir a https://api-appvisits-production.up.railway.app/
2. Para el Api RESt https://api-appvisits-production.up.railway.app/docs 
3. Para usarlo localmente descargar el repositorio y usar su manejador  de paquetes preferido *pnpm* o *npm* e instar las dependecias **pnpm install**
4. Crear un archivo **.env** con las variables necesarias *.env.example* para la coneccion a su base de datos *postgreSQL* si desea otra base de datos a convenicia cambiar la base de datos del *schema.prisma*
5. Generar el prisma con *npx prisma generate* and *npx prisma db push* para generar las consultas a su base de datos
6. Correr el backend usando **npm run dev** o **pnpm run dev**