import type { StaticImageData } from "next/image";

export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  LOW_STOCK = "LOW_STOCK",
  NO_STOCK = "NO_STOCK",
}

export enum OrderStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum EmployeeStatus {
  ACTIVE = "ACTIVE",
  VACATION = "VACATION",
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type ProductBrand = "nike" | "adidas" | "new-balance";

export interface Product {
  imageUrl?: string | StaticImageData | null;
  id: string;
  name: string;
  brand: ProductBrand;
  price: number;
  stock: number;
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  avatarUrl?: string | StaticImageData | null;
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  orders: Order[];
}

export interface Employee {
  avatarUrl?: string | StaticImageData | null;
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
  status: EmployeeStatus;
  createdAt?: string;
  updatedAt?: string;
  tasks: TaskAssignment[];
}

export interface Order {
  id: string;
  customer: Customer;
  customerId: Customer["id"];
  totalValue: number;
  status: OrderStatus;
  createdAt?: string;
  products: Product[];
}

export interface OrderItem {
  id: string;
  order: Order;
  orderId: string;
  product: Product;
  productId: string;
  quantity: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: string;
  dueDate?: string;
  assignees: TaskAssignment[];
}

export interface TaskAssignment {
  id: string;
  task: Task;
  taskId: string;
  employee: Employee;
  employeeId: string;
}
