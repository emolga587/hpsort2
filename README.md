# hpsort2

ハロプロソート(updated)です。

ソートアルゴリズムに[Ford-Johnson法](https://en.wikipedia.org/wiki/Merge-insertion_sort)を採用し、比較回数を抑えたハロー！プロジェクトのメンバーソートです。React + Vite + Denoで構成しています。

公開先: [https://16be.at/sort/](https://16be.at/sort/)

メンバーデータは[@xxgentaroxx](https://twitter.com/xxgentaroxx)大先生の[HP_DB](https://github.com/xxgentaroxx/HP_DB)をGit submoduleとして利用しています。

## 構成

- `src/`: Reactアプリ本体
- `src/HP_DB/`: HP_DB submodule
- `src/data/`: 追加データ、グループカラー
- `public/member_pics/`: メンバー画像
- `script/get-ufg-pic.ts`: 公式サイトからメンバー画像を更新するスクリプト
- `.github/workflows/main.yml`: master push時のビルドとAWS S3デプロイ
- `.github/workflows/cron-member-pics.yml`: メンバー画像の定期更新

## 開発

### 必要なもの

- Deno 2.x
- Git submoduleを取得できる環境

### クローン

```sh
git clone --recursive https://github.com/emolga587/hpsort2.git
cd hpsort2
```

submoduleを後から取得する場合:

```sh
git submodule update --init --recursive
```

### 開発サーバー

```sh
deno task dev
```

Viteの開発サーバーが起動します。

### 型チェック

```sh
deno task check
```

### 本番ビルド

```sh
deno task build
```

成果物は `dist/` に出力されます。Viteの `base` は `/sort/` です。

### ビルド成果物の確認

```sh
deno task preview --port 5000
```

`http://localhost:5000/sort/` で確認できます。

## メンバー画像の更新

公式サイトから画像を取得して `public/member_pics/` を更新します。

```sh
deno run -A ./script/get-ufg-pic.ts
```

GitHub Actionsでは毎週月曜 00:00 UTC に `cron-member-pics.yml` が実行され、画像差分があれば `chore: refresh member pics` として自動コミットされます。手動実行も可能です。

## デプロイ

`master` ブランチへの push、または手動実行で `main.yml` が動きます。

1. submodule込みでcheckout
2. Deno 2.xをセットアップ
3. `deno task build`
4. `dist/` を `s3://italian-red/16be-at/sort/` にアップロード
5. CloudFront distribution `E2P1UCYH9XFRDL` の `/sort/*` をinvalidation

AWSへのデプロイは `emolga587/hpsort2` リポジトリでのみ実行されます。

## Docker

Dockerでビルドとpreview起動もできます。

```sh
docker build -t hpsort2 .
docker run --rm -p 5000:5000 hpsort2
```

起動後は `http://localhost:5000/sort/` を開いてください。

## 不具合報告、改善要望、連絡先

開発者以外の方は[Twitter](https://twitter.com/emolga587)へお願いします。

開発者の方は[Pull Request](https://github.com/emolga587/hpsort2/pulls)へお願いします。

## ライセンス

MITライセンスとします。

ただし、`public/member_pics/` 以下の画像、`src/HP_DB/` 以下のデータに関してはこの限りではありません。

## 謝辞

[じゅんくどぅ](https://twitter.com/junkudu)様、ブラックハウリング様(先代、先々代ソート管理人)

[げんたろう](https://twitter.com/xxgentaroxx)大先生(HP_DBメンテナ)
