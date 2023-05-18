import { createMessage } from "./create_message.ts";
import { getNotionData } from "./get_notion_data.ts";
import { sendToSlack } from "./send_to_slack.ts";

if (import.meta.main) {
  const send = async () => {
    const { inboxList, readingList } = await getNotionData();
    const message = createMessage(inboxList, readingList);
    await sendToSlack(message);
  };
  send();
}
