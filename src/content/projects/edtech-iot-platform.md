---
title: "AI-Native EdTech IoT Platform"
period: "2016 - Present"
role: "Technical Lead / Principal Engineer"
tags: ["AI-Native", "Next.js", "Node.js", "IoT", "Docker", "AWS", "MySQL", "MongoDB"]
priority: 1
---

# AI-Native EdTech IoT Platform

**Role:** Technical Lead / Principal Engineer | **Period:** 2016 - Present

## Overview
Architected and built a comprehensive energy IoT platform designed to optimize water usage and energy consumption for educational institutions and large-scale campuses. This project represents a paradigmatic shift to **100% AI-native development**, leveraging advanced LLM agents to accelerate the entire software development lifecycle—from architectural design to code generation and testing. The system manages distributed wireless sensor networks, ingesting real-time data to drive automated environmental controls.

## AI Engineering Techniques Used

This project was built entirely using AI-augmented workflows, effectively replacing a traditional engineering team with a single principal engineer leveraging advanced AI agents. Techniques included:

*   **Recursive Architectural Prompting**: Decomposed high-level system requirements into granular technical specifications through iterative dialogue with LLM agents.
*   **Context-Aware Code Generation**: Utilized RAG (Retrieval-Augmented Generation) within the IDE to maintain comprehensive project context, ensuring generated code adhered to strict monorepo patterns and type safety rules.
*   **Automated Refactoring Loops**: Employed agents to scan for code smells, generate refactoring proposals, and implement changes across multiple files simultaneously.
*   **Test-Driven Generation**: Instructed agents to generate comprehensive test suites (unit, integration, E2E) based on functional requirements before implementation code was written.

## Key Achievements

### 🚀 Innovation & Efficiency
- **10x Productivity Gain:** Solely architected and built the entire platform ecosystem (Frontend, API, Device Protocols) using AI agents. This "team of one" approach matched the output of a traditional full-stack team.
- **Strategic Vendor Selection:** Conducted comprehensive vendor analysis for cloud services and IoT hardware components, selecting best-in-class partners to ensure long-term platform viability and cost efficiency.

### ☁️ Cloud-Native Infrastructure & DevOps
- **Scalable Architecture:** Designed a resilient microservices architecture orchestrated via **Docker**, ensuring seamless deployments across **AWS** environments.
- **Infrastructure as Code (IaC):** Implemented Terraform-equivalent patterns to manage cloud resources, enabling reproducible and version-controlled infrastructure states.
- **Observability:** Built a comprehensive monitoring stack using **Prometheus** and **Grafana**, providing real-time visibility into sensor health, API latency, and system throughput.

### 📡 Protocol Engineering & Backend
- **Custom IoT Protocols:** Engineered a proprietary **UDP-based protocol** optimized for low-bandwidth, high-reliability communication with field devices.
- **High-Performance API:** Developed a robust Node.js/Express REST API capable of handling high-frequency telemetry data from thousands of distributed sensors.

## Technologies

### Frontend & Dashboard
*   **Next.js / React**: Utilized for building a responsive, server-side rendered command center for facility managers.
*   **TypeScript**: Enforced strict type safety across the monorepo to reduce runtime errors and improve developer tooling.

### Backend & Data
*   **Node.js & Express**: Core runtime for API services, chosen for its non-blocking I/O suitable for real-time IoT data.
*   **MongoDB**: Implemented for high-volume time-series data storage, capturing millions of sensor readings for analytics and trending.
*   **MySQL**: Relational store for structured device metadata, user configurations, and hierarchical campus data.
*   **Objection.js / Knex**: ORM and query builder layer for type-safe and efficient SQL interactions.

### Infrastructure & Operations
*   **Docker**: Containerization standard for all services, ensuring environment parity from dev to prod.
*   **AWS**: Utilized for core compute (EC2/ECS), database (RDS), and networking (VPC) resources.
*   **GitLab CI**: Fully automated CI/CD pipelines for linting, testing, and deployment.
