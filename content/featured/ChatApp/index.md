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
---

A containerized, **real-time chat platform** built on a **Node.js (NestJS)** backend leveraging **WebSockets** and **RabbitMQ** for highly-parallel, low-latency message distribution across active nodes. I mitigated **"N+1" query bottlenecks** with batched caching (**DataLoader/Redis**) and validated API scalability through rigorous **concurrency performance testing** with Artillery.
