import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { GetServerSideProps } from 'next'
import { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { Layout } from '../../components/layouts'

import DeleteIcon from '@mui/icons-material/Delete'
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined'

import { useRouter } from 'next/router'
import { EntriesContext } from '../../context/entries'
import { dbEntries } from '../../database'
import { Entry, EntryStatus } from '../../interfaces'
import { dateFunctions } from '../../utils'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({ entry }: Props) => {
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [isTouched, setIsTouched] = useState(false)
  const { updateEntry, deleteEntry } = useContext(EntriesContext)
  const router = useRouter()

  const isNotValidForm = useMemo(
    () => inputValue.length <= 0 && isTouched,
    [inputValue, isTouched]
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const handleSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }

    updateEntry(updatedEntry, true)

    router.push('/')
  }

  const handleDelete = () => {
    deleteEntry(entry)
    router.push('/')
  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid container justifyContent={'center'} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={handleInputChange}
                helperText={isNotValidForm ? 'Ingrese un valor' : ''}
                onBlur={() => setIsTouched(true)}
                error={isNotValidForm}
              />
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item}
                      control={<Radio />}
                      label={capitalize(item)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveAltOutlinedIcon />}
                variant="contained"
                fullWidth
                onClick={handleSave}
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'crimson',
        }}
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        // la propiedad permanent true dice a los bots de google que esta pagina ya no va a existir indefinidamente
        permanent: false,
      },
    }
  }
  return {
    props: {
      entry,
    },
  }
}

export default EntryPage
