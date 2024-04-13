import realworldAPI from '../api/realworldAPI'

export interface ArticleModel {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

export interface SingleArticleViewModel {
  articles: Article
}

export interface MultipleArticleViewModel {
  articles: Article[]
  articlesCount: number
}

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: Date
  updatedAt: Date
  favorited: boolean
  favoritesCount: number
  author: Author
}

export interface Author {
  username: string
  bio: string
  image: string
  following: boolean
}

class ArticleService {
  getArticles(data?: ArticleModel) {
    return realworldAPI.get<MultipleArticleViewModel>('/api/articles', { params: data })
    // .then((data) => data.data)
    // .catch(() => undefined)
  }
}
export const articleService = new ArticleService()
