import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => (
  <SectionContainer>
    <div className="flex flex-col justify-between h-screen">
      <header className="flex items-center justify-between py-10">
        <Link href="/" aria-label="AGS1130 Dev Blog">
          <div className="flex items-center justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="73" height="55">
              <g transform="matrix(0.12006579 0 0 0.12061404 0 0)">
                <g transform="matrix(0.95 0 0 0.95 0 0)"></g>
                <path
                  fill="none"
                  strokeWidth="32"
                  transform="matrix(0.95 0 0 0.95 0 0)"
                  className="stroke-current text-black dark:text-white"
                  d="M324.48 36.005L571.98 456.755L76.97998 456.755L324.48 36.005z"
                />
                <g transform="matrix(0.95 0 0 0.95 0 0)"></g>
                <path
                  fill="#B9975B"
                  stroke="#B9975B"
                  strokeWidth="16"
                  fillRule="nonzero"
                  transform="matrix(0.95 0 0 0.95 0 0)"
                  d="M323.94 173.975L475.44 431.525L172.44 431.525L323.94 173.975z"
                />
              </g>
            </svg>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 sm:p-4 font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  </SectionContainer>
)

export default LayoutWrapper
