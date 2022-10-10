import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import { Box, Button, TextField } from '@mui/material'
import { ChangeEvent, useContext, useState } from 'react'
import { EntriesContext } from '../../context/entries/EntriesContext'
import { UIContext } from '../../context/ui/UIContext'
export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const [inputValue, setInputValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value)
  }

  const handleSave = () => {
    if (inputValue.length === 0) return
    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setIsTouched(false)
    setInputValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva tarea"
            autoFocus
            multiline
            label="Nueva Tarea"
            helperText={
              inputValue.length <= 0 && isTouched && 'Ingrese un valor'
            }
            error={inputValue.length <= 0 && isTouched}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={() => setIsTouched(true)}
          />
          <Box display="flex" justifyContent={'space-between'}>
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                setIsAddingEntry(false)
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  )
}
