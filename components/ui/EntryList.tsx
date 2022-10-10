import { List, Paper } from '@mui/material'
import { DragEvent, FC, useContext, useMemo } from 'react'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  )

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text')
    const entry = entries.find((e) => e._id === id)!
    if (!entry) return
    entry.status = status
    updateEntry(entry)
    endDragging()
  }

  return (
    <div
      onDrop={handleDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 230px)',
          overflowY: 'scroll',
          backgroundColor: 'transparent',
          '&::-webkit-scrollbar': { display: 'none' },
          padding: '1px 10px',
        }}
      >
        {/* cambiara el valor de la opacidad si estoy haciendo drag  o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} />
          })}
        </List>
      </Paper>
    </div>
  )
}
