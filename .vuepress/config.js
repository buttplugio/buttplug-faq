const { description } = require('../package')
let date = new Date().toJSON();
module.exports = {
  host: "localhost",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Buttplug and Intiface FAQ',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Buttplug',
        link: 'https://buttplug.io'
      },
      {
        text: 'Intiface',
        link: 'https://intiface.com'
      }
    ],
    sidebar: [
      "/",
      {
        title: 'Hardware',
        collapsable: true,
        children: [
          '/hardware/',
          '/hardware/bluetooth.md',
          '/hardware/kiiroo.md',
          '/hardware/lovense.md',
          '/hardware/the-handy.md',
          '/hardware/wevibe.md',
        ]
      }
      ,
        {
          title: 'Buttplug',
          collapsable: true,
          children: [
            '/buttplug/',
          ]
        }
      ,
        {
          title: 'Intiface',
          collapsable: true,
          children: [
            '/intiface/intiface-desktop.md',
          ]
        }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  head: [
    ['link', { rel: 'icon', href: '/buttplug.svg' }],
    ["meta", {property: "og:type", content:"website"}],
    ["meta", {property: "og:title", content:"Buttplug and Intiface FAQ"}],
    ["meta", {property: "og:url", content:"https://faq.docs.buttplug.io"}],
    ["meta", {property: "og:site_name", content:"Buttplug and Intiface FAQ"}],
    ["meta", {property: "og:description", content:"FAQ for Buttplug, Intiface, and Supported Hardware"}],
    ["meta", {property: "og:locale", content:"default"}],
    ["meta", {property: "og:image", content:"https://faq.docs.buttplug.io/buttplug-logo-opengraph.png"}],
    ["meta", {property: "og:updated_time", content:date}],
    ["meta", {name:"twitter:card", content:"summary"}],
    ["meta", {name:"twitter:title", content:"Buttplug and Intiface FAQ"}],
    ["meta", {name:"twitter:description", content:"FAQ for Buttplug, Intiface, and Supported Hardware."}],
    ["meta", {name:"twitter:image", content:"https://faq.docs.buttplug.io/buttplug-logo-opengraph.png"}],
    ["meta", {name:"twitter:creator", content:"@buttplugio"}],
  ],
  evergreen: true
}
