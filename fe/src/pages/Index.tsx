import {
  Button,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Table,
  Tag,
  Alert,
  notification,
  type TableColumnType,
  Divider,
} from "antd";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
  type Employee,
} from "../services/employees";
import Update from "./Update";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { usePaginatedQuery } from "../hooks/usePaginatedQuery";
import ErrorBoundary from "../components/ErrorBoundary";
import Create from "./Create";
import Title from "antd/es/typography/Title";
import { DeleteOutlined } from "@ant-design/icons";

const Index = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const employeeQuery = usePaginatedQuery(["employees"], fetchEmployees, {
    errorMessage: "Failed to load employees",
    refetchOnWindowFocus: false,
    initialPage: currentPage,
    initialPageSize: pageSize,
  });

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      notification.success({
        message: "Success",
        description: "Employee created successfully",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Failed to create employee",
        description: error.message || "An unexpected error occurred",
      });
    },
  });

  const employeeMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      notification.success({
        message: "Success",
        description: "Employee updated successfully",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Failed to update employee",
        description: error.message || "An unexpected error occurred",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      if (employeeQuery.data?.data.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }

      notification.success({
        message: "Success",
        description: "Employee deleted successfully",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Failed to delete employee",
        description: error.message || "An unexpected error occurred",
      });
    },
  });

  const columnsTable: TableColumnType<Employee>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName: string) => (
        <b
          style={{
            textTransform: "capitalize",
          }}
        >
          {fullName}
        </b>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: string) => {
        let color = "default";
        if (gender === "MALE") {
          color = "blue";
        } else if (gender === "FEMALE") {
          color = "pink";
        }
        return <Tag color={color}>{gender}</Tag>;
      },
    },
    {
      title: "Active Status",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) =>
        active ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Update
            employee={record}
            onUpdate={(updatedEmployee) => {
              employeeMutation.mutate({
                ...updatedEmployee,
                id: record.id,
              });
            }}
          />
          <Popconfirm
            title="Delete employee"
            description="Are you sure you want to delete this employee?"
            onConfirm={() => {
              deleteMutation.mutate(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button danger loading={deleteMutation.isPending}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // Handle pagination
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    employeeQuery.refetch();
  };

  return (
    <ErrorBoundary>
      <Row>
        <Col span={24}>
          <Title level={2}>Employee List</Title>
        </Col>
      </Row>

      <Row>
        <Create onCreate={(employee) => createMutation.mutate(employee)} />
      </Row>
      {employeeQuery.isError && (
        <Alert
          message="Error"
          description={`Failed to load employees: ${employeeQuery.error?.message}`}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Divider />
      <Row>
        <Col span={24}>
          <Table<Employee>
            loading={employeeQuery.isLoading || employeeQuery.isFetching}
            columns={columnsTable}
            dataSource={employeeQuery.data?.data || []}
            pagination={false}
            rowKey="id"
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Pagination
            style={{
              marginTop: 16,
              textAlign: "right",
            }}
            current={currentPage}
            pageSize={pageSize}
            onChange={handlePageChange}
            total={employeeQuery.data?.data.length || 0}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
          />
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

export default Index;
