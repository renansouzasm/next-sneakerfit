"use server";

import {
  taskCreateSchema,
  TaskCreateForm,
  taskUpdateSchema,
  TaskUpdateForm,
} from "@/lib/schemas/task-schema";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const TASKS_PATH = "/dashboard/tasks";

async function getFullTaskById(taskId: string) {
  return prisma.task.findUnique({
    where: { id: taskId },
    include: {
      assignees: {
        include: {
          employee: true,
        },
      },
    },
  });
}

export async function getTasksAction() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        assignees: {
          include: {
            employee: true,
          },
        },
      },
    });
    return {
      data: tasks,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function getTaskByIdAction(getTaskId: string) {
  if (!getTaskId) {
    return {
      error: "ID da tarefa não fornecido.",
    };
  }
  try {
    const task = await getFullTaskById(getTaskId);
    return {
      data: task,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function createTaskAction(formData: TaskCreateForm) {
  const validation = taskCreateSchema.safeParse(formData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { title, description, dueDate, employeeIds } = validation.data;

  try {
    const newTask = await prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          title,
          description,
          dueDate,
        },
      });

      if (employeeIds && employeeIds.length > 0) {
        await tx.taskAssignment.createMany({
          data: employeeIds.map((empId) => ({
            taskId: task.id,
            employeeId: empId,
          })),
        });
      }

      return task;
    });

    revalidatePath(TASKS_PATH);

    const data = await getFullTaskById(newTask.id);
    return {
      data,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function updateTaskAction(updatedData: TaskUpdateForm) {
  const validation = taskUpdateSchema.safeParse(updatedData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { id: updateId, employeeIds, ...restOfData } = validation.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.task.update({
        where: {
          id: updateId,
        },
        data: {
          ...restOfData,
        },
      });

      if (employeeIds) {
        await tx.taskAssignment.deleteMany({
          where: {
            taskId: updateId,
            employeeId: { notIn: employeeIds },
          },
        });

        const currentAssignments = await tx.taskAssignment.findMany({
          where: {
            taskId: updateId,
            employeeId: { in: employeeIds },
          },
          select: { employeeId: true },
        });
        const currentEmployeeIds = currentAssignments.map((a) => a.employeeId);

        const newEmployeeIds = employeeIds.filter(
          (id) => !currentEmployeeIds.includes(id)
        );

        if (newEmployeeIds.length > 0) {
          await tx.taskAssignment.createMany({
            data: newEmployeeIds.map((empId) => ({
              taskId: updateId,
              employeeId: empId,
            })),
          });
        }
      }
    });

    revalidatePath(TASKS_PATH);

    const data = await getFullTaskById(updateId);
    return {
      data,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function deleteTaskAction(deleteId: string) {
  if (!deleteId) {
    return {
      error: "ID da tarefa não fornecido.",
    };
  }

  try {
    await prisma.$transaction([
      prisma.taskAssignment.deleteMany({
        where: { taskId: deleteId },
      }),
      prisma.task.delete({
        where: { id: deleteId },
      }),
    ]);

    revalidatePath(TASKS_PATH);

    return { data: { message: "Tarefa deletada com sucesso!" } };
  } catch (error) {
    return { error: String(error) };
  }
}
