import fs from 'fs';
import { copyFile, mkdir, readdir } from 'fs/promises';
import path from 'path';

const main = async () => {
  // copy the contents from src/assets to dist/assets
  const srcDir = path.join(process.cwd(), 'src', 'assets');
  const destDir = path.join(process.cwd(), 'dist', 'assets');
  if (!fs.existsSync(destDir)) {
    await mkdir(destDir, { recursive: true });
  }
  // read all assets
  const assets = await readdir(srcDir);
  // copy each asset
  for (const asset of assets) {
    const src = path.join(srcDir, asset);
    const dest = path.join(destDir, asset);
    await copyFile(src, dest);
  }
};

main();
