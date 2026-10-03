# **Diagrama 1: Casos de Uso del Sistema**

Este diagrama modela las interacciones entre los actores y las funcionalidades principales del sistema, utilizando palabras clave concisas, agrupación por paquetes y codificación de colores para máxima legibilidad.

---

## **1. Glosario de Abreviaturas y Términos Utilizados**

Para facilitar la lectura y evaluación del diagrama, a continuación se describe el significado de cada abreviatura empleada:

| Abreviatura / Término | Significado Completo | Descripción en la Plataforma |
| :--- | :--- | :--- |
| **UC (ej. UC01, UC02...)** | **Caso de Uso** (*Use Case*) | Acción o tarea específica que un usuario puede ejecutar en el sistema. |
| **LMS** | **Sistema de Gestión de Aprendizaje** (*Learning Management System*) | Módulo de cursos, temarios, lecciones en video/texto, evaluaciones y diplomas. |
| **CMS** | **Sistema de Gestión de Contenidos** (*Content Management System*) | Módulo para redactar, editar y publicar artículos, noticias y eventos. |
| **RSVP** | **Registro / Confirmación de Asistencia** (*Répondez s'il vous plaît*) | Botón o enlace para registrarse y apartar lugar en un evento institucional. |
| **PDF** | **Documento Digital Descargable** (*Portable Document Format*) | Formato de los diplomas oficiales y de las guías de estudio descargables. |
| **Drag & Drop** | **Arrastrar y Soltar** | Mecanismo interactivo para reordenar unidades y exámenes en el temario. |
| **Trade / Mi Negocio** | **Comercio / Negocio Local** | Ficha comercial registrada por un prestador de servicios turísticos. |

---

## **2. Convención de Colores por Módulo**

* 🟦 **Área Pública (Azul):** Exploración territorial, directorios, fichas, artículos y eventos.
* 🟩 **Área Académica / LMS (Verde):** Cursos, lecciones, evaluaciones y diplomas.
* 🟨 **Área Comercial / Emprendedor (Ámbar):** Registro en 4 fases, geolocalización y subsanación.
* 🟪 **Área de Gestión / Moderación (Púrpura):** Modo profesor, CMS de contenidos y auditoría comercial.

---

## **3. Versión en PlantUML (Compatible con [plantuml.com](https://www.plantuml.com/plantuml/uml/))**

> **Instrucciones:** Copia el siguiente código y pégalo en [https://www.plantuml.com/plantuml/uml/](https://www.plantuml.com/plantuml/uml/) para generar la imagen vectorial con colores.

```plantuml
@startuml
!theme plain
skinparam packageStyle rectangle
skinparam roundcorner 10
skinparam actorStyle awesome
skinparam shadowing false
left to right direction

' --- ESTILOS DE COLORES ---
skinparam rectangle {
  BorderColor #475569
  BackgroundColor White
}

' --- ACTORES ---
actor "Visitante (Público General)" as Turista #0284C7
actor "Estudiante / Emprendedor" as Estudiante #16A34A
actor "Administrador / Docente" as Admin #9333EA

Turista <|-- Estudiante
Estudiante <|-- Admin

' --- PAQUETES ---

rectangle "Área Pública (Navegación Abierta)" #E0F2FE {
    usecase "UC01: Explorar Inicio y Rutas" as UC_Inicio
    usecase "UC02: Mapa con Capas y Pines" as UC_Mapa
    usecase "UC03: Directorio Comercial" as UC_Directorio
    usecase "UC04: Ficha de Negocio (Galería y Mapa)" as UC_FichaNegocio
    usecase "UC05: Artículos y Noticias" as UC_Articulos
    usecase "UC06: Agenda de Eventos (Registro RSVP)" as UC_Eventos
    usecase "UC07: Portal de Cursos y Docentes" as UC_CursosPub
    usecase "UC08: Login / Recuperar Contraseña" as UC_Login
}

rectangle "Ruta Académica (LMS - Cursos)" #DCFCE7 {
    usecase "UC09: Inscribirse a Cursos" as UC_Inscribir
    usecase "UC10: Monitor 'Mis Cursos'" as UC_MisCursos
    usecase "UC11: Aula Virtual y Guías PDF" as UC_Aula
    usecase "UC12: Resolver Examen" as UC_Examen
    usecase "UC13: Descargar Diploma PDF" as UC_Diploma
    
    UC_Examen <.. UC_Diploma : <<extend>> (Aprobado)
}

rectangle "Mi Negocio (Comercios y Emprendedores)" #FEF3C7 {
    usecase "UC14: Registrar Negocio (4 Fases)" as UC_RegNegocio
    usecase "UC15: Pin en Mapa y Fotos" as UC_GeoFotos
    usecase "UC16: Enviar a Revisión" as UC_EnviarRev
    usecase "UC17: Subsanar Observaciones" as UC_Subsanar
    
    UC_RegNegocio ..> UC_GeoFotos : <<include>>
    UC_RegNegocio ..> UC_EnviarRev : <<include>>
    UC_EnviarRev <.. UC_Subsanar : <<extend>> (Si es devuelto)
}

rectangle "Gestión y Moderación (Modo Profesor)" #F3E8FF {
    usecase "UC18: Activar 'Modo Profesor'" as UC_ModoProfesor
    usecase "UC19: CMS Cursos (Temario Drag&Drop)" as UC_CMSCursos
    usecase "UC20: Constructor de Exámenes" as UC_CMSExams
    usecase "UC21: CMS Artículos y Eventos" as UC_CMSContenido
    usecase "UC22: Bandeja de Auditoría" as UC_Auditoria
    usecase "UC23: Dictamen (Aprobar / Rechazar)" as UC_Dictamen
    
    UC_CMSCursos ..> UC_CMSExams : <<include>>
    UC_Auditoria ..> UC_Dictamen : <<include>>
}

' --- ASOCIACIONES ---
Turista --> UC_Inicio
Turista --> UC_Mapa
Turista --> UC_Directorio
Turista --> UC_FichaNegocio
Turista --> UC_Articulos
Turista --> UC_Eventos
Turista --> UC_CursosPub
Turista --> UC_Login

Estudiante --> UC_Inscribir
Estudiante --> UC_MisCursos
Estudiante --> UC_Aula
Estudiante --> UC_Examen
Estudiante --> UC_RegNegocio

Admin --> UC_ModoProfesor
Admin --> UC_CMSCursos
Admin --> UC_CMSContenido
Admin --> UC_Auditoria

@enduml
```

---

## **4. Versión en Mermaid (Renderizado Directo con Colores)**

```mermaid
flowchart LR
    %% ESTILOS
    classDef pub fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1,font-weight:bold;
    classDef lms fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#15803d,font-weight:bold;
    classDef trade fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#b45309,font-weight:bold;
    classDef admin fill:#f3e8ff,stroke:#9333ea,stroke-width:2px,color:#7e22ce,font-weight:bold;
    classDef actor fill:#f8fafc,stroke:#475569,stroke-width:2px,color:#0f172a,font-weight:bold;

    %% ACTORES
    subgraph ACTORES["👥 Actores"]
        T["👤 Visitante (Público)"]:::actor
        E["🎓 Estudiante / Emprendedor"]:::actor
        A["🛡️ Administrador / Docente"]:::actor
    end

    %% 1. PÚBLICO
    subgraph G_PUB["🟦 Área Pública"]
        UC01["UC01: Inicio y Rutas"]:::pub
        UC02["UC02: Mapa y Capas"]:::pub
        UC03["UC03: Directorio Comercial"]:::pub
        UC04["UC04: Ficha de Negocio"]:::pub
        UC05["UC05: Artículos / Noticias"]:::pub
        UC06["UC06: Eventos (Registro RSVP)"]:::pub
        UC07["UC07: Portal de Cursos"]:::pub
        UC08["UC08: Login / Acceso"]:::pub
    end

    %% 2. LMS
    subgraph G_LMS["🟩 Ruta Académica (LMS - Cursos)"]
        UC09["UC09: Inscribirse y Mis Cursos"]:::lms
        UC10["UC10: Aula Virtual (Lección y PDF)"]:::lms
        UC11["UC11: Resolver Examen"]:::lms
        UC12["UC12: 🎓 Descargar Diploma PDF"]:::lms
    end

    %% 3. TRADE
    subgraph G_TRADE["🟨 Mi Negocio (Emprendedor)"]
        UC13["UC13: Registro (4 Fases y Mapa)"]:::trade
        UC14["UC14: Enviar a Revisión"]:::trade
        UC15["UC15: Subsanar Rechazo"]:::trade
    end

    %% 4. ADMIN
    subgraph G_ADMIN["🟪 Gestión y Moderación"]
        UC16["UC16: Modo Profesor"]:::admin
        UC17["UC17: CMS Cursos (Drag & Drop)"]:::admin
        UC18["UC18: Constructor de Exámenes"]:::admin
        UC19["UC19: CMS Artículos / Eventos"]:::admin
        UC20["UC20: Auditoría y Dictamen"]:::admin
    end

    %% CONEXIONES VISITANTE
    T --> UC01
    T --> UC02
    T --> UC03
    T --> UC04
    T --> UC05
    T --> UC06
    T --> UC07
    T --> UC08

    %% CONEXIONES ESTUDIANTE
    E --> UC09
    E --> UC10
    E --> UC11
    E --> UC13

    %% CONEXIONES ADMIN
    A --> UC16
    A --> UC17
    A --> UC19
    A --> UC20

    %% RELACIONES INTERNAS
    UC11 -.->|Aprobado| UC12
    UC13 --> UC14
    UC14 -.->|Devuelto| UC15
    UC17 --> UC18
```
