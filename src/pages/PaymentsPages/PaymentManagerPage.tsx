import PageInfoCard from "../../components/info-cards/PageInfoCard";
import AdminPaymentManagerPage from "./AdminPaymentManagerPage";
import MemberPaymemtManagerPage from "./MemberPaymemtManagerPage";

export default function PaymentManagerPage(props: { userRole: string }) {
  return (
    <>
      <PageInfoCard
        description="Aqui poderá gerir todas os pagamentos de quotas dos seus clubes de forma rápida e fácil. Pode também criar e notificar os Clubes da disponibilidade de pagamento de novas quotas."
        title="Gestor de Pagamento de Quotas"
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
