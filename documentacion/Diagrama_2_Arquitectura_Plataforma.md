# **Diagrama 2: Arquitectura Conceptual y Modular de la Plataforma**

Este diagrama modela la arquitectura en capas del sistema con palabras clave breves, diseño sin cruces de líneas y una paleta de colores ordenada para distinguir claramente cada nivel tecnológico.

---

## **1. Glosario de Abreviaturas y Términos Técnicos**

Para facilitar la lectura y evaluación del diagrama, a continuación se describe el significado de cada abreviatura empleada:

| Abreviatura / Término | Significado Completo | Descripción en la Plataforma |
| :--- | :--- | :--- |
| **SPA** | **Aplicación Web de Página Única** (*Single Page Application*) | Arquitectura frontend reactiva (React) que actualiza las vistas instantáneamente sin recargar la página. |
| **UI** | **Interfaz de Usuario** (*User Interface*) | Conjunto de pantallas, botones, formularios y componentes visuales que interactúan con el usuario. |
| **HTTPS** | **Protocolo Seguro de Navegación** (*Hypertext Transfer Protocol Secure*) | Canal seguro y cifrado de comunicación entre los navegadores y el servidor. |
| **LMS** | **Sistema de Gestión de Aprendizaje** (*Learning Management System*) | Capa académica: Cursos, aula virtual, exámenes y emisión de certificados. |
| **CMS** | **Sistema de Gestión de Contenidos** (*Content Management System*) | Capa editorial: Creación de noticias, guías y agenda de eventos. |
| **RSVP** | **Confirmación de Asistencia** (*Répondez s'il vous plaît*) | Módulo de registro para apartar lugar en eventos de la Reserva. |
| **PDF** | **Documento Digital** (*Portable Document Format*) | Archivos descargables de diplomas de acreditación y manuales de apoyo. |
| **Ctrls / Controllers** | **Controladores de Dominio** | Componentes de software que reciben las peticiones de las vistas y ejecutan las acciones solicitadas. |
| **Servs / Services** | **Servicios de Negocio** | Motores especializados (generador de diplomas, procesador de imágenes, cálculo de progreso). |
| **DB** | **Base de Datos Relacional** (*Database*) | Repositorio estructurado donde se almacenan usuarios, cursos, preguntas, negocios y dictámenes. |
| **Drag & Drop** | **Arrastrar y Soltar** | Interfaz táctil y de ratón para ordenar los capítulos del temario. |

---

## **2. Convención de Colores por Capa**

* ⬜ **Capa 1: Canales de Acceso (Gris Slate):** Dispositivos móviles, tablets y navegadores de escritorio.
* 🟦 **Capa 2: Presentación / Frontend (Azul y Verde):** Interfaces públicas (Visitante), panel privado (Alumno/Productor) y espacio docente (Profesor).
* 🟪 **Capa 3: Control y Servicios (Púrpura):** Enrutamiento, controladores de dominio y motores de lógica de negocio.
* 🟧 **Capa 4: Persistencia y Almacenamiento (Ámbar / Naranja):** Base de datos relacional y repositorio de archivos multimedia.

---

## **3. Versión en PlantUML (Compatible con [plantuml.com](https://www.plantuml.com/plantuml/uml/))**

> **Instrucciones:** Copia el siguiente código y pégalo en [https://www.plantuml.com/plantuml/uml/](https://www.plantuml.com/plantuml/uml/) para visualizarlo con colores y formato vectorial.

```plantuml
@startuml
!theme plain
skinparam componentStyle rectangle
skinparam roundcorner 10
skinparam shadowing false
top to bottom direction

package "1. Canales de Acceso" as Capa1 #F1F5F9 {
    [💻 Navegador Web Desktop / Laptop] as PC
    [📱 Dispositivo Móvil / Tablet] as Mobile
}

package "2. Capa de Presentación (Frontend SPA - React)" as Capa2 #E0F2FE {
    package "Vistas Públicas" as PubUI #BAE6FD {
        [Inicio / Landing Page] as V_Inicio
        [Mapa Interactivo (Capas)] as V_Mapa
        [Directorio Comercial] as V_Dir
        [Ficha Detallada de Negocio] as V_Ficha
        [Blog y Eventos (Registro RSVP)] as V_Blog
        [Portal de Cursos y Docentes] as V_CursosPub
    }
    package "Espacio Alumno/Productor (Formación y Negocio)" as EstUI #DCFCE7 {
        [Dashboard 'Mis Cursos'] as V_MisCursos
        [Aula Virtual & Guías PDF] as V_Aula
        [Exámenes & Certificados PDF] as V_Examen
        [Panel 'Mi Negocio'] as V_Trade
    }
    package "Espacio Profesor (Gestión Docente)" as AdmUI #F3E8FF {
        [Modo Profesor (Topbar Verde)] as V_Teacher
        [CMS Cursos (Temario Drag & Drop)] as V_CMSCursos
        [Constructor de Exámenes] as V_CMSExams
        [Bandeja de Auditoría Comercial] as V_Auditoria
    }
}

package "3. Capa de Control y Servicios de Negocio" as Capa3 #FAF5FF {
    [Enrutador Web & Seguridad de Acceso] as Router #E9D5FF
    
    package "Controladores de Dominio (Controllers)" as Ctrls #F3E8FF {
        [Gestor de Negocios y Mapas] as C_Neg
        [Gestor Académico y Exámenes] as C_Acad
        [Gestor de Auditoría y Moderación] as C_Mod
        [Gestor de Contenido (Blog y Eventos)] as C_Cont
    }
    
    package "Servicios Especializados (Services)" as Servs #F3E8FF {
        [Motor de Cálculo de Avance (%)] as S_Prog
        [Generador de Diplomas PDF] as S_PDF
        [Procesador de Medios y Fotografías] as S_Medios
        [Motor de Estados (Borrador/Revisión/Aprobado)] as S_State
    }
}

package "4. Capa de Persistencia y Almacenamiento" as Capa4 #FEF3C7 {
    database "Base de Datos Relacional (DB)" as DB #FDE68A {
        [Usuarios, Roles y Perfiles]
        [Negocios, Giros y Municipios]
        [Cursos, Capítulos y Progreso]
        [Exámenes, Preguntas e Intentos]
        [Artículos, Eventos y Dictámenes]
    }
    folder "Almacenamiento de Archivos (Storage)" as Storage #FDE68A {
        [Galerías y Portadas]
        [Sellos Ambientales & Diplomas PDF]
    }
}

' Relaciones limpias por capas
Capa1 --> Capa2 : Acceso HTTPS
Capa2 --> Router : Peticiones / Navegación
Router --> Ctrls : Despacho
Ctrls --> Servs : Lógica de Negocio
Ctrls --> DB : Transacciones
Servs --> Storage : Lectura / Escritura
Servs --> DB : Registro de Estados

@enduml
```

---

## **4. Versión en Mermaid (Renderizado Directo con Colores)**

```mermaid
flowchart TD
    %% ESTILOS
    classDef client fill:#f1f5f9,stroke:#475569,stroke-width:2px,color:#0f172a,font-weight:bold;
    classDef pub fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1,font-weight:bold;
    classDef lms fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#15803d,font-weight:bold;
    classDef admin fill:#f3e8ff,stroke:#9333ea,stroke-width:2px,color:#7e22ce,font-weight:bold;
    classDef logic fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#6b21a8,font-weight:bold;
    classDef db fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#b45309,font-weight:bold;

    %% 1. CANALES
    subgraph CAPA1["💻 1. Canales de Acceso"]
        PC["Navegador Web Desktop"]:::client
        MOB["Dispositivo Móvil / Tablet"]:::client
    end

    %% 2. FRONTEND
    subgraph CAPA2["🖥️ 2. Capa de Presentación (Frontend SPA - React)"]
        subgraph F_PUB["Vistas Públicas"]
            P1["Inicio y Portada"]:::pub
            P2["Mapa y Directorio Comercial"]:::pub
            P3["Ficha Detallada de Negocio"]:::pub
            P4["Blog y Eventos (Registro RSVP)"]:::pub
        end

        subgraph F_LMS["Espacio Alumno/Productor (Formación y Negocio)"]
            E1["Dashboard 'Mis Cursos'"]:::lms
            E2["Aula Virtual & Guías PDF"]:::lms
            E3["Exámenes y Certificados PDF"]:::lms
            E4["Panel 'Mi Negocio'"]:::lms
        end

        subgraph F_ADM["Espacio Profesor (Gestión Docente)"]
            A1["Modo Profesor (Topbar Verde)"]:::admin
            A2["Gestión Cursos (Temario Drag & Drop)"]:::admin
            A3["Bandeja de Auditoría Comercial"]:::admin
        end
    end

    %% 3. CONTROL Y SERVICIOS
    subgraph CAPA3["⚙️ 3. Capa de Control y Servicios de Negocio"]
        ROUTER["Enrutador Web & Seguridad de Acceso"]:::logic
        
        subgraph CTRLS["Controladores de Dominio (Controllers)"]
            C1["Gestor de Negocios y Mapas"]:::logic
            C2["Gestor Académico y Exámenes"]:::logic
            C3["Gestor de Auditoría y Dictamen"]:::logic
        end

        subgraph SERVS["Servicios Especializados (Services)"]
            S1["Motor de Progreso (%)"]:::logic
            S2["Generador Diplomas PDF"]:::logic
            S3["Procesador de Medios y Fotografías"]:::logic
            S4["Motor de Estados Comercial"]:::logic
        end
    end

    %% 4. PERSISTENCIA
    subgraph CAPA4["🗄️ 4. Capa de Persistencia y Archivos"]
        DB[("Base de Datos Relacional (DB)\n(Usuarios, Negocios, Cursos, Exámenes, Dictámenes)")]:::db
        FILES[("Almacenamiento de Archivos (Storage)\n(Galerías, Portadas, Certificados y PDFs)")]:::db
    end

    %% CONEXIONES
    CAPA1 ==> CAPA2
    CAPA2 ==> ROUTER
    ROUTER --> CTRLS
    CTRLS --> SERVS
    CTRLS --> DB
    SERVS --> FILES
    SERVS --> DB
```
