import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import visit from 'unist-util-visit'
import codeTitles from './remark-code-title'
import imgToJsx from './img-to-jsx'
import getAllFilesRecursively from './utils/files'

const root = process.cwd()

const tokenClassNames = {
  // Comments
  comment: 'text-code-comments',
  prolog: 'text-code-comments',
  doctype: 'text-code-comments',
  cdata: 'text-code-comments',

  // Primitives
  tag: 'text-code-primitives',
  boolean: 'text-code-primitives',
  number: 'text-code-primitives',
  deleted: 'text-code-primitives',

  // Keywords
  keyword: 'text-code-keywords',
  property: 'text-code-keywords',
  selector: 'text-code-keywords',
  constant: 'text-code-keywords',
  symbol: 'text-code-keywords',
  builtin: 'text-code-keywords',

  // Attributes
  'attr-name': 'text-code-attributes',
  'attr-value': 'text-code-attributes',
  string: 'text-code-attributes',
  char: 'text-code-attributes',
  operator: 'text-code-attributes',
  entity: 'text-code-attributes',
  url: 'text-code-attributes',
  variable: 'text-code-attributes',
  inserted: 'text-code-attributes',

  atrule: 'text-code-blue',

  regex: 'text-primary-500',
  important: 'text-primary-500 font-bold',

  bold: 'font-bold',
  italic: 'italic',

  punctuation: 'opacity-70',
  namespace: 'opacity-70',
}

export function getFiles(type) {
  const prefixPaths = path.join(root, 'data', type)
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type, slug) {
  const mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
  const mdPath = path.join(root, 'data', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const { frontmatter, code } = await bundleMDX(source, {
    // mdx imports can be automatically source from the components directory
    cwd: path.join(process.cwd(), 'components'),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        require('remark-slug'),
        require('remark-autolink-headings'),
        require('remark-gfm'),
        codeTitles,
        [require('remark-footnotes'), { inlineNotes: true }],
        require('remark-math'),
        imgToJsx,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        require('rehype-katex'),
        [require('rehype-prism-plus'), { ignoreMissing: true }],
        () => {
          return (tree) => {
            visit(tree, 'element', (node) => {
              let [token, type] = node.properties.className || []
              if (token === 'token') {
                node.properties.className = [tokenClassNames[type]]
              }
            })
          }
        },
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })

  return {
    mdxSource: code,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
    },
  }
}

export async function getAllFilesFrontMatter(folder) {
  const prefixPaths = path.join(root, 'data', folder)

  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter = []

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const { data } = matter(source)
    if (data.draft !== true) {
      allFrontMatter.push({ ...data, slug: formatSlug(fileName) })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
