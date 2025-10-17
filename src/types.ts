export interface Task {
  id: number;
  name: string;
  description: string;
  command: string;
  output?: string;
}
