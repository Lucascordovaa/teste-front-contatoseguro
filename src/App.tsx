import { useEffect } from 'react';
import { createAuthor, getAuthors } from './storage/authorStorage';
import {generateId} from "./utils/id.ts";

function App() {
  useEffect(() => {
    const test = async () => {

      const authors = await getAuthors();

      if (authors.length === 0) {
        await createAuthor({
          id: generateId(),
          name: 'John Doe',
          email: 'john@email.com',
        });
      }
      console.log('AUTHORS:', authors);
    };

    test();
  }, []);

  return <div>Check console</div>;
}

export default App;