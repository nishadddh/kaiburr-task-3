import React from "react";
import { Layout, Typography, Divider } from "antd";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title style={{ color: "white" }}>Task Manager</Title>
      </Header>
      <Content style={{ padding: 24 }}>
        <TaskForm onCreated={() => window.location.reload()} />
        <Divider />
        <TaskTable />
      </Content>
    </Layout>
  );
};

export default App;
