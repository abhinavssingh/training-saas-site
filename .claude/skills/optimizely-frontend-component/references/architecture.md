# 🧩 Layer, Component, Sequence, Request Flow Architecture Diagrams

This project is a **Next.js (App Router) application integrated with Optimizely SaaS CMS using the Content JS SDK**. It follows a modular and scalable architecture designed to separate content, presentation, and data-fetching logic.

The structure is built around **CMS-driven development**, where content models defined in Optimizely are mapped to frontend components and rendering templates.

## 🧠 Key Architectural Patterns

- ✅ 1. Headless CMS
  - Backend (CMS) decoupled from frontend

- ✅ 2. Component Mapping Pattern
  - CMS Type → Component Enables runtime rendering flexibility

- ✅ 3. Template-Driven Layout
  - Display templates control structure Components focus only on UI

- ✅ 4. Strongly Typed Content Layer
  - content-types/ = schema transformers = API → UI mapping

- ✅ 5. Layered Architecture
  - App Layer → Templates → Components → Data Layer → CMS

---

## 🌍 C4 Level 1 — Context Diagram

Shows how the system interacts with external actors.

```mermaid
flowchart LR
    User[End User Browser]
    Editor[Content Editor]

    User -->|HTTP Request| NextJS[Next.js Frontend]
    Editor -->|Creates Content| CMS[Optimizely SaaS CMS]

    NextJS -->|GraphQL| Graph[Optimizely Graph API]
    Graph --> CMS
```

---

## 📦 C4 Level 2 — Container Diagram

Shows major deployable units.

```mermaid
flowchart TB

    subgraph Frontend
        NextJS[Next.js App Router]
    end

    subgraph Integration
        SDK[Content JS SDK / optimizely.ts]
        GraphQLClient[GraphQL Client]
    end

    subgraph Backend
        Graph[Optimizely Graph API]
        CMS[Optimizely SaaS CMS]
    end

    NextJS --> SDK
    SDK --> GraphQLClient
    GraphQLClient --> Graph
    Graph --> CMS
```

---

## 🧠 C4 Level 3 — Component Diagram (REAL STRUCTURE)

This reflects your actual repo layers.

```mermaid
flowchart TB

    subgraph Presentation Layer
        A1["Next.js Pages (app/)"]
        A2["Components (blocks, pages, sections)"]
    end

    subgraph Rendering Layer
        B1[Display Templates]
        B2[Component Mapping / Factories]
    end

    subgraph Domain Layer
        C1["Content Types (schemas)"]
        C2[Type Transformers]
    end

    subgraph Integration Layer
        D1[GraphQL Queries]
        D2[Content JS SDK]
    end

    subgraph Backend External
        E1[Optimizely Graph API]
        E2[Optimizely SaaS CMS]
    end

    A1 --> B1
    A2 --> B2
    B1 --> C1
    B2 --> C2
    C1 --> D1
    C2 --> D2
    D1 --> E1
    D2 --> E1
    E1 --> E2
```

---

## 🧩 C4 Level 4 — Code-Level Rendering Flow

Shows how one request flows through the system.

```mermaid
sequenceDiagram
    participant User
    participant Route as [...slug]/page.tsx
    participant SDK as optimizely.ts
    participant GraphQL
    participant Transformer
    participant Template
    participant Component

    User->>Route: Request /about

    Route->>SDK: Resolve slug
    SDK->>GraphQL: Fetch content

    GraphQL-->>SDK: Raw JSON
    SDK-->>Transformer: Pass data

    Transformer-->>Route: Typed model

    Route->>Template: Select display template
    Template->>Component: Map blocks

    Component-->>User: Render UI
```

---

## 🔁 Full Rendering Pipeline

```mermaid
flowchart LR

    A[CMS Content JSON] --> B[GraphQL Query]
    B --> C["SDK Layer (optimizely.ts)"]
    C --> D[Transformer Layer]

    D --> E[Typed Content Model]
    E --> F[Display Template]

    F --> G[Section Renderer]
    G --> H[Block Components]

    H --> I[React UI]
```

---

## 🧭 Dynamic Routing (Core Engine)

```mermaid
flowchart TD

    A[Incoming URL] --> B["[...slug]/page.tsx"]

    B --> C[Extract slug path]
    C --> D[GraphQL fetch]

    D --> E{Content Type}

    E -->|ArticlePage| F[ArticlePage Component]
    E -->|PersonPage| G[PersonPage Component]
    E -->|Landing Experience| H[Experience Template]

    F --> I[Render Sections]
    G --> I
    H --> I

    I --> J[Final HTML]
```

---

## 🧩 Component Mapping Registry (CRITICAL)

This is the core extensibility pattern in your system.

```mermaid
flowchart LR

    CMS[CMS Content Type] --> MAP[Component Mapper]

    MAP -->|CardBlock| C1[CardBlock.tsx]
    MAP -->|BannerElement| C2[BannerElement.tsx]
    MAP -->|Header| C3[Header.tsx]
    MAP -->|Footer| C4[Footer.tsx]

    MAP -->|Section| S1[ContentContainerSection.tsx]

    S1 --> C1
    S1 --> C2
    S1 --> C3
    S1 --> C4
```

---

## ⚙️ Internal Mapping Flow (Detailed)

```mermaid
flowchart TD

    A[CMS JSON Block] --> B{Block Type}

    B -->|CardBlock| C[CardBlock Component]
    B -->|BannerElement| D[Banner Component]
    B -->|Header| E[Header Component]
    B -->|Footer| F[Footer Component]

    C --> G[Rendered JSX]
    D --> G
    E --> G
    F --> G
```

---

## 🔎 Search Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant UI as Search Page
    participant API as /api/search
    participant GraphQL

    User->>UI: Enter query
    UI->>API: Request

    API->>GraphQL: Search query
    GraphQL-->>API: Results

    API-->>UI: JSON
    UI-->>User: Render results
```

---

## 👀 Preview Flow (Draft Content)

```mermaid
sequenceDiagram

    participant Editor
    participant CMS
    participant App
    participant GraphQL

    Editor->>CMS: Edit draft
    CMS->>App: Open preview mode

    App->>GraphQL: Fetch draft content
    GraphQL-->>App: Draft JSON

    App-->>Editor: Preview UI
```

---

## 🚀 Summary

This architecture enables:

- ✅ Fully dynamic CMS-driven pages
- ✅ Strong separation of concerns
- ✅ High scalability and extensibility
- ✅ Clean domain-driven structure
- ✅ Flexible UI composition
