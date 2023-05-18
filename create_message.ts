import { Book } from "./model/Book.ts";

export const createMessage = (inboxList: Book[], readingList: Book[]) => {
  return `
積ん読が ${inboxList.length} 冊あります。\n
${
    inboxList.map((item) => {
      return `・<${item.url} | ${item.title}>\n`;
    })
  }
読書中の本が ${readingList.length} 冊あります。\n
${
    readingList.map((item) => {
      return `・<${item.url} | ${item.title}>\n`;
    })
  }
  `;
};
