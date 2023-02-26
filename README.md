# project-angular

init the project :
- run ``docker run --name project_angular -e POSTGRES_PASSWORD=password -p 6666:5432 -d postgres``
- run ``npm install`` in both directory
- run ``npx prisma migrate dev --name init`` in api directory
- run ``node ./initBdd`` in api directory


start the project : 
- run ``npm start`` in both app and api directory in two distinct terminal
