import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  VACATION = "VACATION",
}

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: ParamsProps) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      include: {
        tasks: {
          include: {
            task: true,
          },
        },
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("GET /employees/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: ParamsProps) {
  try {
    const employeeId = params.id;
    const body = await request.json();
    const { name, email, cpf, role, avatarUrl, status } = body;

    const existing = await prisma.employee.findUnique({
      where: { id: employeeId },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Employee not found." },
        { status: 404 }
      );
    }

    const statusFormat = status ? status.toUpperCase() : existing.status;

    if (!(statusFormat in EmployeeStatus)) {
      return NextResponse.json(
        { error: "Invalid status. Must be ACTIVE or VACATION." },
        { status: 400 }
      );
    }

    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        name: name ?? existing.name,
        email: email ?? existing.email,
        cpf: cpf ?? existing.cpf,
        role: role ?? existing.role,
        avatarUrl: avatarUrl ?? existing.avatarUrl,
        status: statusFormat as EmployeeStatus,
      },
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("PUT /employees/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: ParamsProps) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
    });
    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found." },
        { status: 404 }
      );
    }

    await prisma.taskAssignment.deleteMany({
      where: { employeeId: params.id },
    });

    await prisma.employee.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.error("DELETE /employees/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
