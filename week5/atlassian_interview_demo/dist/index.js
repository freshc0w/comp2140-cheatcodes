"use strict";
// Arrow characters to use: ▼ ▶
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubtasks = exports.getIssue = exports.statuses = void 0;
exports.statuses = ["Todo", "In progress", "Done"];
const subtasks = [11, 12, 13, 14, 15, 16, 17, 18];
const sleep = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};
// Available APIs
const getIssue = () => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.resolve({
        id: 1,
        title: "sit amet erat nulla tempus vivamus",
        description: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
        assignee: "Nelli Bielfeld",
        status: "In progress",
        subtasks: subtasks,
    });
});
exports.getIssue = getIssue;
const updateStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield sleep(1000);
    return;
});
const getSubtasks = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sleep(500);
    return subtasks.map((id) => ({
        id,
        title: `Subtask ${id}`,
        description: `Description for subtask ${id}`,
        assignee: `User ${id}`,
        status: exports.statuses[id % 3],
    }));
});
exports.getSubtasks = getSubtasks;
const FetchUtils = (() => {
    const oneIssue = () => __awaiter(void 0, void 0, void 0, function* () {
        const issues = yield (0, exports.getIssue)();
        return issues;
    });
    return { oneIssue };
})();
const issueTitle = document.getElementById("issue-title");
const statusSelect = document.getElementById("status-select");
const showSubTasksLink = document.querySelector(".show-subtasks");
const createOptionElement = (value, textContent) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = textContent;
    return option;
};
const populateOptions = (selectElement, statuses) => {
    statuses.forEach((status) => {
        const option = createOptionElement(status, status);
        selectElement.appendChild(option);
    });
};
const createSubtaskElement = (subtask) => {
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
const renderSubtasks = (parentElement, subtasks) => {
    subtasks.forEach((subtask) => {
        const subtaskElement = createSubtaskElement(subtask);
        parentElement.appendChild(subtaskElement);
    });
};
const handleSubtaskClick = (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    e.preventDefault();
    if (opened) {
        opened = !opened;
        showSubTasksLink.textContent = "▶ Show subtasks";
        (_a = document.querySelector(".subtask-container")) === null || _a === void 0 ? void 0 : _a.remove();
        return;
    }
    showSubTasksLink.textContent = "▼ Hide subtasks";
    const subtaskContainer = document.createElement("div");
    (_b = document.querySelector("#app")) === null || _b === void 0 ? void 0 : _b.appendChild(subtaskContainer);
    subtaskContainer.textContent = "Loading...";
    const subtasks = yield (0, exports.getSubtasks)();
    subtaskContainer.textContent = "";
    subtaskContainer.classList.add("subtask-container");
    renderSubtasks(subtaskContainer, subtasks);
    opened = !opened;
});
let opened = false;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const issues = yield FetchUtils.oneIssue();
    populateOptions(statusSelect, exports.statuses);
    issueTitle.textContent = issues.title;
    statusSelect.value = issues.status;
    showSubTasksLink.addEventListener("click", handleSubtaskClick);
});
main();
