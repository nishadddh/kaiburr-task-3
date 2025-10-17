import React, { useEffect, useState } from "react";
import { Table, Button, Input, message } from "antd";
import { Task } from "../types";
import { getTasks, deleteTask } from "../api";
import CommandRunner from "./CommandRunner";

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
  try {
    const res = await getTasks();
    console.log("API response:", res.data); // check the browser console
    setTasks(res.data);
  } catch (err) {
    console.error(err);
    message.error("Failed to fetch tasks");
  }
};


  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      message.success("Task deleted");
      setTasks(tasks.filter((t) => t.id !== id)); // remove deleted task without refetch
    } catch (err) {
      message.error("Failed to delete task");
    }
  };

  const updateTaskOutput = (id: number, output: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, output } : t))
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table dataSource={filteredTasks} rowKey="id">
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Description" dataIndex="description" />
        <Table.Column
          title="Command Output"
          dataIndex="output"
          render={(text) => <pre>{text}</pre>}
        />
        <Table.Column
          title="Actions"
          render={(_, record: Task) => (
            <>
              <CommandRunner
                taskId={record.id}
                onOutputUpdate={(output) => updateTaskOutput(record.id, output)}
              />
              <Button
                danger
                style={{ marginLeft: 8 }}
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </>
          )}
        />
      </Table>
    </div>
  );
};

export default TaskTable;
