# **Documento de Diagramas: Casos de Uso, Arquitectura y Comportamiento de la Plataforma**

> **Referencia de Alcance:** Basado íntegramente en el [*Documento de Alcance de Evaluación: Arquitectura Visual y Módulos de la Plataforma Web V3*](file:///c:/Users/DaveCuc/Projects/turismo-platform/tests/react-inertia-starter-main/Documento%20de%20Alcance%20de%20Evaluaci%C3%B3n_%20Arquitectura%20y%20M%C3%B3dulos%20de%20la%20Plataforma%20V3.md).

Este documento reúne los tres diagramas fundamentales para el análisis, evaluación y comprensión integral del sistema:
1. **Diagrama de Casos de Uso del Sistema** (En sintaxis **Mermaid** y sintaxis compatible con **PlantUML / plantuml.com**).
2. **Diagrama de Arquitectura Conceptual y Modular de la Plataforma** (En sintaxis **Mermaid** y **PlantUML**).
3. **Diagrama de Comportamiento de Rutas, Flujos de Navegación y Ciclo de Estados** (En sintaxis **Mermaid** y **PlantUML**).

---

## **1. Diagrama de Casos de Uso del Sistema**

Modela las interacciones entre los actores del sistema y los diferentes módulos y funcionalidades disponibles.

### **1.1. Actores Identificados**
* 👤 **Visitante / Turista (Público General):** Usuario sin autenticar que navega por el portal, explora la reserva en el mapa, consulta el directorio de negocios, lee artículos, revisa eventos y consulta la oferta educativa.
* 🎓 **Usuario Autenticado / Estudiante / Emprendedor:** Usuario con cuenta activa que cursa capacitaciones, realiza exámenes, descarga certificados oficiales en PDF, registra y gestiona sus propios comercios turísticos y subsana observaciones.
* 🛡️ **Administrador / Docente / Evaluador:** Usuario con privilegios de gestión que activa el *Modo Profesor* para diseñar cursos y exámenes, audita y dictamina solicitudes comerciales (con aprobación o rechazo justificado) y gestiona noticias y eventos.

---

### **1.2. Versión en PlantUML (Compatible con [plantuml.com](https://www.plantuml.com/plantuml/uml/))**

```plantuml
@startuml
!theme plain
skinparam packageStyle rectangle
skinparam roundcorner 10
skinparam actorStyle awesome
left to right direction

' --- ACTORES ---
actor "Visitante / Turista\n(Público General)" as Turista
actor "Usuario / Estudiante /\nEmprendedor" as Estudiante
actor "Administrador / Docente /\nEvaluador" as Admin

' Herencia de actores
Turista <|-- Estudiante
Estudiante <|-- Admin

' --- PAQUETES DE CASOS DE USO ---

rectangle "Área Pública y Exploración Territorial" {
    usecase "UC01: Explorar Portal de Inicio y Rutas" as UC_Inicio
    usecase "UC02: Explorar Mapa Interactivo con Capas" as UC_Mapa
    usecase "UC03: Filtrar por Región, Municipio y Giro" as UC_FiltrosMapa
    usecase "UC04: Consultar Directorio Comercial" as UC_Directorio
    usecase "UC05: Ver Ficha Detallada de Negocio" as UC_FichaNegocio
    usecase "UC06: Ver Galería, Certificaciones y Ubicación" as UC_DetallesFicha
    usecase "UC07: Leer Artículos y Guías de Interés" as UC_Articulos
    usecase "UC08: Consultar Agenda de Eventos y Confirmar RSVP" as UC_Eventos
    usecase "UC09: Consultar Oferta de Cursos y Muro Docente" as UC_CursosPublicos
    
    UC_Mapa ..> UC_FiltrosMapa : <<include>>
    UC_FichaNegocio ..> UC_DetallesFicha : <<include>>
}

rectangle "Autenticación y Seguridad" {
    usecase "UC10: Iniciar Sesión (Recordar Credenciales)" as UC_Login
    usecase "UC11: Recuperar Contraseña por Correo" as UC_Recuperar
    usecase "UC12: Gestionar Perfil y Contraseña" as UC_Perfil
}

rectangle "Formación y Capacitación (LMS)" {
    usecase "UC13: Inscribirse a Cursos Gratuitos" as UC_Inscribir
    usecase "UC14: Monitorear Progreso en 'Mis Cursos'" as UC_MisCursos
    usecase "UC15: Visualizar Lecciones en Aula Virtual" as UC_Aula
    usecase "UC16: Descargar Materiales de Apoyo en PDF" as UC_DescargarPDF
    usecase "UC17: Resolver Evaluaciones y Exámenes" as UC_Examen
    usecase "UC18: Descargar Diploma Oficial en PDF" as UC_Diploma
    
    UC_Aula ..> UC_DescargarPDF : <<include>>
    UC_Examen <.. UC_Diploma : <<extend>> (Aprobado al 100%)
}

rectangle "Gestión Comercial del Emprendedor ('Mi Negocio')" {
    usecase "UC19: Registrar Negocio (Formulario 4 Fases)" as UC_RegistrarNegocio
    usecase "UC20: Ubicar Coordenadas en Mapa Interactivo" as UC_GeoPin
    usecase "UC21: Cargar Galería y Sellos Ambientales" as UC_CargarArchivos
    usecase "UC22: Enviar Solicitud a Moderación" as UC_EnviarRevision
    usecase "UC23: Consultar Motivo de Rechazo y Subsanar" as UC_Subsanar
    
    UC_RegistrarNegocio ..> UC_GeoPin : <<include>>
    UC_RegistrarNegocio ..> UC_CargarArchivos : <<include>>
    UC_RegistrarNegocio ..> UC_EnviarRevision : <<include>>
    UC_EnviarRevision <.. UC_Subsanar : <<extend>> (Si es devuelto)
}

rectangle "Espacio Docente y Creación de Contenidos" {
    usecase "UC24: Activar 'Modo Profesor' (Topbar Verde)" as UC_ModoProfesor
    usecase "UC25: Crear y Configurar Cursos" as UC_CrearCurso
    usecase "UC26: Reordenar Temario (Drag & Drop)" as UC_ReordenarTemario
    usecase "UC27: Editar Capítulos Multimedia y PDFs" as UC_EditarCapitulo
    usecase "UC28: Construir Exámenes y Banco de Preguntas" as UC_ConstructorExamen
    usecase "UC29: Publicar / Despublicar Cursos" as UC_PublicarCurso
    usecase "UC30: Publicar Artículos y Noticias" as UC_CMSArticulos
    usecase "UC31: Publicar Eventos y Catálogo de Ponentes" as UC_CMSEventos
    
    UC_CrearCurso ..> UC_ReordenarTemario : <<include>>
    UC_CrearCurso ..> UC_EditarCapitulo : <<include>>
    UC_CrearCurso ..> UC_ConstructorExamen : <<include>>
}

rectangle "Auditoría y Moderación Comercial" {
    usecase "UC32: Consultar Bandeja de Solicitudes" as UC_BandejaSolicitudes
    usecase "UC33: Auditar Expediente Digital Completo" as UC_AuditarNegocio
    usecase "UC34: Aprobar Negocio (Publicación Inmediata)" as UC_AprobarNegocio
    usecase "UC35: Rechazar Negocio con Justificación Obligatoria" as UC_RechazarNegocio
    
    UC_BandejaSolicitudes ..> UC_AuditarNegocio : <<include>>
    UC_AuditarNegocio ..> UC_AprobarNegocio : <<include>>
    UC_AuditarNegocio ..> UC_RechazarNegocio : <<include>>
}

' --- ASOCIACIONES ACTOR -> CASOS DE USO ---

Turista --> UC_Inicio
Turista --> UC_Mapa
Turista --> UC_Directorio
Turista --> UC_FichaNegocio
Turista --> UC_Articulos
Turista --> UC_Eventos
Turista --> UC_CursosPublicos
Turista --> UC_Login
Turista --> UC_Recuperar

Estudiante --> UC_Perfil
Estudiante --> UC_Inscribir
Estudiante --> UC_MisCursos
Estudiante --> UC_Aula
Estudiante --> UC_Examen
Estudiante --> UC_Diploma
Estudiante --> UC_RegistrarNegocio

Admin --> UC_ModoProfesor
Admin --> UC_CrearCurso
Admin --> UC_PublicarCurso
Admin --> UC_CMSArticulos
Admin --> UC_CMSEventos
Admin --> UC_BandejaSolicitudes

@enduml
```

---

### **1.3. Versión en Mermaid (Casos de Uso)**

```mermaid
flowchart LR
    %% Actores
    subgraph Actores["Actores del Sistema"]
        T["👤 Visitante / Turista"]
        E["🎓 Estudiante / Emprendedor"]
        A["🛡️ Administrador / Docente"]
    end

    %% Paquete Público
    subgraph Pub["Área Pública y Territorio"]
        UC01["Explorar Inicio y Rutas"]
        UC02["Mapa Interactivo (Capas y Filtros)"]
        UC03["Directorio de Comercios"]
        UC04["Ficha de Negocio (Galería, Certificados y Mapa)"]
        UC05["Lectura de Artículos y Noticias"]
        UC06["Agenda de Eventos y Registro RSVP"]
        UC07["Portal de Cursos y Muro Docente"]
        UC08["Acceso / Recuperación de Contraseña"]
    end

    %% Paquete Estudiante
    subgraph Est["Espacio del Estudiante y Emprendedor"]
        UC09["Inscribirse y Monitorear 'Mis Cursos'"]
        UC10["Aula Virtual (Video, Texto y Guías PDF)"]
        UC11["Resolver Evaluaciones e Intentos"]
        UC12["Descarga de Diploma en PDF"]
        UC13["Registrar Negocio Propio (4 Fases)"]
        UC14["Enviar a Revisión / Subsanar Observaciones"]
        UC15["Gestión de Perfil de Usuario"]
    end

    %% Paquete Gestión
    subgraph Gest["Espacio de Gestión y Docencia"]
        UC16["Activar 'Modo Profesor' (Topbar Verde)"]
        UC17["Constructor de Cursos (Temario Drag & Drop)"]
        UC18["Constructor de Exámenes y Banco de Preguntas"]
        UC19["Bandeja de Auditoría de Negocios"]
        UC20["Dictamen de Negocio (Aprobar / Rechazar con Motivo)"]
        UC21["CMS de Artículos y Eventos con Ponentes"]
    end

    %% Conexiones Turista
    T --> UC01
    T --> UC02
    T --> UC03
    T --> UC04
    T --> UC05
    T --> UC06
    T --> UC07
    T --> UC08

    %% Conexiones Estudiante
    E --> UC09
    E --> UC10
    E --> UC11
    E --> UC12
    E --> UC13
    E --> UC14
    E --> UC15

    %% Conexiones Admin
    A --> UC16
    A --> UC17
    A --> UC18
    A --> UC19
    A --> UC20
    A --> UC21

    %% Relaciones internas
    UC11 -.->|100% de Aprobación| UC12
    UC13 -.-> UC14
    UC19 -.-> UC20
```

---

## **2. Diagrama de Arquitectura de la Plataforma**

Representa la organización conceptual, modular y por capas del sistema, ilustrando cómo interactúan la interfaz de usuario, la capa de control, los servicios especializados y el almacenamiento de datos.

### **2.1. Versión en PlantUML (Compatible con [plantuml.com](https://www.plantuml.com/plantuml/uml/))**

```plantuml
@startuml
!theme plain
skinparam componentStyle rectangle
skinparam roundcorner 10
top to bottom direction

package "Dispositivos y Canales de Acceso" as CapaClientes {
    [💻 Navegadores de Escritorio / Laptops] as PC
    [📱 Teléfonos Inteligentes / Tablets] as Mobile
}

package "Capa de Presentación y Frontend (React SPA / UI)" as Frontend {
    
    package "Vistas Públicas" as UIPublica {
        [Navbar Reactivo y Footer Institucional] as NavFooter
        [Landing Page (Hero, Rutas, Eventos, Conócenos)] as ViewLanding
        [Mapa Interactivo (Capas, Regiones, Pines, Panel Lateral)] as ViewMapa
        [Directorio Comercial (Buscador y Tarjetas)] as ViewDirectorio
        [Ficha de Negocio (Galería, Certificados, Contacto, Mapa)] as ViewFicha
        [Visor de Artículos y Recomendados] as ViewArticulos
        [Agenda de Eventos y Ficha con RSVP] as ViewEventos
        [Portal de Cursos y Muro Docente] as ViewCursosPub
        [Módulo de Acceso y Recuperación] as ViewAuth
    }
    
    package "Vistas Privadas (Estudiante / Emprendedor)" as UIPrivada {
        [Sidebar de Navegación y Topbar de Usuario] as NavPrivado
        [Dashboard 'Mis Cursos' (Progreso y Completados)] as ViewMisCursos
        [Explorador de Cursos por Categoría] as ViewExplorarCursos
        [Aula Virtual (Visor Lección, Temario Lateral, PDF)] as ViewAula
        [Módulo de Exámenes (Instrucciones, Test y Resultados)] as ViewExamenes
        [Gestor 'Mi Negocio' (Asistente 4 Fases y Alertas de Rechazo)] as ViewMiNegocio
        [Perfil y Seguridad de Usuario] as ViewPerfil
    }
    
    package "Vistas de Gestión (Profesor / Moderador)" as UIGestion {
        [Topbar Verde 'Modo Profesor Activo'] as TopbarTeacher
        [CMS Cursos (Temario Drag & Drop, Editor Capítulos)] as ViewCMSCursos
        [Constructor Visual de Exámenes y Preguntas] as ViewCMSExamenes
        [Bandeja de Solicitudes y Expediente de Auditoría] as ViewAuditoria
        [CMS de Artículos y Noticias] as ViewCMSArticulos
        [CMS de Eventos y Directorio de Ponentes] as ViewCMSEventos
    }
}

package "Capa de Enrutamiento, Control y Lógica de Aplicación" as Backend {
    [Enrutador Web y Control de Acceso por Roles] as RouterControl
    
    package "Controladores de Dominio" as Controllers {
        [Controlador de Negocios y Directorio] as CtrlNegocios
        [Controlador Geográfico y Mapas] as CtrlMapas
        [Controlador Académico y Lecciones] as CtrlCursos
        [Controlador de Evaluaciones e Intentos] as CtrlExamenes
        [Controlador de Auditoría y Moderación] as CtrlModeracion
        [Controlador Editorial (Artículos y Eventos)] as CtrlContenido
        [Controlador de Perfil y Autenticación] as CtrlAuth
    }
    
    package "Motores y Servicios de Negocio" as Servicios {
        [Motor de Cálculo de Avance Porcentual] as MotorProgreso
        [Validador de Respuestas y Calificación de Exámenes] as MotorExamen
        [Generador de Diplomas Oficiales en PDF] as ServicioCertificados
        [Procesador y Optimizador de Fotografías y Galerías] as ServicioMedios
        [Motor de Flujo de Estados de Negocio\n(Borrador -> Revisión -> Aprobado/Rechazado)] as MotorEstados
    }
}

package "Capa de Persistencia y Almacenamiento" as Almacenamiento {
    database "Base de Datos Relacional" as DB {
        [Usuarios y Perfiles]
        [Negocios, Giros, Regiones y Municipios]
        [Cursos, Capítulos y Materiales]
        [Progreso de Usuarios y Compras Gratuitas]
        [Exámenes, Preguntas, Opciones e Intentos]
        [Artículos, Categorías y Eventos con Elenco]
        [Certificaciones Ambientales y Dictámenes]
    }
    
    folder "Sistema de Archivos y Medios Públicos" as Storage {
        [Imágenes de Portadas y Miniaturas]
        [Galerías Fotográficas de Comercios]
        [Documentos y Sellos de Certificación]
        [Manuales y Guías en PDF de Cursos]
        [Fotografías de Docentes y Ponentes]
    }
}

' Relaciones entre capas
CapaClientes --> Frontend : Acceso vía HTTPS
Frontend --> RouterControl : Peticiones y Navegación
RouterControl --> Controllers : Despacho de Acciones
Controllers --> Servicios : Lógica de Negocio
Controllers --> DB : Consultas y Transacciones
Servicios --> Storage : Lectura y Escritura de Archivos
Servicios --> DB : Registro de Estados y Avances

@enduml
```

---

### **2.2. Versión en Mermaid (Arquitectura Conceptual)**

```mermaid
flowchart TD
    %% Clientes
    subgraph CLIENTES["1. Canales de Acceso"]
        PC["💻 Navegador Web Desktop / Laptop"]
        MOB["📱 Dispositivo Móvil / Tablet"]
    end

    %% Capa Frontend
    subgraph FRONTEND["2. Capa de Presentación (React SPA / UI)"]
        subgraph PUB_UI["Vistas Públicas"]
            P1["Inicio / Landing Page"]
            P2["Mapa Interactivo (Capas y Pines)"]
            P3["Directorio Comercial y Filtros"]
            P4["Ficha Detallada de Negocio"]
            P5["Artículos y Agenda de Eventos"]
            P6["Portal de Cursos y Muro Docente"]
        end
        
        subgraph PRIV_UI["Espacio Privado (Estudiante)"]
            E1["Dashboard 'Mis Cursos'"]
            E2["Aula Virtual y Materiales PDF"]
            E3["Evaluaciones y Certificados"]
            E4["Gestión 'Mi Negocio' (4 Fases)"]
        end

        subgraph ADM_UI["Espacio de Gestión (Profesor/Admin)"]
            A1["CMS Cursos (Temario Drag & Drop)"]
            A2["Constructor de Exámenes"]
            A3["Bandeja de Auditoría y Dictámenes"]
            A4["CMS de Artículos y Eventos"]
        end
    end

    %% Capa Lógica y Control
    subgraph BACKEND["3. Capa de Control y Servicios de Negocio"]
        ROUTER["Enrutador Web & Seguridad de Acceso"]
        
        subgraph CTRLS["Controladores de Dominio"]
            C_NEG["Gestor de Negocios y Directorio"]
            C_CUR["Gestor Académico y Progreso"]
            C_EXA["Gestor de Exámenes e Intentos"]
            C_MOD["Gestor de Moderación Comercial"]
            C_CON["Gestor de Contenido (Artículos/Eventos)"]
        end

        subgraph SERVICES["Servicios Especializados"]
            S_PDF["Generador de Diplomas PDF"]
            S_PROG["Motor de Cálculo de Avance"]
            S_IMG["Procesador de Galerías y Medios"]
            S_STATE["Motor de Transición de Estados"]
        end
    end

    %% Capa Persistencia
    subgraph STORAGE["4. Capa de Persistencia y Archivos"]
        subgraph BBDD["Base de Datos Relacional"]
            DB_USR[("Usuarios y Roles")]
            DB_NEG[("Negocios, Giros y Territorios")]
            DB_CUR[("Cursos, Capítulos y Progreso")]
            DB_EXA[("Exámenes, Preguntas e Intentos")]
            DB_CON[("Artículos, Eventos y Dictámenes")]
        end

        subgraph FILES["Almacenamiento de Medios"]
            F_GAL["Galerías y Portadas"]
            F_DOC["Certificaciones y Guías PDF"]
        end
    end

    %% Conexiones
    CLIENTES ==> FRONTEND
    FRONTEND ==> ROUTER
    ROUTER --> CTRLS
    CTRLS --> SERVICES
    CTRLS --> BBDD
    SERVICES --> FILES
    SERVICES --> BBDD
```

---

## **3. Diagrama de Comportamiento de Rutas y Ciclo de Estados**

Muestra el flujo de navegación integral del usuario, el ciclo de vida de los registros comerciales y el proceso formativo de evaluación y certificación.

### **3.1. Versión en PlantUML (Compatible con [plantuml.com](https://www.plantuml.com/plantuml/uml/))**

```plantuml
@startuml
!theme plain
skinparam state {
  BackgroundColor White
  BorderColor Black
  RoundCorner 15
}
skinparam ArrowColor Black

[*] --> InicioPublico : Ingreso a la Plataforma

state "Navegación Pública (Sin Autenticación)" as Publico {
    InicioPublico : Portada, Rutas y Eventos Destacados
    
    InicioPublico --> MapaInteractivo : Clic en 'Mapa'
    MapaInteractivo : Filtro de capas, regiones y giros
    MapaInteractivo --> FichaNegocio : Clic en Marcador / 'Ver Ficha'
    
    InicioPublico --> DirectorioComercial : Clic en 'Directorio'
    DirectorioComercial : Búsqueda por giro y municipio
    DirectorioComercial --> FichaNegocio : Clic en Tarjeta
    
    FichaNegocio : Galería, Contacto, Servicios, Certificados y Mapa
    
    InicioPublico --> ArticulosYEventos : Clic en 'Eventos' o 'Noticias'
    ArticulosYEventos : Lectura, recomendaciones y registro RSVP
    
    InicioPublico --> OfertaCursos : Clic en 'Cursos'
    OfertaCursos : Presentación y muro de docentes
}

Publico --> Login : Clic en 'Acceder' o 'Inscribirme'

state "Autenticación" as Auth {
    Login : Formulario de correo y contraseña
    Login --> RecuperarPassword : ¿Olvidó su contraseña?
    RecuperarPassword --> Login : Enlace enviado por correo
    Login --> Dashboard : Credenciales Válidas
}

state "Espacio Privado: Estudiante y Emprendedor" as EstudianteSpace {
    Dashboard : 'Mis Cursos' (En Progreso y Completados)
    
    state "Ciclo Académico y Certificación" as CicloLMS {
        Dashboard --> ExplorarCursos : Buscar nuevo curso
        ExplorarCursos --> PortadaCurso : Seleccionar curso
        PortadaCurso --> AulaVirtual : Comenzar / Continuar
        
        state AulaVirtual {
            VerLeccion : Video, Infografía y Texto
            DescargarPDF : Guías y manuales adjuntos
            MarcarCompletado : Aumenta % de avance
            
            VerLeccion --> MarcarCompletado
            MarcarCompletado --> VerLeccion : Siguiente capítulo
        }
        
        AulaVirtual --> ExamenFinal : Al cubrir temario
        
        state ExamenFinal {
            InstruccionesExamen : Puntaje mínimo e intentos
            ResponderPreguntas : Selección simple/múltiple
            EvaluacionResultado : Cálculo instantáneo
            
            InstruccionesExamen --> ResponderPreguntas
            ResponderPreguntas --> EvaluacionResultado
        }
        
        EvaluacionResultado --> AulaVirtual : Reprobado (Reintentar)
        EvaluacionResultado --> DiplomaEmitido : Aprobado al 100%
        DiplomaEmitido : Descarga de Certificado Oficial en PDF
    }
    
    state "Ciclo de Gestión Comercial ('Mi Negocio')" as CicloTrade {
        Dashboard --> PanelNegocios : Clic en 'Mi Negocio'
        PanelNegocios : Lista de comercios y estados
        
        PanelNegocios --> FormularioNegocio : 'Registrar Nuevo Negocio'
        
        state FormularioNegocio {
            Paso1_General : Giro, descripciones y actividades
            Paso2_Contacto : Teléfonos, redes y propietario
            Paso3_Ubicacion : Municipio y pin en mapa
            Paso4_Multimedia : Galería (10 fotos) y certificados
            
            Paso1_General --> Paso2_Contacto
            Paso2_Contacto --> Paso3_Ubicacion
            Paso3_Ubicacion --> Paso4_Multimedia
        }
        
        FormularioNegocio --> EstadoBorrador : Guardar
        EstadoBorrador --> EstadoEnRevision : Clic en 'Enviar a Revisión'
        EstadoEnRevision : En espera de auditoría administrativa
    }
}

state "Espacio de Gestión: Modo Profesor / Moderación" as AdminSpace {
    Dashboard --> ModoProfesor : Clic en 'Modo Profesor' (Topbar Verde)
    
    state "Ciclo de Moderación Comercial" as CicloModeracion {
        ModoProfesor --> BandejaSolicitudes : Clic en 'Solicitudes'
        BandejaSolicitudes --> ExpedienteAuditoria : Seleccionar comercio
        ExpedienteAuditoria : Fotos, mapa, certificados y datos
        
        ExpedienteAuditoria --> DictamenAprobado : Clic en 'Aprobar'
        DictamenAprobado --> PublicadoEnMapaYDirectorio : Visible al Público
        
        ExpedienteAuditoria --> ModalRechazo : Clic en 'Rechazar'
        ModalRechazo : Redacción obligatoria de motivos
        ModalRechazo --> EstadoRechazado : Notificar al Usuario
    }
    
    state "Ciclo Editorial y Docente" as CicloDocente {
        ModoProfesor --> GestorCursos : Administrar Cursos
        GestorCursos : Temario Drag & Drop, Capítulos y Exámenes
        GestorCursos --> CursoPublicado : Publicar en Catálogo
        
        ModoProfesor --> GestorCMS : Administrar Artículos y Eventos
        GestorCMS : Publicación de noticias y agenda con ponentes
    }
}

' Subsanación de observaciones
EstadoRechazado --> PanelNegocios : Alerta ámbar con observaciones
PanelNegocios --> FormularioNegocio : Subsanar datos y fotos
EstadoBorrador --> EstadoEnRevision : Reenvío a Moderación

PublicadoEnMapaYDirectorio --> DirectorioComercial : Integrado al Padrón Oficial
CursoPublicado --> ExplorarCursos : Disponible para Estudiantes

@enduml
```

---

### **3.2. Versión en Mermaid (Flujo General y Ciclo de Estados)**

```mermaid
flowchart TD
    %% INICIO
    START((🌐 Acceso a la Plataforma)) --> INICIO[Landing Page / Inicio]

    %% RUTAS PÚBLICAS
    subgraph PUBLICO["Rutas del Área Pública"]
        INICIO --> MAPA["Mapa Interactivo (Capas y Filtros)"]
        INICIO --> DIR["Directorio Comercial"]
        INICIO --> ART["Artículos y Noticias"]
        INICIO --> EVE["Agenda de Eventos (RSVP)"]
        INICIO --> CUR_PUB["Portal de Cursos (Docentes)"]
        
        MAPA --> FICHA["Ficha Detallada de Negocio\n(Galería, Certificados, Contacto y Mapa)"]
        DIR --> FICHA
    end

    %% AUTENTICACIÓN
    INICIO --> LOGIN{"¿Usuario Autenticado?"}
    LOGIN -- No --> FORM_LOGIN["Pantalla de Login / Recuperar Contraseña"]
    FORM_LOGIN --> DASHBOARD["Dashboard Privado de Usuario"]
    LOGIN -- Sí --> DASHBOARD

    %% RUTAS PRIVADAS ESTUDIANTE
    subgraph ESTUDIANTE["Espacio del Estudiante / Emprendedor"]
        DASHBOARD --> MIS_CURSOS["Mis Cursos (En Progreso / Concluidos)"]
        DASHBOARD --> EXPLORAR["Explorador de Cursos"]
        DASHBOARD --> MI_NEGOCIO["Mi Negocio (Padrón Personal)"]

        %% Flujo LMS
        EXPLORAR --> AULA["Aula Virtual (Player de Lecciones)"]
        MIS_CURSOS --> AULA
        AULA --> CHECK["Marcar Completado / Descargar PDF"]
        CHECK --> EXAMEN["Evaluación / Examen Final"]
        
        EXAMEN --> NOTA{"¿Aprobó Examen?"}
        NOTA -- No (Quedan Intentos) --> EXAMEN
        NOTA -- Sí (100% Avance) --> DIPLOMA["🎓 Descarga de Diploma Oficial en PDF"]

        %% Flujo Negocio Emprendedor
        MI_NEGOCIO --> REG_TRADE["Formulario de Registro (4 Fases:\nDatos, Contacto, Mapa, Galería)"]
        REG_TRADE --> ST_DRAFT["Estado: ⚪ Borrador"]
        ST_DRAFT --> ST_SEND["Estado: 🟡 En Revisión"]
    end

    %% RUTAS GESTIÓN / PROFESOR
    subgraph ADMIN["Espacio de Gestión / Modo Profesor"]
        DASHBOARD --> TEACHER_MODE["Topbar Verde: Modo Profesor"]
        
        %% Gestión Académica
        TEACHER_MODE --> CMS_CURSOS["Constructor de Cursos (Drag & Drop)"]
        CMS_CURSOS --> CMS_EXAMS["Constructor de Exámenes y Preguntas"]
        CMS_EXAMS --> PUB_CURSO["🟢 Curso Publicado"]

        %% Gestión Editorial
        TEACHER_MODE --> CMS_CONTENIDO["CMS de Artículos y Eventos con Ponentes"]
        CMS_CONTENIDO --> PUB_CONTENIDO["🟢 Contenido Publicado"]

        %% Moderación Comercial
        TEACHER_MODE --> BANDEJA["Bandeja de Solicitudes Comerciales"]
        ST_SEND --> BANDEJA
        BANDEJA --> AUDITORIA["Expediente de Auditoría Integral"]
        
        AUDITORIA --> DICTAMEN{"Dictamen del Evaluador"}
        DICTAMEN -- Aprobar --> ST_APROB["🟢 Estado: Aprobado"]
        DICTAMEN -- Rechazar --> MODAL_RECHAZO["Modal: Redacción Obligatoria del Motivo"]
        MODAL_RECHAZO --> ST_RECHAZ["🔴 Estado: Rechazado"]
    end

    %% RETROALIMENTACIÓN Y SUBSANACIÓN
    ST_RECHAZ --> ALERTA_USER["Alerta con Observaciones en Panel del Usuario"]
    ALERTA_USER --> REG_TRADE
    
    %% INTEGRACIÓN CON EL PORTAL PÚBLICO
    ST_APROB --> DIR
    ST_APROB --> MAPA
    PUB_CURSO --> EXPLORAR
    PUB_CONTENIDO --> ART
    PUB_CONTENIDO --> EVE
```

---

## **4. Guía de Uso y Exportación de los Diagramas**

### **¿Cómo utilizar los códigos PlantUML?**
1. Copia el bloque de código encerrado entre `@startuml` y `@enduml`.
2. Ingresa a [https://www.plantuml.com/plantuml/uml/](https://www.plantuml.com/plantuml/uml/).
3. Pega el código en el editor web.
4. El diagrama se renderizará automáticamente en formato gráfico de alta definición y podrás exportarlo en **PNG, SVG o PDF**.

### **¿Cómo visualizar los códigos Mermaid?**
1. Los bloques Mermaid se renderizan de forma nativa en la mayoría de visores de Markdown (como GitHub, GitLab, VS Code, Antigravity IDE, Notion u Obsidian).
2. También puedes pegarlos en [Mermaid Live Editor](https://mermaid.live/) para exportarlos como imagen o integrarlos en presentaciones ejecutivas.
