// Arrow characters to use: ▼ ▶

export const statuses = ["Todo", "In progress", "Done"];
const subtasks = [11, 12, 13, 14, 15, 16, 17, 18];
const sleep = (timeout: number) => {
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

const updateStatus = async (id: number, status: string) => {
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

const FetchUtils = (() => {
  const oneIssue = async () => {
    const issues = await getIssue();
    return issues;
  };

  return { oneIssue };
})();

const issueTitle = document.getElementById("issue-title") as HTMLElement;
const statusSelect = document.getElementById(
  "status-select",
) as HTMLSelectElement;
const showSubTasksLink = document.querySelector(
  ".show-subtasks",
) as HTMLAnchorElement;

const createOptionElement = (value: string, textContent: string) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = textContent;
  return option;
};

const populateOptions = (
  selectElement: HTMLSelectElement,
  statuses: string[],
) => {
  statuses.forEach((status) => {
    const option = createOptionElement(status, status);
    selectElement.appendChild(option);
  });
};

const createSubtaskElement = (subtask: any) => {
  const subtaskElement = document.createElement("div");
  subtaskElement.classList.add("subtask");

  const title = document.createElement("h3");
  title.textContent = subtask.title;

  const description = document.createElement("p");
  description.textContent = subtask.description;

  const assignee = document.createElement("p");
  assignee.textContent = subtask.assignee;

  const status = document.createElement("p");
  status.textContent = subtask.status;

  subtaskElement.appendChild(title);
  subtaskElement.appendChild(description);
  subtaskElement.appendChild(assignee);
  subtaskElement.appendChild(status);

  return subtaskElement;
};

const renderSubtasks = (parentElement: HTMLElement, subtasks: any[]) => {
  subtasks.forEach((subtask) => {
    const subtaskElement = createSubtaskElement(subtask);
    parentElement.appendChild(subtaskElement);
  });
};

let opened = false;

const main = async () => {
  const issues = await FetchUtils.oneIssue();
  populateOptions(statusSelect, statuses);

  issueTitle.textContent = issues.title;
  statusSelect.value = issues.status;

  showSubTasksLink.addEventListener("click", async (e) => {
    console.log(opened);
    e.preventDefault();
    if (opened) {
      opened = !opened;
      showSubTasksLink.textContent = "▶ Show subtasks";
      console.log(document.querySelector(".subtask-container"));
      document.querySelector(".subtask-container")?.remove();
      return;
    }

    showSubTasksLink.textContent = "▼ Hide subtasks";
    const subtaskContainer = document.createElement("div");
    document.querySelector("#app")?.appendChild(subtaskContainer);
    subtaskContainer.textContent = 'Loading...'
    const subtasks = await getSubtasks();
    subtaskContainer.textContent = '';
    subtaskContainer.classList.add("subtask-container");
    renderSubtasks(subtaskContainer, subtasks);
    opened = !opened;
  });
};
main();
