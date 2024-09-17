# Eldad backend

## Database

To start the database, run the following commands in the "EldadUtils" folder:
```
docker build -t eldadapp_postgres .
docker-compose up -d
```
In the container, to connect to the database run:
```
PGPASSWORD=supersecretpassword psql -U eldaduser -h localhost -d eldad -p 5432
```

