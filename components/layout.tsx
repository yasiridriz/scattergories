import React from "react";
import Head from 'next/head';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@700&display=swap" rel="stylesheet"></link>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Head>
            {children}
            {/* <footer className={styles.footer}>
                <a
                    href="https://github.com/yasiridriz"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    With <span style={{ color: 'red' }}>&nbsp;&hearts;&nbsp; </span> by Yasir Idriz
                </a>
            </footer> */}
        </>
    );
};

export default Layout;