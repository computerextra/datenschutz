import { existsSync } from "fs";
import { appendFile, readFile, readFileSync, unlink, writeFile } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function ReadFile(path) {
  return readFileSync(path, "utf8");
}

function main() {
  // Check if .env file exists
  if (!existsSync(".env")) {
    console.log("No .env file found. Please create one.");
    process.exit(0);
  }
  const data = ReadFile(".env");
  if (data.length < 1) {
    throw new Error("No data found in .env file.");
  }

  const path = join(__dirname, "public", "api");
  const filename = "config.php";
  const configFile = join(path, filename);

  if (existsSync(configFile)) {
    unlink(configFile, (err) => {
      if (err) throw err;
    });
    console.log("Old config file removed.");
  }

  let text = "<?php\n\n// Autogenerated File: DO NOT EDIT!\n\n\n";

  data.split("\n").forEach(async (line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      const line = `define(\"${key}\", ${value});\n`;
      text += line;
    }
  });

  text += 'if (!MYSQL_SERVER) { die("MYSQL_SERVER is not set"); }\n';
  text += 'if (!MYSQL_PORT) { die("MYSQL_PORT is not set"); }\n';
  text += 'if (!MYSQL_USER) { die("MYSQL_USER is not set"); }\n';
  text += 'if (!MYSQL_PASS) { die("MYSQL_PASS is not set"); }\n';
  text += 'if (!MYSQL_DB) { die("MYSQL_DB is not set"); }\n';
  text += 'if (!SMTP_SERVER) { die("SMTP_SERVER is not set"); }\n';
  text += 'if (!SMTP_PORT) { die("SMTP_PORT is not set"); }\n';
  text += 'if (!SMTP_USER) { die("SMTP_USER is not set"); }\n';
  text += 'if (!SMTP_USER) { die("SMTP_USER is not set"); }\n';
  text += 'if (!SMTP_PASS) { die("SMTP_PASS is not set"); }\n';
  text += 'if (!SMTP_FROM) { die("SMTP_FROM is not set"); }\n';
  text +=
    "$con = new mysqli(MYSQL_SERVER, MYSQL_USER, MYSQL_PASS, MYSQL_DB);\n";

  writeFile(configFile, text, (err) => {
    if (err) throw err;
  });

  console.log("Config file created successfully.");
}

main();
