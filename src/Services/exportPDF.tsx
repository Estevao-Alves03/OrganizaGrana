import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatMonth, getToday } from "../Utils/Date";
import { useFinanceStore } from "../Store/FinanceStore";

export function exportPDF(currentMonth: string) {
  console.log("========== INICIANDO PDF ==========");
  console.log("1. Mês recebido:", currentMonth);

  const doc = new jsPDF();

  const store = useFinanceStore.getState();
  console.log("2. Store obtida");

  store.setCurrentMonth(currentMonth);
  console.log("3. Mês atual setado para:", store.currentMonth);

  const monthTransactions = store.getTransactionsByMonth(currentMonth);
  console.log("4. Transações do mês:", monthTransactions.length);

  const totals = store.getTotals();
  console.log("5. Totais calculados:", totals);

  const distribution = store.getDistribuition();
  console.log("6. Distribuição calculada:", distribution);

  const { emergency, invest, leisure, education, costs } = distribution;
  console.log("7. Valores extraídos:", { emergency, invest, leisure, education, costs });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // ========== HEADER ==========
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("MEUS GASTOS ORGANIZADOS", 14, 18);

  doc.setTextColor(0, 0, 0);

  // ========== TÍTULO ==========
  doc.setFontSize(16);
  doc.text("Relatório Financeiro", 14, 45);

  doc.setFontSize(11);
  doc.text(`Mês: ${formatMonth(currentMonth)}`, 14, 52);
  doc.text(`Gerado em: ${getToday()}`, 14, 58);

  // ========== RESUMO ==========
  doc.setFontSize(13);
  doc.text("Resumo financeiro", 14, 75);

  doc.setFontSize(11);
  doc.text(`Receitas: ${formatCurrency(totals.totalIncome)}`, 14, 85);
  doc.text(`Despesas: ${formatCurrency(totals.totalExpense)}`, 14, 92);
  doc.text(`Saldo: ${formatCurrency(totals.balance)}`, 14, 99);

  console.log("8. Saldo para distribuição:", totals.balance);
  console.log("9. Condição balance > 0:", totals.balance > 0);

  // ========== DISTRIBUIÇÃO ==========
  if (totals.balance > 0) {
    console.log("10. ENTRANDO NO BLOCO DE DISTRIBUIÇÃO");
    
    doc.setFontSize(13);
    doc.text("Distribuição do saldo", 14, 115);

    // Calcular percentuais
    const totalDistribuido = emergency + invest + leisure + education + costs;
    const percentualEmerg = ((emergency / totals.balance) * 100).toFixed(1);
    const percentualInvest = ((invest / totals.balance) * 100).toFixed(1);
    const percentualLeisure = ((leisure / totals.balance) * 100).toFixed(1);
    const percentualEdu = ((education / totals.balance) * 100).toFixed(1);
    const percentualCosts = ((costs / totals.balance) * 100).toFixed(1);

    console.log("11. Percentuais calculados:", {
      emerg: percentualEmerg,
      invest: percentualInvest,
      leisure: percentualLeisure,
      edu: percentualEdu,
      costs: percentualCosts,
      total: ((totalDistribuido / totals.balance) * 100).toFixed(1)
    });

    console.log("12. Criando tabela de distribuição...");

    autoTable(doc, {
      startY: 120,
      head: [["Categoria", "Percentual", "Valor"]],
      body: [
        ["Reserva de emergência", `${percentualEmerg}%`, formatCurrency(emergency)],
        ["Investimentos", `${percentualInvest}%`, formatCurrency(invest)],
        ["Lazer", `${percentualLeisure}%`, formatCurrency(leisure)],
        ["Educação", `${percentualEdu}%`, formatCurrency(education)],
        ["Gastos pessoais", `${percentualCosts}%`, formatCurrency(costs)],
      ],
      foot: [[
        "Total distribuído",
        `${((totalDistribuido / totals.balance) * 100).toFixed(1)}%`,
        formatCurrency(totalDistribuido)
      ]],
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: [255, 255, 255],
      },
      footStyles: {
        fillColor: [240, 253, 244],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 253, 244],
      },
      didDrawPage: () => {
        console.log("13. Tabela de distribuição desenhada");
      }
    });

    const tableEndY = (doc as any).lastAutoTable?.finalY;
    console.log("14. Posição final da tabela:", tableEndY);

  } else {
    console.log("10. BALANCE <= 0 - MOSTRANDO MENSAGEM ALTERNATIVA");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text("Sem saldo disponível para distribuição", 14, 115);
    doc.setTextColor(0, 0, 0);
  }

  // ========== TRANSAÇÕES ==========
  const tableStartY = (doc as any).lastAutoTable?.finalY 
    ? (doc as any).lastAutoTable.finalY + 15 
    : 140;

  console.log("15. Iniciando tabela de transações em Y:", tableStartY);

  autoTable(doc, {
    startY: tableStartY,
    head: [["Nome", "Categoria", "Tipo", "Valor"]],
    body: monthTransactions.map((t) => [
      t.name,
      t.category,
      t.type === "income" ? "Receita" : "Despesa",
      formatCurrency(t.amount),
    ]),
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [240, 253, 244],
    },
    didParseCell: (data) => {
      if (data.column.index === 2 && data.cell.raw === "Despesa") {
        data.cell.styles.textColor = [220, 38, 38];
      }
    },
    didDrawPage: () => {
      console.log("16. Tabela de transações desenhada");
    }
  });

  // ========== FOOTER ==========
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(9);
  doc.text(
    "Relatório gerado automaticamente pelo sistema",
    14,
    pageHeight - 10
  );

  console.log("17. Finalizando PDF");
  console.log("================================");

  doc.save(`relatorio-${currentMonth}.pdf`);
}