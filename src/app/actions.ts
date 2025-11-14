// app/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { commentFormSchema, postFormSchema } from "@/schema/posts";
import { z } from "zod";
import { Post } from "../../generated/prisma/client";
import type {
    Post as PostType,
    Profile as ProfileType,
    Comment as CommentType,
} from "@/types/types";
import { revalidatePath } from "next/cache";

/**
 * Creates a new post.
 * @param data The post data.
 */
export async function createPost(
    data: z.infer<typeof postFormSchema>,
    userId: string | undefined
): Promise<void> {
    await prisma.post.create({
        data: {
            authorId: userId,
            content: data.content,
        },
    });
    revalidatePath("/posts");
}

/**
 * Fetches all posts from the database.
 * @returns An array of posts.
 */
export async function getPosts(): Promise<Post[]> {
    return await prisma.post.findMany({
        include: {
            author: true,
            likes: {
                include: {
                    user: true,
                },
            },
            comments: {
                where: { parentId: null },
                include: {
                    user: true,
                    likes: {
                        include: {
                            user: true,
                        },
                    },
                    replies: {
                        include: {
                            user: true,
                            likes: true,
                        },
                    },
                },
            },
        },
    });
}

/**
 * Creates a new comment for a post.
 * @param data The comment data.
 * @param postId The ID of the post to comment on.
 */
export async function createComment(
    data: z.infer<typeof commentFormSchema>,
    postId: string | null,
    parentId: string | null,
    userId: string
): Promise<void> {
    // Reply or Comment
    if (parentId) {
        await prisma.comment.create({
            data: {
                parentId: parentId,
                content: data.content,
                postId: null,
                userId: userId,
            },
        });
    } else {
        await prisma.comment.create({
            data: {
                postId: postId,
                content: data.content,
                parentId: null,
                userId: userId,
            },
        });
    }
    revalidatePath("/posts");
}

export async function addLikeToPost(post: PostType, userId: string) {
    await prisma.like.create({
        data: {
            userId: userId,
            postId: post.id,
        },
    });
    revalidatePath("/posts");
}

export async function addLikeToComment(comment: CommentType, userId: string) {
    await prisma.like.create({
        data: {
            userId: userId,
            commentId: comment.id,
        },
    });
    revalidatePath("/posts");
}

export async function deleteLikeFromPost(post: PostType, userId: string) {
    await prisma.like.delete({
        where: {
            id: post.likes!.find((like) => like.user?.id === userId)!.id!,
        },
    });
    revalidatePath("/posts");
}

export async function deleteLikeFromComment(
    comment: CommentType,
    userId: string
) {
    const likeToDelete = comment.likes?.find((like) => like.userId === userId);
    if (!likeToDelete) {
        throw new Error("Like not found");
    }
    await prisma.like.delete({
        where: {
            id: likeToDelete.id,
        },
    });
    revalidatePath("/posts");
}

export async function createProfile(profile: ProfileType, userId: string) {
    return await prisma.profile.create({
        data: {
            username: profile.username,
            bio: profile.bio,
            avatarUrl: profile.avatarUrl,
            userId: userId
        }
    })
}

export async function getUser(userId: string) {
    return await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            posts: {
                include: {
                    likes: true,
                    comments: {
                        include: {
                            likes: true,
                            user: true,
                            replies: {
                                include: {
                                    likes: true,
                                    user: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}