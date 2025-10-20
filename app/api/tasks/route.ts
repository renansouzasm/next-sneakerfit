import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignees: {
          include: {
            employee: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, dueDate, status, assignees } = body;

    if (!title || !dueDate) {
      return NextResponse.json(
        { error: "Title and due date are required." },
        { status: 400 }
      );
    }

    const statusFormat = status ? status.toUpperCase() : TaskStatus.TODO;

    if (!(statusFormat in TaskStatus)) {
      return NextResponse.json(
        { error: "Status must be todo, in_progress or done." },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        status: statusFormat as TaskStatus,
        assignees: assignees?.length
          ? {
              create: assignees.map((employeeId: string) => ({
                employee: { connect: { id: employeeId } },
              })),
            }
          : undefined,
      },
      include: {
        assignees: {
          include: {
            employee: true,
          },
        },
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
