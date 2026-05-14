# 1. Crea la base de datos
mysql -u root -p

# 2. Ejecuta el script de inicialización
SOURCE database/init.sql;

# 3. Verifica que la base de datos se creó
SHOW DATABASES;
USE nova_salud;
SHOW TABLES;