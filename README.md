# 天堂衝裝模擬器

DEMO網址 https://mikelee0358.github.io/LineageEmulator/#/login

## 目的 

  回憶早期天堂和衝裝備的感覺。

## 功能

  - 選擇不同角色，有對應的背景音樂。
  - 點擊卷軸可以強化防具、武器。
  - 角色對話會觸發不同事件。如：強化機率上升、下降等..

## 使用技術

  - HTML, CSS, JavaScript。
  - Vue 3, Vue router, Pinia。
  - Sass/SCSS。
  - E2E(早期 Cypress、Playwright)。

## 心得

  這次重構成 v2.0.0 主要是練習 Playwright 的測試，打開 code 發覺，我對於細節的部分忘得差不多了，也發覺到犯了很多新手的錯誤以及缺少了整體的概念、代碼可讀性問題。重構後舒爽多了！
  至於為何要選擇 Playwright 來做測試，是因為困擾在 Cypress 跑測試的時間和 flaky tests 的頻繁出現，
  所以 playRight 很好的解決這部分的問題，雖然語法上沒有 Cypress 那樣直覺。整體上來說這次重構後，發現比之前進步了不少！

## 資料參考

  - Google、ChatGPT、天堂韓服官方、遊戲主程式。
  - 王子：https://leonsway.blogspot.com/2006/06/20060617_20.html
  - 騎士：https://bbs.mychat.to/sindex.php?t361225.html
  - 天堂Ｗ影片: https://www.youtube.com/watch?v=EGql7OgWzzE
  - 衝裝機率: https://forum.gamer.com.tw/Co.php?bsn=00842&sn=5173520
  - Daisy 愛自學(音頻混音)：https://www.daisylove3c.com/
  - J.J.'s Blogs(天堂私服架設)：https://morosedog.gitlab.io/private-lineage-20210712-private-lineage-0/
