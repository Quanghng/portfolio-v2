---
date: '2'
title: 'Distributed Real-Time Chat System'
cover: './demo.png'
github: 'https://github.com/Quanghng/web-chatapp'
external: 'https://github.com/Quanghng/web-chatapp'
tech:
  - TypeScript / NestJS
  - Redis
  - RabbitMQ
  - PostgreSQL
lang: 'fr'
---

Une plateforme de chat en temps réel conteneurisée, bâtie sur un backend **Node.js (NestJS)** exploitant les **WebSockets** et **RabbitMQ** pour une distribution de messages **hautement parallèle et à faible latence** entre les nœuds actifs. J’ai atténué les **goulots d’étranglement « N+1 »** grâce à un cache par lots (**DataLoader/Redis**) et validé la scalabilité de l’API par des **tests de performance en concurrence** avec Artillery.
