# hpsort2

ハロプロソート(updated)です。

ソートアルゴリズムに[Ford-Johnson法](https://en.wikipedia.org/wiki/Merge-insertion_sort)を採用し、比較回数を抑えたハロー！プロジェクトのメンバーソートです。React + Vite + Denoで構成しています。

公開先: [https://16be.at/sort/](https://16be.at/sort/)

メンバーデータは[@xxgentaroxx](https://twitter.com/xxgentaroxx)大先生の[HP_DB](https://github.com/xxgentaroxx/HP_DB)をGit submoduleとして利用しています。

## ソートアルゴリズム

このアプリでは、ユーザーに「どちらが好きか」を尋ねる回数をできるだけ少なくするため、比較回数の少なさを重視した Ford-Johnson 法(MergeInsertion)をベースにしています。実装は `src/modules/Sorter.ts` の `Sorter#fordJohnson` にあります。

### オリジナルの Ford-Johnson 法

Ford-Johnson 法は、まず要素を2個ずつペアにし、各ペアで1回だけ比較します。各ペアの上位側だけを再帰的に整列すると、上位側だけでできた sorted main chain が得られます。

その後、各ペアの下位側要素を main chain に挿入します。このとき、下位側要素は対応する上位側要素より下に来ることがすでに分かっているため、挿入先の探索範囲を「対応する上位側要素の直前まで」に限定できます。これにより、単純な挿入ソートやマージソートより少ない比較回数を狙います。

下位側要素の挿入順(insertion order)は、Ford-Johnson 法の重要な部分です。標準的な MergeInsertion では、Jacobsthal 数に基づく batch に分け、各 batch を後ろから前へ挿入します。この順序により、二分挿入(binary insertion)の探索範囲が `2^k - 1` に近い長さになりやすく、比較回数を抑えやすくなります。

このアプリでは、比較関係がまだ分からない場合に `UndefinedOrderError` で処理を止め、UIがユーザーに質問します。回答後は `less` / `equal` / `greater` の推移関係を保存し、すでに分かっている比較を再利用します。

### この実装で加えた修正

現在の実装では、Stober と Weiß の平均ケース解析を参考に、オリジナルの MergeInsertion に次の2つの調整を加えています。

1つ目は、binary insertion の decision tree に `left strategy` を使うことです。通常の二分探索は中央付近から比較しますが、`left strategy` では、少ない比較で到達できる挿入位置が左側に集まるように比較位置を選びます。

2つ目は、insertion order の batch 境界を少し広げることです。標準的な batch 境界 `t_k` をそのまま使うのではなく、Stober と Weiß が検討した "Increasing `t_k` by a Constant Factor" に従い、境界を `floor(f * t_k)` に置き換えています。この実装では、ベンチマーク結果から `f = 1.05` を採用しています。

```text
t_k = (2^(k + 1) + (-1)^k) / 3
batchEnd = floor(f * t_k), f = 1.05
```

### 修正の根拠

Stober と Weiß は、MergeInsertion の平均ケース(average case)では、binary insertion の decision tree と insertion order の違いが平均比較回数に影響することを示しています。同論文の実験では、binary insertion の戦略として `left strategy` が最も良い結果になり、また `t_k` に constant factor `f` を掛けて batch 境界を広げる方法も平均比較回数を改善しています。

このアプリでは、ユーザーが答える比較回数を減らすことが目的なので、最悪ケース(worst case)だけでなく平均的な比較回数を重視しています。また、回答済みの比較から推移閉包で分かる関係も再利用するため、論文上の比較回数だけでなく、実際のメンバー数に近いデータセットでもベンチマークしました。

その結果、現行の Ford-Johnson 系実装に対して平均でおおむね次の改善が見込まれたため、`left strategy` と `f = 1.05` の組み合わせを採用しています。

| データセット | 改善前 | 現在の実装 | 改善幅 |
| --- | ---: | ---: | ---: |
| ハロプロ研修生系 n=19 | 58.0 | 57.2 | 約0.8回減 |
| 現役ハロプロ n=72 | 348.7 | 346.4 | 約2.3回減 |
| 現役ハロプロ+研修生 n=91 | 469.7 | 466.9 | 約2.8回減 |
| 歴代デビュー組 n=217 | 1386.0 | 1381.3 | 約4.7回減 |

参考文献:

- Florian Stober and Armin Weiß, ["On the Average Case of MergeInsertion"](https://arxiv.org/abs/1905.09656), 2019.

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
