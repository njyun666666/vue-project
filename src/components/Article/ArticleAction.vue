<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import PopupMenu, { type PopupMenuItem } from '../UI/PopupMenu.vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { useArticleStore } from '@/stores/article'
import type { Article } from '@/libs/services/articleService'
import ArticleFormDialog from './ArticleFormDialog.vue'
import { cn } from '@/libs/utils'
import { useConfirm } from 'primevue/useconfirm'
import { useRoute, useRouter } from 'vue-router'
import { useDialog } from '@/libs/common'
import { useLoginStore } from '@/stores/login'

const props = defineProps<{
  article: Article
  class?: HTMLAttributes['class']
}>()

const login = useLoginStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const isSubmitting = ref(false)
const toast = useToast()
const articleStore = useArticleStore()
const dialog = useDialog()
const confirm = useConfirm()

const items = ref<PopupMenuItem[]>([
  {
    label: 'action.Edit',
    icon: 'fa-solid fa-pencil',
    buttonProps: { severity: 'secondary' },
    command: () => {
      handleEdit()
    }
  },
  {
    label: 'action.Remove',
    icon: 'fa-solid fa-trash',
    buttonProps: { severity: 'danger' },
    command: () => {
      handleDeleteClick()
    }
  }
])

const handleEdit = () => {
  dialog.open(ArticleFormDialog, {
    data: {
      isAdd: false,
      article: props.article
    },
    props: {
      header: t('title.Edit', { title: t('title.Article') }),
      position: 'top'
    }
  })
}

const handleDeleteClick = () => {
  confirm.require({
    message: t('title.ConfirmText', {
      action: t('action.Remove').toLowerCase(),
      title: `${t('title.Article').toLowerCase()}: ${props.article.title}`
    }),
    header: t('title.Confirm', { title: t('action.Remove').toLowerCase() }),
    icon: 'warn',
    rejectProps: {
      label: t('action.Cancel'),
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('action.Remove'),
      severity: 'danger'
    },
    accept: () => {
      doDelete()
    },
    reject: () => {}
  })
}

const doDelete = async () => {
  isSubmitting.value = true

  await articleStore
    .deleteArticle(props.article.slug)
    .then(() => {
      toast.add({ severity: 'success', summary: t('message.RemoveSuccess'), life: 3000 })
      if (route.name == 'article') {
        router.replace({ name: 'index' })
      }
    })
    .catch(() => {
      toast.add({ severity: 'error', summary: t('message.DeleteFail'), life: 3000 })
    })

  isSubmitting.value = false
}
</script>
<template>
  <PopupMenu
    v-if="login.loginState && login.user.username === article.author.username"
    :items="items"
    :buttonProps="{
      severity: 'secondary',
      text: true,
      rounded: true,
      loading: isSubmitting,
      class: cn(['!h-9 !w-9'], props.class)
    }"
  >
    <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
    <font-awesome-icon v-else icon="fa-solid fa-ellipsis" />
  </PopupMenu>
</template>
