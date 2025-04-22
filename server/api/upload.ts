// server/api/upload.ts
import { defineEventHandler } from 'h3'
import { readMultipartFormData } from 'h3'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = formData.find((item) => item.name === 'image')
  if (!file || !['image/jpeg', 'image/png'].includes(file.type || '')) {
    throw createError({ statusCode: 400, message: 'Invalid file type' })
  }

  const filename = `${Date.now()}-${file.filename}`
  const filePath = `./uploads/${filename}`

  await pump(file.data, fs.createWriteStream(filePath))

  return { url: `/uploads/${filename}` }
})
