// Arrow characters to use: ▼ ▶

export const statuses = ["Todo", "In progress", "Done"];
const subtasks = [11, 12, 13, 14, 15, 16, 17, 18];
const sleep = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// Available APIs
export const getIssue = async () =>
  Promise.resolve({
    id: 1,
    title: "sit amet erat nulla tempus vivamus",
    description:
      "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    assignee: "Nelli Bielfeld",
    status: "In progress",
    subtasks: subtasks,
  });

const updateStatus = async (id, status) => {
  await sleep(1000);

  return;
};

export const getSubtasks = async () => {
  await sleep(500);

  return subtasks.map((id) => ({
    id,
    title: `Subtask ${id}`,
    description: `Description for subtask ${id}`,
    assignee: `User ${id}`,
    status: statuses[id % 3],
  }));
};
