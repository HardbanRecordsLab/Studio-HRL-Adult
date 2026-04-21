const fs = require('fs');
const path = require('path');

const replacements = {
  'Ĺ‚': 'ł',
  'Ä…': 'ą',
  'Ĺ›': 'ś',
  'Ä™': 'ę',
  'ĹĽ': 'ż',
  'Ăł': 'ó',
  'Ĺş': 'ź',
  'Ä‡': 'ć',
  'Ĺ„': 'ń',
  'Ĺ\x81': 'Ł',
  'Ä„': 'Ą',
  'Ĺš': 'Ś',
  'Ä': 'Ę',
  'Ĺ»': 'Ż',
  'Ă“': 'Ó',
  'Ĺą': 'Ź',
  'Ä†': 'Ć',
  'Ĺƒ': 'Ń',
  'â€“': '-',
  'â€ž': '"',
  'â€ť': '"',
  'âś¨': '✨',
  'đź”’': '🔒'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [bad, good] of Object.entries(replacements)) {
    if (content.includes(bad)) {
      content = content.split(bad).join(good);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

processDir(path.join(__dirname, '..', 'src'));
