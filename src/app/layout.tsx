import Script from "next/script";
import QueryProvider from "../components/providers/QueryProvider";
import { FontSizeProvider } from "../hooks/useFontSize";
import ClientLayout from "./ClientLayout";
import { metadata } from "./metadata";
import ConfirmModal from "@/components/common/ConfirmModal";

import "./globals.css";
//import CSRFInit from "./_components/CSRFInit";

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* ✅ Kakao SDK 스크립트 삽입 */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <QueryProvider>
          <FontSizeProvider>
            <ClientLayout>
              <main>{children}</main>
              <ConfirmModal />
            </ClientLayout>
          </FontSizeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
