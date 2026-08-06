-- Creación de la base de datos principal
CREATE DATABASE IF NOT EXISTS db_congregacion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_congregacion;

-- Tabla maestra de Hermanos Activos (Cumple con las formas normales para almacenar toda la congregación de forma limpia)
CREATE TABLE IF NOT EXISTS hermanos_activos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    precursorado VARCHAR(50) NOT NULL,
    grupo INT NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    mayor_edad VARCHAR(5) NOT NULL
);

-- Tabla de Hermanos Inactivos
CREATE TABLE IF NOT EXISTS hermanos_inactivos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    precursorado VARCHAR(50) NOT NULL,
    grupo INT NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    mayor_edad VARCHAR(5) NOT NULL
);

-- Inserción de registros iniciales para Hermanos Activos
INSERT INTO hermanos_activos (nombre, cargo, precursorado, grupo, genero, mayor_edad) VALUES
-- GRUPO 1
('Segura, Eder', 'Anciano', 'Ninguno', 1, 'M', 'Sí'),
('Ubillus, Gabriel', 'Siervo Ministerial', 'Precursor Auxiliar', 1, 'M', 'Sí'),
('Alvarez, Giovana', 'Publicador Bautizado', 'Ninguno', 1, 'F', 'Sí'),
('Calderon, Erika de', 'Publicador Bautizado', 'Ninguno', 1, 'F', 'Sí'),
('Calderon, Carlos', 'Publicador Bautizado', 'Ninguno', 1, 'M', 'Sí'),
('Davila, Edilter', 'Publicador Bautizado', 'Ninguno', 1, 'M', 'Sí'),
('Davila, Enoc', 'Siervo Ministerial', 'Precursor Regular', 1, 'M', 'Sí'),
('Davila, Luz', 'Publicador Bautizado', 'Precursor Regular', 1, 'F', 'Sí'),
('Horna, Roxana', 'Publicador Bautizado', 'Ninguno', 1, 'F', 'Sí'),
('Olano, Gaudencia', 'Publicador Bautizado', 'Precursor Regular', 1, 'F', 'Sí'),
('Olano, Daynee', 'Publicador Bautizado', 'Precursor Auxiliar', 1, 'F', 'Sí'),
('Peña, Aaron', 'Publicador No Bautizado', 'Ninguno', 1, 'M', 'No'),
('Perfecto, Indalecio', 'Publicador Bautizado', 'Ninguno', 1, 'M', 'Sí'),
('Perfecto, Jannet', 'Publicador Bautizado', 'Ninguno', 1, 'F', 'Sí'),
('Rios, Juan', 'Siervo Ministerial', 'Ninguno', 1, 'M', 'Sí'),
('Rios, Amelia', 'Publicador Bautizado', 'Precursor Auxiliar', 1, 'F', 'Sí'),
('Rios, Jamely', 'Publicador Bautizado', 'Precursor Regular', 1, 'F', 'Sí'),
('Rosales, Victor', 'Publicador Bautizado', 'Precursor Auxiliar', 1, 'M', 'Sí'),
('Rosales, Valentina', 'Publicador Bautizado', 'Precursor Auxiliar', 1, 'F', 'Sí'),
('Rosales, Jezziel', 'Publicador No Bautizado', 'Ninguno', 1, 'M', 'No'),
('Ubillus, Sebastian', 'Publicador Bautizado', 'Ninguno', 1, 'M', 'Sí'),
('Ubillus, Percy', 'Siervo Ministerial', 'Precursor Regular', 1, 'M', 'Sí'),

-- GRUPO 2
('Vergara, Carlos', 'Anciano', 'Ninguno', 2, 'M', 'Sí'),
('Porras, Christhoper', 'Siervo Ministerial', 'Precursor Auxiliar', 2, 'M', 'Sí'),
('Benites, Emma', 'Publicador Bautizado', 'Precursor Regular', 2, 'F', 'Sí'),
('Benites, Estelita', 'Publicador No Bautizado', 'Ninguno', 2, 'F', 'No'),
('Benites, Josue', 'Siervo Ministerial', 'Ninguno', 2, 'M', 'Sí'),
('Cisneros, Vanessa', 'Publicador Bautizado', 'Precursor Auxiliar', 2, 'F', 'Sí'),
('Chipana, Maria', 'Publicador Bautizado', 'Ninguno', 2, 'F', 'Sí'),
('Diaz, Carlos', 'Publicador Bautizado', 'Precursor Auxiliar', 2, 'M', 'Sí'),
('Diaz, Karina', 'Publicador Bautizado', 'Precursor Auxiliar', 2, 'F', 'Sí'),
('Enriques, Marvin', 'Publicador Bautizado', 'Ninguno', 2, 'M', 'Sí'),
('Enriques, Lucero', 'Publicador Bautizado', 'Ninguno', 2, 'F', 'Sí'),
('Gutierrez Ch, Thiago', 'Publicador No Bautizado', 'Ninguno', 2, 'M', 'Sí'),
('Gutierrez Ch, Alondra', 'Publicador No Bautizado', 'Ninguno', 2, 'F', 'Sí'),
('Pantoja, Carmen', 'Publicador Bautizado', 'Ninguno', 2, 'F', 'Sí'),
('Pantoja, Peter', 'Publicador Bautizado', 'Ninguno', 2, 'M', 'Sí'),
('Pantoja, Pedro', 'Publicador Bautizado', 'Ninguno', 2, 'M', 'Sí'),
('Paredes, Lucia', 'Publicador Bautizado', 'Precursor Regular', 2, 'F', 'Sí'),
('Porras, Nahamin', 'Publicador Bautizado', 'Precursor Regular', 2, 'F', 'Sí'),
('Porras, Suzumi', 'Publicador Bautizado', 'Ninguno', 2, 'F', 'Sí'),
('Vergara, Dorka', 'Publicador Bautizado', 'Ninguno', 2, 'F', 'Sí'),

