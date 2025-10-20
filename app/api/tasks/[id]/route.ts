import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: ParamsProps) {
  try {
    const taskId = params.id;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignees: {
          include: {
            employee: true,
          },
        },
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: ParamsProps) {
  try {
    const body = await request.json();
    const { title, description, dueDate, status, assignees } = body;

    const task = await prisma.task.findUnique({ where: { id: params.id } });
    if (!task)
      return NextResponse.json({ error: "Task not found." }, { status: 404 });

    const statusFormat = status ? status.toUpperCase() : task.status;

    if (!(statusFormat in TaskStatus)) {
      return NextResponse.json(
        { error: "Invalid status. Must be TODO, IN_PROGRESS or DONE." },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.task.update({
      where: { id: params.id },
      data: {
        title: title ?? task.title,
        description: description ?? task.description,
        dueDate: dueDate ? new Date(dueDate) : task.dueDate,
        status: statusFormat as TaskStatus,
        assignees: assignees
          ? {
              deleteMany: {},
              create: assignees.map((employeeId: string) => ({
                employee: { connect: { id: employeeId } },
              })),
            }
          : undefined,
      },
      include: {
        assignees: {
          include: { employee: true },
        },
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: ParamsProps) {
  try {
    const taskId = params.id;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    await prisma.taskAssignment.deleteMany({
      where: { taskId: taskId },
    });

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Task deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
