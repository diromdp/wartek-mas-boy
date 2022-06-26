import { wrapper } from '../store/store';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import '../styles/main.scss';

function MyApp({ Component, pageProps }) {

   const store = useStore((state) => state);
   return process.browser ? (
      <>
         <PersistGate persistor={store.__persistor} loading={false}>
            <ChakraProvider>
               <Component {...pageProps} />
            </ChakraProvider>
         </PersistGate>
      </>
   ) : (
      <>
         <PersistGate persistor={store}>
            <ChakraProvider>
               <Component {...pageProps} />
            </ChakraProvider>
         </PersistGate>

      </>
   );
}

export default wrapper.withRedux(MyApp);
