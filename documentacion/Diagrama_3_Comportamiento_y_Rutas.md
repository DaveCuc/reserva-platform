# **Diagrama 3: Comportamiento de Rutas y Ciclo de Estados**

Este diagrama modela el flujo de navegación integral de la plataforma, el ciclo de formación del Alumno/Productor y el ciclo de vida de los registros de negocio con palabras clave concisas, diseño ordenado sin cruce de líneas y diferenciación cromática por módulo.

---

## **1. Glosario de Abreviaturas y Términos Utilizados**

Para facilitar la lectura y evaluación del diagrama, a continuación se describe el significado de cada término empleado:

| Abreviatura / Término | Significado Completo | Descripción en la Plataforma |
| :--- | :--- | :--- |
| **Formación (LMS)** | **Sistema de Gestión de Aprendizaje** (*Learning Management System*) | Flujo educativo: Catálogo de cursos, aula virtual, exámenes y certificados oficiales. |
| **CMS** | **Sistema de Gestión de Contenidos** (*Content Management System*) | Flujo editorial: Publicación de artículos, guías ecológicas y eventos institucionales. |
| **RSVP** | **Enlace de Registro Externo** (*Répondez s'il vous plaît*) | Botón de enlace provisto por el organizador para confirmar asistencia externa a un evento. |
| **PDF** | **Documento Digital Descargable** (*Portable Document Format*) | Formato de los certificados oficiales y de las guías de estudio descargables. |
| **Gestión del Negocio** | **Padrón Comercial Propio** | Módulo donde el Alumno/Productor registra, edita su negocio, envía a revisión y subsana observaciones. |
| **Dictamen** | **Resolución del Profesor** | Decisión formal de **Aprobar** (publicar) o **Rechazar con observaciones**. |
| **Subsanación** | **Corrección de Observaciones** | Proceso donde el usuario solventa los datos señalados por el Profesor y reenvía su solicitud. |

---

## **2. Paleta de Colores y Convenciones**

* 🟦 **Área Pública (Azul):** Navegación libre, mapas, directorios, artículos y eventos (Visitante).
* 🟩 **Formación (Verde):** Cursos, aula virtual, exámenes y certificado (Alumno/Productor).
* 🟨 **Gestión del Negocio (Ámbar):** Registro, edición, estados de trámite y subsanación (Alumno/Productor).
* 🟪 **Gestión Docente (Púrpura):** Auditoría comercial, dictámenes y creación de cursos (Profesor).
* 🟥 **Alertas y Rechazos (Rojo):** Notificación de observaciones y subsanación.

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

    ' --- FLUJO ALUMNO/PRODUCTOR: FORMACIÓN ---
    state "Formación (Cursos)" as SubLMS <<LMS>> {
        state "Catálogo de Cursos" as Explorar <<LMS>>
        state "Aula Virtual (Lecciones y PDF)" as Aula <<LMS>>
        state "Evaluación / Examen" as Examen <<LMS>>
        state "Certificado PDF Emitido" as Diploma <<LMS>>

        Explorar --> Aula : Inscribirme
        Aula --> Examen : Temario 100%
        Examen --> Aula : Reprobado (Reintentar)
        Examen --> Diploma : Aprobado >= 80%
    }

    Dashboard --> Explorar : Explorar Cursos
    Dashboard --> Aula : Continuar Curso

    ' --- FLUJO ALUMNO/PRODUCTOR: GESTIÓN DEL NEGOCIO ---
    state "Gestión del Negocio" as SubTrade <<Trade>> {
        state "Panel 'Mi Negocio'" as MisNegocios <<Trade>>
        state "Gestión / Edición del Negocio" as FormTrade <<Trade>>
        state "Borrador" as Borrador <<Trade>>
        state "En Revisión" as EnRevision <<Trade>>
        state "Observación de Rechazo" as AlertaRechazo <<Alert>>

        MisNegocios --> FormTrade : Nuevo Negocio
        FormTrade --> Borrador : Guardar
        Borrador --> EnRevision : Enviar a Revisión
        AlertaRechazo --> FormTrade : Subsanar Observaciones
    }

    Dashboard --> MisNegocios : Gestionar Negocio

    ' --- FLUJO PROFESOR: GESTIÓN DOCENTE ---
    state "Gestión Docente (Profesor)" as SubAdmin <<Admin>> {
        state "Modo Profesor (Topbar Verde)" as ModoProfesor <<Admin>>
        state "Gestión de Cursos" as CMSCursos <<Admin>>
        state "Gestión de Exámenes" as CMSExams <<Admin>>
        state "Gestión de Artículos y Eventos" as CMSContenido <<Admin>>
        state "Bandeja de Auditoría" as Bandeja <<Admin>>
        state "Aprobado (Publicación Inmediata)" as DictamenAprobado <<LMS>>
        state "Rechazado con Observaciones" as DictamenRechazado <<Alert>>

        ModoProfesor --> CMSCursos : Crear/Editar Curso
        CMSCursos --> CMSExams : Añadir Examen
        ModoProfesor --> CMSContenido : Gestionar Artículos/Eventos
        ModoProfesor --> Bandeja : Auditar Negocios

        Bandeja --> DictamenAprobado : Aprobar
        Bandeja --> DictamenRechazado : Rechazar
    }

    Dashboard --> ModoProfesor : Modo Profesor
}

