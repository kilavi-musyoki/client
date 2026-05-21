# CyberPath — Interactive OWASP Top 10 Course

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

CyberPath is a modern, single-page interactive learning platform designed to teach the **OWASP Top 10 Web Security Vulnerabilities** through narrative-driven, hands-on labs. Users assume the role of a security researcher in realistic attack-and-defend scenarios, walking through security analysis, exploitation, and remediation.

---

## 📚 What the Course is About

The primary objective of the CyberPath course is to bridge the gap between abstract cybersecurity guidelines and practical software engineering by providing developers and security professionals with a hands-on, simulated sandbox to learn web security. 

Instead of reading dry specifications, learners walk through the **OWASP Top 10** vulnerabilities using a narrative-driven, roleplay format.

### The Learning Philosophy: Think Like an Attacker
To effectively defend applications, developers must first understand how attackers identify and exploit flaws. CyberPath structures each chapter into three key learning phases:
1. **Reconnaissance & Analysis**: Inspecting page source code, mapping technology stacks, identifying outdated third-party dependencies, and researching vulnerability records (like CVEs).
2. **Exploitation (Proof-of-Concept)**: Crafting input payloads, injecting malicious code (XSS), executing spearphishing flows, inspecting server access logs, and hijacking session storage to witness real-world impact.
3. **Remediation & Defense**: Upgrading vulnerable packages, applying secure coding guidelines, and configuring headers to establish defense-in-depth.

---

### Course Modules (OWASP Top 10 Coverage)

The curriculum maps directly to the industry-standard OWASP Top 10 framework, starting with a fully-functional interactive simulation:

* **A01: Broken Access Control** *(Planned)*
* **A02: Cryptographic Failures** *(Planned)*
* **A03: Injection** *(Planned)*
* **A04: Insecure Design** *(Planned)*
* **A05: Security Misconfiguration** *(Planned)*
* **A06: Vulnerable & Outdated Components** 🟢 **[Active Lab]**
  * **Scenario**: *VoltMart Storefront Breach*
  * **Role**: Play as *Kai*, an ethical hacker auditing VoltMart's public bug bounty program.
  * **Key Concepts Covered**:
    * Manual source-code reconnaissance to locate third-party dependencies.
    * Identifying unpatched vulnerabilities (`GlideView v2.0.4`) via CVE database review.
    * Testing and weaponizing DOM-based Cross-Site Scripting (XSS) via URL hash values.
    * Simulating local infrastructure setup (Apache server controls) to log payloads.
    * Orchestrating a simulated spearphishing delivery targeting a victim's email client.
    * Capturing session cookies to demonstrate impersonation/hijacking.
    * Verifying patching and mitigation strategies.
* **A07: Identification and Authentication Failures** *(Planned)*
* **A08: Software and Data Integrity Failures** *(Planned)*
* **A09: Security Logging and Monitoring Failures** *(Planned)*
* **A10: Server-Side Request Forgery (SSRF)** *(Planned)*

---

## 🚀 Key Features

* **Split-Pane Interactive Workspace**: Theory & instructions on the left; live interactive labs (command-line terminals, simulated email clients, target websites, URL decoders) on the right.
* **Fully Implemented A06 Lab**: "Vulnerable and Outdated Components" lab, detailing a complete exploit chain from dependency analysis to cross-site scripting (XSS), phishing, access log inspection, and session hijacking.
* **Intelligent Progress & Scoring System**: Real-time evaluation based on interaction milestones, hint usage penalties (-3 pts/hint), and gamified grading (S, A, B, C) with badges.
* **LMS Integration Ready**: Implements zero-friction automatic login for company LMS platforms, alongside standard credential-based authentication.
* **Serverless Completion Webhook**: Proxies completion data (scores, completion states) securely to Google Sheets or an external LMS via Vercel Serverless Functions.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend Framework** | React 18 + TypeScript | Component-driven UI development with strict typing. |
| **Build Tooling** | Vite | Rapid development server and optimized build pipeline. |
| **Styling Engine** | Tailwind CSS v4 + Vanilla CSS | Utility classes combined with global custom CSS property design tokens. |
| **Routing** | React Router v6 | Client-side routing with route guarding. |
| **Serverless API** | Vercel Serverless Functions | Node.js proxy middleware for secure API request dispatch. |
| **Persistence** | React Context + LocalStorage | Lightweight application state and session synchronization. |

---

## 📐 Architecture & Data Flow

CyberPath operates as a hybrid static web app with secure backend proxy functions.

