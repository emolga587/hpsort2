import os
import urllib.request

from PIL import Image
import requests
from bs4 import BeautifulSoup

# member

group_list = requests.get("http://www.helloproject.com/artist/")  # グループ一覧を取得

groups = BeautifulSoup(group_list.text, 'html.parser').find('nav', {'class': 'artist_listbox'})
links = groups.find_all('a')
urls = []
for pagelink in links:
    urls.append(BeautifulSoup(str(pagelink), 'html.parser').find('a')['href'])
profile_page = []
for pagelink in urls:
    profile_page.append('http://www.helloproject.com' + pagelink + 'profile/')
#↑各グループのプロフィールページ取得


print(profile_page)

group_member_link = []
for link in profile_page:
    group_page = requests.get(link)
    group_member_list = BeautifulSoup(group_page.text, 'html.parser')
    group_member_list = group_member_list.find('ul', {'id': 'profile_memberlist'})

    for member_link in group_member_list.find_all('div', {'class': 'photo_box'}):
        member_link = 'http://www.helloproject.com' + BeautifulSoup(str(member_link), 'html.parser').find('a')['href']
        group_member_link.append(member_link)
#↑各メンバーのプロフィールページ取得

for member_profile_page_link in group_member_link:
    member_profile_page = requests.get(member_profile_page_link)
    member_profile_page = BeautifulSoup(member_profile_page.text, 'html.parser')
    member_pic_div = member_profile_page.find('div', {'id': 'artist_photoB'})
    member_pic_link = member_pic_div.find('img')['src']
    member_name = member_profile_page.find('div', {'id': 'artist_text'}).find('h3').get_text()
    print(member_name)
    print(member_profile_page_link)
    print(member_pic_link)
    urllib.request.urlretrieve(member_pic_link, member_name + '.jpg')
    img = Image.open(member_name + '.jpg')
    img.save(member_name + '.jpg', 'jpeg', quality=85)
    print('\n\n')
#↑各メンバーの画像取得


# OG

og_url = requests.get('http://www.up-fc.jp/m-line/')

og_artists = BeautifulSoup(og_url.text, 'html.parser').find('ul', {'id': 'main_artist'})
for pagelink in og_artists('a'):
    print("\n\n")
    og_profile_link = 'http://www.up-fc.jp/m-line/' + pagelink['href']
    og_profile_page = requests.get(og_profile_link)
    og_profile_page = BeautifulSoup(og_profile_page.text, 'html.parser').find('div', {'id': 'main-left'})
    og_name = og_profile_page.find('img')['alt']
#↑各アーティストの名前取得
    if og_name == 'kumai1901':
        og_name = '熊井友理奈'
    print(og_name)
    print('http://www.up-fc.jp/m-line/' + pagelink['href'])
    og_pic_link = og_profile_page.find('img')['src']
    if 'http' in og_pic_link:
        print(og_pic_link)
    elif og_pic_link.find('/', 0, 1) == -1:
        print(og_profile_link + og_pic_link)
        og_pic_link = og_profile_link + og_pic_link
    elif og_pic_link.find('/', 0, 1) == 0:
        print('http://www.up-fc.jp' + og_pic_link)
        og_pic_link = 'http://www.up-fc.jp' + og_pic_link
    else:
        print("error\n")
#↑各アーティストの画像URL取得
    urllib.request.urlretrieve(og_pic_link, og_name + '.png')
    img = Image.open(og_name + '.png')
    img.save(og_name + '.jpg', 'jpeg', quality=85)
    os.remove(og_name + '.png')
#↑保存及び変換
