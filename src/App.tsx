import "./App.css";
import getGroups from "./api/groupsApi";
import { SimpleCell } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function App() {

  return (
    <>
      <SimpleCell onClick={() => getGroups()} expandable='auto'>
        Аккаунт
      </SimpleCell>
    </>
  );
}

export default App;
