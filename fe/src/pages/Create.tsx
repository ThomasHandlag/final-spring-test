import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import type { Employee, Gender } from "../services/employees";

export type CreateProps = {
  onCreate: (employee: Employee) => void;
};

declare module "../services/employees" {
  interface Employee {
    fullName: string;
    email: string;
    dateOfBirth: Date;
    phoneNumber: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    active: boolean;
    password: string;
  }
}

const Create = ({ onCreate }: CreateProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleCreate = async (values: Employee) => {
    setLoading(true);
    try {
      await onCreate(values);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to create employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Create Employee</Button>
      <Modal
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",
        }}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title="Create a new employee"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        loading={loading}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="create-employee-form"
            clearOnDestroy
            onFinish={handleCreate}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          label="Full name"
          name="fullName"
          rules={[
            { required: true, message: "Please enter your full name" },
            {
              min: 4,
              message: "Full name must be at least 4 characters",
            },
            {
              max: 160,
              message: "Full name must be at most 160 characters",
            },
            {
                pattern: /^[a-zA-Z0-9 ]*$/,
                message: "Full name must not contain special characters",
            }
          ]}
          validateDebounce={500}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          validateDebounce={500}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            },
          ]}
          validateDebounce={500}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^\d{10}$/,
              message: "Phone number must be 10 digits",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Date of birth" name="dateOfBirth">
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Select<Gender>>
            <Select.Option value="MALE">Male</Select.Option>
            <Select.Option value="FEMALE">Female</Select.Option>
            <Select.Option value="OTHER">Other</Select.Option>
          </Select>
        </Form.Item>
      </Modal>
    </>
  );
};

export default Create;
