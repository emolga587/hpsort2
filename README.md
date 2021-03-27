# hpsort2

ハロプロソート(updated)です。

ソートアルゴリズムに[Ford-Johnson法](https://en.wikipedia.org/wiki/Merge-insertion_sort)を採用し比較回数を抑えるとともに、Reactでモバイルネイティブに作り直しています。

[https://16be.at/sort/](https://16be.at/sort/)

メンバーデータは[@xxgentaroxx](https://twitter.com/xxgentaroxx)大先生の[HP_DB](https://github.com/xxgentaroxx/HP_DB)を利用しています。

## docker環境

### ビルド

```
docker build -t hpsort2 https://github.com/emolga587/hpsort2.git
```

### 実行

```
docker run -p 5000:5000 hpsort2
```

## 非docker環境

### クローン・パッケージのインストール
```
git clone --recursive https://github.com/emolga587/hpsort2.git  #サブモジュールも一緒にcloneしてください
cd ./hpsort2/
npm install
```

### 実行(development)
```
npm start
```

### ビルド(production)
```
npm run build
```

## 不具合報告、改善要望、連絡先

### 非技術者の方
[Twitter](https://twitter.com/emolga587)へお願いします。

### 開発者の方
[こちら](https://github.com/emolga587/hpsort2/pulls)へお願いします。

## ライセンス
MITライセンスとします。
ただし、public/member_pics/以下の画像、src/HP_DB/以下のデータに関してはこの限りではありません。

## 謝辞
[じゅんくどぅ](https://twitter.com/junkudu)様、ブラックハウリング様(先代、先々代ソート管理人)

[げんたろう](https://twitter.com/xxgentaroxx)大先生(HP_DBメンテナ)
