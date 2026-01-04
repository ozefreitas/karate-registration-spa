import PageInfoCard from "../../components/info-cards/PageInfoCard";
import AdminPaymentManagerPage from "./AdminPaymentManagerPage";
import MemberPaymemtManagerPage from "./MemberPaymemtManagerPage";

export default function PaymentManagerPage(props: { userRole: string }) {
  return (
    <>
      <PageInfoCard
        description={
          props.userRole === "main_admin" ? (
            <>
              Aqui poderá gerir todas os pagamentos de quotas dos seus clubes de
              forma rápida e fácil. Pode também criar e notificar os Clubes da
              disponibilidade de pagamento de novas quotas. <p></p>
              As notificações de quotas são criadas automaticamanete de acordo
              com a data estipulada no seu{" "}
              <strong>painel de administrador</strong>, na <i>tab</i>{" "}
              <strong>Gestão de Pagamentos</strong>. <p></p>
              Começe por selecionar o ano para o qual pretende verificar o
              estado de pagamento de quotas dos seus Clubes. <p></p>
              Pode editar a data limite e montante a ser pago pelo clubes na
              carta <strong>Data de Expiração</strong> e{" "}
              <strong>Montante</strong>, respetivamente.
            </>
          ) : (
            <>
              <p>
                Aqui poderá gerir todas os pagamentos de quotas dos seus Membros
                de forma rápida e fácil. Pode também criar e notificar os
                membros da disponibilidade de pagamento de novas quotas.
              </p>
              <p>
                Pode alterar o dia em que as notificações de pagamentos de
                quotas mensais são criados na aba{" "}
                <strong>Gestão de Pagamentos</strong>.
              </p>
            </>
          )
        }
        title="Gestor de Pagamentos"
      ></PageInfoCard>
      {props.userRole === "main_admin" ? (
        <AdminPaymentManagerPage
          userRole={props.userRole}
        ></AdminPaymentManagerPage>
      ) : (
        <MemberPaymemtManagerPage
          userRole={props.userRole}
        ></MemberPaymemtManagerPage>
      )}
    </>
  );
}
