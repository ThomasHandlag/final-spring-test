import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import type { Employee, Gender } from "../services/employees";
import { EditOutlined } from "@ant-design/icons";

export type UpdateProps = {
  employee: Employee;
  onUpdate: (employee: Employee) => void;
};

const Update = ({ employee, onUpdate }: UpdateProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleUpdate = async (values: Employee) => {
    setLoading(true);
    try {
      await onUpdate(values);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to update employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        <EditOutlined />
      </Button>
      <Modal
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",
        }}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title="Update employee"
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        loading={loading}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            autoComplete="off"
            autoCorrect="off"
            name="update-employee-form"
            clearOnDestroy
            onFinish={handleUpdate}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          label="Full name"
          name="fullName"
          initialValue={employee.fullName}
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
          ]}
          validateDebounce={500}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          initialValue={employee.password}
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
          initialValue={employee.phoneNumber}
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
        <Form.Item
          label="Date of birth"
          name="dateOfBirth"
          initialValue={employee.dateOfBirth}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Gender"
          initialValue={employee.gender}
          name="gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Select<Gender>>
            <Select.Option value="MALE">Male</Select.Option>
            <Select.Option value="FEMALE">Female</Select.Option>
            <Select.Option value="OTHER">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<Employee> name="active" valuePropName="checked" label={null}>
          <Checkbox>Active</Checkbox>
        </Form.Item>
      </Modal>
    </>
  );
};

export default Update;
