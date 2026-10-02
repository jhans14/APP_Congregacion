# -*- coding: utf-8 -*-
"""
Generador de Base de Datos SQLite para la Congregación Paraíso de Carabayllo
Crea y actualiza 'datos/congregacion.db' con todas las tablas maestras.
"""
import os
import sqlite3
import re

DB_DIR = os.path.join(os.path.dirname(__file__), 'datos')
DB_FILE = os.path.join(DB_DIR, 'congregacion.db')
SQL_FILE = os.path.join(DB_DIR, 'congregacion.sql')

def crear_base_de_datos():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # Tabla hermanos_activos
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS hermanos_activos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        cargo TEXT NOT NULL,
        precursorado TEXT NOT NULL,
        grupo INTEGER NOT NULL,
        genero TEXT NOT NULL,
        mayor_edad TEXT NOT NULL
    );
    ''')

    # Tabla hermanos_inactivos
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS hermanos_inactivos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        cargo TEXT NOT NULL,
        precursorado TEXT NOT NULL,
        grupo INTEGER NOT NULL,
        genero TEXT NOT NULL,
        mayor_edad TEXT NOT NULL
    );
    ''')

    # Tabla asignaciones
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS asignaciones (
        id TEXT PRIMARY KEY,
        fecha TEXT NOT NULL,
        numero INTEGER NOT NULL,
        tipo TEXT NOT NULL,
        estudiante TEXT NOT NULL,
        ayudante TEXT,
        cumplio TEXT DEFAULT 'pendiente',
        reemplazo TEXT,
        ayudante_cumplio INTEGER DEFAULT 1,
        reemplazo_ayudante TEXT
    );
    ''')

    # Tabla territorios
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS territorios (
        numero INTEGER PRIMARY KEY,
        responsable TEXT,
        fecha_salida TEXT,
        estado TEXT DEFAULT 'disponible'
    );
    ''')

    # Tabla asistencia
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS asistencia (
        fecha TEXT PRIMARY KEY,
        total_asistentes INTEGER NOT NULL DEFAULT 0,
        dia_semana TEXT,
        asientos_ocupados INTEGER DEFAULT 0
    );
    ''')

    # Leer congregacion.sql para extraer datos iniciales si la tabla de hermanos está vacía
    cursor.execute("SELECT COUNT(*) FROM hermanos_activos")
    conteo_activos = cursor.fetchone()[0]

    if conteo_activos == 0 and os.path.exists(SQL_FILE):
        with open(SQL_FILE, 'r', encoding='utf-8') as f:
            sql_content = f.read()

        # Extraer inserts de hermanos_activos
        match_activos = re.search(r'INSERT INTO hermanos_activos [^;]+;', sql_content, re.IGNORECASE)
        if match_activos:
            values_block = match_activos.group(0)
            values_matches = re.findall(r"\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*(\d+)\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\)", values_block)
            for row in values_matches:
                cursor.execute(
                    "INSERT INTO hermanos_activos (nombre, cargo, precursorado, grupo, genero, mayor_edad) VALUES (?, ?, ?, ?, ?, ?)",
                    row
                )

        # Extraer inserts de hermanos_inactivos
        match_inactivos = re.search(r'INSERT INTO hermanos_inactivos [^;]+;', sql_content, re.IGNORECASE)
        if match_inactivos:
            values_block = match_inactivos.group(0)
            values_matches = re.findall(r"\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*(\d+)\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\)", values_block)
            for row in values_matches:
                cursor.execute(
                    "INSERT INTO hermanos_inactivos (nombre, cargo, precursorado, grupo, genero, mayor_edad) VALUES (?, ?, ?, ?, ?, ?)",
                    row
                )

    # Inicializar 54 territorios si está vacía
    cursor.execute("SELECT COUNT(*) FROM territorios")
    if cursor.fetchone()[0] == 0:
        for i in range(1, 55):
            cursor.execute("INSERT INTO territorios (numero, responsable, fecha_salida, estado) VALUES (?, '', NULL, 'disponible')", (i,))

    conn.commit()

    # Estadísticas finales
    cursor.execute("SELECT COUNT(*) FROM hermanos_activos")
    n_activos = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM hermanos_inactivos")
    n_inactivos = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM territorios")
    n_terr = cursor.fetchone()[0]
    conn.close()

    print(f"============================================================")
    print(f" Base de Datos SQLite generada con exito en:")
    print(f" -> {DB_FILE}")
    print(f" Estadisticas:")
    print(f" - Hermanos Activos:    {n_activos}")
    print(f" - Hermanos Inactivos:  {n_inactivos}")
    print(f" - Tarjetas Territorio: {n_terr}")
    print(f"============================================================")

if __name__ == '__main__':
    crear_base_de_datos()
