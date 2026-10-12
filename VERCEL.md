# Publicar a versão visual da BêCake

Importe o repositório B-Cake no Vercel e mantenha Root Directory como `.` (raiz).

O arquivo vercel.json configura a publicação da versão HTML que foi revisada no navegador, incluindo galeria, lightbox, filtros, animações e WhatsApp. O código Next.js permanece disponível em src, mas não é a versão selecionada para este deploy.

- Framework Preset: Other
- Build Command: node scripts/build-vercel.cjs
- Output Directory: dist
- Install Command: node --version

As configurações estão versionadas em vercel.json. Remova eventuais overrides antigos de Next.js no painel do projeto para usar esta configuração.

Para verificar a geração local: `node scripts/build-vercel.cjs`.

Os depoimentos continuam ocultos enquanto preview/reviews.js não contiver avaliações reais autorizadas. Não são necessárias variáveis de ambiente para esta versão.
