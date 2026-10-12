# Componentes da versão HTML

Abra `../visualizar-becake.html` no navegador. Os componentes e as imagens estão incorporados ao arquivo e funcionam sem servidor ou CDN.

- `components.css`: estilos responsivos, tilt, selo, marquee, lightbox, filtros, carrossel e WhatsApp.
- `components.js`: interações, teclado, foco, filtros, pausa, animações e carrossel.
- `reviews.js`: lista de depoimentos reais. Vazia enquanto não houver comentários autorizados.
- `background.cjs`: vetores de calda e partículas decorativas do Hero e dos cabeçalhos.
- `background.css`: movimento lento, calda com opacidade de 10–12%, pausa e redução de movimento.
- `background.js`: suspende as animações fora da tela e em abas ocultas, sem loop JavaScript por frame.

Depois de editar estes arquivos, execute na pasta do projeto:

```sh
node scripts/build-interactions.cjs
```

O script é idempotente: atualiza os componentes incorporados sem duplicar a interface. A lista de depoimentos aceita objetos com `name`, `event`, `rating` (inteiro de 1 a 5) e `comment`. Não há comentários ou avaliações fictícios publicados. Com dois ou mais depoimentos válidos, o carrossel mostra os controles; com um, mostra a avaliação; com zero, mostra um estado de conteúdo em breve.

O lightbox usa o elemento nativo `dialog`, com foco contido pelo navegador, fechamento por Esc e restauração do foco. As setas do teclado alternam as imagens visíveis. O CTA abre o WhatsApp com o nome da referência; a mensagem só é enviada pelo visitante. A resolução ampliada é limitada à qualidade das capturas fornecidas.

O tilt funciona apenas em ponteiros precisos. A preferência de movimento reduzido desativa loops e deslocamentos. O botão de pausa interrompe o selo, o marquee e o pulso do WhatsApp. O carrossel de depoimentos é manual e não troca comentários enquanto o visitante lê.

Testes de filtros, lightbox, teclado, WhatsApp, galeria e responsividade:

```sh
npx playwright test --config preview/playwright.config.cjs
```

Validação nesta sessão: scripts analisados sem erros de sintaxe; reconstrução repetida sem duplicar controles ou fotos. Os testes de navegador foram preparados, mas o Edge não inicia no ambiente isolado desta sessão; a validação visual e de interação permanece pendente.
