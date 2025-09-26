# 天堂衝裝模擬器

## Demo
- [v2-Demo](https://lineage-v2.netlify.app/):
  有了工作經驗歷練之後，移除冗余代碼、架構調整，只專注`衝裝備模擬器`功能。

- [v1-Demo](https://mikelee0358.github.io/LineageEmulator/#/login):
新手時期，第一件作品，犯了`什麼都想要`的狀態 (多角色、音效、未來可能性、遊戲擴充性...)。

## 目的 

  回憶天堂衝裝備的感覺。

## 功能
  - 點擊卷軸，選擇強化的防具、武器。
  - 角色對話會觸發不同事件。如：強化機率上升、下降、無效、冷笑話..。
  - 選擇不同角色，有對應的背景音樂 (v1)。

## 使用技術

  - HTML, CSS, JavaScript。
  - Vue 3, Vue router, Pinia。
  - Sass/SCSS。
  - E2E(Cypress/v1、Playwright/v2)。

## 心得

  ## 心得
  
  這次重構成 v2，主要是為了練習 Playwright 的測試。打開程式碼後才發現，自己對細節已經忘得差不多，也發現了許多新手時期的錯誤，以及缺乏整體概念和代碼可讀性的問題。
  
  選擇 Playwright 來做測試，是因為過去使用 Cypress 時，常常遇到測試時間過長和 flaky tests 頻繁出現的困擾。Playwright 很好地解決了這些問題，雖然語法沒有 Cypress 那麼直覺，但整體體驗更佳。
  
  這次重構後，明顯感受到自己比之前進步了不少！

## 資料參考

  - Google、ChatGPT、天堂韓服官方、遊戲主程式。
  - 王子：https://leonsway.blogspot.com/2006/06/20060617_20.html
  - 騎士：https://bbs.mychat.to/sindex.php?t361225.html
  - 天堂Ｗ影片: https://www.youtube.com/watch?v=EGql7OgWzzE
  - 衝裝機率: https://forum.gamer.com.tw/Co.php?bsn=00842&sn=5173520
  - Daisy 愛自學(音頻混音)：https://www.daisylove3c.com/
  - J.J.'s Blogs(天堂私服架設)：https://morosedog.gitlab.io/private-lineage-20210712-private-lineage-0/