' --- CONEXIONES ENTRE PROCESOS ---
EnRevision --> Bandeja : Ingresa a Auditoría
DictamenRechazado --> AlertaRechazo : Notifica Observaciones
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
    START((🌐 Web)) --> INICIO["Inicio / Portada (UC01)"]:::pub

    %% 1. ÁREA PÚBLICA
    subgraph SEC_PUB["🟦 1. Área Pública (Visitante)"]
        INICIO --> MAPA["Mapa (UC02)"]:::pub
        INICIO --> DIR["Directorio Comercial (UC03)"]:::pub
        INICIO --> ART["Artículos (UC06)"]:::pub
        INICIO --> EVE["Eventos (UC07)"]:::pub
        INICIO --> CUR_PUB["Consultar Cursos (UC05)"]:::pub
        
        MAPA --> FICHA["Ficha de Negocio (UC04)"]:::pub
        DIR --> FICHA
    end

    %% AUTENTICACIÓN
    INICIO --> LOGIN["Iniciar Sesión (UC08)"]:::nodeBase
    LOGIN --> DASHBOARD["Dashboard (Alumno/Productor)"]:::lms

    %% 2. FORMACIÓN
    subgraph SEC_LMS["🟩 2. Formación (Alumno/Productor)"]
        DASHBOARD --> MIS_CURSOS["Consultar Mis Cursos (UC13)"]:::lms
        DASHBOARD --> EXPLORAR["Explorar Cursos (UC11)"]:::lms
        
        EXPLORAR --> AULA["Aula Virtual (UC14)"]:::lms
        MIS_CURSOS --> AULA
        AULA --> EXAMEN["Resolver Examen (UC15)"]:::lms
        
        EXAMEN -->|Aprobado >= 80%| DIPLOMA["🎓 Certificado PDF (UC17)"]:::lms
        EXAMEN -.->|Reprobado| AULA
    end

    %% 3. GESTIÓN DEL NEGOCIO
    subgraph SEC_TRADE["🟨 3. Gestión del Negocio (Alumno/Productor)"]
        DASHBOARD --> MI_NEGOCIO["Gestionar Mi Negocio (UC18)"]:::trade
        MI_NEGOCIO --> REGISTRO["Edición Modular de Datos"]:::trade
        REGISTRO --> ST_DRAFT["Estado: Borrador"]:::trade
        ST_DRAFT --> ST_SEND["Enviar a Revisión (UC19)"]:::trade
        ALERTA_RECHAZO["Subsanar Observaciones (UC20)"]:::alert --> REGISTRO
    end

    %% 4. GESTIÓN DOCENTE
    subgraph SEC_ADMIN["🟪 4. Gestión Docente (Profesor)"]
        DASHBOARD --> TEACHER["Espacio del Profesor"]:::admin
        
        %% Gestión Contenidos
        TEACHER --> CMS_CURSOS["Gestionar Cursos y Contenido (UC21, UC23)"]:::admin
        CMS_CURSOS --> CMS_EXAMS["Gestionar Exámenes (UC22)"]:::admin
        TEACHER --> CMS_CMS["Gestionar Artículos / Eventos (UC26, UC27)"]:::admin
        
        %% Moderación
        TEACHER --> BANDEJA["Revisar Solicitudes de Negocio (UC24)"]:::admin
        BANDEJA --> DICT_OK["🟢 Emitir Dictamen: Aprobado (UC25)"]:::lms
        BANDEJA --> DICT_NO["🔴 Emitir Dictamen: Rechazado (UC25)"]:::alert
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
