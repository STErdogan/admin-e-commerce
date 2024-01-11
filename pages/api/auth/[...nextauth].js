import NextAuth from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';

const adminEmails = ['salihtarike@gmail.com'];

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	adapter: MongoDBAdapter(clientPromise),

	callbacks: {
		session: ({ session, token, user }) => {
			if (adminEmails.includes(session?.user?.email)) {
				return session;
			} else {
				return false;
			}
		},
	},
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
	const session = await getServerSession(req, res, authOptions);
	if (!adminEmails.includes(session?.user?.email)) {
		res.status(401);
		res.end();
		throw 'Admin Yetkisi Bulunamadı';
	}
}
