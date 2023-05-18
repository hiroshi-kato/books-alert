import { Book } from './model/Book.ts';

const DATABASE_ID = Deno.env.get('DATABASE_ID');
const NOTION_TOKEN = Deno.env.get('NOTION_TOKEN');

export const getNotionData = async () => {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + NOTION_TOKEN,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        filter: {
          property: 'status',
          status: {
            does_not_equal: 'Done',
          },
        },
      }),
    }
  );
  const json = await res.json();
  console.log(json);

  const books: Book[] = await json.results.map((result: any) => {
    return {
      title: result.properties.Name.title[0].plain_text,
      url: result.url,
      status: result.properties.status.status.name,
    };
  });
  const inboxList = books.filter((book) => {
    return book.status.includes('Inbox');
  });

  const readingList = books.filter((book) => {
    return book.status.includes('Reading');
  });

  return { inboxList, readingList };
};
