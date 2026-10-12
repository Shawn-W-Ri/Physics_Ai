"""Read the published JSON revision; never treat a queued build as deployment."""
import argparse
import json
import os
import time
from urllib.parse import urlsplit, urlunsplit, urlencode, parse_qsl
from urllib.request import Request, urlopen


def read_revision(url, revision):
    parts = urlsplit(url)
    if parts.scheme != 'https' or not parts.hostname or parts.username or parts.password:
        raise ValueError('PUBLIC_URL must be a public HTTPS catalog.json URL')
    if not parts.path.endswith('/catalog.json'):
        raise ValueError('PUBLIC_URL must end with /catalog.json')
    query = parse_qsl(parts.query, keep_blank_values=True)
    query.append(('revision', revision))
    target = urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(query), ''))
    request = Request(target, headers={'Cache-Control': 'no-cache', 'Accept': 'application/json'})
    with urlopen(request, timeout=15) as response:
        if urlsplit(response.url).scheme != 'https':
            raise ValueError('Insecure redirect')
        body = response.read(8 * 1024 * 1024 + 1)
        if len(body) > 8 * 1024 * 1024:
            raise ValueError('Catalog exceeds size limit')
        data = json.loads(body.decode('utf-8'))
    return str(data.get('update', {}).get('revision', ''))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', required=True)
    parser.add_argument('--revision', required=True)
    parser.add_argument('--attempts', type=int, default=24)
    args = parser.parse_args()
    if not 1 <= args.attempts <= 24:
        parser.error('attempts must be between 1 and 24')
    for attempt in range(args.attempts):
        try:
            if read_revision(args.url, args.revision) == args.revision:
                print('Confirmed the expected catalog revision on the public website.')
                summary = os.environ.get('GITHUB_STEP_SUMMARY')
                if summary:
                    with open(summary, 'a', encoding='utf-8') as f:
                        f.write('\nPublic website catalog revision confirmed.\n')
                return
            print(f'Attempt {attempt + 1}: the public site still has a different revision.')
        except Exception as error:
            # Do not echo URLs or credentials from network error messages.
            print(f'Attempt {attempt + 1}: read-back failed ({type(error).__name__}).')
        if attempt + 1 < args.attempts:
            time.sleep(15)
    raise SystemExit('Public deployment could not be confirmed; check the existing hosting build and domain settings.')


if __name__ == '__main__':
    main()
