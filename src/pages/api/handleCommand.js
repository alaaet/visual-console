import { execSync } from 'child_process';

export default function handler(req, res) {
  try {
    const output = execSync(req.query.command, { encoding: 'utf-8' });
    res.status(200).json(output);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch container data' });
  }
}