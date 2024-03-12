import "./App.css";
import { SimpleCell, Spinner } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import useFetch from "./hooks/use-fetch";
import { Group } from "./api/groups/groups.types";
// import api from "./api";

function App() {
  const [data, isLoading] = useFetch<Group>("http://localhost:8000/groups");

  // const handleClick = () => {
  //   api.getGroups().then((groups) => console.log(groups));
  // };

  return (
    <>
      {isLoading && <Spinner size="large" />}
      {data?.data.map((group) => (
        <SimpleCell key={group.id} expandable="auto">
          {group.name}
        </SimpleCell>
      ))}
    </>
  );
}

export default App;
