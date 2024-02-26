from sys import argv
from os.path import join
from os import getcwd
from PIL import Image, ImageFilter
from bs4 import BeautifulSoup, element
from asyncio import run, gather
from urllib.request import Request, urlopen
from aiohttp import ClientSession
from aiofiles import open as a_open
from io import BytesIO
from urllib.parse import urljoin

FORMAT = 'jpeg'
EXT = 'jpg'


def save_path(filename: str) -> str:
    return join(getcwd(), argv[1], '{}.{}'.format(filename, EXT))


async def parse_artist_page(tags: list[element.Tag]) -> None:
    gathering = []
    async with ClientSession() as session:
        for elm in tags:
            async with session.get(url='http://www.helloproject.com{}profile/'.format(elm['href'])) as resp_1:
                members = BeautifulSoup(await resp_1.text(), 'lxml').find_all('div', {'class': 'photo_box'})
            for member in members:
                async with session.get(url='http://www.helloproject.com{}'.format(member.next['href'])) as resp_2:
                    photo_url = BeautifulSoup(await resp_2.text(), 'lxml').find('div', {'id': 'artist_photoB'})
                    image_link = photo_url.findChild().findChildren(recursive=False)
                    if image_link[0].next.attrs.get('alt') != '在籍者なし':
                        gathering.append(download_artist_pic(image_link))
    await gather(*gathering)


async def download_artist_pic(tags: list[element.Tag]):
    async with ClientSession() as session:
        async def download(tag_1: element.Tag):
            tag_1 = tag_1.next
            async with session.get(url=tag_1['src']) as resp_1:
                async with a_open(file=save_path(tag_1.attrs.get('alt')), mode='wb') as f:
                    save_to = BytesIO()
                    Image.open(BytesIO(await resp_1.read())).convert(mode='RGB').save(save_to, format=FORMAT)
                    await f.write(save_to.getvalue())
            print(tag_1.attrs.get('alt'), tag_1.attrs.get('src'), end='\n\n')

        if tags.__len__() == 1:
            await download(tags[0])
        else:
            size = []
            for order, tag in enumerate(tags):
                tag = tag.next
                async with session.get(url=tag['src']) as resp_2:
                    get_size = BytesIO()
                    Image.open(BytesIO(await resp_2.read())).filter(ImageFilter.FIND_EDGES).save(get_size, format='png')
                    size.append(get_size.getbuffer().nbytes)
                    # エッジ検出して、PNG圧縮を使って画像のデータ量を推測する。

            await download(tags[size.index(max(size))])


async def parse_og_page(tags: list[element.Tag]):
    async def download(elm_og: element.Tag):
        async with ClientSession() as session:
            async with session.get('http://www.up-fc.jp/m-line/{}'.format(elm_og['href'])) as resp_1:
                og_profile_page = BeautifulSoup(await resp_1.text(), 'lxml').find('div', {'id': 'main-left'})
                print(elm_og.findChild()['alt'], end='\t')
                url = urljoin('http://www.up-fc.jp/m-line/{}'.format(elm_og['href']),
                              og_profile_page.findChild()['src'])
                print(url)
                print()
                og_name = elm_og.next.attrs.get('alt')
            async with session.get(url=url) as img_data, a_open(file=save_path(og_name), mode='wb') as f:
                save_to = BytesIO()
                Image.open(BytesIO(await img_data.read())).save(fp=save_to, format=FORMAT)
                await f.write(save_to.getvalue())

    gathering = []
    for elm in tags:
        gathering.append(download(elm))
    await gather(*gathering)


with urlopen(Request(url='http://www.helloproject.com/artist/')) as resp:
    artist_list = BeautifulSoup(resp.read().decode(), 'lxml').find('nav', {'class': 'artist_listbox'}).find_all('a')
    run(parse_artist_page(artist_list))

with urlopen(Request(url='http://www.up-fc.jp/m-line/')) as resp:
    og_list = BeautifulSoup(resp.read().decode(), 'lxml').find('ul', {'id': 'main_artist'}).find_all('a')
    run(parse_og_page(og_list))
