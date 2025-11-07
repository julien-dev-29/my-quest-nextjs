export type User = Partial<{
    id: string
    email: string
    posts: Post[]
    comments: Comment[]
    likes: Like[]
    followers: Follow[]
    following: Follow[]
    notifications: Notification[]
    createdAt: Date
    updatedAt: Date
}>

export type Post = Partial<{
    id: string
    author: User
    content: string
    media: Media[]
    comments: Comment[]
    likes: Like[]
    createdAt: Date
    updatedAt: Date
}>

export type Comment = Partial<{
    id: string
    post: Post
    user: User
    content: string
    parentId: string
    likes: Like[]
    replies: Comment[]
    createdAt: Date
}>

export type Like = Partial<{
    id: string
    user: User
    post: Post
    comment: Comment
    createdAt: Date
    userId: string
}>

export type Follow = Partial<{
    id: string
    follower: User
    following: User
}>

export type Media = Partial<{
    id: string

}>

export type Profile = Partial<{
    id: string
    user: User
    username: string
    bio: string
    avatarUrl: string
}>