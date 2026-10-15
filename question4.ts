import fs from 'node:fs/promises';
import path from 'node:path'

async function readAndParseJSON<T = unknown>(filePath: string): Promise<T>{
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException;

    if (error.code === "ENOENT") {
      throw new Error(`File not found: ${filePath}`);
    }

    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in file: ${filePath}`);
    }

    throw error;
  }
  
}

async function test() {
  const validPath = path.join(import.meta.dirname, "goodTest.json");
  const invalidJsonPath = path.join(import.meta.dirname, "badTest.json");
  const missingPath = path.join(import.meta.dirname, 'noExist.json');

  await fs.writeFile(validPath, '{"appName": "My Node App", "version": 1}');
  await fs.writeFile(invalidJsonPath, '{"appName": "Broken", version: }');

  try {
    const config = await readAndParseJSON(validPath)
    console.log("Parsed Data:", config);
  } catch (err) {
    console.error(err.message)
  }

  try {
    await readAndParseJSON(invalidJsonPath)
  } catch (err) {
    console.error(err.message)
  }

  try {
      await readAndParseJSON(missingPath);
    } catch (err: any) {
      console.error(err.message);
    }
}

test();