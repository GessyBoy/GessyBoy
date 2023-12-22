const { promises: fs } = require('fs');
const readme = require('./readme');

const msInOneDay = 1000 * 60 * 60 * 24;

const today = new Date();

function generateNewREADME() {
  const readmeRow = readme.split('\n');

  function updateIdentifier(identifier, replaceText) {
    const identifierIndex = findIdentifierIndex(readmeRow, identifier);
    if (!readmeRow[identifierIndex]) return;
    readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
      `<#${identifier}>`,
      replaceText
    );
  }

  const identifierToUpdate = {
    day_before_new_years: getDBNWSentence(),
    today_date: getTodayDate(),
    thebot_signing: getThebotSigning(),
    myself: getMySelf(),
    quote_of_the_day: getRandomQuote(),
  };

  Object.entries(identifierToUpdate).forEach(([key, value]) => {
    updateIdentifier(key, value);
  });

  return readmeRow.join('\n');
}

const moodByDay = {
  1: 'hate',
  2: 'wickedness',
  3: 'pleasure',
  4: 'wickedness',
  5: 'cruelty',
  6: 'horror',
  7: 'love',
};

function getThebotSigning() {
  const mood = moodByDay[today.getDay() + 1];
  return `🤖 This README.md is updated with ${mood}, by thebot ❤️`;
}

function getTodayDate() {
  return today.toDateString();
}

function getMySelf() {
  // test if we are in a PAIR DAY
  return today.getDate() % 2 === 0
    ? Math.floor(Math.random() * 2)
      ? 'hungry dragon 🐉'
      : 'brave dog 🐶'
    : 'hungry dragon and brave dog 🐉🐶';
}

function getRandomQuote() {
  const quotes = [
    "Computers do what you tell them, not what you want.",
    "One day, I became famous... but the next day, no one remembered.",
    "I'm not lazy, I'm in energy-saving mode.",
    "If you can't explain something simply, you don't understand it well enough. Or you're dealing with a computer.",
    "Life is too short to safely remove the USB device.",
    "Wi-Fi is like love, invisible, but you know when it's not there.",
    "I don't have a problem with authority, authority has a problem with me.",
    "Life is like a computer; errors may occur, but it depends on how you manage them.",
    "I always believed money couldn't buy happiness until I paid for my Internet subscription.",
    "Some days, I feel like a JPEG file in a Word document."
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function getDBNWSentence() {
  const nextYear = today.getFullYear() + 1;
  const nextYearDate = new Date(String(nextYear));

  const timeUntilNewYear = nextYearDate.getTime() - today.getTime();
  const dayUntilNewYear = Math.round(timeUntilNewYear / msInOneDay);

  return `**${dayUntilNewYear} day before ${nextYear} ⏱**`;
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, 'i'))));

const updateREADMEFile = (text) => fs.writeFile('./README.md', text);

function main() {
  const newREADME = generateNewREADME();
  console.log(newREADME);
  updateREADMEFile(newREADME);
}
main();