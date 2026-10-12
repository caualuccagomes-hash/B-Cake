# Validação

## Verificações concluídas

- Node.js 24.21.0 e npm 11.19.0.
- `npm ci`: dependências instaladas pelo registry oficial. O npm informou zero vulnerabilidades na instalação inicial. `npm audit --offline --omit=optional --audit-level=moderate`: zero vulnerabilidades.
- `npm run typecheck`: concluído sem erros com TypeScript estrito.
- `npm run build`: compilação Webpack e verificação TypeScript foram concluídas. Uma execução anterior pré-renderizou as 12 rotas. Nas tentativas finais, a etapa de pré-renderização encontrou `EPERM` ao criar uma pasta gerada em `.next/server/app`; é um bloqueio de gravação do worker no sandbox.
- Na execução que pré-renderizou as rotas, o HTML incluía marca, Tianguá, CTA de WhatsApp e conteúdo de encomenda.
- Recursos usados nas páginas: `hero.webp` 155 KB, `references.webp` 93 KB, `atelier.webp` 33 KB. Gerados localmente para evitar carregar imagens externas.

## Limites deste ambiente

- A suíte Playwright foi executada, mas não chegou às páginas: o Edge encerrou ao iniciar porque o ambiente impediu a escrita dos arquivos temporários de perfil. A instalação de Chromium também foi bloqueada pelo DNS do CDN. As asserções de interação, axe/WCAG, responsividade e 3D ficam disponíveis em `npm test`, mas precisam de um navegador Playwright funcional para confirmar seus resultados.
- A tentativa de abrir o servidor local na prévia do aplicativo foi recusada por isolamento de rede (`ERR_CONNECTION_REFUSED`). Rode `npm run build` no computador de desenvolvimento e então `npm start` para conferir a prévia local.
- Lighthouse e métricas de Core Web Vitals não foram medidos; não há pontuação declarada.
- Não houve inspeção visual do site renderizado em tamanhos reais. O teste de regressão visual está preparado para 390, 768 e 1440 px.

## Antes de publicar

Confirmar os horários regulares, em especial segunda e sábado; sabores, tamanhos, valores e antecedência; políticas, regiões e taxas de entrega; autorização de uso das fotos; endereço e telefone; e domínio final. Definir `SITE_URL` apenas depois de aprovar o domínio para ativar indexação, sitemap e imagem Open Graph pública.
