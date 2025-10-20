import { Customer } from "@/app.types";
import Image from "next/image";
import avatar from "@/public/user.png";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface CustomerRowProps {
  customer: Customer;
}

export function CustomerRow({ customer }: CustomerRowProps) {
  return (
    <tr className="border-b border-[#252424] last:border-b-0 md:text-xs">
      <td className="p-4">
        <Image
          src={avatar}
          alt={customer.name}
          className="w-8 h-8 rounded-full object-cover border-2 border-[#131a1a]"
        />
      </td>
      <td className="p-4 capitalize">{customer.name}</td>
      <td className="p-4 lowercase">{customer.email}</td>
      <td className="p-4">{customer.orders?.length ?? 0}</td>
      <td className="p-4">{customer.createdAt}</td>
      <td className="p-4">
        <Button className="bg-blue-500/30 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 cursor-pointer">
          <Edit2 />
        </Button>
      </td>
    </tr>
  );
}
