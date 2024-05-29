import type {Metadata} from "next";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ToasterProvider from "@/providers/ToasterProvider";

import {Figtree} from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/ModalProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const font = Figtree({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Spotify Clone",
	description: "Listen to Music!",
};

export const revalidate = 0;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userSongs = await getSongsByUserId();
	const products = await getActiveProductsWithPrices();

	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider products={products} />
						<Sidebar songs={userSongs}>{children}</Sidebar>
						<Player />
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	);
}
