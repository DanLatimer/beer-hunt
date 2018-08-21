// Snapshot the ~/app.css and the theme
import * as application from 'application'
import 'ui/styling/style-scope'
const appCssContext = require.context('~/', false, /^\.\/app\.(css|scss|less|sass)$/)
global.registerWebpackModules(appCssContext)
application.loadAppCss()

import 'nativescript-localstorage';

import './vendor-platform'

import 'reflect-metadata'
import '@angular/platform-browser'
import '@angular/core'
import '@angular/common'
import '@angular/forms'
import '@angular/http'
import '@angular/router'

import 'nativescript-angular/platform-static'
import 'nativescript-angular/forms'
import 'nativescript-angular/router'

