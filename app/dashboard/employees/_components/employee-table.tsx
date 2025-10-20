import { Employee } from "@/app.types";
import { EmployeeRow } from "./employee-row";

interface EmployeeTableProps {
  employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[rgba(255,255,255,0.05)] font-semibold text-sm text-[#5c5c5c] md:text-xs">
          <th className="p-4 text-left">Foto</th>
          <th className="p-4 text-left">Nome</th>
          <th className="p-4 text-left">Email</th>
          <th className="p-4 text-left">Cargo</th>
          <th className="p-4 text-left">Data</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Ações</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((employee, index) => (
          <EmployeeRow key={index} employee={employee} />
        ))}
      </tbody>
    </table>
  );
}
