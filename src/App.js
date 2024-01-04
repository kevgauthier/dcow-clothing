import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route} from 'react-router-dom';
import Spinner from "./component/spinner/spinner.component";
import { checkUserSession } from "./store/user/user.action";
import { GlobalStyles } from "./global.styles";

const Home = lazy(() => import('./routes/home/home.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Authentification = lazy(() => import('./routes/auth/auth.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));

const App = () => {

  const dispatch =  useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);


  return (
    <Suspense fallback={<Spinner />}>
    <GlobalStyles />
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentification />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
