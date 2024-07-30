import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"relative h-full flex flex-col font-sans antialiased",
					inter.className
				)}
			>
				<Providers>
					<Header />
					<main className="relatve min-h-screen">
						{children}
					</main>
					{/* <Footer /> */}
				</Providers>
			</body>
		</html>
	);
}
