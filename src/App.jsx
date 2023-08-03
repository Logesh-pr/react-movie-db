import "./App.css";

//react-router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Home from "./pages/home";
import ShowNavBar from "./react-router/showNavBar";
import ProtectedRoute from "./React-router/protectedRoute";
import Navbar from "./components/navbar";
import MovieDetails from "./pages/movieDetails";
import Result_page from "./pages/resultPage";
import ScrollToTop from "./react-router/scrollTop";
import Genres_page from "./pages/genresPage";
import SignUp from "./pages/signUp";
import LogIn from "./pages/logIn";
import FavoritePage from "./pages/favoritePage";

function App() {
  return (
    <>
      <div className="bg-secondary w-full h-screen text-white overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-900 scroll-smooth box-border">
        <BrowserRouter>
          <ScrollToTop />
          <ShowNavBar>
            <Navbar />
          </ShowNavBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie_details" element={<MovieDetails />} />
            <Route path="/result" element={<Result_page />} />
            <Route path="/genres" element={<Genres_page />} />
            <Route path="/accounts/log-in" element={<LogIn />} />
            <Route path="/accounts/sign-up" element={<SignUp />} />
            <Route
              path="/favorite"
              element={
                <ProtectedRoute>
                  <FavoritePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
