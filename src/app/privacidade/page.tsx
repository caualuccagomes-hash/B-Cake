export const metadata = { title: "Privacidade" };
export default function Page() {
  return (
    <article className="wrap section narrow prose">
      <h1>
        Sua <em>privacidade.</em>
      </h1>
      <p>
        Este site prepara solicitações de encomenda sem cadastro, pagamento ou
        envio de formulário para um servidor.
      </p>
      <h2>O que fica no navegador</h2>
      <p>
        Apenas os identificadores e quantidades dos itens escolhidos ficam no
        armazenamento local deste navegador. Você pode removê-los pelo painel de
        solicitação ou limpando os dados do site. Nome, data, preferências e
        observações não são persistidos pelo site.
      </p>
      <h2>WhatsApp e links externos</h2>
      <p>
        Ao abrir o WhatsApp, o texto da solicitação é incluído no link e
        compartilhado com esse serviço. Confira a mensagem antes de enviá-la. O
        atendimento posterior e o tratamento dos dados na conversa são feitos
        pela confeitaria e pelo WhatsApp.
      </p>
      <p>
        Links para Instagram e Google Maps abrem serviços externos com suas
        próprias práticas de privacidade. Não há rastreadores analíticos ou
        cookies de publicidade adicionados por este site.
      </p>
      <h2>Contato</h2>
      <p>
        Para dúvidas sobre dados compartilhados em uma encomenda, fale com a
        BêCake pelo telefone (88) 98119-6996.
      </p>
    </article>
  );
}
