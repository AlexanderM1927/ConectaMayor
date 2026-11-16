import { openDB } from 'idb'

let connection

export function getDatabase() {
  if (!connection) {
    connection = openDB('conectamayor', 1, {
      upgrade(db) {
        db.createObjectStore('preferences', { keyPath: 'id' })
        db.createObjectStore('progress', { keyPath: 'id' })
        db.createObjectStore('attempts', { keyPath: 'id' })
        db.createObjectStore('metadata', { keyPath: 'id' })
      },
      blocking() {
        connection?.then((db) => db.close())
        connection = null
      },
      terminated() {
        connection = null
      }
    }).catch((error) => {
      connection = null
      throw error
    })
  }
  return connection
}

export async function readLocalData() {
  const db = await getDatabase()
  const tx = db.transaction(['preferences', 'progress', 'attempts'])
  const [preferences, progress, attempts] = await Promise.all([
    tx.objectStore('preferences').get('interface'),
    tx.objectStore('progress').getAll(),
    tx.objectStore('attempts').getAll()
  ])
  await tx.done
  return { preferences, progress, attempts }
}

export async function writeLocalData(change) {
  const db = await getDatabase()
  const tx = db.transaction(['preferences', 'progress', 'attempts', 'metadata'], 'readwrite')
  const operations = []
  if (change.preferences) operations.push(tx.objectStore('preferences').put(change.preferences))
  if (change.progress) operations.push(tx.objectStore('progress').put(change.progress))
  if (change.attempt) operations.push(tx.objectStore('attempts').put(change.attempt))
  operations.push(tx.objectStore('metadata').put({ id: 'content', version: 1 }))
  await Promise.all([...operations, tx.done])
}

export async function clearLocalData() {
  const db = await getDatabase()
  const stores = ['preferences', 'progress', 'attempts', 'metadata']
  const tx = db.transaction(stores, 'readwrite')
  await Promise.all([...stores.map((name) => tx.objectStore(name).clear()), tx.done])
}
