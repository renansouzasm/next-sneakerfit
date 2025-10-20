import { Order } from "@/app.types";
import { getBadgeClass } from "@/utils/badge";
import { getLabelPtbr } from "@/utils/label";

export function OrderRow({ order }: { order: Order }) {
  return (
    <tr className="border-b border-[#252424] last:border-b-0 md:text-xs">
      <td className="p-4">{order.id}</td>
      <td className="p-4">{"nome"}</td>
      <td className="p-4">{order.product}</td>
      <td className="p-4">{order.value}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-[20px] text-xs font-medium ${getBadgeClass(
            "status",
            order.status
          )}`}
        >
          {getLabelPtbr(order.status)}
        </span>
      </td>
      <td className="p-4">{order.date}</td>
    </tr>
  );
}
