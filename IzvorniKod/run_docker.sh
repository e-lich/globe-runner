echo killing old docker processes
docker-compose rm -fs

echo building docker containers
docker-compose up --remove-orphans --build -d