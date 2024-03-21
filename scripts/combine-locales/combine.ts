/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

type TCombine = (p: { from: string[]; to: string }) => void

type TCopyFiles = (p: { from: string; to: string }) => void

type TGetDirectories = (path: string) => string[]

type TCheckExistingFiles = (p: { path: string; files: string[] }) => void

const getDirectories: TGetDirectories = (path) => {
  try {
    const result = fs.readdirSync(path) as string[]
    return result.filter((file) => fs.statSync(`${path}/${file}`).isDirectory())
  } catch (e) {
    throw new Error(`read directory ${path}`)
  }
}

const isDirectoryExist = (path: string) => fs.existsSync(path)

const createDirectory = (path: string) => {
  try {
    if (isDirectoryExist(path)) return
    fs.ensureDirSync(path)
  } catch (e) {
    throw new Error(`error: createDirectory ${path}`)
  }
}

const removeDirectory = (path: string) => {
  try {
    if (!isDirectoryExist(path)) return
    fs.rmdirSync(path, { recursive: true })
  } catch (e) {
    throw new Error(`error: removeDirectory ${path}`)
  }
}

const checkExistingFiles: TCheckExistingFiles = ({ path, files }) => {
  const existingFiles: string[] = []

  files.forEach((file) => {
    const filePath = `${path}/${file}`
    try {
      if (!fs.existsSync(filePath)) return
      existingFiles.push(filePath)
    } catch (e) {
      throw new Error(`read file checkExistingFiles ${filePath}`)
    }
  })

  if (existingFiles.length) {
    existingFiles.forEach((a) => console.error(a))
    throw new Error('files is exist in combined directory')
  }
}

const getFilesInDir = (path: string) => fs.readdirSync(path)

const copyFiles: TCopyFiles = ({ from, to }) => {
  const files = getFilesInDir(from) as string[]

  files.forEach((file) => {
    try {
      const fromFiles = path.join(from, file)
      const toFiles = path.join(to, file)
      fs.copyFileSync(fromFiles, toFiles)
    } catch (e) {
      throw new Error(`copy file from: ${from}, to: ${to}`)
    }
  })
}

const combine: TCombine = ({ from, to }) => {
  try {
    removeDirectory(to)
    createDirectory(to)

    from.forEach((fromPath) => {
      const langs = getDirectories(fromPath)

      langs.forEach((lang) => {
        createDirectory(`${to}/${lang}`)
        checkExistingFiles({
          path: `${to}/${lang}`,
          files: getFilesInDir(`${fromPath}/${lang}`),
        })
        copyFiles({ from: `${fromPath}/${lang}`, to: `${to}/${lang}` })
      })
    })
    console.warn(`success: copy to ${to}`)
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

module.exports = combine
