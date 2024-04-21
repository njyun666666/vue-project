import realworldAPI from '../api/realworldAPI'

export interface ProfileViewModel {
  profile: Profile
}

export interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

class CommentService {
  getProfile(username: string) {
    return realworldAPI.get<ProfileViewModel>(`/api/profiles/${username}`)
  }
}
export const commentService = new CommentService()