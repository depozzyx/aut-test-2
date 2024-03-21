/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const fs = require('fs')
const path = require('path')

const replaceInFile = (filePath, find, replace) => {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const newContent = fileContent.replace(find, replace)
  fs.writeFileSync(filePath, newContent, 'utf8')
}

const DOMAIN_URL = process.env.DOMAIN_URL || ''
const COMPONENTS_DIR = path.join(__dirname, '../src/components')

// Function to recursively process files in a directory
const processDirectory = (directory) => {
  if (!DOMAIN_URL) return

  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDirectory(fullPath) // Recurse into directory
    } else if (
      fullPath.endsWith('.js') ||
      fullPath.endsWith('.jsx') ||
      fullPath.endsWith('.ts') ||
      fullPath.endsWith('.tsx')
    ) {
      replaceInFile(fullPath, /{{DOMAIN_URL}}/g, DOMAIN_URL) // Process file
    }
  })
}

// Directories to include in preprocessing
const directoriesToProcess = [COMPONENTS_DIR]

directoriesToProcess.forEach(processDirectory)
