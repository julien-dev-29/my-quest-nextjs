// app/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { commentFormSchema, postFormSchema } from "@/schema/posts";
import { z } from "zod";
import { Post } from "../generated/prisma/client";
import type { Post as PostType } from "@/types/types"
import type { Comment as CommentType } from "@/types/types";
import { revalidatePath } from "next/cache";

/**
 * Creates a new post.
 * @param data The post data.
 */
export async function createPost(data: z.infer<typeof postFormSchema>, userId: string | undefined): Promise<void> {
    await prisma.post.create({
        data: {
            authorId: userId,
            content: data.content,
        },
    });
    revalidatePath("/posts")
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
                    user: true
                }
            },
            comments: {
                where: { parentId: null },
                include: {
                    user: true,
                    likes: {
                        include: {
                            user: true
                        }
                    },
                    replies: {
                        include: {
                            user: true,
                            likes: true
                        }
                    }
                }
            }
        }
    })
}

/**
 * Creates a new comment for a post.
 * @param data The comment data.
 * @param postId The ID of the post to comment on.
 */
export async function createComment(
    data: z.infer<typeof commentFormSchema>,
    postId: string | null,
    parentId: string | null): Promise<void> {
    // Reply or Comment
    if (parentId) {
        await prisma.comment.create({
            data: {
                parentId: parentId,
                content: data.content,
                postId: null,
                userId: "cmhf4ca1k0000udrskkmc2yy5"
            }
        })
    } else {
        await prisma.comment.create({
            data: {
                postId: postId,
                content: data.content,
                parentId: null,
                userId: "cmhf4ca1k0000udrskkmc2yy5"
            }
        })
    }
    revalidatePath("/posts")
}

export async function addLikeToPost(post: PostType) {
    await prisma.like.create({
        data: {
            userId: "cmhf4ca1k0000udrskkmc2yy5",
            postId: post.id
        }
    })
    revalidatePath("/posts")
}

export async function addLikeToComment(comment: CommentType) {
    await prisma.like.create({
        data: {
            userId: "cmhf4ca1k0000udrskkmc2yy5",
            commentId: comment.id
        }
    })
    revalidatePath("/posts")
}

export async function deleteLikeFromPost(post: PostType) {
    await prisma.like.delete({
        where: {
            id: post.likes!.find(like => like.user.id === "cmhf4ca1k0000udrskkmc2yy5")!.id!
        }
    })
    revalidatePath("/posts")
}

export async function deleteLikeFromComment(comment: CommentType) {
    await prisma.like.delete({
        where: {
            id: comment.likes!.find(like => like.user.id === "cmhf4ca1k0000udrskkmc2yy5")!.id!
        }
    })
    revalidatePath("/posts")
}

