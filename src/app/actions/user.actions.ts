"use server";
import { connectdb } from '@/lib/db/connect';
import { User } from '@/lib/db/models/schema';
import { Session } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function saveUserData(session: Session | null) {
    if (!session || !session.user) {
        throw new Error('No session provided');
    }

    try {
        await connectdb();
        console.log("User is : ", User);

        const existingUser = await User.findOne({ _id: session.user.id });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = await User.create({
            _id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            img: session.user.image,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        revalidatePath('/note');
        console.log("New User : ", newUser);
        return { success: true, user: newUser.toObject() };
    } catch (error) {
        console.error('Failed to save user data:', error);
        return { success: false, error: 'Failed to save user data' };
    }
}
