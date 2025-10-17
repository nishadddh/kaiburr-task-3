import React, { useState } from "react";
import { Button, message } from "antd";
import { runCommand } from "../api";

interface CommandRunnerProps {
  taskId: number;
  onOutputUpdate: (output: string) => void;
}

const CommandRunner: React.FC<CommandRunnerProps> = ({ taskId, onOutputUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    try {
      setLoading(true);
      const res = await runCommand(taskId);
      message.success("Command executed");
      if (res.data.output) {
        onOutputUpdate(res.data.output); // update table output live
      }
    } catch (err) {
      message.error("Failed to run command");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="primary" loading={loading} onClick={handleRun}>
      Run
    </Button>
  );
};

export default CommandRunner;
