import sys
import json
import urllib.request

def get_top_posts(subreddit, limit=5):
    try:
        url = f"https://www.reddit.com/r/{subreddit}/top/.json?limit={limit}&t=day"
        # Reddit requires a User-Agent to avoid 429 Too Many Requests
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AntigravityScraper/1.0'}
        
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            
        posts = data['data']['children']
        results = []
        for post in posts:
            p = post['data']
            results.append({
                'title': p['title'],
                'author': p['author'],
                'score': p['score'],
                'url': f"https://www.reddit.com{p['permalink']}"
            })
        return results
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python reddit_scraper.py [subreddit]")
        sys.exit(1)
        
    subreddit = sys.argv[1]
    posts = get_top_posts(subreddit)
    
    if isinstance(posts, str):
        print(f"Error: {posts}")
    else:
        print(json.dumps(posts, indent=2, ensure_ascii=False))
