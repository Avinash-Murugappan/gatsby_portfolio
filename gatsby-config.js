module.exports = {
  siteMetadata: {
    title: `Avinash | Full-Stack Developer`,
    description: `I’m Avinash Murugappan, a full stack developer based in the United States skilled in building and designing awesome websites, web applications, mobile applications and everything in between.`,
    author: `Avinash`,
    siteUrl: 'https://avicodes.netlify.app/',
    social: {
      twitter: 'avinash___27',
      instagram: 'avi_codes',
      linkedin: 'avinash-a-murugappan-73b901164/',
      youtube: 'channel/UCIofTJ17ajY1rlpo2dsTpTw',
      facebook: 'avinash.arunachalam/',
      github: 'Avinash-Murugappan',
      email: 'avinasharunachalam.am@gmail.com'
    },
    // name of the image for social website share, should be in static folder
    imageShare: `share.jpg`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-188943320-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false
      }
    },
    `gatsby-plugin-use-dark-mode`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts:{
          google:[
          {
            family: `Montserrat`,
            variants: [`200`, `400`, `400i`, `600`, `600i`, `700`]
          }
        ]
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer'
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Avinash | Software Engineer`,
        short_name: `Avinash`,
        icon: `src/images/icon.png`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#127EB1`,
        display: `minimal-ui`
      }
    },
    `gatsby-plugin-offline`
  ]
};
