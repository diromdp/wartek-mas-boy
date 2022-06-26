
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
   render() {
      return (
         <Html lang='en'>
            <Head>
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" referrerPolicy="no-referrer" />
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}