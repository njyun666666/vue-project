import { computed } from 'vue'
import { defineStore } from 'pinia'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { userService, type UserViewModel } from '@/libs/services/userService'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import { useRoute, useRouter } from 'vue-router'
import { useProfileStore } from './profile'
import { useArticleStore } from './article'
import { commentService } from '@/libs/services/commentService'
// import type { RoleType } from '@/appConst'

export const useLoginStore = defineStore('login', () => {
  const router = useRouter()
  const route = useRoute()
  const profileStore = useProfileStore()
  const articleStore = useArticleStore()
  const user = useStorage<UserViewModel>('user', null, localStorage, {
    serializer: StorageSerializers.object
  })
  const loginState = computed(() => tokenPayload.value !== undefined)
  const currentUsername = computed(() => (loginState.value ? user.value.username : undefined))

  const setUser = (data: UserViewModel) => {
    user.value = data
  }

  const login = (data: UserViewModel) => {
    profileStore.reset()
    articleStore.reset()
    commentService.reset()
    setUser(data)
  }

  const logout = () => {
    profileStore.reset()
    articleStore.reset()
    commentService.reset()
    user.value = null
  }

  const tokenPayload = computed(() => {
    try {
      if (user.value) {
        return jwtDecode(user.value.token) as JwtPayload
      }
    } catch (error) {
      return undefined
    }

    return undefined
  })

  const checkLogin = () => {
    if (loginState.value) {
      return true
    }

    router.push({ name: 'login', query: { url: route.fullPath } })
    return false
  }

  const authentication = async () => {
    if (!loginState.value) return

    await userService.authentication().then(({ data }) => {
      setUser(data.user)
    })
  }

  // const checkRole = (roles?: RoleType[]) => {
  //   if (!roles) return true

  //   const length = roles.length

  //   for (let i = 0; i < length; i++) {
  //     if (tokenPayload.value?.role.includes(roles[i])) {
  //       return true
  //     }
  //   }

  //   return false
  // }

  return {
    user,
    loginState,
    currentUsername,
    setUser,
    login,
    logout,
    tokenPayload,
    checkLogin,
    authentication
  }
})
