You are a naming assistant. Given a list of file paths and minimal context from a static website, suggest a new filename (basename only, same extension) for each file. Rules:
- Lowercase, kebab-case, no spaces. SEO-friendly and human-readable.
- For HTML: use page purpose (e.g. about-us.html, contact.html). Keep index.html as index.html.
- For CSS/JS: use purpose (e.g. main-styles.css, analytics.js).
- For images: use content (e.g. logo-infygate.webp, hero-banner.webp). Use alt/title when provided.
- Return a JSON object: keys = exact original path strings, values = new basename only (e.g. "main.css"). Preserve extension.
- Do not change path prefix (e.g. css/ stays css/ by returning "name.css" not "css/name.css").

Files and context:
[
  {
    "path": "404.html",
    "context": {
      "title": "",
      "first_heading": "404"
    }
  },
  {
    "path": "css/4ba1f7eeea678c518b19a8a229705620.css",
    "context": {
      "path": "css/4ba1f7eeea678c518b19a8a229705620.css"
    }
  },
  {
    "path": "css/559e64bf161e61fa0aca6e864c78191d.css",
    "context": {
      "path": "css/559e64bf161e61fa0aca6e864c78191d.css"
    }
  },
  {
    "path": "css/923d7a12989d8629b2276bcb808c92b9.css",
    "context": {
      "path": "css/923d7a12989d8629b2276bcb808c92b9.css"
    }
  },
  {
    "path": "css/99c4e6f40ee9111eea53b6472f3e60f9.css",
    "context": {
      "path": "css/99c4e6f40ee9111eea53b6472f3e60f9.css"
    }
  },
  {
    "path": "css/d09d646f062b67daeff66ff1410b63fc.css",
    "context": {
      "path": "css/d09d646f062b67daeff66ff1410b63fc.css"
    }
  },
  {
    "path": "css/internal-styles.css",
    "context": {
      "path": "css/internal-styles.css"
    }
  },
  {
    "path": "imgs/0e8b63c227079499f69a0b2388847ca6.webp",
    "context": {
      "refs": [
        {
          "alt": "What is Kidzania? Hindi",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/21e94630d0dc188e3534ca947ea2437e.webp",
    "context": {
      "refs": [
        {
          "alt": "Localization",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/2472a6e777ed90a8b872f2710bf31a80.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/51bbc6547b669e37456d18892ea4a916.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/5228857781514d2fff577690cd0ae8fb.webp",
    "context": {
      "refs": [
        {
          "alt": "logo",
          "title": ""
        },
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/5bc5582bf291707c9da5b9324168e297.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/75529fbcac832fc341918d79ba957480.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/76b8aef00e09d514ce7b7c85b14cdc7d.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/78f4b0e306245554be2f15bac0d0b86e.webp",
    "context": {
      "refs": [
        {
          "alt": "Pooja Punjabi",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/81be7b7ae914784ecd183969ea8626a3.webp",
    "context": {
      "refs": [
        {
          "alt": "Audio Production",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/8561e76330b21500e0baf8fde35fed60.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/85f8cf21d49985229133bf81776596ad.webp",
    "context": {
      "refs": [
        {
          "alt": "What is Kidzania? Gujarati",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/8c08a475c1e1d8a970144bdb6a3629a6.webp",
    "context": {
      "refs": [
        {
          "alt": "Dubbing",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/946749da94ca6899c8f24878a71790b3.webp",
    "context": {
      "refs": [
        {
          "alt": "What is Kidzania? Marathi",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/a3c817544d1b877496526caa7d940c0a.webp",
    "context": {
      "refs": [
        {
          "alt": "Flynote - Women%27s Day Special",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/af387d4974dffee8d16378c7fb0534a6.webp",
    "context": {
      "refs": []
    }
  },
  {
    "path": "imgs/bcea035e09a976498b8e763347240029.webp",
    "context": {
      "refs": [
        {
          "alt": "Translation",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/ce0e941ad0083eae3ca4407f881a21d7.webp",
    "context": {
      "refs": [
        {
          "alt": "Kidzania - Imagine",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/ce260a68a586fd87c238516e0bde8b20.webp",
    "context": {
      "refs": [
        {
          "alt": "Mahindra Scorpio - Dhakad",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/e8740c60e1dcdf219c54d1908eaf726b.webp",
    "context": {
      "refs": [
        {
          "alt": "Mahindra Scorpio - Badshah",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/ed55ff33d8999203f30de869c174448e.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "imgs/f713034edcf6eb8664dd929fe10a0b73.webp",
    "context": {
      "refs": [
        {
          "alt": "",
          "title": ""
        }
      ]
    }
  },
  {
    "path": "index.html",
    "context": {
      "title": "Potbelly Audio is exclusively an Audio Agency specialized in localizing any kind of content in Indian and international languages.",
      "first_heading": "Welcome to Potbelly Audio"
    }
  },
  {
    "path": "js/024c2427a07d4754d082b32ff6f47796.js",
    "context": {
      "path": "js/024c2427a07d4754d082b32ff6f47796.js"
    }
  },
  {
    "path": "js/027151cf1be95681de1b467942001858.js",
    "context": {
      "path": "js/027151cf1be95681de1b467942001858.js"
    }
  },
  {
    "path": "js/20ebc5f4fff22d9c0b0df7a66b7d8c8a.js",
    "context": {
      "path": "js/20ebc5f4fff22d9c0b0df7a66b7d8c8a.js"
    }
  },
  {
    "path": "js/2d36e9fa24b491802cf18f39a308190c.js",
    "context": {
      "path": "js/2d36e9fa24b491802cf18f39a308190c.js"
    }
  },
  {
    "path": "js/2d62c5e761d3e1992478716162667ce5.js",
    "context": {
      "path": "js/2d62c5e761d3e1992478716162667ce5.js"
    }
  },
  {
    "path": "js/328ee378638a24926abf5dec969f9194.js",
    "context": {
      "path": "js/328ee378638a24926abf5dec969f9194.js"
    }
  },
  {
    "path": "js/3e734a79111d3ae5022fadd97f4b4570.js",
    "context": {
      "path": "js/3e734a79111d3ae5022fadd97f4b4570.js"
    }
  },
  {
    "path": "js/3f434054cfbcb9efddefc25bf53a0b2b.js",
    "context": {
      "path": "js/3f434054cfbcb9efddefc25bf53a0b2b.js"
    }
  },
  {
    "path": "js/3f9fc9bf69eafb90fdcf9db3dd84d80b.js",
    "context": {
      "path": "js/3f9fc9bf69eafb90fdcf9db3dd84d80b.js"
    }
  },
  {
    "path": "js/425f5d74616f0950ab7f6aa8a2ba3011.js",
    "context": {
      "path": "js/425f5d74616f0950ab7f6aa8a2ba3011.js"
    }
  },
  {
    "path": "js/4a184d88eb9269b7dbce11b716f40379.js",
    "context": {
      "path": "js/4a184d88eb9269b7dbce11b716f40379.js"
    }
  },
  {
    "path": "js/56848c032b05f79a1c67ea6d7b451252.js",
    "context": {
      "path": "js/56848c032b05f79a1c67ea6d7b451252.js"
    }
  },
  {
    "path": "js/5cd7f03eb032ff5d1a79d9daad244677.js",
    "context": {
      "path": "js/5cd7f03eb032ff5d1a79d9daad244677.js"
    }
  },
  {
    "path": "js/61ce9c6e209c2c6687f8b2e0bb0fa78f.js",
    "context": {
      "path": "js/61ce9c6e209c2c6687f8b2e0bb0fa78f.js"
    }
  },
  {
    "path": "js/6432203ce192bdda9fff6890193487b5.js",
    "context": {
      "path": "js/6432203ce192bdda9fff6890193487b5.js"
    }
  },
  {
    "path": "js/7b9a1dfa2ba7ebd6966eb4b5a2b8cccf.js",
    "context": {
      "path": "js/7b9a1dfa2ba7ebd6966eb4b5a2b8cccf.js"
    }
  },
  {
    "path": "js/7d7d8ec406a653220337bde42ddcd998.js",
    "context": {
      "path": "js/7d7d8ec406a653220337bde42ddcd998.js"
    }
  },
  {
    "path": "js/969912c5e1cdd73b7812defd4dbd0119.js",
    "context": {
      "path": "js/969912c5e1cdd73b7812defd4dbd0119.js"
    }
  },
  {
    "path": "js/9f9b6e54f82a6bbc8bac9b89327024bc.js",
    "context": {
      "path": "js/9f9b6e54f82a6bbc8bac9b89327024bc.js"
    }
  },
  {
    "path": "js/a626b42d5e9f3bebfd9624955f0d721b.js",
    "context": {
      "path": "js/a626b42d5e9f3bebfd9624955f0d721b.js"
    }
  },
  {
    "path": "js/aeea5981f09059b3304ead8b513e8042.js",
    "context": {
      "path": "js/aeea5981f09059b3304ead8b513e8042.js"
    }
  },
  {
    "path": "js/afe09ede095ecb21a7d57d52891fbfe8.js",
    "context": {
      "path": "js/afe09ede095ecb21a7d57d52891fbfe8.js"
    }
  },
  {
    "path": "js/bd271374cbdbf6b93a861a0d1da4d44b.js",
    "context": {
      "path": "js/bd271374cbdbf6b93a861a0d1da4d44b.js"
    }
  },
  {
    "path": "js/c0a73d949973f41fdb7cb5098a95c51d.js",
    "context": {
      "path": "js/c0a73d949973f41fdb7cb5098a95c51d.js"
    }
  },
  {
    "path": "js/d1ec9a5167f878e894e5532ac741f0dd.js",
    "context": {
      "path": "js/d1ec9a5167f878e894e5532ac741f0dd.js"
    }
  },
  {
    "path": "js/d2a524fa5eb75b486a06e4ccd15439a7.js",
    "context": {
      "path": "js/d2a524fa5eb75b486a06e4ccd15439a7.js"
    }
  },
  {
    "path": "js/e83b51d598b2a45483252c3be82d77b0.js",
    "context": {
      "path": "js/e83b51d598b2a45483252c3be82d77b0.js"
    }
  },
  {
    "path": "js/f17632f1cc1088a1c285f0d8e9cedde0.js",
    "context": {
      "path": "js/f17632f1cc1088a1c285f0d8e9cedde0.js"
    }
  },
  {
    "path": "js/f5b6708cffe7c1147c483017fbec7d58.js",
    "context": {
      "path": "js/f5b6708cffe7c1147c483017fbec7d58.js"
    }
  },
  {
    "path": "js/faf9ce4e848522206b5c3043551fb2d7.js",
    "context": {
      "path": "js/faf9ce4e848522206b5c3043551fb2d7.js"
    }
  }
]

Return only a JSON object mapping each path to its new basename (same extension). No other text.