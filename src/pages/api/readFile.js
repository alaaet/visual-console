import fs from 'fs';
export default function readFile(req, res) {
  try {
    const filePath = req.query.filePath;
    console.log("from api: ",filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json({ fileContent: content });
  } catch (error) {
    console.log("error from api: ",error);
    res.status(500).json({ message: 'Failed to read file' });
  }
}