```mermaid
graph TD
    subgraph Client [React SPA Client-side]
        A[App Router] -->|Guarded Route| B[ChapterPage Split Layout]
        B --> C[Theory Panel & Navigation]
        B --> D[Lab Panel / A06Lab Orchestrator]
        D --> E[Interactive Lab Components]
        E -->|onComplete Event| C
        C -->|State Trigger| F[ProgressContext]
    end
    
    subgraph Vercel Backend [Secure Edge / Serverless Layer]
        F -->|POST Completion| G[/api/complete Proxy]
        G -->|Reads process.env.WEBHOOK_URL| H[Google Apps Script / LMS Webhook]
    end

    subgraph Authentication [Session Security]
        I[AuthContext] -->|Checks session storage| A
        I -->|Reads server-side| J[Serverless Env Vars]
    end
```

---

## 📂 Project Structure

```
owasp-top-ten-course/
├── api/
│   └── complete.js             # Serverless webhook proxy (hides webhook credentials)
├── client/
│   ├── src/
│   │   ├── context/
│   │   │   ├── AuthContext.tsx      # Auth State & Auto-Login logic
│   │   │   └── ProgressContext.tsx  # Gamified scoring, unlocking & completion tracking
│   │   ├── data/
│   │   │   ├── chapters.ts          # Core chapters metadata
│   │   │   └── a06pages.ts          # Narrative page contents (19 pages)
│   │   ├── pages/
│   │   │   ├── Login.tsx            # Manual authentication portal
│   │   │   ├── Dashboard.tsx        # Chapter selection screen with progress rings
│   │   │   └── ChapterPage.tsx      # Core split-pane container
│   │   └── components/
│   │       ├── chapter/             # Theory, Navigation, and Completion Modals
│   │       └── labs/a06/            # Interactive components specific to A06 lab
│   └── vite.config.ts          # Vite config & dev API mock auth middleware
├── vercel.json                 # Custom headers, CSP rules, and serverless rewrites
└── README.md                   # Project documentation
```

---

## ⚡ Getting Started (Local Development)

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and npm installed.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/your-username/owasp-top-ten-course.git
   cd owasp-top-ten-course
   ```

2. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

3. Launch the local development server:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:5173`.

### Environment Configuration

Configure environment variables to enable external reporting hooks and customize passwords. Create a `.env.local` file inside the `client/` directory:

```env
# Google Apps Script webhook URL (server-only proxy, never embedded in the bundle)
WEBHOOK_URL=https://script.google.com/macros/s/YOUR_APPS_SCRIPT_ID/exec

# Override default demo credentials (server-only)
DEMO_PASSWORD=your_demo_password_here
ALEX_PASSWORD=your_alex_password_here
```

> **Security Note:** Environment variables omit the `VITE_` prefix to prevent Vite from bundling them into the client-side JavaScript. They are strictly evaluated server-side.

### Manual Authentication Credentials

If you do not utilize the LMS auto-login mechanism, you can log in manually using:

* **Demo Account**: `demo@cyberpath.io` / `demo123` (or your `DEMO_PASSWORD`)
* **Alex Account**: `alex@cyberpath.io` / `alex123` (or your `ALEX_PASSWORD`)

---

## 🛡️ Security Hardening

The production deployment in `vercel.json` applies a robust security profile to the client application:

* **Content Security Policy (CSP)**: Restrictions to trust `'self'` scripts/styles, disabling external fonts/images unless specifically allowed.
* **HTTP Security Headers**:
  * `X-Content-Type-Options: nosniff` (Prevents MIME sniffing)
  * `X-Frame-Options: DENY` (Mitigates clickjacking attacks)
  * `Strict-Transport-Security` (Enforces HTTPS access)
  * `Referrer-Policy: strict-origin-when-cross-origin` (Protects user origin data)

---

## ➕ Adding a New Chapter

The architecture is designed to easily scale and accommodate new OWASP Top 10 labs:

1. **Chapter Definition**: Register the chapter details in `client/src/data/chapters.ts`.
2. **Page Definitions**: Create a new content file (e.g., `client/src/data/a0Xpages.ts`) export a `PageDef[]` configuration representing the interactive path steps.
3. **Build Lab UI Components**: Create custom workspace components in `client/src/components/labs/a0X/panels/` implementing the completion interface:
   ```typescript
   interface Props {
     onComplete: () => void;
     pageCompleted: boolean;
   }
   ```
4. **Register Lab Orchestrator**: Create a central manager `A0XLab.tsx` mapping `labType` definitions to the components.
5. **Route Pages**: Import the pages array and register it under `CHAPTER_PAGES` inside `ChapterPage.tsx` and map the launcher in `LabPanel.tsx`.
