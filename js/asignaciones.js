// --- MÓDULO DE ASIGNACIONES PRO (Con Conteo Unificado de Última Asignación por Rol y Reemplazos) ---

const datosVidaYMinisterioCompleto = [
    // ENERO
    { id: "e1", fecha: "2026-01-06", numero: 3, tipo: "Lectura bíblica", estudiante: "Pantoja, Peter", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e2", fecha: "2026-01-06", numero: 4, tipo: "Empiece conversaciones", estudiante: "Rosales, Valentina", ayudante: "Rios, Amelia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e3", fecha: "2026-01-06", numero: 5, tipo: "Haga Revisitas", estudiante: "Benites, Emma", ayudante: "Cisneros, Vanessa", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e4", fecha: "2026-01-06", numero: 6, tipo: "Discurso", estudiante: "Navarrete, Jeanpier", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e5", fecha: "2026-01-13", numero: 3, tipo: "Lectura bíblica", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e6", fecha: "2026-01-13", numero: 4, tipo: "Empiece conversaciones", estudiante: "Diaz, Ruth", ayudante: "Elena Dias", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "e7", fecha: "2026-01-13", numero: 5, tipo: "Empiece conversaciones", estudiante: "Atalaya, Ruth", ayudante: "Rojas, Mery", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e8", fecha: "2026-01-13", numero: 6, tipo: "Haga Revisitas", estudiante: "Porras, Christhoper", ayudante: "Diaz, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e9", fecha: "2026-01-13", numero: 6, tipo: "Discurso", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e10", fecha: "2026-01-20", numero: 3, tipo: "Lectura bíblica", estudiante: "Enriques, Marvin", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e11", fecha: "2026-01-20", numero: 4, tipo: "Empiece conversaciones", estudiante: "Calderon, Erika de", ayudante: "Rios, Jamely", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e12", fecha: "2026-01-20", numero: 5, tipo: "Haga Revisitas", estudiante: "Sulca, Carmen", ayudante: "Paredes, Lucia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "e13", fecha: "2026-01-20", numero: 7, tipo: "Haga Discipulos", estudiante: "Mayker Crispin", ayudante: "Crispin, Jhans", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    
    // FEBRERO
    { id: "f1", fecha: "2026-02-03", numero: 3, tipo: "Lectura bíblica", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f2", fecha: "2026-02-03", numero: 4, tipo: "Empiece conversaciones", estudiante: "Porras, Christhoper", ayudante: "Porras, Nahamin", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f3", fecha: "2026-02-03", numero: 5, tipo: "Empiece conversaciones", estudiante: "Rojas, Mery", ayudante: "Rojas, Alejandro", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f4", fecha: "2026-02-03", numero: 6, tipo: "Haga Revisitas", estudiante: "Ubillus, Percy", ayudante: "Navarrete, Jeanpier", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f5", fecha: "2026-02-10", numero: 3, tipo: "Lectura bíblica", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f6", fecha: "2026-02-10", numero: 4, tipo: "Empiece conversaciones", estudiante: "Paredes, Lucia", ayudante: "Crispin, Lili", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f7", fecha: "2026-02-10", numero: 5, tipo: "Haga Revisitas", estudiante: "Rios, Amelia", ayudante: "Arias, Rossmery", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f8", fecha: "2026-02-10", numero: 6, tipo: "Discurso", estudiante: "Rosales, Victor", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f9", fecha: "2026-02-17", numero: 3, tipo: "Lectura bíblica", estudiante: "Perfecto, Indalecio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f10", fecha: "2026-02-17", numero: 4, tipo: "Empiece conversaciones", estudiante: "Sulca, Carmen", ayudante: "Rios, Jamely", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f11", fecha: "2026-02-17", numero: 5, tipo: "Empiece conversaciones", estudiante: "Rosales, Valentina", ayudante: "Benites, Emma", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "f12", fecha: "2026-02-17", numero: 6, tipo: "Explique sus creencias", estudiante: "Diaz, Ruth", ayudante: "Huatuco, Elena", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // MARZO
    { id: "ma1", fecha: "2026-03-03", numero: 3, tipo: "Lectura bíblica", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma2", fecha: "2026-03-03", numero: 4, tipo: "Empiece conversaciones", estudiante: "Davila, Luz", ayudante: "Jimenez, Carmen", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma3", fecha: "2026-03-03", numero: 5, tipo: "Haga Revisitas", estudiante: "Atalaya, Maria", ayudante: "Arias, Rossmery", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma4", fecha: "2026-03-03", numero: 6, tipo: "Explique sus creencias", estudiante: "Mayker Crispin", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma5", fecha: "2026-03-10", numero: 3, tipo: "Lectura bíblica", estudiante: "Gutierrez Ch, Thiago", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "ma6", fecha: "2026-03-10", numero: 4, tipo: "Empiece conversaciones", estudiante: "Avendaño, Mabel", ayudante: "Avendaño, Katherine", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma7", fecha: "2026-03-10", numero: 5, tipo: "Empiece conversaciones", estudiante: "Atalaya, Ruth", ayudante: "Blass, Rosa", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma8", fecha: "2026-03-10", numero: 6, tipo: "Empiece conversaciones", estudiante: "Ubillus, Gabriel", ayudante: "Enriques, Marvin", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma9", fecha: "2026-03-10", numero: 7, tipo: "Haga revisitas", estudiante: "Arias, Erickon", ayudante: "Rojas, Alejandro", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma10", fecha: "2026-03-17", numero: 3, tipo: "Lectura bíblica", estudiante: "Cortez, Guisella", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "ma11", fecha: "2026-03-17", numero: 4, tipo: "Empiece conversaciones", estudiante: "Crispin, Lili", ayudante: "Vergara, Dorka", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "ma12", fecha: "2026-03-17", numero: 5, tipo: "Haga Revisitas", estudiante: "Porras, Nahamin", ayudante: "Rios, Amelia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma13", fecha: "2026-03-17", numero: 6, tipo: "Haga Discipulos", estudiante: "Ubillus, Sebastian", ayudante: "Calderon, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma14", fecha: "2026-03-24", numero: 3, tipo: "Lectura bíblica", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma15", fecha: "2026-03-24", numero: 4, tipo: "Empiece conversaciones", estudiante: "Rojas, Rosse Mary", ayudante: "Calderon, Erika de", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma16", fecha: "2026-03-24", numero: 5, tipo: "Haga Revisitas", estudiante: "Crispin, Jhans", ayudante: "Diaz, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ma17", fecha: "2026-03-24", numero: 6, tipo: "Haga Discipulos", estudiante: "Paredes, Lucia", ayudante: "Sulca, Carmen", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // ABRIL
    { id: "ab1", fecha: "2026-04-07", numero: 3, tipo: "Lectura bíblica", estudiante: "Crispin, Lili", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "ab2", fecha: "2026-04-07", numero: 4, tipo: "Empiece conversaciones", estudiante: "Bances, Magali", ayudante: "Vergara, Dorka", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab3", fecha: "2026-04-07", numero: 5, tipo: "Haga Revisitas", estudiante: "Atalaya, Braulio", ayudante: "Davila, Enoc", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab4", fecha: "2026-04-07", numero: 6, tipo: "Explique sus creencias", estudiante: "Rios, Jamely", ayudante: "Rojas, Mery", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab5", fecha: "2026-04-14", numero: 3, tipo: "Lectura bíblica", estudiante: "Diaz, Carlos", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab6", fecha: "2026-04-14", numero: 4, tipo: "Empiece conversaciones", estudiante: "Benites, Emma", ayudante: "Benites, Estelita", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "ab7", fecha: "2026-04-14", numero: 5, tipo: "Empiece conversaciones", estudiante: "Jimenez, Carmen", ayudante: "Rosales, Valentina", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab8", fecha: "2026-04-14", numero: 6, tipo: "Haga revisitas", estudiante: "Huatuco, Elena", ayudante: "Maliqui, Antonia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab9", fecha: "2026-04-21", numero: 3, tipo: "Lectura bíblica", estudiante: "Perfecto, Indalecio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab10", fecha: "2026-04-21", numero: 4, tipo: "Empiece conversaciones", estudiante: "Bances, Alejandra", ayudante: "Paredes, Lucia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab11", fecha: "2026-04-21", numero: 5, tipo: "Empiece conversaciones", estudiante: "Arias, Rachel", ayudante: "Arias, Erickon", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab12", fecha: "2026-04-21", numero: 6, tipo: "Haga Revisitas", estudiante: "Benites, Estelita", ayudante: "Avendaño, Mabel", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab13", fecha: "2026-04-21", numero: 7, tipo: "Discurso", estudiante: "Benites, Josue", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab14", fecha: "2026-04-28", numero: 3, tipo: "Lectura bíblica", estudiante: "Mayker Crispin", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab15", fecha: "2026-04-28", numero: 4, tipo: "Empiece conversaciones", estudiante: "Avendaño, Katherine", ayudante: "Cisneros, Vanessa", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab16", fecha: "2026-04-28", numero: 5, tipo: "Explique sus creencias", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ab17", fecha: "2026-04-28", numero: 6, tipo: "Haga Discipulos", estudiante: "Calderon, Carlos", ayudante: "Ubillus, Gabriel", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // MAYO 
    { id: "m1", fecha: "2026-05-05", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Gutierrez Ch, Thiago", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "m2", fecha: "2026-05-05", numero: 4, tipo: "Empiece conversaciones", estudiante: "Sulca, Carmen", ayudante: "Atalaya, Ruth", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m3", fecha: "2026-05-05", numero: 5, tipo: "Empiece conversaciones", estudiante: "Chipana, Maria", ayudante: "Porras, Nahamin", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m4", fecha: "2026-05-05", numero: 6, tipo: "Discurso", estudiante: "Enriques, Marvin", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m5", fecha: "2026-05-12", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Gutierrez Ch, Thiago", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "m6", fecha: "2026-05-12", numero: 4, tipo: "Empiece conversaciones", estudiante: "Diaz, Ruth", ayudante: "Davila, Luz", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m7", fecha: "2026-05-12", numero: 5, tipo: "Haga revisitas", estudiante: "Atalaya, Ruth", ayudante: "Arias, Rossmery", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m8", fecha: "2026-05-12", numero: 6, tipo: "Haga discípulos", estudiante: "Arias, Erickon", ayudante: "Porras, Christhoper", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m9", fecha: "2026-05-19", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Cortez, Guisella", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }, 
    { id: "m10", fecha: "2026-05-19", numero: 4, tipo: "Empiece conversaciones", estudiante: "Peña, Aaron", ayudante: "Ubillus, Gabriel", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m11", fecha: "2026-05-19", numero: 5, tipo: "Haga Revisitas", estudiante: "Olano, Daynee", ayudante: "Avendaño, Mabel", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m12", fecha: "2026-05-19", numero: 6, tipo: "Haga Discipulos", estudiante: "Rosales, Victor", ayudante: "Crispin, Jhans", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m13", fecha: "2026-05-26", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m14", fecha: "2026-05-26", numero: 4, tipo: "Empiece conversaciones", estudiante: "Reyes, Lilia", ayudante: "Horna, Roxana", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m15", fecha: "2026-05-26", numero: 5, tipo: "Empiece conversaciones", estudiante: "Jimenez, Carmen", ayudante: "Atalaya, Maria", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m16", fecha: "2026-05-26", numero: 6, tipo: "Empiece conversaciones", estudiante: "Gutierrez Ch, Alondra", ayudante: "Rojas, Rosse Mary", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "m17", fecha: "2026-05-26", numero: 7, tipo: "Explique sus creencias (Escenificación)", estudiante: "Paredes, Lucia", ayudante: "Crispin, Lili", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    
    // JUNIO 
    { id: "j1", fecha: "2026-06-02", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j2", fecha: "2026-06-02", numero: 4, tipo: "Empiece conversaciones", estudiante: "Villegas, Mercedes", ayudante: "Avendaño, Katherine", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j3", fecha: "2026-06-02", numero: 5, tipo: "Haga Revisitas", estudiante: "Diaz, Carlos", ayudante: "Mayker Crispin", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j4", fecha: "2026-06-02", numero: 6, tipo: "Haga discípulos", estudiante: "Atalaya, Braulio", ayudante: "Calderon, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j5", fecha: "2026-06-09", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j6", fecha: "2026-06-09", numero: 4, tipo: "Empiece conversaciones", estudiante: "Bances, Alejandra", ayudante: "Cruz, Betza", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j7", fecha: "2026-06-09", numero: 5, tipo: "Empiece conversaciones", estudiante: "Benites, Estelita", ayudante: "Blass, Rosa", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j8", fecha: "2026-06-09", numero: 6, tipo: "Haga Revisitas", estudiante: "Ubillus, Percy", ayudante: "Enriques, Marvin", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j9", fecha: "2026-06-09", numero: 7, tipo: "Explique sus creencias (Escenificación)", estudiante: "Olano, Gaudencia", ayudante: "Rios, Jamely", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j10", fecha: "2026-06-16", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Cortez, Guisella", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j11", fecha: "2026-06-16", numero: 4, tipo: "Empiece conversaciones", estudiante: "Venancio, Stephanie", ayudante: "Vergara, Dorka", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j12", fecha: "2026-06-16", numero: 5, tipo: "Haga Revisitas", estudiante: "Cortez, Guisella", ayudante: "Avendaño, Mabel", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j13", fecha: "2026-06-16", numero: 6, tipo: "Haga Discipulos", estudiante: "Davila, Enoc", ayudante: "Rosales, Victor", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j14", fecha: "2026-06-23", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j15", fecha: "2026-06-23", numero: 4, tipo: "Empiece conversaciones", estudiante: "Calderon, Erika de", ayudante: "Bances, Magali", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j16", fecha: "2026-06-23", numero: 5, tipo: "Empiece conversaciones", estudiante: "Enriques, Lucero", ayudante: "Benites, Emma", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j17", fecha: "2026-06-23", numero: 6, tipo: "Haga Revisitas", estudiante: "Horna, Roxana", ayudante: "Rosales, Valentina", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j18", fecha: "2026-06-30", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Perfecto, Indalecio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j19", fecha: "2026-06-30", numero: 4, tipo: "Empiece conversaciones", estudiante: "Jimenez, Carmen", ayudante: "Crispin, Lili", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j20", fecha: "2026-06-30", numero: 5, tipo: "Haga Revisitas", estudiante: "Rios, Amelia", ayudante: "Perfecto, Jannet", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "j21", fecha: "2026-06-30", numero: 6, tipo: "Discurso", estudiante: "Arias, Erickon", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // JULIO
    { id: "jl1", fecha: "2026-07-07", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Gutierrez Ch, Thiago", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl2", fecha: "2026-07-07", numero: 4, tipo: "Empiece conversaciones", estudiante: "Diaz, Ruth", ayudante: "Chipana, Maria", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl3", fecha: "2026-07-07", numero: 5, tipo: "Haga Revisitas", estudiante: "Atalaya, Maria", ayudante: "Olano, Daynee", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl4", fecha: "2026-07-07", numero: 6, tipo: "Discurso", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl5", fecha: "2026-07-14", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl6", fecha: "2026-07-14", numero: 4, tipo: "Empiece conversaciones", estudiante: "Arias, Rossmery", ayudante: "Porras, Nahamin", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl7", fecha: "2026-07-14", numero: 5, tipo: "Haga Revisitas", estudiante: "Davila, Luz", ayudante: "Rojas, Rosse Mary", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl8", fecha: "2026-07-14", numero: 6, tipo: "Haga Discipulos", estudiante: "Porras, Christhoper", ayudante: "Diaz, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl9", fecha: "2026-07-21", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Cortez, Guisella", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl10", fecha: "2026-07-21", numero: 4, tipo: "Empiece conversaciones", estudiante: "Villegas, Mercedes", ayudante: "Atalaya, Ruth", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl11", fecha: "2026-07-21", numero: 5, tipo: "Haga Revisitas", estudiante: "Cruz, Betza", ayudante: "Paredes, Lucia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl12", fecha: "2026-07-21", numero: 6, tipo: "Explique sus creencias", estudiante: "Atalaya, Braulio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl13", fecha: "2026-07-28", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl14", fecha: "2026-07-28", numero: 4, tipo: "Empiece conversaciones", estudiante: "Cortez, Guisella", ayudante: "Horna, Roxana", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl15", fecha: "2026-07-28", numero: 5, tipo: "Haga Revisitas", estudiante: "Maliqui, Antonia", ayudante: "Jimenez, Carmen", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "jl16", fecha: "2026-07-28", numero: 6, tipo: "Explique sus creencias", estudiante: "Benites, Estelita", ayudante: "Benites, Josue", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // AGOSTO
    { id: "ag1", fecha: "2026-08-04", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag2", fecha: "2026-08-04", numero: 4, tipo: "Empiece conversaciones", estudiante: "Crispin, Lili", ayudante: "Venancio, Stephanie", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag3", fecha: "2026-08-04", numero: 5, tipo: "Haga Revisitas", estudiante: "Rios, Amelia", ayudante: "Avendaño, Mabel", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag4", fecha: "2026-08-04", numero: 6, tipo: "Discurso", estudiante: "Ubillus, Percy", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag5", fecha: "2026-08-11", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag6", fecha: "2026-08-11", numero: 4, tipo: "Empiece conversaciones", estudiante: "Bances, Magali", ayudante: "Olano, Daynee", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag7", fecha: "2026-08-11", numero: 5, tipo: "Haga Revisitas", estudiante: "Diaz, Karina", ayudante: "Rios, Jamely", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag8", fecha: "2026-08-11", numero: 6, tipo: "Haga Discipulos", estudiante: "Pantoja, Peter", ayudante: "Enriques, Marvin", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag9", fecha: "2026-08-18", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Cortez, Guisella", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag10", fecha: "2026-08-18", numero: 4, tipo: "Empiece conversaciones", estudiante: "Pantoja, Carmen", ayudante: "Davila, Luz", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag11", fecha: "2026-08-18", numero: 5, tipo: "Haga Revisitas", estudiante: "Mayker Crispin", ayudante: "Arias, Erickon", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag12", fecha: "2026-08-18", numero: 6, tipo: "Discurso", estudiante: "Rosales, Victor", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag13", fecha: "2026-08-25", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag14", fecha: "2026-08-25", numero: 4, tipo: "Empiece conversaciones", estudiante: "Diaz, Ruth", ayudante: "Atalaya, Maria", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag15", fecha: "2026-08-25", numero: 5, tipo: "Empiece conversaciones", estudiante: "Enriques, Lucero", ayudante: "Benites, Emma", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "ag16", fecha: "2026-08-25", numero: 6, tipo: "Discurso", estudiante: "Calderon, Carlos", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // SEPTIEMBRE 2026
    { id: "s1", fecha: "2026-09-01", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s2", fecha: "2026-09-01", numero: 4, tipo: "Empiece conversaciones", estudiante: "Calderon, Erika de", ayudante: "Rios, Jamely", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s3", fecha: "2026-09-01", numero: 5, tipo: "Haga Revisitas", estudiante: "Porras, Nahamin", ayudante: "Benites, Emma", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s4", fecha: "2026-09-01", numero: 6, tipo: "Discurso", estudiante: "Navarrete, Jeanpier", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s5", fecha: "2026-09-08", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s6", fecha: "2026-09-08", numero: 4, tipo: "Empiece conversaciones", estudiante: "Cisneros, Vanessa", ayudante: "Vergara, Dorka", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s7", fecha: "2026-09-08", numero: 5, tipo: "Haga Revisitas", estudiante: "Atalaya, Ruth", ayudante: "Rojas, Mery", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s8", fecha: "2026-09-08", numero: 6, tipo: "Haga discípulos", estudiante: "Enriques, Marvin", ayudante: "Porras, Christhoper", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s9", fecha: "2026-09-15", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Perfecto, Indalecio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s10", fecha: "2026-09-15", numero: 4, tipo: "Empiece conversaciones", estudiante: "Rosales, Valentina", ayudante: "Rios, Amelia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s11", fecha: "2026-09-15", numero: 5, tipo: "Haga Revisitas", estudiante: "Sulca, Carmen", ayudante: "Paredes, Lucia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s12", fecha: "2026-09-15", numero: 6, tipo: "Explique sus creencias", estudiante: "Mayker Crispin", ayudante: "Calderon, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s13", fecha: "2026-09-22", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s14", fecha: "2026-09-22", numero: 4, tipo: "Empiece conversaciones", estudiante: "Jimenez, Carmen", ayudante: "Atalaya, Maria", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s15", fecha: "2026-09-22", numero: 5, tipo: "Haga Revisitas", estudiante: "Bances, Magali", ayudante: "Olano, Daynee", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s16", fecha: "2026-09-22", numero: 6, tipo: "Discurso", estudiante: "Rosales, Victor", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s17", fecha: "2026-09-29", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Cortez, Guisella", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s18", fecha: "2026-09-29", numero: 4, tipo: "Empiece conversaciones", estudiante: "Diaz, Ruth", ayudante: "Chipana, Maria", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s19", fecha: "2026-09-29", numero: 5, tipo: "Haga Revisitas", estudiante: "Arias, Rossmery", ayudante: "Cruz, Betza", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "s20", fecha: "2026-09-29", numero: 6, tipo: "Haga discípulos", estudiante: "Ubillus, Percy", ayudante: "Davila, Enoc", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // OCTUBRE 2026
    { id: "o1", fecha: "2026-10-06", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Gutierrez Ch, Thiago", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o2", fecha: "2026-10-06", numero: 4, tipo: "Empiece conversaciones", estudiante: "Benites, Emma", ayudante: "Benites, Estelita", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o3", fecha: "2026-10-06", numero: 5, tipo: "Haga Revisitas", estudiante: "Horna, Roxana", ayudante: "Avendaño, Mabel", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o4", fecha: "2026-10-06", numero: 6, tipo: "Discurso", estudiante: "Arias, Erickon", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o5", fecha: "2026-10-13", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Diaz, Carlos", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o6", fecha: "2026-10-13", numero: 4, tipo: "Empiece conversaciones", estudiante: "Crispin, Lili", ayudante: "Vergara, Dorka", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o7", fecha: "2026-10-13", numero: 5, tipo: "Haga Revisitas", estudiante: "Venancio, Stephanie", ayudante: "Pantoja, Carmen", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o8", fecha: "2026-10-13", numero: 6, tipo: "Explique sus creencias", estudiante: "Atalaya, Braulio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o9", fecha: "2026-10-20", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o10", fecha: "2026-10-20", numero: 4, tipo: "Empiece conversaciones", estudiante: "Bances, Alejandra", ayudante: "Paredes, Lucia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o11", fecha: "2026-10-20", numero: 5, tipo: "Haga Revisitas", estudiante: "Rios, Amelia", ayudante: "Perfecto, Jannet", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o12", fecha: "2026-10-20", numero: 6, tipo: "Haga discípulos", estudiante: "Ubillus, Sebastian", ayudante: "Calderon, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o13", fecha: "2026-10-27", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Perfecto, Indalecio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o14", fecha: "2026-10-27", numero: 4, tipo: "Empiece conversaciones", estudiante: "Reyes, Lilia", ayudante: "Horna, Roxana", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o15", fecha: "2026-10-27", numero: 5, tipo: "Haga Revisitas", estudiante: "Davila, Luz", ayudante: "Rojas, Rosse Mary", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "o16", fecha: "2026-10-27", numero: 6, tipo: "Discurso", estudiante: "Benites, Josue", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // NOVIEMBRE 2026
    { id: "n1", fecha: "2026-11-03", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n2", fecha: "2026-11-03", numero: 4, tipo: "Empiece conversaciones", estudiante: "Calderon, Erika de", ayudante: "Rios, Jamely", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n3", fecha: "2026-11-03", numero: 5, tipo: "Haga Revisitas", estudiante: "Sulca, Carmen", ayudante: "Atalaya, Ruth", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n4", fecha: "2026-11-03", numero: 6, tipo: "Explique sus creencias", estudiante: "Mayker Crispin", ayudante: "Porras, Christhoper", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n5", fecha: "2026-11-10", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n6", fecha: "2026-11-10", numero: 4, tipo: "Empiece conversaciones", estudiante: "Jimenez, Carmen", ayudante: "Crispin, Lili", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n7", fecha: "2026-11-10", numero: 5, tipo: "Haga Revisitas", estudiante: "Porras, Nahamin", ayudante: "Rios, Amelia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n8", fecha: "2026-11-10", numero: 6, tipo: "Discurso", estudiante: "Rosales, Victor", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n9", fecha: "2026-11-17", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Gutierrez Ch, Thiago", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n10", fecha: "2026-11-17", numero: 4, tipo: "Empiece conversaciones", estudiante: "Avendaño, Katherine", ayudante: "Cisneros, Vanessa", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n11", fecha: "2026-11-17", numero: 5, tipo: "Haga Revisitas", estudiante: "Cruz, Betza", ayudante: "Paredes, Lucia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n12", fecha: "2026-11-17", numero: 6, tipo: "Haga discípulos", estudiante: "Enriques, Marvin", ayudante: "Diaz, Carlos", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n13", fecha: "2026-11-24", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Cortez, Guisella", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n14", fecha: "2026-11-24", numero: 4, tipo: "Empiece conversaciones", estudiante: "Diaz, Ruth", ayudante: "Huatuco, Elena", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n15", fecha: "2026-11-24", numero: 5, tipo: "Haga Revisitas", estudiante: "Maliqui, Antonia", ayudante: "Jimenez, Carmen", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "n16", fecha: "2026-11-24", numero: 6, tipo: "Discurso", estudiante: "Ubillus, Percy", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },

    // DICIEMBRE 2026
    { id: "d1", fecha: "2026-12-01", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Peña, Aaron", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d2", fecha: "2026-12-01", numero: 4, tipo: "Empiece conversaciones", estudiante: "Rosales, Valentina", ayudante: "Benites, Emma", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d3", fecha: "2026-12-01", numero: 5, tipo: "Haga Revisitas", estudiante: "Atalaya, Maria", ayudante: "Arias, Rossmery", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d4", fecha: "2026-12-01", numero: 6, tipo: "Haga discípulos", estudiante: "Davila, Enoc", ayudante: "Rosales, Victor", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d5", fecha: "2026-12-08", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Perfecto, Indalecio", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d6", fecha: "2026-12-08", numero: 4, tipo: "Empiece conversaciones", estudiante: "Villegas, Mercedes", ayudante: "Avendaño, Katherine", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d7", fecha: "2026-12-08", numero: 5, tipo: "Haga Revisitas", estudiante: "Diaz, Karina", ayudante: "Rios, Jamely", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d8", fecha: "2026-12-08", numero: 6, tipo: "Discurso", estudiante: "Arias, Erickon", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d9", fecha: "2026-12-15", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Atalaya, Leonel", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d10", fecha: "2026-12-15", numero: 4, tipo: "Empiece conversaciones", estudiante: "Bances, Magali", ayudante: "Olano, Daynee", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d11", fecha: "2026-12-15", numero: 5, tipo: "Haga Revisitas", estudiante: "Sulca, Carmen", ayudante: "Paredes, Lucia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d12", fecha: "2026-12-15", numero: 6, tipo: "Explique sus creencias", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d13", fecha: "2026-12-22", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Diaz, Carlos", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d14", fecha: "2026-12-22", numero: 4, tipo: "Empiece conversaciones", estudiante: "Crispin, Lili", ayudante: "Vergara, Dorka", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d15", fecha: "2026-12-22", numero: 5, tipo: "Haga Revisitas", estudiante: "Porras, Nahamin", ayudante: "Rios, Amelia", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d16", fecha: "2026-12-22", numero: 6, tipo: "Discurso", estudiante: "Benites, Josue", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d17", fecha: "2026-12-29", numero: 3, tipo: "Lectura de la Biblia", estudiante: "Ubillus, Sebastian", ayudante: "", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d18", fecha: "2026-12-29", numero: 4, tipo: "Empiece conversaciones", estudiante: "Calderon, Erika de", ayudante: "Bances, Magali", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d19", fecha: "2026-12-29", numero: 5, tipo: "Haga Revisitas", estudiante: "Horna, Roxana", ayudante: "Rosales, Valentina", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" },
    { id: "d20", fecha: "2026-12-29", numero: 6, tipo: "Haga discípulos", estudiante: "Mayker Crispin", ayudante: "Crispin, Jhans", cumplio: "pendiente", reemplazo: "", ayudanteCumplio: true, reemplazoAyudante: "" }
];

// Carga con fusión automática de meses faltantes para garantizar disponibilidad inmediata de todo el año 2026
let rawStoredAsignaciones = JSON.parse(localStorage.getItem('bd_asignaciones_v16'));
let dbAsignaciones;
if (!rawStoredAsignaciones || !Array.isArray(rawStoredAsignaciones) || rawStoredAsignaciones.length === 0) {
    dbAsignaciones = [...datosVidaYMinisterioCompleto];
} else {
    const existingIds = new Set(rawStoredAsignaciones.map(a => a.id));
    const faltantes = datosVidaYMinisterioCompleto.filter(a => !existingIds.has(a.id));
    if (faltantes.length > 0) {
        dbAsignaciones = rawStoredAsignaciones.concat(faltantes);
    } else {
        dbAsignaciones = rawStoredAsignaciones;
    }
}
localStorage.setItem('bd_asignaciones_v16', JSON.stringify(dbAsignaciones));

let estadosHermanos = JSON.parse(localStorage.getItem('bd_estados_hermanos_v2')) || {};
let modalRapidoAsig = null;
let modalCumplimientoInstancia = null;

function inicializarModuloAsignaciones() {
    modalRapidoAsig = new bootstrap.Modal(document.getElementById('modalAgregadoRapido'));
    modalCumplimientoInstancia = new bootstrap.Modal(document.getElementById('modalControlCumplimiento'));
    actualizarSelectoresAsignaciones();
}

function obtenerEstructuraGruposDesdeBD() {
    let hermanos = obtenerHermanos(); 
    let gruposMap = { 1: [], 2: [], 3: [], 4: [] };
    
    hermanos.forEach(h => {
        if(gruposMap[h.grupo]) {
            gruposMap[h.grupo].push(h.nombre);
        }
    });
    
    return [
        { grupo: 1, integrantes: gruposMap[1] },
        { grupo: 2, integrantes: gruposMap[2] },
        { grupo: 3, integrantes: gruposMap[3] },
        { grupo: 4, integrantes: gruposMap[4] }
    ];
}

function validarAsignacion(nombrePublicador) {
    if(!nombrePublicador) return true; 
    let estado = estadosHermanos[nombrePublicador] || "✔️";
    
    if(estado === "❌") {
        alert(`Error de Planificación:\nNo se puede asignar a ${nombrePublicador}. Su estado actual está restringido (❌).`);
        return false;
    }
    
    if(estado === "➖") {
        return confirm(`Aviso:\nEl publicador ${nombrePublicador} está marcado con precaución (➖).\n¿Desea continuar de todos modos?`);
    }
    return true; 
}

// --- VISTA GENERAL CON CÁLCULO PRECISO (UNIFICANDO ESTUDIANTE, AYUDANTE Y REEMPLAZOS) ---
function renderizarVistaGeneralAsignaciones() {
    const contenedor = document.getElementById('contenedorGrupos');
    if(!contenedor) return;
    
    let selectFiltroMes = document.getElementById('filtroMesVistaGeneral');
    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let mesFiltroIndex = selectFiltroMes ? parseInt(selectFiltroMes.value) : new Date().getMonth();
    let anioFiltro = document.getElementById('selectorAnioAsignaciones')?.value || new Date().getFullYear();

    // Fecha límite estricta: último día del mes que se está visualizando en el filtro superior
    let fechaReferencia = new Date(anioFiltro, mesFiltroIndex + 1, 0); 

    let opcionesMesesHtml = mesesNombres.map((m, idx) => `<option value="${idx}" ${idx === mesFiltroIndex ? 'selected' : ''}>${m}</option>`).join('');

    contenedor.innerHTML = `
        <div class="col-12 mb-3">
            <div class="card p-3 shadow-sm bg-white d-flex flex-row align-items-center justify-content-between">
                <h5 class="mb-0 fw-bold text-dark">👥 Disponibilidad y Estado de Hermanos</h5>
                <div class="d-flex align-items-center gap-2">
                    <label class="fw-bold text-muted mb-0">Filtrar hasta el mes:</label>
                    <select id="filtroMesVistaGeneral" class="form-select form-select-sm fw-bold" style="width: 150px;" onchange="renderizarVistaGeneralAsignaciones()">
                        ${opcionesMesesHtml}
                    </select>
                </div>
            </div>
        </div>
    `;

    let gruposData = obtenerEstructuraGruposDesdeBD();

    gruposData.forEach(grupoObj => {
        let filasHtml = '';
        
        grupoObj.integrantes.sort().forEach(nombre => {
            // Buscamos cualquier participación efectiva (Estudiante, Ayudante o Reemplazos) antes o durante el mes filtrado
            let previas = dbAsignaciones.filter(a => {
                let [y, m, d] = a.fecha.split('-');
                let fechaAsig = new Date(y, m - 1, d);
                
                let estudianteEfectiva = (a.estudiante === nombre && a.cumplio !== "no_cumplio") || (a.reemplazo === nombre && a.cumplio === "no_cumplio");
                let ayudanteEfectiva = (a.ayudante === nombre && a.ayudanteCumplio !== false) || (a.reemplazoAyudante === nombre && a.ayudanteCumplio === false);
                
                return (estudianteEfectiva || ayudanteEfectiva) && fechaAsig <= fechaReferencia;
            });

            let diasTexto = "<span class='badge-estado-libre'>Libre</span>";
            let claseFila = ""; 
            let etiquetaEstado = "";

            if(previas.length > 0) {
                // Ordenar para obtener estrictamente la fecha más reciente respecto al mes filtrado
                previas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
                let [y, m, d] = previas[0].fecha.split('-');
                let ultimaFecha = new Date(y, m - 1, d);
                
                let diffDias = Math.floor((fechaReferencia - ultimaFecha) / (1000 * 60 * 60 * 24));
                
                let asignadoEsteMes = previas.some(a => {
                    let [ay, am] = a.fecha.split('-');
                    return parseInt(am) - 1 === mesFiltroIndex && parseInt(ay) == anioFiltro;
                });

                if (asignadoEsteMes) {
                    etiquetaEstado = `<span class="badge-estado-asignado">Asignado este mes</span>`;
                } else if (diffDias > 60) {
                    claseFila = "fila-alerta-60"; 
                    etiquetaEstado = `<span class="badge-estado-alerta">+60 días sin parte</span>`;
                } else {
                    etiquetaEstado = `<span class="badge-estado-normal">hace ${diffDias} días</span>`;
                }
                diasTexto = `${d}/${m}/${y} (${etiquetaEstado})`;
            } else {
                etiquetaEstado = `<span class="badge-estado-libre">Disponible (Sin registros)</span>`;
                diasTexto = etiquetaEstado;
            }

            let estadoActual = estadosHermanos[nombre] || "✔️";
            let claseEstado = estadoActual === "✔️" ? "bg-estado-ok" : (estadoActual === "➖" ? "bg-estado-menor" : "bg-estado-no");
            
            filasHtml += `
                <tr class="align-middle ${claseFila}">
                    <td class="fw-bold">${invertirNombre(nombre)}</td>
                    <td>${diasTexto}</td>
                    <td class="text-center">
                        <button class="estado-btn ${claseEstado}" onclick="cambiarEstadoAsignacion('${nombre}')">${estadoActual}</button>
                    </td>
                </tr>
            `;
        });

        contenedor.innerHTML += `
            <div class="col-md-6 mb-4">
                <div class="card card-grupo shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                    <div class="card-header bg-slate-navy text-white fw-bold d-flex justify-content-between align-items-center py-2 px-3">
                        <span class="d-flex align-items-center gap-2"><span>👥</span> GRUPO ${grupoObj.grupo}</span>
                        <span class="badge bg-white-subtle text-white rounded-pill px-2 py-1" style="font-size:0.75rem;">${grupoObj.integrantes.length} Hermanos</span>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover table-sm mb-0 tabla-grupos">
                            <thead class="table-light">
                                <tr><th>Nombre</th><th>Última Asign. / Estado</th><th class="text-center">Restricción</th></tr>
                            </thead>
                            <tbody>${filasHtml}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    });
}

function cambiarEstadoAsignacion(nombre) {
    let actual = estadosHermanos[nombre] || "✔️";
    let nuevo = "✔️";
    if (actual === "✔️") nuevo = "➖"; 
    else if (actual === "➖") nuevo = "❌"; 
    
    estadosHermanos[nombre] = nuevo;
    localStorage.setItem('bd_estados_hermanos_v2', JSON.stringify(estadosHermanos));
    renderizarVistaGeneralAsignaciones(); 
}

function renderizarPlanificacionMeses() {
    const contenedor = document.getElementById('contenedorPlanificacionMeses');
    const selectAnio = document.getElementById('selectorAnioAsignaciones');
    if (!contenedor || !selectAnio) return;

    let anioSeleccionado = selectAnio.value || new Date().getFullYear();
    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let selectorMesFiltro = document.getElementById('filtroMesPlanifRapido');
    let mesFiltroValor = selectorMesFiltro ? selectorMesFiltro.value : 'todos';

    let opcionesMesesSelect = `<option value="todos" ${mesFiltroValor === 'todos' ? 'selected' : ''}>📅 Todos los Meses del Año</option>` + 
        mesesNombres.map(m => `<option value="${m}" ${mesFiltroValor === m ? 'selected' : ''}>${m} ${anioSeleccionado}</option>`).join('');

    let htmlMeses = `
        <div class="card p-3 shadow-sm bg-white mb-4 border-0 rounded-4">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div class="d-flex align-items-center gap-2">
                    <span class="fs-5">📂</span>
                    <div>
                        <h6 class="mb-0 fw-bold text-dark">Planificación del Año ${anioSeleccionado}</h6>
                        <small class="text-muted">Vista panorámica de semanas y asignaciones programadas</small>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <label class="fw-bold text-muted small mb-0">Filtrar Mes:</label>
                    <select id="filtroMesPlanifRapido" class="form-select form-select-sm fw-bold border-primary text-primary" style="width: 175px;" onchange="renderizarPlanificacionMeses()">
                        ${opcionesMesesSelect}
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
    `;

    let mesesAProcesar = mesFiltroValor === 'todos' ? mesesNombres : [mesFiltroValor];

    mesesAProcesar.forEach((mes) => {
        let nombreMesAnio = `${mes} ${anioSeleccionado}`;
        let asignacionesMes = dbAsignaciones.filter(a => obtenerMesAnio(a.fecha) === nombreMesAnio);
        
        let todosLunes = obtenerTodosLunesDelMes(nombreMesAnio);
        let semanasHtml = "";

        todosLunes.forEach(lunesIso => {
            let rango = calcularRangoSemana(lunesIso);
            let partesSemana = asignacionesMes.filter(a => calcularRangoSemana(a.fecha).lunesIso === lunesIso);
            
            let filasTabla = "";
            if (partesSemana.length === 0) {
                filasTabla = `<tr><td colspan="4" class="text-center text-muted fst-italic py-2 small bg-light-subtle">Sin asignaciones registradas</td></tr>`;
            } else {
                partesSemana.sort((a,b) => a.numero - b.numero).forEach(a => {
                    let infoEstudiante = invertirNombre(a.estudiante);
                    if (a.cumplio === "no_cumplio" && a.reemplazo) {
                        infoEstudiante = `<del class="text-muted">${invertirNombre(a.estudiante)}</del> <br><span class="text-danger fw-bold fs-7">Reemplazo: ${invertirNombre(a.reemplazo)}</span>`;
                    }
                    
                    let infoAyudante = a.ayudante ? invertirNombre(a.ayudante) : '-';
                    if (a.ayudante && a.ayudanteCumplio === false) {
                        if (a.reemplazoAyudante) {
                            infoAyudante = `<del class="text-muted">${invertirNombre(a.ayudante)}</del> <br><span class="text-danger fw-bold fs-7">Reemplazo: ${invertirNombre(a.reemplazoAyudante)}</span>`;
                        } else {
                            infoAyudante = `<del class="text-muted">${invertirNombre(a.ayudante)}</del> <span class="text-danger fw-bold fs-7">(No asistió)</span>`;
                        }
                    }

                    filasTabla += `
                        <tr>
                            <td style="font-size:0.82em;"><strong class="text-primary">${a.numero}. ${a.tipo}</strong></td>
                            <td style="font-size:0.85em;">${infoEstudiante}</td>
                            <td style="font-size:0.85em;" class="text-muted">${infoAyudante}</td>
                            <td class="text-center" style="width: 40px;">
                                <button class="btn btn-sm btn-light border p-0 px-1" onclick="abrirModalEdit('${a.id}')" title="Editar">✏️</button>
                            </td>
                        </tr>
                    `;
                });
            }

            semanasHtml += `
                <div class="table-responsive mb-2 shadow-2xs rounded-3 overflow-hidden">
                    <table class="table table-bordered table-sm mb-0 bg-white align-middle">
                        <thead class="table-header-navy" style="font-size:0.8em;">
                            <tr><th colspan="4" class="d-flex justify-content-between align-items-center py-1 px-2"><span>${rango.texto}</span> <button class="btn btn-xs btn-outline-light rounded-pill py-0 px-2" style="font-size:0.75em;" onclick="abrirModalAdd('${rango.martesIso}')">➕</button></th></tr>
                            <tr class="table-light text-muted"><th>Asignación</th><th>Estudiante</th><th>Ayudante</th><th class="text-center">⚙️</th></tr>
                        </thead>
                        <tbody>${filasTabla}</tbody>
                    </table>
                </div>
            `;
        });

        htmlMeses += `
            <div class="col-lg-6 mb-4">
                <div class="card card-planif shadow-sm border-0 rounded-4 overflow-hidden h-100">
                    <div class="card-header bg-gradient-navy text-white fw-bold text-uppercase d-flex justify-content-between align-items-center py-2 px-3">
                        <span>📅 ${mes} ${anioSeleccionado}</span>
                        <span class="badge bg-white-subtle text-white rounded-pill px-2 py-1" style="font-size:0.75rem;">${asignacionesMes.length} Partes</span>
                    </div>
                    <div class="card-body p-2 bg-light-subtle">
                        ${semanasHtml}
                    </div>
                </div>
            </div>
        `;
    });

    htmlMeses += `</div>`;
    contenedor.innerHTML = htmlMeses;
}

function calcularRangoSemana(fechaIso) {
    let [y, m, d] = String(fechaIso).split('-');
    let fechaObj = new Date(y, m - 1, d);
    let diaSemana = fechaObj.getDay(); 
    let diffLunes = fechaObj.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
    let lunes = new Date(fechaObj.setDate(diffLunes));
    let domingo = new Date(lunes);
    domingo.setDate(domingo.getDate() + 6);
    let martes = new Date(lunes);
    martes.setDate(martes.getDate() + 1);

    const mesesStr = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    let textoSemana = (lunes.getMonth() === domingo.getMonth()) 
        ? `${lunes.getDate()} - ${domingo.getDate()} ${mesesStr[lunes.getMonth()]}`
        : `${lunes.getDate()} ${mesesStr[lunes.getMonth()]} - ${domingo.getDate()} ${mesesStr[domingo.getMonth()]}`;
    
    return { texto: textoSemana, lunesIso: `${lunes.getFullYear()}-${String(lunes.getMonth()+1).padStart(2,'0')}-${String(lunes.getDate()).padStart(2,'0')}`, martesIso: `${martes.getFullYear()}-${String(martes.getMonth()+1).padStart(2,'0')}-${String(martes.getDate()).padStart(2,'0')}` };
}

function obtenerMesAnio(fechaIso) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const partes = String(fechaIso).split('-');
    if(partes.length < 2) return "";
    return `${meses[parseInt(partes[1]) - 1]} ${partes[0]}`;
}

function invertirNombre(nc) {
    if (!nc) return "";
    if (nc.includes(',')) { 
        let p = nc.split(','); 
        return p[1].trim() + " " + p[0].trim(); 
    }
    return nc;
}

function obtenerTodosLunesDelMes(mesSeleccionado) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let [mesStr, anioStr] = mesSeleccionado.split(" ");
    let mesIdx = meses.indexOf(mesStr);
    let anio = parseInt(anioStr);
    
    let semanasLunes = [];
    // Encontrar todos los martes del mes (día habitual de reunión entre semana)
    let d = new Date(anio, mesIdx, 1);
    while (d.getMonth() === mesIdx) {
        if (d.getDay() === 2) { // 2 = Martes
            let dMartes = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
            let rango = calcularRangoSemana(dMartes);
            if (!semanasLunes.includes(rango.lunesIso)) {
                semanasLunes.push(rango.lunesIso);
            }
        }
        d.setDate(d.getDate() + 1);
    }
    return semanasLunes;
}

function actualizarSelectoresAsignaciones() {
    const datalists = document.querySelectorAll('#listaHermanosGlobal');
    const selectMes = document.getElementById('selectorMesPrograma');
    const selectAnio = document.getElementById('selectorAnioAsignaciones');
    const selectHist = document.getElementById('selectHistorial');
    if(!selectMes || !selectAnio) return;

    let todosNombres = [];
    obtenerHermanos().forEach(h => todosNombres.push(h.nombre));
    
    let dlHTML = "";
    let histHTML = '<option value="">-- Buscar hermano --</option>';

    todosNombres.sort().forEach(n => {
        dlHTML += `<option value="${n}">`;
        histHTML += `<option value="${n}">${invertirNombre(n)}</option>`;
    });

    datalists.forEach(dl => dl.innerHTML = dlHTML);
    
    if(selectHist) {
        let histVal = selectHist.value;
        selectHist.innerHTML = histHTML;
        selectHist.value = histVal;
    }

    let anioActualNum = new Date().getFullYear();
    let aniosDisponibles = [];
    for (let y = 2019; y <= anioActualNum + 5; y++) {
        aniosDisponibles.push(y.toString());
    }

    let valAnioActual = selectAnio.value;
    selectAnio.innerHTML = '';
    aniosDisponibles.forEach(a => {
        selectAnio.innerHTML += `<option value="${a}">${a}</option>`;
    });
    
    let anioPorDefecto = aniosDisponibles.includes(valAnioActual) ? valAnioActual : anioActualNum.toString();
    selectAnio.value = anioPorDefecto;

    cambiarAnioAsignaciones();
}

function cambiarAnioAsignaciones() {
    const selectAnio = document.getElementById('selectorAnioAsignaciones');
    const selectMes = document.getElementById('selectorMesPrograma');
    if(!selectAnio || !selectMes) return;

    let anioSeleccionado = selectAnio.value;
    const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let mesPrevio = selectMes.value.split(" ")[0];

    selectMes.innerHTML = '';
    mesesNombres.forEach(mes => {
        selectMes.innerHTML += `<option value="${mes} ${anioSeleccionado}">${mes} ${anioSeleccionado}</option>`;
    });

    let mesDeseado = mesesNombres.includes(mesPrevio) ? `${mesPrevio} ${anioSeleccionado}` : `${mesesNombres[new Date().getMonth()]} ${anioSeleccionado}`;
    selectMes.value = mesDeseado;

    renderizarProgramaMensual();
    renderizarVistaGeneralAsignaciones();
    
    const tabPlanif = document.getElementById('modulo-planificacion');
    if (tabPlanif && tabPlanif.classList.contains('active')) {
        renderizarPlanificacionMeses();
    } else {
        // Carga en segundo plano sin congelar la animación de entrada
        setTimeout(renderizarPlanificacionMeses, 120);
    }
}

function renderizarProgramaMensual() {
    const contenedorProg = document.getElementById('contenedorPrograma');
    const selectMes = document.getElementById('selectorMesPrograma');
    if (!contenedorProg || !selectMes) return;
    
    const mesSeleccionado = selectMes.value;
    if (!mesSeleccionado) return;

    let dbMes = dbAsignaciones.filter(a => obtenerMesAnio(a.fecha) === mesSeleccionado);
    let todosLunes = obtenerTodosLunesDelMes(mesSeleccionado);
    
    let agrupado = {};
    todosLunes.forEach(lunesIso => {
        let rango = calcularRangoSemana(lunesIso); 
        agrupado[lunesIso] = { textoHead: rango.texto, fechaMartes: rango.martesIso, partes: [] };
    });

    // Asegurar que toda asignación del mes aparezca en su semana correspondiente
    dbMes.forEach(a => {
        let rango = calcularRangoSemana(a.fecha);
        let idSemana = rango.lunesIso;
        if (!agrupado[idSemana]) {
            agrupado[idSemana] = { textoHead: rango.texto, fechaMartes: rango.martesIso, partes: [] };
        }
        agrupado[idSemana].partes.push(a);
    });

    let htmlSemanal = "";
    let semanasOrdenadas = Object.keys(agrupado).sort((a, b) => new Date(a) - new Date(b));

    semanasOrdenadas.forEach(lunesKey => {
        let objSemana = agrupado[lunesKey];
        let tienePartes = objSemana.partes.length > 0;
        
        htmlSemanal += `
        <div class="card card-semana mb-4 shadow-sm">
            <div class="semana-header">
                <div class="d-flex align-items-center gap-2">
                    <span class="semana-header-badge">SEMANA</span>
                    <span class="semana-header-title">${objSemana.textoHead}</span>
                </div>
                <button class="btn-add-quick" onclick="abrirModalAdd('${objSemana.fechaMartes}')">➕ Programar</button>
            </div>
            <div class="card-body p-2 p-md-3">`;
        
        if(!tienePartes) {
            htmlSemanal += `
                <div class="empty-semana-card text-center py-4 px-3">
                    <div class="empty-semana-icon">📋</div>
                    <h6 class="fw-bold text-dark mt-2 mb-1">Semana sin asignaciones programadas</h6>
                    <p class="text-muted small mb-3">Puedes programar a los estudiantes haciendo clic en el botón inferior.</p>
                    <button class="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-bold" onclick="abrirModalAdd('${objSemana.fechaMartes}')">
                        ➕ Programar Asignaciones
                    </button>
                </div>
            `;
        } else {
            let partesSemana = objSemana.partes.sort((a, b) => a.numero - b.numero);
            let mostroBannerMaestros = false;

            partesSemana.forEach(a => {
                let esLectura = (a.tipo.toLowerCase().includes('lectura'));
                if (!esLectura && !mostroBannerMaestros) {
                    htmlSemanal += `
                    <div class="franja-maestros">
                        <span class="d-flex align-items-center gap-2">
                            <span>📖</span> SEAMOS MEJORES MAESTROS
                        </span>
                        <span class="franja-sub">Intervenciones Estudiantiles</span>
                    </div>`;
                    mostroBannerMaestros = true;
                }

                let claseColor = esLectura ? "texto-azul" : "texto-dorado";
                let etiquetaRol = a.ayudante ? "Estudiante / Ayudante" : "Estudiante";
                let nombreEstudiante = invertirNombre(a.estudiante);
                let nombreAyudante = a.ayudante ? invertirNombre(a.ayudante) : "";
                
                if (a.cumplio === "no_cumplio" && a.reemplazo) {
                    nombreEstudiante = `<del class="text-muted">${invertirNombre(a.estudiante)}</del> <span class="badge bg-danger-subtle text-danger border border-danger-subtle ms-1">Reemplazo: ${invertirNombre(a.reemplazo)}</span>`;
                }
                
                if (a.ayudante && a.ayudanteCumplio === false && a.reemplazoAyudante) {
                    nombreAyudante = `<del class="text-muted">${invertirNombre(a.ayudante)}</del> <span class="badge bg-danger-subtle text-danger border border-danger-subtle ms-1">Reemplazo: ${invertirNombre(a.reemplazoAyudante)}</span>`;
                }

                let textoNombres = nombreAyudante 
                    ? `<span class="fw-semibold text-dark">${nombreEstudiante}</span> <span class="text-muted mx-1">/</span> <span class="text-secondary">${nombreAyudante}</span>` 
                    : `<span class="fw-semibold text-dark">${nombreEstudiante}</span>`;

                let iconoEstadoBadge = "⏳ Pendiente";
                let badgeClass = "badge-estado-pendiente";
                let estOk = a.cumplio === "cumplio" || (a.cumplio === "pendiente" && !a.reemplazo);
                let ayuOk = a.ayudanteCumplio !== false;
                if (estOk && ayuOk) {
                    iconoEstadoBadge = "✅ Cumplió";
                    badgeClass = "badge-estado-cumplio";
                } else if (!estOk || !ayuOk) {
                    iconoEstadoBadge = "❌ No Cumplió";
                    badgeClass = "badge-estado-fallo";
                }

                htmlSemanal += `
                <div class="fila-programa">
                    <div class="prog-numero-tipo">
                        <span class="badge-numero-parte">${a.numero}</span>
                        <div class="prog-titulo">
                            <span class="${claseColor}">${a.tipo}</span> 
                        </div>
                    </div>
                    <div class="prog-rol">
                        <span class="badge-rol-pill">${etiquetaRol}</span>
                    </div>
                    <div class="prog-nombres">
                        ${textoNombres}
                        <span class="ms-2 ${badgeClass}">${iconoEstadoBadge}</span>
                    </div>
                    
                    <div class="prog-acciones ms-auto">
                        <button class="btn-icon-action btn-cumplimiento" onclick="abrirModalCumplimiento('${a.id}')" title="Control de Cumplimiento">🎯</button>
                        <button class="btn-icon-action" onclick="abrirModalEdit('${a.id}')" title="Editar Asignación">✏️</button>
                        <button class="btn-icon-action" onclick="copiarMensajeAsignacion('${a.id}', 'aviso')" title="Copiar Aviso">📝</button>
                        <button class="btn-icon-action" onclick="copiarMensajeAsignacion('${a.id}', 'recordatorio')" title="Copiar Recordatorio">🔔</button>
                        <button class="btn-icon-action btn-delete-asig" onclick="eliminarAsignacion('${a.id}')" title="Eliminar Asignación">✕</button>
                    </div>
                </div>`;
            });
        }
        htmlSemanal += `</div></div>`;
    });
    
    contenedorProg.innerHTML = htmlSemanal;
}

// --- VENTANA EMERGENTE DE CUMPLIMIENTO (ESTUDIANTE Y AYUDANTE CON SUS REEMPLAZOS) ---
function abrirModalCumplimiento(id) {
    let asig = dbAsignaciones.find(x => x.id === id);
    if (!asig) return;

    document.getElementById('modalCumplimientoIdAsignacion').value = id;
    const contenedorLista = document.getElementById('contenedorListaCumplimiento');

    let estadoEstudiante = (asig.cumplio === "cumplio" || asig.cumplio === "pendiente") && !asig.reemplazo ? "cumplio" : (asig.cumplio === "no_cumplio" ? "no" : "cumplio");
    if(asig.cumplio === "pendiente") estadoEstudiante = "cumplio";

    let html = `
        <div class="mb-3 p-2 border rounded bg-light">
            <label class="fw-bold text-dark d-block mb-1">Estudiante: ${invertirNombre(asig.estudiante)}</label>
            <div class="btn-group w-100" role="group">
                <input type="radio" class="btn-check" name="radioEstudiante" id="estCumplio" value="cumplio" ${estadoEstudiante === "cumplio" && !asig.reemplazo ? 'checked' : ''}>
                <label class="btn btn-outline-success btn-sm" for="estCumplio">✅ Sí Cumplió</label>

                <input type="radio" class="btn-check" name="radioEstudiante" id="estNoCumplio" value="no" ${asig.cumplio === "no_cumplio" ? 'checked' : ''}>
                <label class="btn btn-outline-danger btn-sm" for="estNoCumplio">❌ No Cumplió</label>
            </div>

            <div id="seccionReemplazoEst" class="mt-2 ${asig.cumplio === "no_cumplio" ? '' : 'd-none'}">
                <label class="form-label text-muted small fw-bold mt-1">Reemplazo del Estudiante:</label>
                <input type="text" id="inputReemplazoEst" class="form-control form-control-sm" list="listaHermanosGlobal" value="${asig.reemplazo || ''}" placeholder="Apellidos, Nombres">
            </div>
        </div>
    `;

    if (asig.ayudante) {
        let estadoAyudante = asig.ayudanteCumplio !== false ? "cumplio" : "no";
        html += `
            <div class="mb-2 p-2 border rounded bg-light">
                <label class="fw-bold text-dark d-block mb-1">Ayudante: ${invertirNombre(asig.ayudante)}</label>
                <div class="btn-group w-100" role="group">
                    <input type="radio" class="btn-check" name="radioAyudante" id="ayuCumplio" value="cumplio" ${estadoAyudante === "cumplio" ? 'checked' : ''}>
                    <label class="btn btn-outline-success btn-sm" for="ayuCumplio">✅ Sí Cumplió</label>

                    <input type="radio" class="btn-check" name="radioAyudante" id="ayuNoCumplio" value="no" ${estadoAyudante === "no" ? 'checked' : ''}>
                    <label class="btn btn-outline-danger btn-sm" for="ayuNoCumplio">❌ No Cumplió</label>
                </div>

                <div id="seccionReemplazoAyu" class="mt-2 ${estadoAyudante === "no" ? '' : 'd-none'}">
                    <label class="form-label text-muted small fw-bold mt-1">Reemplazo del Ayudante:</label>
                    <input type="text" id="inputReemplazoAyu" class="form-control form-control-sm" list="listaHermanosGlobal" value="${asig.reemplazoAyudante || ''}" placeholder="Apellidos, Nombres">
                </div>
            </div>
        `;
    }

    contenedorLista.innerHTML = html;
    modalCumplimientoInstancia.show();
}

document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'estNoCumplio') {
        document.getElementById('seccionReemplazoEst')?.classList.remove('d-none');
    } else if (e.target && e.target.id === 'estCumplio') {
        document.getElementById('seccionReemplazoEst')?.classList.add('d-none');
    }
    
    if (e.target && e.target.id === 'ayuNoCumplio') {
        document.getElementById('seccionReemplazoAyu')?.classList.remove('d-none');
    } else if (e.target && e.target.id === 'ayuCumplio') {
        document.getElementById('seccionReemplazoAyu')?.classList.add('d-none');
    }
});

function guardarControlCumplimientoModal() {
    let id = document.getElementById('modalCumplimientoIdAsignacion').value;
    let asig = dbAsignaciones.find(x => x.id === id);
    if (!asig) return;

    let radioEstNo = document.getElementById('estNoCumplio');
    let inputReemplazoEst = document.getElementById('inputReemplazoEst');

    if (radioEstNo && radioEstNo.checked) {
        asig.cumplio = "no_cumplio";
        asig.reemplazo = inputReemplazo ? inputReemplazo.value.trim() : "";
    } else {
        asig.cumplio = "cumplio";
        asig.reemplazo = "";
    }

    if (asig.ayudante) {
        let radioAyuNo = document.getElementById('ayuNoCumplio');
        let inputReemplazoAyu = document.getElementById('inputReemplazoAyu');
        if (radioAyuNo && radioAyuNo.checked) {
            asig.ayudanteCumplio = false;
            asig.reemplazoAyudante = inputReemplazoAyu ? inputReemplazoAyu.value.trim() : "";
        } else {
            asig.ayudanteCumplio = true;
            asig.reemplazoAyudante = "";
        }
    }

    localStorage.setItem('bd_asignaciones_v16', JSON.stringify(dbAsignaciones));

    modalCumplimientoInstancia.hide();
    renderizarProgramaMensual();
    renderizarPlanificacionMeses();
    renderizarVistaGeneralAsignaciones();
    mostrarHistorialAsignaciones();
}

function abrirModalAdd(fechaMartes) {
    document.getElementById('tituloModal').textContent = "Agregar Nueva Asignación";
    document.getElementById('modalEditId').value = ""; 
    document.getElementById('modalFechaMartes').value = fechaMartes;
    
    let form = document.getElementById('formAsignacionRapida');
    form.reset();
    
    let partesSemana = dbAsignaciones.filter(a => a.fecha === fechaMartes);
    let sgtNumero = partesSemana.length > 0 ? Math.max(...partesSemana.map(p => p.numero)) + 1 : 3;
    form.querySelector('[name="numeroParte"]').value = sgtNumero > 9 ? 9 : sgtNumero; 

    modalRapidoAsig.show();
}

function abrirModalEdit(id) {
    const asig = dbAsignaciones.find(x => x.id === id);
    if(!asig) return;

    document.getElementById('tituloModal').textContent = "✏️ Editar Asignación";
    document.getElementById('modalEditId').value = id; 
    document.getElementById('modalFechaMartes').value = asig.fecha;
    
    let form = document.getElementById('formAsignacionRapida');
    form.querySelector('[name="numeroParte"]').value = asig.numero;
    form.querySelector('[name="tipoAsignacion"]').value = asig.tipo;
    form.querySelector('[name="nombreEstudiante"]').value = asig.estudiante;
    form.querySelector('[name="nombreAyudante"]').value = asig.ayudante || "";

    modalRapidoAsig.show();
}

function guardarAsignacionRapida(e) {
    e.preventDefault();
    const form = document.getElementById('formAsignacionRapida');
    
    let nEst = form.querySelector('[name="nombreEstudiante"]').value.trim();
    let nAyu = form.querySelector('[name="nombreAyudante"]').value.trim();
    
    if(!validarAsignacion(nEst)) return; 
    if(!validarAsignacion(nAyu)) return;

    const idEdit = document.getElementById('modalEditId').value;
    const data = {
        fecha: document.getElementById('modalFechaMartes').value,
        numero: parseInt(form.querySelector('[name="numeroParte"]').value),
        tipo: form.querySelector('[name="tipoAsignacion"]').value,
        estudiante: nEst,
        ayudante: nAyu,
        cumplio: "pendiente",
        reemplazo: "",
        ayudanteCumplio: true,
        reemplazoAyudante: ""
    };

    if (idEdit) {
        let index = dbAsignaciones.findIndex(x => x.id === idEdit);
        dbAsignaciones[index] = { ...dbAsignaciones[index], ...data };
    } else {
        dbAsignaciones.push({ id: Date.now().toString(), ...data });
    }

    localStorage.setItem('bd_asignaciones_v16', JSON.stringify(dbAsignaciones));
    
    renderizarVistaGeneralAsignaciones();
    renderizarProgramaMensual();
    renderizarPlanificacionMeses();
    mostrarHistorialAsignaciones();
    modalRapidoAsig.hide();
}

function eliminarAsignacion(id) {
    if(confirm('¿Eliminar esta asignación del programa?')) {
        dbAsignaciones = dbAsignaciones.filter(a => a.id !== id);
        localStorage.setItem('bd_asignaciones_v16', JSON.stringify(dbAsignaciones));
        renderizarVistaGeneralAsignaciones();
        renderizarProgramaMensual();
        renderizarPlanificacionMeses();
        mostrarHistorialAsignaciones();
    }
}

function copiarMensajeAsignacion(id, tipoMensaje) {
    const a = dbAsignaciones.find(x => x.id === id);
    if(!a) return;

    let nombreEstudianteLimpio = invertirNombre(a.estudiante);
    let primerNombreEstudiante = nombreEstudianteLimpio.split(' ')[0];

    let ultimoCaracter = primerNombreEstudiante.slice(-1).toLowerCase();
    let tratoGen = "Amigo"; 
    if (ultimoCaracter === 'a' || primerNombreEstudiante.toLowerCase() === 'rosse' || primerNombreEstudiante.toLowerCase() === 'mercedes') {
        tratoGen = "Hermanita";
    }

    let [y, m, d] = String(a.fecha).split('-');
    let fechaFormateada = `${d}/${m}/${y}`;
    let texto = "";

    if (tipoMensaje === 'aviso') {
        let ayudanteTexto = a.ayudante ? `\n👤 Ayudante: ${invertirNombre(a.ayudante)}` : "";
        texto = `Hola ${tratoGen} ${primerNombreEstudiante}.\nEspero se encuentre bien con el favor de Jehová.\nLe envío la asignación programada para este mes.\n\n📅 Fecha: ${fechaFormateada}\n📝 Asignación: ${a.tipo}${ayudanteTexto}`;
    } else if (tipoMensaje === 'recordatorio') {
        let ayudanteTexto = a.ayudante ? ` con ${invertirNombre(a.ayudante).split(' ')[0]}` : "";
        texto = `🔔 RECORDATORIO\nHola ${tratoGen} ${primerNombreEstudiante},\nLe hago el recordatorio que este Martes ${parseInt(d)} tiene asignacion${ayudanteTexto}.\nMe confirma si ya pudo comunicarse con la hermana y practicar.\nMuchas gracias de antemano.`;
    }

    navigator.clipboard.writeText(texto).then(() => {
        const toast = document.getElementById('toast-copiado');
        if(toast) {
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 2500);
        }
    }).catch(err => {
        alert("No se pudo copiar automáticamente. Aquí está el texto:\n\n" + texto);
    });
}

function mostrarHistorialAsignaciones() {
    const selectHist = document.getElementById('selectHistorial');
    const tabla = document.getElementById('tablaHistorial');
    if(!selectHist || !tabla) return;
    
    const nombre = selectHist.value;
    tabla.innerHTML = '';

    if (!nombre) {
        tabla.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Seleccione un hermano</td></tr>'; return;
    }

    // Historial unificado para estudiante, ayudante o reemplazos efectivos
    let historial = dbAsignaciones.filter(a => {
        let esEstudiantePrincipal = a.estudiante === nombre;
        let esAyudantePrincipal = a.ayudante === nombre;
        let esReemplazoEst = a.cumplio === "no_cumplio" && a.reemplazo === nombre;
        let esReemplazoAyu = a.ayudanteCumplio === false && a.reemplazoAyudante === nombre;
        return esEstudiantePrincipal || esAyudantePrincipal || esReemplazoEst || esReemplazoAyu;
    });
    
    historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    if(historial.length === 0) {
        tabla.innerHTML = '<tr><td colspan="6" class="text-center text-muted">Sin registros</td></tr>'; return;
    }

    historial.forEach((a, index) => {
        let rol = "Estudiante";
        if (a.ayudante === nombre) rol = "Ayudante";
        if (a.cumplio === "no_cumplio" && a.reemplazo === nombre) rol = "Estudiante (Reemplazo)";
        if (a.ayudanteCumplio === false && a.reemplazoAyudante === nombre) rol = "Ayudante (Reemplazo)";

        let companero = (rol.includes("Ayudante")) ? invertirNombre(a.estudiante) : (a.ayudante ? invertirNombre(a.ayudante) : "-");
        
        let textoIntervalo = '<span class="text-success">Primera vez</span>';
        if (index < historial.length - 1) {
            const diffMs = new Date(a.fecha) - new Date(historial[index + 1].fecha);
            textoIntervalo = `Hace ${Math.floor(diffMs / (1000 * 60 * 60 * 24))} días`;
        }
        
        let badgeCumplido = '<span class="badge bg-secondary">Pendiente</span>';
        if (rol.includes("Ayudante")) {
            if (rol.includes("Reemplazo")) {
                badgeCumplido = '<span class="badge bg-success">Cumplió como Reemplazo ✅</span>';
            } else if (a.ayudanteCumplio !== false) {
                badgeCumplido = '<span class="badge bg-success">Cumplió ✅</span>';
            } else {
                badgeCumplido = `<span class="badge bg-danger">No Cumplió ❌ (Reemplazado por ${invertirNombre(a.reemplazoAyudante)})</span>`;
            }
        } else {
            if (a.cumplio === "cumplio") {
                badgeCumplido = '<span class="badge bg-success">Cumplió ✅</span>';
            } else if (a.cumplio === "no_cumplio") {
                if (a.reemplazo === nombre) {
                    badgeCumplido = `<span class="badge bg-success">Cumplió como Reemplazo ✅</span>`;
                } else {
                    badgeCumplido = `<span class="badge bg-danger">No Cumplió ❌ (Reemplazado por ${invertirNombre(a.reemplazo)})</span>`;
                }
            }
        }

        let [y, m, d] = String(a.fecha).split('-');
        tabla.innerHTML += `
            <tr>
                <td>${d}/${m}/${y}</td>
                <td><strong>${rol}</strong></td>
                <td>${a.tipo}</td>
                <td class="text-muted">${companero}</td>
                <td class="text-center">${badgeCumplido}</td>
                <td class="text-center bg-light">${textoIntervalo}</td>
            </tr>`;
    });
}