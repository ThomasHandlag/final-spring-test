import api from ".";
import type { PaginatedResponse } from "../hooks/usePaginatedQuery";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface Employee {
    id: number;
    fullName: string;
    email: string;
    dateOfBirth: Date;
    phoneNumber: string;
    active: boolean;
    gender: Gender;
}

export async function fetchEmployees(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Employee> | Error> {
  try {
    const response = await api.get(`/employees?page=${page}&limit=${pageSize}`);
    
    if (Array.isArray(response.data)) {
      return {
        data: response.data,
        pagination: {
          total: response.data.length,
          currentPage: page,
          pageSize: pageSize,
          totalPages: Math.ceil(response.data.length / pageSize),
        }
      };
    }
    
    return {
      data: response.data?.result || [],
      pagination: {
        total: response.data?.metadata?.totalItems || 0,
        currentPage: page,
        pageSize: pageSize,
        totalPages: response.data?.metadata?.totalPages || 1,
      }
    };
  } catch (error) {
    return error as Error;
  }
}

export async function createEmployee(employee: {
  fullName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  active: boolean;
  gender: Gender;
  password: string;
}): Promise<string | Error> {
  const response = await api.post("/employees", employee);
  return response.data.result ?? new Error("Failed to create employee");
}

export async function deleteEmployee(id: number): Promise<string | Error> {
  const response = await api.delete(`/employees/${id}`);
  return response.data.result ?? new Error("Failed to delete employee");
}

export async function updateEmployee(employee: {
  id: number;
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  active: boolean;
  gender: Gender;
  password: string;
}): Promise<string | Error> {
  const response = await api.put(`/employees/${employee.id}`, employee);
  return response.data.result ?? new Error("Failed to update employee");
}

export async function fetchEmployeeById(id: number): Promise<Employee | Error> {
  const response = await api.get(`/employees/${id}`);
  return response.data.result ?? new Error("Failed to fetch employee");
}
