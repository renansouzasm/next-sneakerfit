import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  VACATION = "VACATION",
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        tasks: {
          include: {
            task: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("GET /employees error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, cpf, role, avatarUrl, status } = body;

    if (!name || !email || !cpf || !role) {
      return NextResponse.json(
        { error: "Name, email, CPF and role are required." },
        { status: 400 }
      );
    }

    const statusFormat = status ? status.toUpperCase() : EmployeeStatus.ACTIVE;

    if (!(statusFormat in EmployeeStatus)) {
      return NextResponse.json(
        { error: "Invalid status. Must be ACTIVE or VACATION." },
        { status: 400 }
      );
    }

    const newEmployee = await prisma.employee.create({
      data: {
        name,
        email,
        cpf,
        role,
        avatarUrl,
        status: statusFormat as EmployeeStatus,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("POST /employees error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
