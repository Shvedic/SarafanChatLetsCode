import Vue from 'vue'
import Vuetify from 'vuetify'
import '@babel/polyfill'
import 'api/resourse'
import router from 'router/router'
import App from 'pages/App.vue'
import store from 'store/store'
import { connect } from './util/ws'
import 'vuetify/dist/vuetify.min.css'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

Sentry.init({
    dsn: 'https://b270006ab363463f9b9ea84fa1591261@o404051.ingest.sentry.io/5267300',
    integrations: [new VueIntegration({Vue, attachProps: true})],
})

Sentry.configureScope(scope =>
    scope.setUser( {
        id: profile && profile.id,
        username: profile && profile.name
    })
)

if (profile) {
    connect()
}

Vue.use(Vuetify, {iconfont: 'mdiSvg'})

new Vue({
    el: '#app',
    store,
    router,
    vuetify: new Vuetify({}),
    render: a => a(App)
})