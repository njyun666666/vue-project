<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import Button from 'primevue/button'
import { type HTMLAttributes } from 'vue'
import { cn } from '@/libs/utils'

interface Props {
  class?: HTMLAttributes['class']
  isNav?: boolean
}

const props = defineProps<Props>()
const route = useRoute()
const routeQueryUrl = route.query['url']
const to = routeQueryUrl ?? '/'
</script>
<template>
  <RouterLink :to="String(to)">
    <Button text rounded :class="cn('h-12 w-full !p-2', props.class)">
      <img src="/src/assets/logo.svg" class="h-full max-h-full" />
      <span
        :class="
          cn('ml-3 text-xl font-bold', {
            'hidden xl:block': isNav
          })
        "
      >
        {{ $t('website.Title') }}
      </span>
    </Button>
  </RouterLink>
</template>
