import {
  AccountBalanceWalletOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import AdminPaymentManagerPage from "./AdminPaymentManagerPage";
import MemberPaymemtManagerPage from "./MemberPaymemtManagerPage";

export default function PaymentManagerPage(
  props: Readonly<{ userRole: string }>,
) {
  const isAdminManager = props.userRole === "main_admin";

  return (
    <>
      <PageInfoCard
        title="Gestor de Pagamentos"
        icon={<AccountBalanceWalletOutlined />}
        chipLabel={isAdminManager ? "Gestão anual" : "Gestão mensal"}
        chipIcon={<CalendarMonthOutlined />}
        chipColor="error"
        description={
          isAdminManager
            ? "Acompanhe as quotas anuais dos clubes e ajuste prazos e montantes. As notificações são enviadas automaticamente conforme as definições de Gestão de Pagamentos no painel de administrador."
            : "Acompanhe as quotas e validações de pagamento dos membros. Configure o dia de cobrança e os planos de pagamento nas secções abaixo."
        }
      />
      {isAdminManager ? (
        <AdminPaymentManagerPage userRole={props.userRole} />
      ) : (
        <MemberPaymemtManagerPage userRole={props.userRole} />
      )}
    </>
  );
}
