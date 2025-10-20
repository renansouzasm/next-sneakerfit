import { Employee } from "@/app.types";
import Image from "next/image";
import avatar from "@/public/user.png";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLabelPtbr } from "@/utils/label";
import { getBadgeClass } from "@/utils/badge";
import Link from "next/link";

interface EmployeeRowProps {
  employee: Employee;
}

export function EmployeeRow({ employee }: EmployeeRowProps) {
  return (
    <tr className="border-b border-[#252424] last:border-b-0 md:text-xs">
      <td className="p-4">
        <Image
          className="w-8 h-8 rounded-full object-cover border-2 border-[#131a1a]"
          src={avatar}
          alt={"jb"}
        />
      </td>
      <td className="p-4 capitalize">{employee.name}</td>
      <td className="p-4 capitalize">{employee.email}</td>
      <td className="p-4 capitalize">{employee.role}</td>
      <td className="p-4">
        {employee.createdAt} - {employee.updatedAt}
      </td>
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-[20px] text-xs font-medium ${getBadgeClass(
            "status",
            employee.status
          )}`}
        >
          {getLabelPtbr(employee.status)}
        </span>
      </td>
      <td className="p-4">
        <Button className="bg-blue-500/30 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 cursor-pointer">
          <Link
            href={`${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/employees/${employee.id}/edit`}
          >
            <Edit2 />
          </Link>
        </Button>
      </td>
    </tr>
  );
}
