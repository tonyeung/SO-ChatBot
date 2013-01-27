#!/usr/bin/python
import urllib, urllib2, cookielib
import re, json
import sys, inspect

def write_results ( jar, **kwargs ):
    #boy: mommy mommy, can you give me a cookie?
    #mom: get the cookie yourself
    #b: but I have no hands!
    #m: no hands, no cookie!
    data = {
        'headers' : dict(kwargs),
        'cookies' : {}
    }

    for cookie in jar:
        if 'stackoverflow' in cookie.domain:
            data['cookies'][cookie.name] = cookie.value
    print data

    #Q: why did Susie fall off the swing?
    #A: because she didn't have arms

    with open( 'data/results.json', 'w' ) as file:
        file.write( json.dumps(data, indent=4) )
    #*knock knock*
    #who's there?
    #not Susie

def load_opts ():
    data = None
    with open( 'data/opts.json', 'r' ) as file:
        data = json.loads( file.read() )

    return data

opts = load_opts()

headers = {
    'User-Agent' :
        'Mozilla/5.0 (X11; Linux i686; rv:17.0) Gecko/20100101 Firefox/17.0' }

cj = cookielib.CookieJar()
opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))

print( 'going to so/users/login...' )
request = urllib2.Request('http://stackoverflow.com/users/login', '', headers)
response = opener.open(request)

print( 'authenticating via /users/authenticate, using myopenid...' )
post_data = urllib.urlencode({
    'openid_identifier' : 'http://myopenid.com/',
})

request = urllib2.Request(
    'http://stackoverflow.com/users/authenticate', post_data, headers)
response = opener.open(request)

response_text = response.read()

print( 'reading credentials & other shit from myopenid...' )
tid = re.search('name="tid"\s+value="([^"]+)"', response_text)
token = re.search('name="token"\s+value="([^"]+)"', response_text)
underscore = re.search('name="_"\s+value="([^"]+)"', response_text)

assert tid
assert token
assert underscore

print( 'signing in to myopenid...' )
post_data = urllib.urlencode({
    'tid': tid.group(1),
    'token': token.group(1),
    '_': underscore.group(1),
    'user_name': opts['user_name'],
    'password': opts['password']
})

request = urllib2.Request(
    'https://www.myopenid.com/signin_submit', post_data, headers)
response = opener.open(request)

print( 'SUCCESS, BICHES!' )
request = urllib2.Request(
    'http://chat.stackoverflow.com/rooms/%d' % opts['roomid'], '', headers )
response = opener.open( request )

response_text = response.read()
fkey = re.search('name="fkey"\s+type="hidden"\s+value="([^"]+)"', response_text)

assert fkey
fkey = fkey.group(1)
print( 'fkey: %s' % fkey )

post_data = urllib.urlencode({
    'text': '(more test, hopefully this work)',
    'fkey': fkey
})

print 'writing cookies & stuff...'
write_results( cj, fkey=fkey )

#request = urllib2.Request(
#    'http://chat.stackoverflow.com/chats/%d/messages/new' % opts['roomid'],
#    post_data, headers )
#response = opener.open( request )
#print response.read()

print '=done='
