import './assets/styles/App.css';
import { RecipeProvider } from './contexts/RecipeContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { UserProvider } from './contexts/UserContext';
import RouteConfig from './routes/RouteConfig';

function App() {
  return (
    <>

    <UserProvider>
      <RecipeProvider>
        <ReviewProvider>
          <RouteConfig />
        </ReviewProvider>
      </RecipeProvider>
    </UserProvider>
    </>
  );
}

export default App;
