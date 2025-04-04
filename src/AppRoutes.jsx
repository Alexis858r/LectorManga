import { Route, Routes } from "react-router-dom";
import PageHome from "./mipagina/home/PageHome";
import PageAbout from "./mipagina/about/PageAbout";
import PageContact from "./mipagina/contact/PageContact";
import PageDash from "./mipagina/dash/PageDash";
import DetallesDash from "./mipagina/dash/DetallesDash";
import NotFound from "./mipagina/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/about" element={<PageAbout />} />
      <Route path="/contact" element={<PageContact />} />
      <Route path="/dash">
        <Route index element={<PageDash />} />
        <Route path=":id" element={<DetallesDash />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}