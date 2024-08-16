function red(...message) {
  // console log to red
  console.log(`\x1b[31m${message.join(" ")}\x1b[0m`);
}

function green(...message) {
  // console log to green
  console.log(`\x1b[32m${message.join(" ")}\x1b[0m`);
}

function blue(...message) {
  // console log to blue
  console.log(`\x1b[34m${message.join(" ")}\x1b[0m`);
}

export default { red, green, blue };
