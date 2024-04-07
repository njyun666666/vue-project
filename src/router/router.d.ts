import type { RoleType } from '@/appConst'
import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
    roles?: RoleType[]
  }
}
