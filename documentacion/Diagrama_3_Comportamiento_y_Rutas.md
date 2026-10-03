# **Diagrama 3: Comportamiento de Rutas y Ciclo de Estados**

Este diagrama modela el flujo de navegación integral de la plataforma, el ciclo de formación del estudiante y el ciclo de vida de los registros comerciales con palabras clave concisas, diseño ordenado sin cruce de líneas y diferenciación cromática por módulo.

---

## **1. Glosario de Abreviaturas y Términos Utilizados**

Para facilitar la lectura y evaluación del diagrama, a continuación se describe el significado de cada abreviatura empleada:

| Abreviatura / Término | Significado Completo | Descripción en la Plataforma |
| :--- | :--- | :--- |
| **LMS** | **Sistema de Gestión de Aprendizaje** (*Learning Management System*) | Flujo educativo: Catálogo de cursos, aula virtual, exámenes y diplomas oficiales. |
| **CMS** | **Sistema de Gestión de Contenidos** (*Content Management System*) | Flujo editorial: Publicación de noticias, guías ecológicas y eventos institucionales. |
| **RSVP** | **Registro / Confirmación de Asistencia** (*Répondez s'il vous plaît*) | Formulario o botón para asegurar asistencia a un evento presencial o virtual. |
| **PDF** | **Documento Digital Descargable** (*Portable Document Format*) | Formato de los diplomas oficiales y de las guías de estudio descargables. |
| **Drag & Drop** | **Arrastrar y Soltar** | Mecanismo interactivo para reordenar capítulos y exámenes en el temario docente. |
| **Mi Negocio (Trade)** | **Padrón Comercial Propio** | Módulo donde el emprendedor registra su comercio a través de 4 fases asistidas. |
| **Dictamen** | **Resolución del Moderador** | Decisión administrativa formal de **Aprobar** (publicar) o **Rechazar con motivo**. |
| **Subsanación** | **Corrección de Observaciones** | Proceso donde el usuario corrige los datos señalados por el evaluador y reenvía su trámite. |

---

## **2. Paleta de Colores y Convenciones**

* 🟦 **Área Pública (Azul):** Navegación libre, mapas, directorios, artículos y eventos.
* 🟩 **Área Académica / LMS (Verde):** Cursos, aula virtual, exámenes y diplomas.
* 🟨 **Área Comercial / Mi Negocio (Ámbar):** Registro en 4 fases, estados de trámite y subsanación.
* 🟪 **Área de Gestión / Moderación (Púrpura):** Auditoría comercial, dictámenes y creación de cursos.
* 🟥 **Alertas y Rechazos (Rojo):** Devolución con motivo obligatorio y corrección.

---

## **3. Versión en PlantUML (Compatible con [plantuml.com](https://www.plantuml.com/plantuml/uml/))**

> **Instrucciones:** Copia el siguiente código y pégalo en [https://www.plantuml.com/plantuml/uml/](https://www.plantuml.com/plantuml/uml/) para visualizarlo con colores y formato vectorial.

```plantuml
@startuml
!theme plain
skinparam roundcorner 12
skinparam shadowing false
skinparam defaultFontName sans-serif
skinparam defaultFontSize 12

skinparam state {
  BackgroundColor White
  BorderColor #475569
  ArrowColor #334155
}

' Colores de estado
skinparam state<<Publico>> {
  BackgroundColor #E0F2FE
  BorderColor #0284C7
  FontColor #0369A1
}
skinparam state<<LMS>> {
  BackgroundColor #DCFCE7
  BorderColor #16A34A
  FontColor #15803D
}
skinparam state<<Trade>> {
  BackgroundColor #FEF3C7
  BorderColor #D97706
  FontColor #B45309
}
skinparam state<<Admin>> {
  BackgroundColor #F3E8FF
  BorderColor #9333EA
  FontColor #7E22CE
}
skinparam state<<Alert>> {
  BackgroundColor #FEE2E2
  BorderColor #DC2626
  FontColor #B91C1C
}

[*] --> Inicio : Ingreso Web

' --- NAVEGACIÓN PÚBLICA ---
state "Área Pública (Navegación Abierta)" as SecPublica <<Publico>> {
    state "Inicio / Portada" as Inicio <<Publico>>
    state "Mapa Interactivo (Capas y Filtros)" as Mapa <<Publico>>
    state "Directorio de Comercios" as Directorio <<Publico>>
    state "Ficha Detallada de Negocio" as Ficha <<Publico>>
    state "Artículos y Guías" as Articulos <<Publico>>
    state "Agenda de Eventos (Registro RSVP)" as Eventos <<Publico>>
    state "Portal de Cursos (Docentes)" as CursosPub <<Publico>>

    Inicio --> Mapa : Ver Mapa
    Inicio --> Directorio : Ver Directorio
    Inicio --> Articulos : Leer
    Inicio --> Eventos : Consultar
    Inicio --> CursosPub : Oferta

    Mapa --> Ficha : Clic en Pin
    Directorio --> Ficha : Ver Ficha
}

' --- AUTENTICACIÓN ---
state "Login / Acceso" as Login <<Publico>>
Inicio --> Login : Acceder
Login --> Dashboard : Credenciales OK

' --- DASHBOARD PRIVADO ---
state "Espacio Privado (Dashboard)" as SecPrivada {
    state "Dashboard / Mis Cursos" as Dashboard <<LMS>>

    ' --- FLUJO ESTUDIANTE LMS ---
    state "Ruta Académica (LMS - Cursos)" as SubLMS <<LMS>> {
        state "Catálogo de Cursos" as Explorar <<LMS>>
        state "Aula Virtual (Lecciones y PDF)" as Aula <<LMS>>
        state "Evaluación / Examen" as Examen <<LMS>>
        state "Diploma PDF Emitido" as Diploma <<LMS>>

        Explorar --> Aula : Inscribirme
        Aula --> Examen : Temario 100%
        Examen --> Aula : Reprobado (Reintentar)
        Examen --> Diploma : Aprobado >= 80%
    }

    Dashboard --> Explorar : Explorar Cursos
    Dashboard --> Aula : Continuar Curso

    ' --- FLUJO EMPRENDEDOR ---
    state "Ruta Comercial (Mi Negocio)" as SubTrade <<Trade>> {
        state "Panel 'Mi Negocio'" as MisNegocios <<Trade>>
        state "Registro (4 Fases: Datos, Contacto, Mapa, Fotos)" as FormTrade <<Trade>>
        state "Borrador" as Borrador <<Trade>>
        state "En Revisión" as EnRevision <<Trade>>
        state "Observación de Rechazo" as AlertaRechazo <<Alert>>

        MisNegocios --> FormTrade : Nuevo Negocio
        FormTrade --> Borrador : Guardar
        Borrador --> EnRevision : Enviar a Revisión
        AlertaRechazo --> FormTrade : Subsanar Datos
    }

    Dashboard --> MisNegocios : Gestionar Negocio

    ' --- FLUJO GESTIÓN / PROFESOR ---
    state "Ruta Gestión (Modo Profesor)" as SubAdmin <<Admin>> {
        state "Modo Profesor (Topbar Verde)" as ModoProfesor <<Admin>>
        state "CMS Cursos (Temario Drag&Drop)" as CMSCursos <<Admin>>
        state "Constructor de Exámenes" as CMSExams <<Admin>>
        state "CMS Artículos y Eventos" as CMSContenido <<Admin>>
        state "Bandeja de Auditoría" as Bandeja <<Admin>>
        state "Aprobado (Publicación Inmediata)" as DictamenAprobado <<LMS>>
        state "Rechazado con Motivo" as DictamenRechazado <<Alert>>

        ModoProfesor --> CMSCursos : Crear Curso
        CMSCursos --> CMSExams : Añadir Examen
        ModoProfesor --> CMSContenido : Publicar Noticias
        ModoProfesor --> Bandeja : Auditar Negocios

        Bandeja --> DictamenAprobado : Aprobar
        Bandeja --> DictamenRechazado : Rechazar
    }

    Dashboard --> ModoProfesor : Activar Modo
}

' --- CONEXIONES ENTRE PROCESOS ---
EnRevision --> Bandeja : Ingresa a Auditoría
DictamenRechazado --> AlertaRechazo : Notifica Motivo
DictamenAprobado --> Directorio : Publicado
DictamenAprobado --> Mapa : Pin Activo
CMSCursos --> Explorar : Disponible

@enduml
```

---

## **4. Versión en Mermaid (Renderizado Directo con Colores y Rutas Claras)**

```mermaid
flowchart TD
    %% ESTILOS DE COLOR
    classDef pub fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1,font-weight:bold;
    classDef lms fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#15803d,font-weight:bold;
    classDef trade fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#b45309,font-weight:bold;
    classDef admin fill:#f3e8ff,stroke:#9333ea,stroke-width:2px,color:#7e22ce,font-weight:bold;
    classDef alert fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#b91c1c,font-weight:bold;
    classDef nodeBase fill:#f8fafc,stroke:#64748b,stroke-width:2px,color:#1e293b;

    %% NODO PRINCIPAL
    START((🌐 Web)) --> INICIO["Inicio / Portada"]:::pub

    %% 1. ÁREA PÚBLICA
    subgraph SEC_PUB["🟦 1. Navegación Pública"]
        INICIO --> MAPA["Mapa (Capas y Pines)"]:::pub
        INICIO --> DIR["Directorio Comercial"]:::pub
        INICIO --> ART["Artículos / Noticias"]:::pub
        INICIO --> EVE["Eventos (Registro RSVP)"]:::pub
        INICIO --> CUR_PUB["Oferta de Cursos"]:::pub
        
        MAPA --> FICHA["Ficha de Negocio"]:::pub
        DIR --> FICHA
    end

    %% AUTENTICACIÓN
    INICIO --> LOGIN["Login / Acceso"]:::nodeBase
    LOGIN --> DASHBOARD["Dashboard de Usuario"]:::lms

    %% 2. ÁREA ESTUDIANTE
    subgraph SEC_LMS["🟩 2. Ruta Académica (LMS - Cursos)"]
        DASHBOARD --> MIS_CURSOS["Mis Cursos"]:::lms
        DASHBOARD --> EXPLORAR["Explorar Cursos"]:::lms
        
        EXPLORAR --> AULA["Aula Virtual (Lección y PDF)"]:::lms
        MIS_CURSOS --> AULA
        AULA --> EXAMEN["Evaluación / Examen"]:::lms
        
        EXAMEN -->|Aprobado >= 80%| DIPLOMA["🎓 Diploma Oficial PDF"]:::lms
        EXAMEN -.->|Reprobado| AULA
    end

    %% 3. ÁREA EMPRENDEDOR
    subgraph SEC_TRADE["🟨 3. Ruta Comercial (Mi Negocio)"]
        DASHBOARD --> MI_NEGOCIO["Panel 'Mi Negocio'"]:::trade
        MI_NEGOCIO --> REGISTRO["Registro (4 Fases: Datos, Contacto, Mapa, Fotos)"]:::trade
        REGISTRO --> ST_DRAFT["Estado: Borrador"]:::trade
        ST_DRAFT --> ST_SEND["Estado: En Revisión"]:::trade
        ALERTA_RECHAZO["Alerta de Rechazo (Motivo)"]:::alert --> REGISTRO
    end

    %% 4. ÁREA GESTIÓN / PROFESOR
    subgraph SEC_ADMIN["🟪 4. Ruta Gestión (Modo Profesor)"]
        DASHBOARD --> TEACHER["Modo Profesor"]:::admin
        
        %% Gestión Contenidos
        TEACHER --> CMS_CURSOS["CMS Cursos (Temario Drag & Drop)"]:::admin
        CMS_CURSOS --> CMS_EXAMS["Constructor Exámenes"]:::admin
        TEACHER --> CMS_CMS["CMS Artículos / Eventos"]:::admin
        
        %% Moderación
        TEACHER --> BANDEJA["Bandeja de Auditoría"]:::admin
        BANDEJA --> DICT_OK["🟢 Dictamen: Aprobado"]:::lms
        BANDEJA --> DICT_NO["🔴 Dictamen: Rechazado con Motivo"]:::alert
    end

    %% CONEXIONES DE INTEGRACIÓN
    ST_SEND --> BANDEJA
    DICT_NO --> ALERTA_RECHAZO
    DICT_OK --> DIR
    DICT_OK --> MAPA
    CMS_EXAMS --> EXPLORAR
    CMS_CMS --> ART
    CMS_CMS --> EVE
```
