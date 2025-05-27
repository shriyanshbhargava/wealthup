import React from "react";
import { UserApi } from "@/api/services/user/UserApi";
import Storage from "@/utils/storage";
import { Task, TransactionTile } from "./components/TransactionTile";

export const TransactionsTab = () => {
  const [completedTasks, setCompletedTasks] = React.useState<Array<Task>>([]);

  const token = Storage.getToken();
  const userApiClient = new UserApi(token!.access_token);

  const getInitialTasks = async () => {
    const res: Response = await userApiClient.getCompletedTasks();

    if (res.status === 200) {
      const data = await res.json();

      const revercedTasks = data.reverse() as Array<Task>;

      const tasksModified = revercedTasks.map((task, index) => {
        const tasks = revercedTasks.slice(0, index + 1);
        return {
          ...task,
          total_coins: tasks.reduce((prev, curr) => prev + curr.coins_earned, 0),
        };
      })

      const tasks = tasksModified.reverse();

      setCompletedTasks(tasks);
    }
  };

  React.useEffect(() => {
    getInitialTasks();
  }, []);


  return (
    <div className="flex justify-center px-6 pt-8 pb-16">
      <div className="w-full md:w-2/3 xl:w-1/2 flex flex-col bg-white p-6 rounded-xl">
        {completedTasks.map((task: Task, index: number) => (
          <TransactionTile
            key={index}
            title={task.title}
            amount={task.coins_earned}
            balance={task.total_coins}
            icon={task.icon}
            completedOn={task.completed_on}
            isLast={index === completedTasks.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
