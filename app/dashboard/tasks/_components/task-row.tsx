import { Task } from "@/app.types";
import Image from "next/image";
import avatar from "@/public/user.png";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/formatData";
import Link from "next/link";

interface TaskRowProps {
  task: Task;
}

export function TaskRow({ task }: TaskRowProps) {
  const employees = task.assignees?.map((a) => a.employee) ?? [];

  return (
    <tr className="border-b border-[#252424] last:border-b-0 md:text-xs">
      <td className="p-4 capitalize">{task.title}</td>

      <td className="p-4 capitalize">
        {task.description ?? "descrição genérica"}
      </td>

      <td className="p-4">
        <div className="flex items-center -space-x-2">
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <Image
                key={employee.id ?? index}
                className="w-8 h-8 rounded-full object-cover border-2 border-[#131a1a]"
                src={employee.avatarUrl || avatar}
                alt={employee.name}
                width={32}
                height={32}
              />
            ))
          ) : (
            <Image
              className="w-8 h-8 rounded-full object-cover border-2 border-[#131a1a]"
              src={avatar}
              alt="sem funcionário"
              width={32}
              height={32}
            />
          )}
        </div>
      </td>

      <td className="p-4">
        {formatDate(task.createdAt) ?? "sem início"} -{" "}
        {formatDate(task.dueDate) ?? "sem prazo"}
      </td>

      <td className="p-4">
        <Button className="bg-blue-500/30 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 cursor-pointer">
          <Link
            href={`${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/tasks/${task.id}/edit`}
          >
            <Edit2 />
          </Link>
        </Button>
      </td>
    </tr>
  );
}
