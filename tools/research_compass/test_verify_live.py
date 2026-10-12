import json
import unittest
from unittest.mock import patch

from verify_live import read_revision


class Response:
    def __init__(self, body, url='https://www.aiphysics.me/research-compass/catalog.json'):
        self.body, self.url = body, url

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return False

    def read(self, limit):
        return self.body[:limit]


class PublishedRevisionTests(unittest.TestCase):
    def test_reads_revision_instead_of_accepting_http_success(self):
        with patch('verify_live.urlopen', return_value=Response(json.dumps({'update': {'revision': 'older'}}).encode())):
            self.assertNotEqual(read_revision('https://www.aiphysics.me/research-compass/catalog.json', 'newer'), 'newer')

    def test_cache_busting_and_size_limit(self):
        with patch('verify_live.urlopen', return_value=Response(b'{"update":{"revision":"123-1"}}')) as fetch:
            self.assertEqual(read_revision('https://www.aiphysics.me/research-compass/catalog.json', '123-1'), '123-1')
            self.assertIn('revision=123-1', fetch.call_args.args[0].full_url)
        with patch('verify_live.urlopen', return_value=Response(b'x' * (8 * 1024 * 1024 + 1))):
            with self.assertRaises(ValueError):
                read_revision('https://www.aiphysics.me/research-compass/catalog.json', '123-1')

    def test_non_json_response_and_invalid_endpoints_do_not_pass(self):
        with patch('verify_live.urlopen', return_value=Response(b'<html>Deployment queued</html>')):
            with self.assertRaises(ValueError):
                read_revision('https://www.aiphysics.me/research-compass/catalog.json', '123-1')
        for url in ['http://www.aiphysics.me/research-compass/catalog.json', 'https://user:secret@www.aiphysics.me/research-compass/catalog.json', 'https://www.aiphysics.me/']:
            with self.assertRaises(ValueError):
                read_revision(url, '123-1')


if __name__ == '__main__':
    unittest.main()
