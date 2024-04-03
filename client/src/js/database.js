import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // Export a function to POST to the database.
  export const putDb = async (content)  => {
    console.log('Saved page to the database');
    // Create a connection to the database 
    const contentDb = await openDB('jate', 1);
    const tx = contentDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add({ content: content});

    const result = await request;
    console.log('Data saved to the database', result);
  };
 
// Export a function to GET to the database.
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the database
  const contentDb = await openDB('jate', 1);
  const tx = contentDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Filter the most recent database entry
  const lastItem = await request[request.length - 1];
  
  const data = await lastItem;
  console.log('result value', data);
  return data;
};
  


  initdb();