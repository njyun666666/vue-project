<script setup lang="ts">
import { cn } from '@/libs/utils'
import Brand from '@/components/Brand.vue'
import ScrollPanel from 'primevue/scrollpanel'
import Button from 'primevue/button'
import { useLoginStore } from '@/stores/login'
import { RouterLink, useRoute } from 'vue-router'
import Nav from './Nav.vue'
import { breakpoints } from '@/libs/common'
import Avatar from 'primevue/avatar'
import Popover from 'primevue/popover'
import { ref } from 'vue'
import ArticlePostBtn from '@/components/Article/ArticlePostBtn.vue'

const route = useRoute()
const login = useLoginStore()
const userPanel = ref()
const toggle = (event: MouseEvent) => {
  userPanel.value.toggle(event)
}
</script>
<template>
  <div
    :class="
      cn(
        'mx-auto flex w-full divide-x',
        'md:max-w-[calc(80px+theme(size.2)+600px)]',
        'lg:max-w-[calc(80px+theme(size.2)+600px+280px)]',
        'xl:max-w-[calc(280px+600px+280px)]'
      )
    "
  >
    <header
      :class="
        cn(
          'sticky top-0 flex h-screen shrink-0 grow-0 flex-col items-center gap-2 ',
          'w-[calc(50px+theme(size.2))] min-w-[calc(50px+theme(size.2))] md:w-[calc(80px+theme(size.2))] xl:w-[280px]'
        )
      "
    >
      <ScrollPanel class="h-full w-full">
        <div class="flex h-full w-full flex-col">
          <div class="sticky top-0 z-[1] w-full bg-background pb-1 pl-1 pr-1 pt-1 md:pr-8">
            <Brand isNav :class="cn('w-12 xl:w-full')" />
          </div>
          <div class="flex grow flex-col gap-2 py-1 pb-5 pl-1 pr-1 md:pr-8">
            <Nav />
            <ArticlePostBtn isAdd />
          </div>
          <div
            class="sticky bottom-0 z-[1] flex w-full flex-col gap-2 bg-background pb-1 pl-1 pr-1 pt-2 md:pr-8"
          >
            <template v-if="!login.loginState">
              <RouterLink
                :to="{ name: 'login', query: { url: route.fullPath } }"
                v-tooltip="{
                  value: $t('action.Login'),
                  disabled: breakpoints.active().value == 'xl'
                }"
              >
                <Button severity="secondary" rounded :class="cn('h-12 w-12 xl:w-full')">
                  <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="!h-5 !w-5" />
                  <span class="ml-2 hidden xl:block">{{ $t('action.Login') }}</span>
                </Button>
              </RouterLink>

              <RouterLink
                :to="{ name: 'register', query: { url: route.fullPath } }"
                v-tooltip="{
                  value: $t('action.Register'),
                  disabled: breakpoints.active().value == 'xl'
                }"
              >
                <Button rounded :class="cn('h-12 w-12 xl:w-full')">
                  <font-awesome-icon icon="fa-solid fa-user-plus" class="!h-5 !w-5" />
                  <span class="ml-2 hidden xl:block">{{ $t('action.Register') }}</span>
                </Button>
              </RouterLink>
            </template>
            <template v-else>
              <Button rounded text plain :class="cn('h-12 w-12 !p-0 xl:w-full')" @click="toggle">
                <div class="flex w-full items-center justify-center xl:justify-start xl:p-4">
                  <Avatar
                    v-if="login.user && login.user.image"
                    :image="login.user.image"
                    shape="circle"
                    class="!h-8 !w-8 shrink-0 cursor-pointer"
                  />
                  <Avatar v-else shape="circle" class="!h-8 !w-8 shrink-0 cursor-pointer">
                    <template #icon>
                      <font-awesome-icon icon="fa-solid fa-user" />
                    </template>
                  </Avatar>
                  <div class="ml-3 hidden w-28 grow xl:block">
                    <div class="truncate text-left text-sm font-bold">
                      {{ login.user.username }}
                    </div>
                    <div class="truncate text-left text-xs text-foreground/80">
                      {{ login.user.email }}
                    </div>
                  </div>
                </div>
              </Button>
              <Popover ref="userPanel">
                <div class="flex flex-col">
                  <Button rounded text plain @click="login.logout()">
                    <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="!h-5 !w-5" />
                    <span class="ml-2">{{ $t('action.Logout') }}</span>
                  </Button>
                </div>
              </Popover>
            </template>
          </div>
        </div>
      </ScrollPanel>
    </header>
    <main :class="cn('min-h-screen grow')">
      <RouterView v-if="!route.meta.keepAlive" />

      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component v-if="route.meta.keepAlive" :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
  </div>
</template>
