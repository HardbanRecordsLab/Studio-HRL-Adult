import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({
    applications: [],
    partners: [
      { id: '1', name: 'Anna Rose', handle: '@annarose_x', status: 'Active', revenueTotal: 12450, sync: '2m ago' },
      { id: '2', name: 'Marcus Kovac', handle: '@marcus_hrl', status: 'Contract Pending', revenueTotal: 8120, sync: '1h ago' },
      { id: '3', name: 'Elena Silver', handle: '@elena_silver', status: 'Active', revenueTotal: 15900, sync: '30m ago' },
    ],
    transactions: [
      { id: '#TR-9821', user: 'Anna Rose', amt: 1450, type: 'Subscription Payout', date: 'Apr 02, 14:20', isPositive: true },
      { id: '#TR-9820', user: 'Fansly', amt: 4200, type: 'API Settlement', date: 'Apr 02, 11:15', isPositive: true },
      { id: '#TR-9819', user: 'AWS Cloud', amt: -210, type: 'Server Infrastructure', date: 'Apr 01, 23:50', isPositive: false },
    ],
    content: []
  }, null, 2));
}

export const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

export const writeDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};
