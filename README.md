# 天堂衝裝模擬器(重構優化中)

![截圖 2024-06-15 下午12 22 56](https://github.com/MikeLee0358/Lineage-Emulator/assets/108295892/5e1455c4-6787-4593-b48c-4fe5bb2858f7)
DEMO網址 https://mikelee0358.github.io/LineageEmulator/#/login

## 目的 

    回憶早期天堂和衝裝備的感覺。

## 功能

    1. 點擊卷軸可以強化防具、武器。
    2. 角色對話會觸發不同事件。如：強化機率上升、下降等..

## 使用技術

    1.HTML, CSS, JavaScript
    2.Vue 3, Vue router, Pinia
    3.Sass/SCSS
    4.E2E(Cypress、PlayRight)

## 心得

   這次重構成 v2.0.0 主要是想練習 PlayRight 的測試，打開 code 發覺我對於細節的部分忘得差不多了，
   只剩大方向，也發覺到犯了很多新手的錯誤，以及缺少了整體的概念、代碼可讀性問題。重構後舒爽多了！
   至於為何要選擇 PlayRight 來做測試，是因為困擾在 cypress 跑測試的時間和 flaky tests 的頻繁出現，
   所以 playRight 很好的解決這部分的問題，雖然語法上沒有 cypress 那樣直覺。
   整體上來說這次重構後，發現跟一年前比進步了不少！

## 資料參考

    1.Google、ChatGPT、天堂韓服官方、遊戲主程式。
    2.王子：https://leonsway.blogspot.com/2006/06/20060617_20.html
    3.騎士：https://bbs.mychat.to/sindex.php?t361225.html
    4.天堂Ｗ影片: https://www.youtube.com/watch?v=EGql7OgWzzE
    5.衝裝機率: https://forum.gamer.com.tw/Co.php?bsn=00842&sn=5173520
    6.Daisy 愛自學(音頻混音)：https://www.daisylove3c.com/
    7.J.J.'s Blogs(天堂私服架設)：https://morosedog.gitlab.io/private-lineage-20210712-private-lineage-0/
# lineage
