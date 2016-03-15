# Robot barm in browser

I call it barm cause it's a part of my firend in the computer world.

## 瀏覽器文檔原型結構訪問方式的探尋

    摘要: 源於對樹形結構遍歷的好奇，同時也對於在互聯網中廣泛使用的XML，HTML作更細緻的瞭解。

    HTML - Hyper Text Mark Language.

    演進的歷史從SGML到HTML各個後續版本再到如今全新並不再以來於SGML開發的HTML5，其內在也許在一直變化，
    各類API也變得更爲友善，標準華水準也在不斷提升，但是在進步的過程中，有些要求總是領先於你所處的時代，
    JQuery也許就是最好的例子。當然，作爲一個尚在行走的初心者，還沒有真正全面的理解JQuery在兼容性和
    工程化方面所做出的貢獻。但是對於經常可以看見的，使用的DOM節點訪問，希望可以有統一的訪問模式，在
    經常使用的各類程序語言中能夠找到共同點，於是便有了這篇說明文。

相關的知識點，javascript, css selector, document.api 等。

可以想在常用的數據結構中找到 - 鏈表。鏈表是一種線性表，但是並不會按線性的順序存儲結構，而是在每一個
節點存放到下一個節點的指針。而同時由於不必許按順序存儲，鏈表在插入的時候可以達到O(1)的複雜度，但同時
在查找或者訪問特定編號的節點則需要O(n)的時間，而具有順序的鏈表的時間複雜度剛好相反（1）。

這種說明剛好同平常實際中使用和感知到的節點操作是相似的。element.appendchild - 時間複雜度O(1), 
element.getElementsByTagName - 如果想獲得指定元素，時間複雜度O(n)。當然，這其中存在的結構關係，
並不一定如此對應，但從這種直接感知可以獲知一個信息，文檔原型的底層實現結構是於鏈表存在一定關係的。
所以這給與設計相似於鏈表的節點訪問代碼提供了良好的指引方向。

可以將文檔原型樹，簡單的看成A，B，C三個節點，而假設A爲父節點，而B，C同爲A的子節點，並且B，C爲同級
關係的兄弟節點，這個條件推及到任意n個節點的範圍中去。而A訪問B存在 `element.firstElementChild` 
方法，同級B訪問C存在 `element.nextElementsibling` ，而C訪問A存在 `element.parentNode` 。
如此，在一個最爲簡單的節點樹中，形成了一個有效的閉環，並且可以推及到任意多各節點範圍中去，這給於
設計計算方法提供了更爲簡便的方式和實現更爲合理的時間複雜度提供了幫助。

`證明`

TODO

[（1）wiki - 鏈表 ](https://zh.wikipedia.org/wiki/%E9%93%BE%E8%A1%A8)

## History
version 0.1.0 completed at 2015/12/24.

version 0.1.1 completed at 2016/02/25.
