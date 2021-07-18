import siteMetadata from '@/data/siteMetadata'

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  let parts = date.split('-')
  let year = parts[0]
  let month = parts[1]
  let day = parts[2]

  // Note: months are 0-based
  const now = new Date(year, month - 1, day).toLocaleDateString(siteMetadata.locale, options)

  return now
}

export default formatDate
