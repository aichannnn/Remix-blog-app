import { cssBundleHref } from "@remix-run/css-bundle";
// import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStylesUrl from './styles/global.css'

export const links = () =>[{rel: 'stylesheet', href:
globalStylesUrl}]

// export const meta = () =>{
//   const description = 'A cool blog build with Remix'
//   const keywords = 'remix , react, javascript'

//   return{
//     description,
//     keywords
//   }
// }

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet/>
      </Layout>
      
    </Document>
  );
}

function Document({children, title}){
  return(
    <html lang="en">
      <head>
        {/* <meta charSet="utf-8"/>
         <meta name="viewport" content="width=device-width,inital-scale=1"/>
         <Meta /> */}
        <Links/>
        <title>{title ? title : 'Remix Blog'}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development'?
        <LiveReload/>:null  
      }
      </body>
    </html>
  )
}

function Layout({children}){
  return (
    <>
     <nav className="navbar">
      <Link to='/' className='logo'>
        Remix
      </Link>
      <ul className="nav">
      <li>
        <Link to='/posts/index'>Posts</Link>
      </li>
     </ul>
     </nav>
     <div className="container">
      {children}
     </div>
     
    </>
  )
}
export function ErrorBoundary({error}){
  console.log(error)

  return(
      <div>
          <h1>Error</h1>
          <pre>{error}</pre>
      </div>
  )
}