-- GRUPO 3
('Rojas, Rogger', 'Anciano', 'Precursor Auxiliar', 3, 'M', 'Sí'),
('Armando Bances', 'Anciano', 'Ninguno', 3, 'M', 'Sí'),
('Avendaño, Mabel', 'Publicador Bautizado', 'Precursor Auxiliar', 3, 'F', 'Sí'),
('Atalaya, Ruth', 'Publicador Bautizado', 'Precursor Regular', 3, 'F', 'Sí'),
('Bances, Magali', 'Publicador Bautizado', 'Ninguno', 3, 'F', 'Sí'),
('Bances, Alejandra', 'Publicador Bautizado', 'Ninguno', 3, 'F', 'No'),
('Cortez, Guisella', 'Publicador Bautizado', 'Ninguno', 3, 'F', 'Sí'),
('Cortez, Alessandro', 'Publicador No Bautizado', 'Ninguno', 3, 'M', 'No'),
('Cruz, Betza', 'Publicador Bautizado', 'Ninguno', 3, 'F', 'Sí'),
('Crispin, Lili', 'Publicador Bautizado', 'Precursor Auxiliar', 3, 'F', 'Sí'),
('Crispin, Jhans', 'Publicador Bautizado', 'Ninguno', 3, 'M', 'Sí'),
('Jimenez, Carmen', 'Publicador Bautizado', 'Precursor Auxiliar', 3, 'F', 'Sí'),
('Lazo, Isabel', 'Publicador Bautizado', 'Ninguno', 3, 'F', 'Sí'),
('Romero, Angel', 'Publicador Bautizado', 'Ninguno', 3, 'M', 'Sí'),
('Reyes, Lilia', 'Publicador Bautizado', 'Precursor Regular', 3, 'F', 'Sí'),
('Rojas, Rosse Mary', 'Publicador Bautizado', 'Precursor Auxiliar', 3, 'F', 'Sí'),
('Torres, Fanny', 'Publicador Bautizado', 'Ninguno', 3, 'F', 'Sí'),
('Venancio, Stephanie', 'Publicador Bautizado', 'Ninguno', 3, 'F', 'Sí'),

-- GRUPO 4
('Fernando Marchena', 'Anciano', 'Precursor Regular', 4, 'M', 'Sí'),
('Mayker Crispin', 'Siervo Ministerial', 'Precursor Auxiliar', 4, 'M', 'Sí'),
('Arias, Erickon', 'Publicador Bautizado', 'Precursor Auxiliar', 4, 'M', 'Sí'),
('Arias, Rossmery', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Arias, Rachel', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'No'),
('Atalaya, Braulio', 'Publicador Bautizado', 'Ninguno', 4, 'M', 'Sí'),
('Atalaya, Maria', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Atalaya, Leonel', 'Publicador Bautizado', 'Ninguno', 4, 'M', 'No'),
('Blass, Rosa', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Camargo, Reyna', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Cruz, Milagros', 'Publicador Bautizado', 'Precursor Regular', 4, 'F', 'Sí'),
('Diaz, Ruth', 'Publicador Bautizado', 'Precursor Auxiliar', 4, 'F', 'Sí'),
('Diaz, Lucinda', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Huatuco, Elena', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Maliqui, Antonia', 'Publicador Bautizado', 'Precursor Regular', 4, 'F', 'Sí'),
('Najar, Yadira', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Sulca, Carmen', 'Publicador Bautizado', 'Ninguno', 4, 'F', 'Sí'),
('Villegas, Mercedes', 'Publicador Bautizado', 'Precursor Regular', 4, 'F', 'Sí');

-- Inserción de registros iniciales para Hermanos Inactivos
INSERT INTO hermanos_inactivos (nombre, cargo, precursorado, grupo, genero, mayor_edad) VALUES
--Grupo 01
('Moz, Daniel', 'Inactivo', 'Ninguno', 1, 'M', 'Sí'),
('Moz, Evelyn', 'Inactivo', 'Ninguno', 1, 'F', 'No'),
('Flores, Oscar', 'Inactivo', 'Ninguno', 1, 'M', 'Sí');

--Grupo 02
('Ccoica, Donato', 'Inactivo', 'Ninguno', 2, 'M', 'Sí'),
('Ccoica, Serafina', 'Inactivo', 'Ninguno', 2, 'F', 'Sí'),

--Grupo 03
('Alejos, Carlos', 'Inactivo', 'Ninguno', 3, 'M', 'Sí'),
('Torres, Leonardo', 'Inactivo', 'Ninguno', 3, 'M', 'Sí');

--Grupo 04
('Cordova, Celina', 'Inactivo', 'Ninguno', 4, 'F', 'Sí'),
('Gallardo, Johana', 'Inactivo', 'Ninguno', 4, 'F', 'Sí');