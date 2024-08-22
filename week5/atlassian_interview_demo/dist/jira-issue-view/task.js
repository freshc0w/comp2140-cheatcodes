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
