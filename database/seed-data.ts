interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Aprender React',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'In-Progress Aprender Next',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Finished Aprender Nest',
      status: 'finished',
      createdAt: Date.now() - 1000,
    },
  ],
}
