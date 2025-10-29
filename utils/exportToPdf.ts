import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Product } from "@prisma/client";

/**
 * Gera um PDF estilizado com informações dos produtos.
 * @param products Lista de produtos do contexto.
 * @param filename Nome do arquivo a ser baixado (sem extensão).
 */


export async function exportToPDF(
  products: Product[],
  filename = "relatorio-sneakerfit"
) {
  if (!products.length) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  // Centraliza título e adiciona logo (se tiver)
  const pageWidth = doc.internal.pageSize.getWidth();

  try {
    // Exemplo: use sua logo no diretório público (ex: /logo.png)
    const logoUrl = "/logo.png";
    const logo = await (await fetch(logoUrl)).blob();
    const logoBase64 = await blobToBase64(logo);

    doc.addImage(logoBase64, "PNG", pageWidth - 120, 30, 80, 40);
  } catch {
    console.warn("Logo não encontrada em /logo.png — ignorando...");
  }

  // Cabeçalho
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Relatório de Produtos - Sneakerfit", pageWidth / 2, 60, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setTextColor(100);
  const dataAtual = new Date().toLocaleDateString("pt-BR");
  doc.text(`Gerado em: ${dataAtual}`, 40, 80);

  // Monta tabela
  const tableColumn = ["Produto", "Marca", "Preço (R$)", "Estoque", "Status"];
  const tableRows = products.map((p) => [
    p.name,
    p.brand,
    p.price.toFixed(2).replace(".", ","),
    p.stock.toString(),
    p.status,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 100,
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: [30, 30, 30], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    columnStyles: { 2: { halign: "right" }, 3: { halign: "center" } },
    margin: { left: 40, right: 40 },
  });

  // Rodapé
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(9);
  doc.setTextColor(130);
  doc.text(
    "Sneakerfit Dashboard © " + new Date().getFullYear(),
    pageWidth / 2,
    pageHeight - 30,
    { align: "center" }
  );

  // Baixa arquivo
  doc.save(`${filename}.pdf`);
}

/** Utilitário: converte Blob em Base64 para jsPDF */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
