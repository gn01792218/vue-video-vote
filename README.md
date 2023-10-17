# 專案使用 Vue 3 + Typescript + Vite + Pinia + TailwindCss

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

# 專案指令
### 運行專案
```
npm run dev
```
### 產出專案
```
npm run build
```
# 專案 git flow
## 分支開發流程
### main - dev整合測試OK後merge上版
### dev - 所有功能分支都從dev開出
### feature - 新功能分支 例如 : feature/userLogin
### fix - bug修復分支 ， 例如 : fix/userLogin
## 現有分支
### feature/readMe -->修改README.md專用
### feature/codeReview -->codeReview專用
### feature/rwd -->調整RWD專用

# 狀態管理 - Pinia
使用教學<br/>
https://www.notion.so/pinia-pinia-0966abfd0b5b4440ae9119fe66997164

# Tailwind 使用
## 安裝
```
npm install tailwindcss autoprefixer postcss
```
### 1.將tailwind導入到CSS檔案中
```css
@tailwind base; 
@tailwind components;
@tailwind utilities;
```
### 2.建立 postcss.config.js檔案
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```
### 3.建立tailwind的設定檔
```
npx tailwindcss init

//獲得完整版的設定檔案
npx tailwindcss init --full

```
### 4.修改設定檔的content
```javascript
//tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
}
```
## 讓專案擁有autoimport功能
```javascript
npm i unplugin-auto-import

//vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:['vue'],
      dts:'src/auto-imports.d.ts'
    })
  ],
})

```
## 自動import 元件功能
```javascript
npm i unplugin-vue-components

//vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({
      extensions: ['vue'],
      dirs:['src/commonComponents'],  //要從哪個資料夾底下自動import元件，預設是components
      include: [/\.vue$/,/\.vue\?vue/],
      dts:"src/auto-components.d.ts",
    })
  ],
})

```
## 推薦安裝VS code套件 : tailwindcss

# vue 風格指南
## 務必遵守 : 
### 1. v-for 要搭配 key值
```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
### 2. 元件命名-多單詞
```javascript
//錯誤示範
Vue.component('todo', {
  // ...
})

//正確示範
Vue.component('todo-item', {
  // ...
})

```
## 強烈推薦 : 
### 1. 盡可能的元件化 
例如，todoList就可以拆成，todoList.vue、todoItem.vue
### 2. 絕對不要使用縮寫命名
### 3. 元件命名規範 : 
#### (1)單詞的組合應以 較為高層次的抽象概念 作為開頭
```
//錯誤
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue

//正確
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```
#### (2)用The前綴表示 唯一 的元件
通常這種元件只會在某頁面出現一次，且應該不屬於"展示用元件"，所以不應使用prop傳值。
例如 : Header、SideBar、Nav等元件
```
components/
|- TheHeading.vue
|- TheSidebar.vue
```
#### (3)用父元件名稱作為子元件命名前綴
```
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```
### 4. 元件的attributem原則
#### 一行、且須帶引號 (安裝插件Prettire進行格式化即可)
```html
<!-- 錯誤示範 -->
<input type=text>
<MyComponent foo="a" bar="b" baz="c"/>

<!-- 正確示範 -->
<input type="text">
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```
### 5.盡量讓template只做渲染，不做複雜邏輯
```
//錯誤
{{
  fullName.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}

//正確
{{ normalizedFullName }}
//請寫在computed裡面
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```
### 6. 統一使用縮寫指令 : 
用 : 表示 v-bind:、 <br>用 @ 表示 v-on: <br>用 # 表示 v-slot: <br>
### 7. props的名稱使用
在js中使用 camelCase ； 在HTML中使用 kebab-case
```javascript
props: {
  greetingText: String
}
//在模板中使用
<WelcomeMessage greeting-text="hi"/>
```
