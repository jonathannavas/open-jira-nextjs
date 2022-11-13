import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data = { message: string } | IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ message: 'Invalid id' })

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)

    case 'GET':
      return getEntryById(req, res)

    case 'DELETE':
      return deleteEntry(req, res)

    default:
      return res.status(400).json({ message: 'Method dont exist' })
  }
}

const getEntryById = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query

  await db.connect()
  const entry = await Entry.findById(id)
  await db.disconnect()

  if (!entry) {
    return res
      .status(400)
      .json({ message: 'Entry not found with the id: ' + id })
  }

  res.status(200).json(entry)
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  await db.connect()
  const entry = await Entry.findByIdAndRemove(id)
  await db.disconnect()

  if (!entry) {
    return res
      .status(400)
      .json({ message: 'Entry not found with the id: ' + id })
  }
  res.status(200).json(entry)
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  await db.connect()

  const entryToUpdate = await Entry.findById(id)
  if (!entryToUpdate) {
    await db.disconnect()
    return res
      .status(400)
      .json({ message: 'Entry not found with the id: ' + id })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    )

    await db.disconnect()
    res.status(200).json(updatedEntry!)
  } catch (error: any) {
    await db.disconnect()
    res.status(400).json({ message: error.errors.status.message })
  }
}
