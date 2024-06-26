export interface User {
  id: number
  name: string
  avatar: string
  username: string
  staff: boolean
  title: string | null
}

export interface Post {
  id: number
  topic_id: number
  raw: string
  title: string
  fancy_title: string
  tags: string[]
  tags_descriptions: { [key: string]: string }
  slug: string
  closed: boolean
  archived: boolean
  user: User
  category_id: number
  image: string | null
  comments: Comment[]
  updated_at: string
  created_at: string
}

export interface Comment {
  id: number
  post_number: number
  raw: string
  user: User
  updated_at: string
  created_at: string
}
