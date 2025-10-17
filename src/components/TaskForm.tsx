import React from "react";
import { Form, Input, Button, message } from "antd";
import { createTask } from "../api";

interface TaskFormProps {
  onCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await createTask(values);
      message.success("Task created");
      form.resetFields();
      onCreated();
    } catch (err) {
      message.error("Failed to create task");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Task Name"
        rules={[{ required: true, message: "Please input task name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item
        name="command"
        label="Command"
        rules={[{ required: true, message: "Please input command" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
