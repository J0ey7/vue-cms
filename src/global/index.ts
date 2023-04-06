import {
  ElButton,
  ElInput,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElCheckbox,
  ElForm,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElRow,
  ElCol,
  ElSelect,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElImage,
  ElDialog,
  ElCard
} from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { App } from 'vue'

export default function registerElement(app: App): void {
  const components: Array<any> = [
    ElButton,
    ElInput,
    ElTabs,
    ElTabPane,
    ElIcon,
    ElCheckbox,
    ElForm,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElMenu,
    ElSubMenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElRow,
    ElCol,
    ElSelect,
    ElDatePicker,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElConfigProvider,
    ElImage,
    ElDialog,
    ElCard
  ]
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
