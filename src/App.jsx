import CalenderBody from "./CalenderBody";
import { CalenderProvider } from "./CalenderProvider";
import Header from "./Header";

function App() {
  return (
    <CalenderProvider>
      <Header />
      <CalenderBody />
    </CalenderProvider>
  );
}

export default App;
