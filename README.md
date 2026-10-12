# BêCake — Confeitaria Artesanal

Site Next.js App Router, React 19, TypeScript, Tailwind CSS, Motion e React Three Fiber. Prévia local; não foi publicado em produção.

## Executar

Requer Node.js 20.9 ou superior e npm.

```sh
npm ci
npm run dev
```

Abra http://127.0.0.1:3000. Para produção local: `npm run build` e `npm start`. Para verificar: `npm run typecheck` e, com servidor iniciado, `npm test`. Os testes usam Microsoft Edge; em outros sistemas ajuste `channel` em `playwright.config.ts` e instale Chromium com `npx playwright install chromium`.

## Organização

- `src/lib/content.ts`: dados comerciais, pendências, referências, sanitização dos itens e construção da mensagem.
- `src/app`: páginas, metadados, robots, sitemap e Open Graph.
- `src/components`: catálogo, formulário, painel, animações e cena 3D isolada.
- `src/app/globals.css`: tokens de marca, estados e layout responsivo.
- `public/images`: imagens locais; não há hotlinking.
- `tests/site.spec.ts`: fluxos funcionais, responsividade, acessibilidade automatizada e 3D/fallback.

## Dados e comportamento

Informações comerciais vêm do material do cliente, sem verificação em tempo real. Instagram lido na captura: `becakeconfeitaria_`. Não são exibidos horários conflitantes, preços, avaliações, ingredientes, prazos ou políticas não confirmados. Fotografias pequenas são referências de decoração, não itens garantidos em estoque. Ferrero Rocher e cupcake são destaques citados, sem fotografia atribuída indevidamente.

O painel salva apenas IDs e quantidades no localStorage. Nome e demais dados do formulário ficam na memória da página. A mensagem é revisada e aberta no WhatsApp por ação do visitante; não representa reserva, pagamento ou pedido confirmado. Cópia manual continua disponível se a área de transferência não funcionar.

## Publicação

1. Confirmar horários regulares (inclusive sábado e segunda), catálogo, preços, tamanhos, antecedência e condições de entrega.
2. Obter fotos originais e confirmar autorização para fotos e retrato. A versão entregue usa capturas fornecidas em tamanho limitado e uma imagem ilustrativa identificada.
3. Revisar endereço, telefone e dados estruturados com a confeitaria.
4. Configurar `SITE_URL` com o domínio real aprovado. Sem essa variável, robots bloqueia indexação e sitemap fica vazio.
5. Executar build/testes e publicar em hospedagem compatível com Next.js/Node. Não há serviço pago contratado ou domínio presumido.

## Direção visual

Marfim `#faf7f0`, rosa `#ecd7d2`, sálvia `#60786b`, chocolate `#493d36`; serifada de sistema para títulos e sans-serif de sistema para leitura. Wordmark tipográfico substitui o recorte da marca. Tokens primitivos, semânticos e de componente são definidos no CSS. Não há requisição de fonte externa.

Movimento tem função de feedback e continuidade: filtros e reorganização com Motion, entrada editorial e microinterações com CSS, modais Base UI com transições de 240 ms. Preferência de movimento reduzido é respeitada. O conteúdo principal permanece no HTML inicial.

O bolo 3D é procedural, sem ativo externo: cilindros, flores geométricas e bordas instanciadas, materiais PBR foscos, luzes suaves e sombra de contato. Carrega por solicitação, limita DPR e usa renderização sob demanda, suspensa fora da tela. Arraste, botões, restauração e troca de cor são alternativas acessíveis. A representação é ilustrativa.

## Skills aplicadas

Design (direção e composição); brand (voz e fidelidade aos dados); design-system (tokens); ui-styling (responsividade e estados); animate e framer-motion-react (movimento, layout e SSR); pick-ui-library (Base UI para foco e modais); r3f-fundamentals, r3f-geometry, r3f-interaction, r3f-lighting e r3f-materials (cena procedural e custo de renderização); imagegen (imagem editorial ilustrativa); playwright-skill (validação real em navegador).

Foram examinados os diretórios de skills instaladas. Automação de serviços, slides, física, shaders especiais e ferramentas de marketing não contribuem para esta implementação e não foram executados.

## Documentação consultada

- https://nextjs.org/docs/app/getting-started/installation
- https://motion.dev/docs/react-installation
- https://r3f.docs.pmnd.rs/
- https://base-ui.com/react/components/dialog

As versões exatas estão fixadas pelo `package-lock.json`. Veja `VALIDACAO.md` para resultados medidos e limites.
